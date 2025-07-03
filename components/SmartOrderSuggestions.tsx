import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Brain, Clock, TrendingUp, Package, Zap, Calendar, Users, Star } from 'lucide-react-native';

interface SmartOrderSuggestionsProps {
  userId: string;
  onOrderSuggestion?: (suggestion: any) => void;
}

interface OrderSuggestion {
  id: string;
  type: 'timing' | 'quantity' | 'product' | 'bulk' | 'subscription';
  title: string;
  description: string;
  confidence: number;
  savings?: number;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  reasoning: string;
  urgency: 'low' | 'medium' | 'high';
}

export default function SmartOrderSuggestions({ userId, onOrderSuggestion }: SmartOrderSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<OrderSuggestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateSmartSuggestions();
  }, [userId]);

  const generateSmartSuggestions = async () => {
    setLoading(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockSuggestions: OrderSuggestion[] = [
        {
          id: '1',
          type: 'timing',
          title: 'Perfect timing! You usually order now',
          description: 'Based on your pattern, you typically order around this time on Fridays.',
          confidence: 0.92,
          items: [
            { name: '20L Jar', quantity: 2, price: 100 }
          ],
          reasoning: 'Historical data shows 8 orders placed between 2-4 PM on Fridays',
          urgency: 'high'
        },
        {
          id: '2',
          type: 'quantity',
          title: 'Order 3 jars instead of 2 and save ₹15',
          description: 'Bulk discount applies for 3+ jars. Free delivery included.',
          confidence: 0.85,
          savings: 15,
          items: [
            { name: '20L Jar', quantity: 3, price: 135 }
          ],
          reasoning: 'Bulk pricing tier activated at 3+ units',
          urgency: 'medium'
        },
        {
          id: '3',
          type: 'product',
          title: 'Try Himalayan Springs - 95% satisfaction in your area',
          description: 'Premium quality with natural minerals. Highly rated by neighbors.',
          confidence: 0.78,
          items: [
            { name: 'Himalayan Springs 20L', quantity: 1, price: 65 }
          ],
          reasoning: 'High satisfaction rate among users in HSR Layout',
          urgency: 'low'
        },
        {
          id: '4',
          type: 'subscription',
          title: 'Weekly subscription saves ₹200/month',
          description: 'Auto-delivery every Friday at 3 PM. Cancel anytime.',
          confidence: 0.88,
          savings: 200,
          items: [
            { name: '20L Jar', quantity: 2, price: 90 }
          ],
          reasoning: 'Regular Friday orders detected for 6 weeks',
          urgency: 'medium'
        }
      ];
      
      setSuggestions(mockSuggestions);
      setLoading(false);
    }, 1500);
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'timing':
        return <Clock size={18} color="#059669" />;
      case 'quantity':
        return <Package size={18} color="#2563EB" />;
      case 'product':
        return <Star size={18} color="#F59E0B" />;
      case 'subscription':
        return <Calendar size={18} color="#7C3AED" />;
      default:
        return <Brain size={18} color="#64748B" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return '#DC2626';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#059669';
      default:
        return '#64748B';
    }
  };

  const handleSuggestionAction = (suggestion: OrderSuggestion) => {
    onOrderSuggestion?.(suggestion);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Brain size={24} color="#2563EB" />
        <Text style={styles.loadingText}>Analyzing your preferences...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Brain size={20} color="#2563EB" />
        <Text style={styles.headerTitle}>Smart Suggestions</Text>
        <View style={styles.aiIndicator}>
          <TrendingUp size={12} color="#059669" />
          <Text style={styles.aiText}>AI</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestionsScroll}>
        {suggestions.map((suggestion) => (
          <View key={suggestion.id} style={styles.suggestionCard}>
            <View style={styles.suggestionHeader}>
              <View style={styles.suggestionIcon}>
                {getSuggestionIcon(suggestion.type)}
              </View>
              <View style={styles.suggestionMeta}>
                <View style={[
                  styles.urgencyDot,
                  { backgroundColor: getUrgencyColor(suggestion.urgency) }
                ]} />
                <Text style={styles.confidenceText}>
                  {Math.round(suggestion.confidence * 100)}% match
                </Text>
              </View>
            </View>

            <Text style={styles.suggestionTitle}>{suggestion.title}</Text>
            <Text style={styles.suggestionDescription}>{suggestion.description}</Text>

            {suggestion.savings && (
              <View style={styles.savingsContainer}>
                <TrendingUp size={14} color="#059669" />
                <Text style={styles.savingsText}>Save ₹{suggestion.savings}</Text>
              </View>
            )}

            <View style={styles.itemsContainer}>
              {suggestion.items.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <Text style={styles.itemName}>{item.quantity}x {item.name}</Text>
                  <Text style={styles.itemPrice}>₹{item.price}</Text>
                </View>
              ))}
            </View>

            <View style={styles.reasoningContainer}>
              <Text style={styles.reasoningText}>{suggestion.reasoning}</Text>
            </View>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleSuggestionAction(suggestion)}
            >
              <Zap size={14} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>
                {suggestion.type === 'subscription' ? 'Subscribe' : 'Order Now'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 8,
    flex: 1,
  },
  aiIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  aiText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#059669',
    marginLeft: 2,
  },
  suggestionsScroll: {
    marginHorizontal: -16,
  },
  suggestionCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    width: 280,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  suggestionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  suggestionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  urgencyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  confidenceText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
  suggestionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 6,
    lineHeight: 18,
  },
  suggestionDescription: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
    marginBottom: 12,
  },
  savingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  savingsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
    marginLeft: 4,
  },
  itemsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 12,
    color: '#1E293B',
    flex: 1,
  },
  itemPrice: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  reasoningContainer: {
    backgroundColor: '#EBF4FF',
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
  },
  reasoningText: {
    fontSize: 10,
    color: '#2563EB',
    lineHeight: 14,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 4,
  },
});