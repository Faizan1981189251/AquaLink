import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Brain, TrendingUp, Clock, Package, Users, Star, Zap, Leaf, Calendar, ShoppingCart, X } from 'lucide-react-native';
import { AIRecommendationEngine, Recommendation } from '@/lib/ai-recommendations';

interface AIRecommendationsProps {
  userId: string;
  onRecommendationAction?: (recommendation: Recommendation) => void;
}

export default function AIRecommendations({ userId, onRecommendationAction }: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [dismissedRecs, setDismissedRecs] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadRecommendations();
    
    // Set up real-time updates
    const interval = setInterval(loadRecommendations, 5 * 60 * 1000); // Every 5 minutes
    return () => clearInterval(interval);
  }, [userId]);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      const recs = await AIRecommendationEngine.generateRecommendations(userId);
      setRecommendations(recs.filter(rec => !dismissedRecs.has(rec.title)));
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecommendationAction = (recommendation: Recommendation) => {
    onRecommendationAction?.(recommendation);
  };

  const dismissRecommendation = (recommendation: Recommendation) => {
    setDismissedRecs(prev => new Set([...prev, recommendation.title]));
    setRecommendations(prev => prev.filter(rec => rec.title !== recommendation.title));
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'subscription':
        return <Calendar size={20} color="#2563EB" />;
      case 'product':
        return <Package size={20} color="#059669" />;
      case 'supplier':
        return <Users size={20} color="#7C3AED" />;
      case 'timing':
        return <Clock size={20} color="#F59E0B" />;
      case 'bulk':
        return <ShoppingCart size={20} color="#DC2626" />;
      default:
        return <Brain size={20} color="#64748B" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const getActionButtonText = (type: string) => {
    switch (type) {
      case 'subscription':
        return 'Setup Subscription';
      case 'product':
        return 'Try Now';
      case 'supplier':
        return 'Switch Supplier';
      case 'timing':
        return 'Quick Order';
      case 'bulk':
        return 'Order Bulk';
      default:
        return 'Take Action';
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Brain size={32} color="#2563EB" />
        <Text style={styles.loadingText}>AI is analyzing your preferences...</Text>
      </View>
    );
  }

  if (recommendations.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Brain size={48} color="#94A3B8" />
        <Text style={styles.emptyTitle}>All caught up!</Text>
        <Text style={styles.emptyDescription}>
          Our AI will notify you when we have new personalized recommendations.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Brain size={24} color="#2563EB" />
          <Text style={styles.headerTitle}>AI Recommendations</Text>
        </View>
        <View style={styles.aiIndicator}>
          <TrendingUp size={16} color="#059669" />
          <Text style={styles.aiIndicatorText}>Smart</Text>
        </View>
      </View>

      <ScrollView style={styles.recommendationsList} showsVerticalScrollIndicator={false}>
        {recommendations.map((recommendation, index) => (
          <View key={index} style={styles.recommendationCard}>
            <TouchableOpacity
              style={styles.dismissButton}
              onPress={() => dismissRecommendation(recommendation)}
            >
              <X size={16} color="#94A3B8" />
            </TouchableOpacity>

            <View style={styles.recommendationHeader}>
              <View style={styles.recommendationIcon}>
                {getRecommendationIcon(recommendation.type)}
              </View>
              <View style={styles.recommendationMeta}>
                <View style={[
                  styles.priorityBadge,
                  { backgroundColor: getPriorityColor(recommendation.priority) + '20' }
                ]}>
                  <Text style={[
                    styles.priorityText,
                    { color: getPriorityColor(recommendation.priority) }
                  ]}>
                    {recommendation.priority.toUpperCase()}
                  </Text>
                </View>
                <View style={styles.confidenceIndicator}>
                  <Star size={12} color="#F59E0B" />
                  <Text style={styles.confidenceText}>
                    {Math.round(recommendation.confidence * 100)}% match
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.recommendationTitle}>{recommendation.title}</Text>
            <Text style={styles.recommendationDescription}>{recommendation.description}</Text>

            <View style={styles.reasoningContainer}>
              <Text style={styles.reasoningLabel}>Why this recommendation?</Text>
              <Text style={styles.reasoningText}>{recommendation.reasoning}</Text>
            </View>

            <View style={styles.recommendationActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleRecommendationAction(recommendation)}
              >
                <Text style={styles.actionButtonText}>
                  {getActionButtonText(recommendation.type)}
                </Text>
                <Zap size={16} color="#FFFFFF" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.learnMoreButton}>
                <Text style={styles.learnMoreText}>Learn More</Text>
              </TouchableOpacity>
            </View>

            {/* Special indicators for different recommendation types */}
            {recommendation.type === 'subscription' && (
              <View style={styles.savingsIndicator}>
                <Leaf size={16} color="#059669" />
                <Text style={styles.savingsText}>Save 15% + Eco Points</Text>
              </View>
            )}

            {recommendation.type === 'product' && (
              <View style={styles.popularityIndicator}>
                <Users size={16} color="#7C3AED" />
                <Text style={styles.popularityText}>Popular in your area</Text>
              </View>
            )}

            {recommendation.type === 'supplier' && (
              <View style={styles.qualityIndicator}>
                <Star size={16} color="#F59E0B" />
                <Text style={styles.qualityText}>Higher quality rating</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 8,
  },
  aiIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  aiIndicatorText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
    marginLeft: 4,
  },
  recommendationsList: {
    paddingHorizontal: 24,
  },
  recommendationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  dismissButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recommendationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBF4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendationMeta: {
    alignItems: 'flex-end',
    gap: 4,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
  },
  confidenceIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  confidenceText: {
    fontSize: 10,
    color: '#64748B',
    marginLeft: 4,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
    lineHeight: 22,
  },
  recommendationDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 12,
  },
  reasoningContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  reasoningLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
    marginBottom: 4,
  },
  reasoningText: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
  recommendationActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 12,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 6,
  },
  learnMoreButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  learnMoreText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  savingsIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  savingsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
    marginLeft: 4,
  },
  popularityIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  popularityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7C3AED',
    marginLeft: 4,
  },
  qualityIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  qualityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F59E0B',
    marginLeft: 4,
  },
});