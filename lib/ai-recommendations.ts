import { db } from './firebase';
import { collection, query, where, orderBy, limit, getDocs, doc, getDoc } from 'firebase/firestore';

export interface UserBehavior {
  userId: string;
  orderHistory: OrderPattern[];
  preferences: UserPreferences;
  location: {
    latitude: number;
    longitude: number;
    area: string;
  };
}

export interface OrderPattern {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  timeOfDay: number; // Hour in 24h format
  frequency: number; // Orders per week/month
  products: ProductPreference[];
  supplier: string;
  orderValue: number;
}

export interface ProductPreference {
  productId: string;
  productName: string;
  quantity: number;
  frequency: number;
  brand: string;
  size: string;
}

export interface UserPreferences {
  preferredBrands: string[];
  priceRange: { min: number; max: number };
  deliveryTimePreference: 'fastest' | 'cheapest' | 'quality';
  qualityPriority: number; // 1-10
  sustainabilityFocus: boolean;
}

export interface SupplierAnalytics {
  supplierId: string;
  qualityScore: number;
  deliverySpeedScore: number;
  reliabilityScore: number;
  customerSatisfaction: number;
  certifications: string[];
  labReports: LabReport[];
  areaPopularity: { [area: string]: number };
}

export interface LabReport {
  id: string;
  date: string;
  parameters: {
    ph: number;
    tds: number;
    chlorine: number;
    bacteria: number;
    minerals: { [key: string]: number };
  };
  certification: string;
  score: number; // AI-calculated quality score
}

export interface Recommendation {
  type: 'subscription' | 'product' | 'supplier' | 'timing' | 'bulk';
  title: string;
  description: string;
  confidence: number; // 0-1
  reasoning: string;
  action: RecommendationAction;
  priority: 'high' | 'medium' | 'low';
  validUntil: Date;
}

export interface RecommendationAction {
  type: 'order' | 'subscribe' | 'switch_supplier' | 'schedule';
  data: any;
}

// AI Recommendation Engine
export class AIRecommendationEngine {
  
  // Analyze user behavior patterns
  static async analyzeUserBehavior(userId: string): Promise<UserBehavior> {
    try {
      // Get user's order history
      const ordersRef = collection(db, 'orders');
      const userOrdersQuery = query(
        ordersRef,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(50)
      );
      
      const ordersSnapshot = await getDocs(userOrdersQuery);
      const orders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Get user profile
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      
      // Analyze patterns
      const orderPatterns = this.extractOrderPatterns(orders);
      const preferences = this.inferPreferences(orders, userData);
      
      return {
        userId,
        orderHistory: orderPatterns,
        preferences,
        location: userData?.location || { latitude: 0, longitude: 0, area: 'Unknown' }
      };
    } catch (error) {
      console.error('Error analyzing user behavior:', error);
      throw error;
    }
  }
  
  // Extract patterns from order history
  private static extractOrderPatterns(orders: any[]): OrderPattern[] {
    const patterns: { [key: string]: OrderPattern } = {};
    
    orders.forEach(order => {
      const orderDate = new Date(order.createdAt.seconds * 1000);
      const dayOfWeek = orderDate.getDay();
      const timeOfDay = orderDate.getHours();
      const key = `${dayOfWeek}-${Math.floor(timeOfDay / 4)}`; // Group by 4-hour blocks
      
      if (!patterns[key]) {
        patterns[key] = {
          dayOfWeek,
          timeOfDay,
          frequency: 0,
          products: [],
          supplier: order.supplierId,
          orderValue: 0
        };
      }
      
      patterns[key].frequency++;
      patterns[key].orderValue += order.total;
      
      // Aggregate product preferences
      order.items?.forEach((item: any) => {
        const existingProduct = patterns[key].products.find(p => p.productId === item.id);
        if (existingProduct) {
          existingProduct.frequency++;
          existingProduct.quantity += item.quantity;
        } else {
          patterns[key].products.push({
            productId: item.id,
            productName: item.name,
            quantity: item.quantity,
            frequency: 1,
            brand: item.brand || 'Unknown',
            size: item.size || 'Unknown'
          });
        }
      });
    });
    
    return Object.values(patterns);
  }
  
  // Infer user preferences from behavior
  private static inferPreferences(orders: any[], userData: any): UserPreferences {
    const brands = new Map<string, number>();
    let totalSpent = 0;
    let fastDeliveryCount = 0;
    let qualityFocusCount = 0;
    
    orders.forEach(order => {
      totalSpent += order.total;
      
      order.items?.forEach((item: any) => {
        const brand = item.brand || 'Unknown';
        brands.set(brand, (brands.get(brand) || 0) + 1);
      });
      
      if (order.deliveryType === 'express') fastDeliveryCount++;
      if (order.qualityPriority) qualityFocusCount++;
    });
    
    const avgOrderValue = totalSpent / orders.length;
    const preferredBrands = Array.from(brands.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([brand]) => brand);
    
    return {
      preferredBrands,
      priceRange: {
        min: Math.max(0, avgOrderValue * 0.7),
        max: avgOrderValue * 1.5
      },
      deliveryTimePreference: fastDeliveryCount > orders.length * 0.6 ? 'fastest' : 'cheapest',
      qualityPriority: Math.min(10, Math.max(1, (qualityFocusCount / orders.length) * 10)),
      sustainabilityFocus: userData?.ecoMode || false
    };
  }
  
  // Generate personalized recommendations
  static async generateRecommendations(userId: string): Promise<Recommendation[]> {
    try {
      const userBehavior = await this.analyzeUserBehavior(userId);
      const recommendations: Recommendation[] = [];
      
      // 1. Subscription recommendations
      const subscriptionRec = this.generateSubscriptionRecommendation(userBehavior);
      if (subscriptionRec) recommendations.push(subscriptionRec);
      
      // 2. Product recommendations
      const productRecs = await this.generateProductRecommendations(userBehavior);
      recommendations.push(...productRecs);
      
      // 3. Supplier recommendations
      const supplierRecs = await this.generateSupplierRecommendations(userBehavior);
      recommendations.push(...supplierRecs);
      
      // 4. Timing recommendations
      const timingRec = this.generateTimingRecommendation(userBehavior);
      if (timingRec) recommendations.push(timingRec);
      
      // 5. Bulk order recommendations
      const bulkRec = this.generateBulkOrderRecommendation(userBehavior);
      if (bulkRec) recommendations.push(bulkRec);
      
      // Sort by priority and confidence
      return recommendations.sort((a, b) => {
        const priorityWeight = { high: 3, medium: 2, low: 1 };
        return (priorityWeight[b.priority] * b.confidence) - (priorityWeight[a.priority] * a.confidence);
      });
      
    } catch (error) {
      console.error('Error generating recommendations:', error);
      return [];
    }
  }
  
  // Generate subscription recommendation
  private static generateSubscriptionRecommendation(userBehavior: UserBehavior): Recommendation | null {
    const patterns = userBehavior.orderHistory;
    const regularPattern = patterns.find(p => p.frequency >= 3); // Orders 3+ times in same pattern
    
    if (!regularPattern) return null;
    
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[regularPattern.dayOfWeek];
    
    return {
      type: 'subscription',
      title: `You usually order on ${dayName}s. Schedule a subscription?`,
      description: `Save 15% with automatic ${dayName} deliveries. Based on your ordering pattern, you order every ${dayName} around ${regularPattern.timeOfDay}:00.`,
      confidence: Math.min(0.95, regularPattern.frequency / 10),
      reasoning: `Detected regular ordering pattern: ${regularPattern.frequency} orders on ${dayName}s`,
      action: {
        type: 'subscribe',
        data: {
          frequency: 'weekly',
          dayOfWeek: regularPattern.dayOfWeek,
          timeOfDay: regularPattern.timeOfDay,
          products: regularPattern.products
        }
      },
      priority: 'high',
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    };
  }
  
  // Generate product recommendations
  private static async generateProductRecommendations(userBehavior: UserBehavior): Promise<Recommendation[]> {
    const recommendations: Recommendation[] = [];
    
    // Get area-based popular products
    const areaPopularProducts = await this.getAreaPopularProducts(userBehavior.location.area);
    
    areaPopularProducts.forEach(product => {
      if (!userBehavior.preferences.preferredBrands.includes(product.brand)) {
        recommendations.push({
          type: 'product',
          title: `Try ${product.brand} – ${product.popularityPercentage}% of users in your area prefer it`,
          description: `${product.name} is highly rated in ${userBehavior.location.area} with ${product.avgRating}★ rating and ${product.qualityScore}/10 quality score.`,
          confidence: product.popularityPercentage / 100,
          reasoning: `Popular in your area (${userBehavior.location.area}) with high satisfaction`,
          action: {
            type: 'order',
            data: { productId: product.id, supplierId: product.bestSupplierId }
          },
          priority: product.popularityPercentage > 80 ? 'high' : 'medium',
          validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        });
      }
    });
    
    return recommendations;
  }
  
  // Generate supplier recommendations
  private static async generateSupplierRecommendations(userBehavior: UserBehavior): Promise<Recommendation[]> {
    const recommendations: Recommendation[] = [];
    
    // Get AI-matched suppliers
    const matchedSuppliers = await this.getAIMatchedSuppliers(userBehavior);
    
    matchedSuppliers.slice(0, 2).forEach(supplier => {
      recommendations.push({
        type: 'supplier',
        title: `Switch to ${supplier.name} for better ${supplier.strongPoint}`,
        description: `${supplier.name} scores ${supplier.matchScore}/10 for your preferences. ${supplier.reasoning}`,
        confidence: supplier.matchScore / 10,
        reasoning: supplier.reasoning,
        action: {
          type: 'switch_supplier',
          data: { supplierId: supplier.id }
        },
        priority: supplier.matchScore > 8 ? 'high' : 'medium',
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      });
    });
    
    return recommendations;
  }
  
  // Generate timing recommendation
  private static generateTimingRecommendation(userBehavior: UserBehavior): Recommendation | null {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay();
    
    // Find if user typically orders around this time
    const similarTimePattern = userBehavior.orderHistory.find(p => 
      Math.abs(p.timeOfDay - currentHour) <= 2 && p.dayOfWeek === currentDay
    );
    
    if (similarTimePattern && similarTimePattern.frequency >= 2) {
      return {
        type: 'timing',
        title: 'Perfect timing! You usually order around now',
        description: `Based on your pattern, you typically order around ${currentHour}:00 on ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][currentDay]}s. Quick reorder?`,
        confidence: 0.8,
        reasoning: `Historical pattern shows ${similarTimePattern.frequency} orders at similar time`,
        action: {
          type: 'order',
          data: { products: similarTimePattern.products }
        },
        priority: 'medium',
        validUntil: new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours
      };
    }
    
    return null;
  }
  
  // Generate bulk order recommendation
  private static generateBulkOrderRecommendation(userBehavior: UserBehavior): Recommendation | null {
    const totalMonthlySpend = userBehavior.orderHistory.reduce((sum, pattern) => 
      sum + (pattern.orderValue * pattern.frequency), 0
    );
    
    if (totalMonthlySpend > 500) { // If spending more than ₹500/month
      return {
        type: 'bulk',
        title: 'Save ₹150/month with bulk orders',
        description: `You spend ₹${totalMonthlySpend}/month on water. Bulk monthly orders can save you 30% (₹${Math.round(totalMonthlySpend * 0.3)}).`,
        confidence: 0.9,
        reasoning: `High monthly spend of ₹${totalMonthlySpend} qualifies for bulk discounts`,
        action: {
          type: 'order',
          data: { type: 'bulk', estimatedSavings: Math.round(totalMonthlySpend * 0.3) }
        },
        priority: 'high',
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      };
    }
    
    return null;
  }
  
  // Get popular products in user's area
  private static async getAreaPopularProducts(area: string) {
    // This would query your database for area-specific product popularity
    // For demo, returning mock data
    return [
      {
        id: 'kinley_20l',
        name: 'Kinley 20L Jar',
        brand: 'Kinley',
        popularityPercentage: 90,
        avgRating: 4.7,
        qualityScore: 9.2,
        bestSupplierId: 'supplier_1'
      },
      {
        id: 'bisleri_1l',
        name: 'Bisleri 1L Bottle',
        brand: 'Bisleri',
        popularityPercentage: 85,
        avgRating: 4.5,
        qualityScore: 8.8,
        bestSupplierId: 'supplier_2'
      }
    ];
  }
  
  // Get AI-matched suppliers based on user preferences
  private static async getAIMatchedSuppliers(userBehavior: UserBehavior) {
    // This would use ML algorithms to match suppliers
    // For demo, returning mock data with scoring logic
    return [
      {
        id: 'supplier_premium',
        name: 'PureFlow Premium',
        matchScore: 9.2,
        strongPoint: 'quality and speed',
        reasoning: 'Matches your preference for quality (9.5/10) and fast delivery (avg 8 mins). Lab reports show 99.9% purity.'
      },
      {
        id: 'supplier_eco',
        name: 'EcoWater Solutions',
        matchScore: 8.7,
        strongPoint: 'sustainability',
        reasoning: 'Perfect for your eco-focus. 100% recyclable packaging, carbon-neutral delivery, and local sourcing.'
      }
    ];
  }
}

// Lab Report AI Analysis
export class LabReportAnalyzer {
  
  // Analyze lab report and generate quality score
  static analyzeLabReport(report: any): LabReport {
    const parameters = report.parameters;
    
    // AI scoring algorithm
    let score = 10;
    
    // pH scoring (ideal: 6.5-8.5)
    if (parameters.ph < 6.5 || parameters.ph > 8.5) {
      score -= Math.abs(parameters.ph - 7.5) * 0.5;
    }
    
    // TDS scoring (ideal: 150-300 ppm)
    if (parameters.tds < 150 || parameters.tds > 300) {
      score -= Math.abs(parameters.tds - 225) / 100;
    }
    
    // Chlorine scoring (should be minimal)
    if (parameters.chlorine > 0.5) {
      score -= parameters.chlorine * 2;
    }
    
    // Bacteria scoring (should be zero)
    if (parameters.bacteria > 0) {
      score -= parameters.bacteria * 5;
    }
    
    // Mineral balance scoring
    const essentialMinerals = ['calcium', 'magnesium', 'potassium'];
    essentialMinerals.forEach(mineral => {
      if (!parameters.minerals[mineral] || parameters.minerals[mineral] < 10) {
        score -= 0.5;
      }
    });
    
    return {
      id: report.id,
      date: report.date,
      parameters,
      certification: report.certification,
      score: Math.max(0, Math.min(10, score))
    };
  }
  
  // Generate quality insights
  static generateQualityInsights(labReport: LabReport): string[] {
    const insights: string[] = [];
    const params = labReport.parameters;
    
    if (params.ph >= 6.5 && params.ph <= 8.5) {
      insights.push('✅ Optimal pH balance for health');
    } else {
      insights.push('⚠️ pH levels outside recommended range');
    }
    
    if (params.tds >= 150 && params.tds <= 300) {
      insights.push('✅ Perfect mineral content');
    } else if (params.tds < 150) {
      insights.push('⚠️ Low mineral content - may lack essential minerals');
    } else {
      insights.push('⚠️ High TDS - may taste salty');
    }
    
    if (params.bacteria === 0) {
      insights.push('✅ Bacteria-free and safe');
    } else {
      insights.push('❌ Contains harmful bacteria');
    }
    
    if (params.chlorine <= 0.2) {
      insights.push('✅ Low chlorine - natural taste');
    } else {
      insights.push('⚠️ High chlorine - may affect taste');
    }
    
    return insights;
  }
}

// Real-time recommendation updates
export const subscribeToRecommendations = (userId: string, callback: (recommendations: Recommendation[]) => void) => {
  // Set up real-time listener for user behavior changes
  const interval = setInterval(async () => {
    try {
      const recommendations = await AIRecommendationEngine.generateRecommendations(userId);
      callback(recommendations);
    } catch (error) {
      console.error('Error updating recommendations:', error);
    }
  }, 5 * 60 * 1000); // Update every 5 minutes
  
  return () => clearInterval(interval);
};