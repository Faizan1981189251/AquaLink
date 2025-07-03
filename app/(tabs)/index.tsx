import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Droplets, 
  MapPin, 
  Search, 
  Bell, 
  Star, 
  Zap, 
  Shield, 
  Recycle,
  ChevronRight,
  Clock,
  Truck,
  Mic,
  RotateCcw,
  Plus,
  Minus,
  ShoppingCart,
  Timer,
  Leaf,
  TrendingUp,
  Package,
  MessageCircle,
  Bot,
  ScanLine,
  Volume2,
  Brain
} from 'lucide-react-native';
import AIChatbot from '@/components/AIChatbot';
import VoiceOrderModal from '@/components/VoiceOrderModal';
import BarcodeScanner from '@/components/BarcodeScanner';
import AIRecommendations from '@/components/AIRecommendations';
import SmartOrderSuggestions from '@/components/SmartOrderSuggestions';
import SupplierQualityCard from '@/components/SupplierQualityCard';
import { getCurrentLocation, LocationCoords } from '@/lib/location';
import { getNearbySuppliers } from '@/lib/firestore';
import { Recommendation } from '@/lib/ai-recommendations';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [chatbotVisible, setChatbotVisible] = useState(false);
  const [voiceOrderVisible, setVoiceOrderVisible] = useState(false);
  const [scannerVisible, setScannerVisible] = useState(false);
  const [userLocation, setUserLocation] = useState<LocationCoords | null>(null);
  const [nearbySuppliers, setNearbySuppliers] = useState<any[]>([]);
  const [quickOrderCounts, setQuickOrderCounts] = useState({
    jar20L: 0,
    bottle1L: 0,
    bottle500ml: 0
  });
  const [showRecommendations, setShowRecommendations] = useState(true);

  // Mock user ID - in real app, get from auth
  const userId = 'user_123';

  // AI Stock Reminder State
  const [stockReminder, setStockReminder] = useState({
    show: true,
    item: '20L Jars',
    daysLeft: 2,
    lastOrderDate: '3 days ago',
    confidence: 0.89
  });

  useEffect(() => {
    loadUserLocation();
  }, []);

  const loadUserLocation = async () => {
    try {
      const location = await getCurrentLocation();
      if (location) {
        setUserLocation(location);
        loadNearbySuppliers(location.latitude, location.longitude);
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const loadNearbySuppliers = async (lat: number, lng: number) => {
    try {
      const suppliers = await getNearbySuppliers(lat, lng, 10);
      setNearbySuppliers(suppliers.slice(0, 3)); // Show top 3
    } catch (error) {
      console.error('Error loading suppliers:', error);
      // Fallback to mock data with quality scores
      setNearbySuppliers([
        {
          id: 1,
          name: 'AquaPure Solutions',
          distance: '0.8 km',
          rating: 4.8,
          deliveryTime: '8-12 min',
          image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          certified: true,
          price: '₹25/jar',
          expressDelivery: true,
          available: true,
          qualityScore: 9.2,
          deliverySpeedScore: 9.5,
          reliabilityScore: 8.8,
          customerSatisfaction: 0.94,
          certifications: ['ISO 22000', 'BIS Certified', 'FSSAI Licensed'],
          labReports: [{
            id: 'report_1',
            date: '2024-01-10',
            parameters: {
              ph: 7.2,
              tds: 180,
              chlorine: 0.1,
              bacteria: 0,
              minerals: { calcium: 45, magnesium: 12, potassium: 8 }
            },
            certification: 'NABL Certified Lab',
            score: 9.2
          }]
        },
        {
          id: 2,
          name: 'Crystal Water Co.',
          distance: '1.2 km',
          rating: 4.6,
          deliveryTime: '10-15 min',
          image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          certified: true,
          price: '₹22/jar',
          expressDelivery: false,
          available: true,
          qualityScore: 8.7,
          deliverySpeedScore: 8.2,
          reliabilityScore: 9.1,
          customerSatisfaction: 0.89,
          certifications: ['BIS Certified', 'FSSAI Licensed'],
          labReports: [{
            id: 'report_2',
            date: '2024-01-08',
            parameters: {
              ph: 7.0,
              tds: 220,
              chlorine: 0.2,
              bacteria: 0,
              minerals: { calcium: 38, magnesium: 15, potassium: 6 }
            },
            certification: 'Government Lab',
            score: 8.7
          }]
        }
      ]);
    }
  };

  const quickOrderItems = [
    { 
      id: 'jar20L', 
      name: '20L Jar', 
      price: 50, 
      icon: <Droplets size={24} color="#FFFFFF" />,
      color: '#2563EB',
      estimatedStock: 2,
      avgConsumption: '1 jar/week'
    },
    { 
      id: 'bottle1L', 
      name: '1L Bottles', 
      price: 10, 
      icon: <Package size={24} color="#FFFFFF" />,
      color: '#059669',
      estimatedStock: 8,
      avgConsumption: '12 bottles/week'
    },
    { 
      id: 'bottle500ml', 
      name: '500ml Bottles', 
      price: 4, 
      icon: <Package size={24} color="#FFFFFF" />,
      color: '#7C3AED',
      estimatedStock: 15,
      avgConsumption: '20 bottles/week'
    }
  ];

  const recentOrders = [
    {
      id: 1,
      items: '2x 20L Jars',
      supplier: 'AquaPure Solutions',
      date: '2 days ago',
      total: 100
    },
    {
      id: 2,
      items: '24x 1L Bottles',
      supplier: 'Crystal Water Co.',
      date: '1 week ago',
      total: 240
    }
  ];

  const handleVoiceSearch = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      setSearchQuery('20 liter water jar');
      Alert.alert('Voice Search', 'Found: "20 liter water jar"');
    }, 2000);
  };

  const updateQuickOrderCount = (itemId: string, change: number) => {
    setQuickOrderCounts(prev => ({
      ...prev,
      [itemId]: Math.max(0, prev[itemId] + change)
    }));
  };

  const handleQuickOrder = () => {
    const totalItems = Object.values(quickOrderCounts).reduce((sum, count) => sum + count, 0);
    if (totalItems === 0) {
      Alert.alert('No Items', 'Please select items to order');
      return;
    }

    const orderSummary = quickOrderItems
      .filter(item => quickOrderCounts[item.id] > 0)
      .map(item => `${quickOrderCounts[item.id]}x ${item.name}`)
      .join(', ');

    Alert.alert(
      '1-Click Order Confirmed!',
      `${orderSummary}\n\nEstimated delivery: 8-12 minutes\nSupplier: AquaPure Solutions`,
      [
        { text: 'Track Order', onPress: () => console.log('Navigate to tracking') },
        { text: 'OK' }
      ]
    );

    // Reset counts
    setQuickOrderCounts({ jar20L: 0, bottle1L: 0, bottle500ml: 0 });
  };

  const handleReorder = (order: any) => {
    Alert.alert(
      'Quick Reorder',
      `Reorder ${order.items} from ${order.supplier}?\n\nTotal: ₹${order.total}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reorder', onPress: () => Alert.alert('Order Placed!', 'Estimated delivery: 8-12 minutes') }
      ]
    );
  };

  const handleVoiceOrderComplete = (orderData: any) => {
    Alert.alert(
      'Voice Order Placed!',
      `Order: ${orderData.items.map((item: any) => `${item.quantity}x ${item.name}`).join(', ')}\nTotal: ₹${orderData.total}`,
      [{ text: 'OK' }]
    );
  };

  const handleBarcodeScanned = (productData: any) => {
    Alert.alert(
      'Product Added!',
      `${productData.name} has been added to your cart.`,
      [{ text: 'OK' }]
    );
  };

  const handleRecommendationAction = (recommendation: Recommendation) => {
    Alert.alert(
      'AI Recommendation',
      `Action: ${recommendation.action.type}\n\n${recommendation.title}`,
      [
        { text: 'Not Now', style: 'cancel' },
        { text: 'Take Action', onPress: () => console.log('Execute recommendation:', recommendation) }
      ]
    );
  };

  const handleOrderSuggestion = (suggestion: any) => {
    Alert.alert(
      'Smart Suggestion',
      `${suggestion.title}\n\nTotal: ₹${suggestion.items.reduce((sum: number, item: any) => sum + item.price, 0)}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Order Now', onPress: () => console.log('Execute suggestion:', suggestion) }
      ]
    );
  };

  const dismissStockReminder = () => {
    setStockReminder(prev => ({ ...prev, show: false }));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#2563EB', '#3B82F6']}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.userName}>John Doe</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.chatbotButton}
              onPress={() => setChatbotVisible(true)}
            >
              <Bot size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationButton}>
              <Bell size={24} color="#FFFFFF" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>2</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.locationContainer}>
          <MapPin size={16} color="#FFFFFF" />
          <Text style={styles.locationText}>Delivering to: Home</Text>
          <Text style={styles.locationAddress}>123 Main Street, Bangalore</Text>
        </View>

        <View style={styles.searchContainer}>
          <Search size={20} color="#64748B" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for water suppliers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#64748B"
          />
          <TouchableOpacity 
            style={[styles.voiceButton, isListening && styles.voiceButtonActive]}
            onPress={handleVoiceSearch}
          >
            <Mic size={20} color={isListening ? "#FFFFFF" : "#2563EB"} />
          </TouchableOpacity>
        </View>

        {/* 10-Minute Delivery Promise */}
        <View style={styles.deliveryPromise}>
          <Timer size={16} color="#FFFFFF" />
          <Text style={styles.deliveryPromiseText}>10-Minute Express Delivery Available</Text>
        </View>
      </LinearGradient>

      {/* Quick Action Buttons */}
      <View style={styles.quickActionsContainer}>
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => setVoiceOrderVisible(true)}
        >
          <Volume2 size={20} color="#2563EB" />
          <Text style={styles.quickActionText}>Voice Order</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => setScannerVisible(true)}
        >
          <ScanLine size={20} color="#059669" />
          <Text style={styles.quickActionText}>Scan & Order</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => setChatbotVisible(true)}
        >
          <Bot size={20} color="#7C3AED" />
          <Text style={styles.quickActionText}>AI Assistant</Text>
        </TouchableOpacity>
      </View>

      {/* AI Stock Reminder */}
      {stockReminder.show && (
        <View style={styles.stockReminderCard}>
          <View style={styles.stockReminderIcon}>
            <Brain size={20} color="#F59E0B" />
          </View>
          <View style={styles.stockReminderContent}>
            <Text style={styles.stockReminderTitle}>AI Stock Alert</Text>
            <Text style={styles.stockReminderText}>
              Your {stockReminder.item} might run out in {stockReminder.daysLeft} days
            </Text>
            <Text style={styles.stockReminderSubtext}>
              Last order: {stockReminder.lastOrderDate} • {Math.round(stockReminder.confidence * 100)}% confidence
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.stockReminderAction}
            onPress={() => Alert.alert('Quick Order', 'Order 2x 20L Jars now?')}
          >
            <Text style={styles.stockReminderActionText}>Order Now</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.stockReminderDismiss}
            onPress={dismissStockReminder}
          >
            <Text style={styles.stockReminderDismissText}>×</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* AI Recommendations */}
      {showRecommendations && (
        <View style={styles.section}>
          <AIRecommendations 
            userId={userId}
            onRecommendationAction={handleRecommendationAction}
          />
        </View>
      )}

      {/* Smart Order Suggestions */}
      <View style={styles.section}>
        <SmartOrderSuggestions 
          userId={userId}
          onOrderSuggestion={handleOrderSuggestion}
        />
      </View>

      {/* 1-Click Quick Order */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1-Click Quick Order</Text>
        <View style={styles.quickOrderContainer}>
          {quickOrderItems.map((item) => (
            <View key={item.id} style={styles.quickOrderCard}>
              <View style={[styles.quickOrderIcon, { backgroundColor: item.color }]}>
                {item.icon}
              </View>
              <Text style={styles.quickOrderName}>{item.name}</Text>
              <Text style={styles.quickOrderPrice}>₹{item.price}</Text>
              <Text style={styles.quickOrderStock}>Stock: ~{item.estimatedStock} days</Text>
              
              <View style={styles.quickOrderControls}>
                <TouchableOpacity
                  style={styles.quickOrderButton}
                  onPress={() => updateQuickOrderCount(item.id, -1)}
                >
                  <Minus size={16} color="#64748B" />
                </TouchableOpacity>
                
                <Text style={styles.quickOrderCount}>
                  {quickOrderCounts[item.id]}
                </Text>
                
                <TouchableOpacity
                  style={styles.quickOrderButton}
                  onPress={() => updateQuickOrderCount(item.id, 1)}
                >
                  <Plus size={16} color="#64748B" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        
        <TouchableOpacity 
          style={styles.quickOrderSubmit}
          onPress={handleQuickOrder}
        >
          <ShoppingCart size={20} color="#FFFFFF" />
          <Text style={styles.quickOrderSubmitText}>Order in 1-Click</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Reorder */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Reorder</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        {recentOrders.map((order) => (
          <TouchableOpacity 
            key={order.id} 
            style={styles.reorderCard}
            onPress={() => handleReorder(order)}
          >
            <View style={styles.reorderInfo}>
              <Text style={styles.reorderItems}>{order.items}</Text>
              <Text style={styles.reorderSupplier}>{order.supplier}</Text>
              <Text style={styles.reorderDate}>{order.date}</Text>
            </View>
            <View style={styles.reorderAction}>
              <Text style={styles.reorderTotal}>₹{order.total}</Text>
              <View style={styles.reorderButton}>
                <RotateCcw size={16} color="#2563EB" />
                <Text style={styles.reorderButtonText}>Reorder</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* AI-Matched Suppliers with Quality Cards */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>AI-Matched Quality Suppliers</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {nearbySuppliers.map((supplier) => (
          <SupplierQualityCard
            key={supplier.id}
            supplier={supplier}
            onViewDetails={() => Alert.alert('Quality Report', `View full quality report for ${supplier.name}`)}
          />
        ))}
      </View>

      {/* Eco Impact & Subscription */}
      <View style={styles.section}>
        <View style={styles.ecoCard}>
          <View style={styles.ecoHeader}>
            <Leaf size={24} color="#059669" />
            <Text style={styles.ecoTitle}>Your Eco Impact</Text>
          </View>
          <View style={styles.ecoStats}>
            <View style={styles.ecoStat}>
              <Text style={styles.ecoNumber}>18</Text>
              <Text style={styles.ecoLabel}>Jars Returned</Text>
            </View>
            <View style={styles.ecoStat}>
              <Text style={styles.ecoNumber}>360</Text>
              <Text style={styles.ecoLabel}>Points Earned</Text>
            </View>
            <View style={styles.ecoStat}>
              <Text style={styles.ecoNumber}>₹90</Text>
              <Text style={styles.ecoLabel}>Eco Savings</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.subscriptionButton}>
            <Text style={styles.subscriptionButtonText}>Setup Daily Subscription</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modals */}
      <AIChatbot 
        visible={chatbotVisible}
        onClose={() => setChatbotVisible(false)}
      />
      
      <VoiceOrderModal
        visible={voiceOrderVisible}
        onClose={() => setVoiceOrderVisible(false)}
        onOrderComplete={handleVoiceOrderComplete}
      />
      
      <BarcodeScanner
        visible={scannerVisible}
        onClose={() => setScannerVisible(false)}
        onScanComplete={handleBarcodeScanned}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  chatbotButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#DC2626',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  locationContainer: {
    marginBottom: 20,
  },
  locationText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
    paddingVertical: 12,
  },
  voiceButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EBF4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceButtonActive: {
    backgroundColor: '#DC2626',
  },
  deliveryPromise: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  deliveryPromiseText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 20,
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 6,
  },
  stockReminderCard: {
    backgroundColor: '#FEF3C7',
    marginHorizontal: 24,
    marginTop: 20,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  stockReminderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stockReminderContent: {
    flex: 1,
  },
  stockReminderTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 2,
  },
  stockReminderText: {
    fontSize: 12,
    color: '#92400E',
    marginBottom: 2,
  },
  stockReminderSubtext: {
    fontSize: 10,
    color: '#A16207',
  },
  stockReminderAction: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  stockReminderActionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  stockReminderDismiss: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stockReminderDismissText: {
    color: '#92400E',
    fontSize: 18,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  seeAllText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
  quickOrderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 16,
  },
  quickOrderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickOrderIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickOrderName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 4,
  },
  quickOrderPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#059669',
    marginBottom: 4,
  },
  quickOrderStock: {
    fontSize: 10,
    color: '#64748B',
    marginBottom: 12,
  },
  quickOrderControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 4,
  },
  quickOrderButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickOrderCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  quickOrderSubmit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 16,
  },
  quickOrderSubmitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  reorderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reorderInfo: {
    flex: 1,
  },
  reorderItems: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  reorderSupplier: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 2,
  },
  reorderDate: {
    fontSize: 10,
    color: '#94A3B8',
  },
  reorderAction: {
    alignItems: 'flex-end',
  },
  reorderTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
    marginBottom: 8,
  },
  reorderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  reorderButtonText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '500',
    marginLeft: 4,
  },
  ecoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ecoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ecoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 8,
  },
  ecoStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  ecoStat: {
    alignItems: 'center',
  },
  ecoNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#059669',
    marginBottom: 4,
  },
  ecoLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  subscriptionButton: {
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  subscriptionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});