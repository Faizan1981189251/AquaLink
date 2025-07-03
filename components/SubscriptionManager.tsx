import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Switch, Alert } from 'react-native';
import { X, Calendar, Clock, Package, CreditCard, Pause, Play, Trash2 } from 'lucide-react-native';

interface SubscriptionManagerProps {
  visible: boolean;
  onClose: () => void;
}

export default function SubscriptionManager({ visible, onClose }: SubscriptionManagerProps) {
  const [subscriptions, setSubscriptions] = useState([
    {
      id: '1',
      name: 'Daily Water Supply',
      items: [{ name: '20L Jar', quantity: 1 }],
      frequency: 'daily',
      nextDelivery: '2024-01-15T09:00:00',
      isActive: true,
      totalAmount: 50,
      supplier: 'AquaPure Solutions'
    },
    {
      id: '2',
      name: 'Weekly Office Supply',
      items: [{ name: '20L Jar', quantity: 5 }, { name: '1L Bottles', quantity: 24 }],
      frequency: 'weekly',
      nextDelivery: '2024-01-16T10:00:00',
      isActive: false,
      totalAmount: 490,
      supplier: 'Crystal Water Co.'
    }
  ]);

  const [newSubscription, setNewSubscription] = useState({
    frequency: 'daily',
    time: '09:00',
    items: [{ name: '20L Jar', quantity: 1 }]
  });

  const toggleSubscription = (id: string) => {
    setSubscriptions(prev => 
      prev.map(sub => 
        sub.id === id ? { ...sub, isActive: !sub.isActive } : sub
      )
    );
  };

  const deleteSubscription = (id: string) => {
    Alert.alert(
      'Delete Subscription',
      'Are you sure you want to delete this subscription?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setSubscriptions(prev => prev.filter(sub => sub.id !== id));
          }
        }
      ]
    );
  };

  const formatNextDelivery = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'daily': return '#059669';
      case 'weekly': return '#2563EB';
      case 'monthly': return '#7C3AED';
      default: return '#64748B';
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Subscription Manager</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#64748B" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Active Subscriptions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Subscriptions</Text>
            
            {subscriptions.map((subscription) => (
              <View key={subscription.id} style={styles.subscriptionCard}>
                <View style={styles.subscriptionHeader}>
                  <View style={styles.subscriptionInfo}>
                    <Text style={styles.subscriptionName}>{subscription.name}</Text>
                    <Text style={styles.subscriptionSupplier}>{subscription.supplier}</Text>
                  </View>
                  
                  <View style={styles.subscriptionControls}>
                    <Switch
                      value={subscription.isActive}
                      onValueChange={() => toggleSubscription(subscription.id)}
                      trackColor={{ false: '#E2E8F0', true: '#059669' }}
                      thumbColor="#FFFFFF"
                    />
                  </View>
                </View>

                <View style={styles.subscriptionDetails}>
                  <View style={styles.subscriptionItems}>
                    {subscription.items.map((item, index) => (
                      <Text key={index} style={styles.subscriptionItem}>
                        {item.quantity}x {item.name}
                      </Text>
                    ))}
                  </View>
                  
                  <View style={styles.subscriptionMeta}>
                    <View style={styles.frequencyBadge}>
                      <View style={[
                        styles.frequencyDot, 
                        { backgroundColor: getFrequencyColor(subscription.frequency) }
                      ]} />
                      <Text style={styles.frequencyText}>
                        {subscription.frequency.charAt(0).toUpperCase() + subscription.frequency.slice(1)}
                      </Text>
                    </View>
                    
                    <Text style={styles.subscriptionAmount}>₹{subscription.totalAmount}</Text>
                  </View>
                </View>

                {subscription.isActive && (
                  <View style={styles.nextDelivery}>
                    <Calendar size={16} color="#059669" />
                    <Text style={styles.nextDeliveryText}>
                      Next delivery: {formatNextDelivery(subscription.nextDelivery)}
                    </Text>
                  </View>
                )}

                <View style={styles.subscriptionActions}>
                  <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.pauseButton}
                    onPress={() => toggleSubscription(subscription.id)}
                  >
                    {subscription.isActive ? (
                      <Pause size={16} color="#F59E0B" />
                    ) : (
                      <Play size={16} color="#059669" />
                    )}
                    <Text style={styles.pauseButtonText}>
                      {subscription.isActive ? 'Pause' : 'Resume'}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => deleteSubscription(subscription.id)}
                  >
                    <Trash2 size={16} color="#DC2626" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Create New Subscription */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Create New Subscription</Text>
            
            <View style={styles.newSubscriptionCard}>
              <Text style={styles.newSubscriptionTitle}>Smart Auto-Delivery</Text>
              <Text style={styles.newSubscriptionDescription}>
                Never run out of water again. Set up automatic deliveries based on your consumption patterns.
              </Text>
              
              <View style={styles.frequencyOptions}>
                <Text style={styles.optionLabel}>Delivery Frequency:</Text>
                <View style={styles.frequencyButtons}>
                  {['daily', 'weekly', 'monthly'].map((freq) => (
                    <TouchableOpacity
                      key={freq}
                      style={[
                        styles.frequencyButton,
                        newSubscription.frequency === freq && styles.frequencyButtonActive
                      ]}
                      onPress={() => setNewSubscription(prev => ({ ...prev, frequency: freq }))}
                    >
                      <Text style={[
                        styles.frequencyButtonText,
                        newSubscription.frequency === freq && styles.frequencyButtonTextActive
                      ]}>
                        {freq.charAt(0).toUpperCase() + freq.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity style={styles.createSubscriptionButton}>
                <Package size={20} color="#FFFFFF" />
                <Text style={styles.createSubscriptionButtonText}>Setup Subscription</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Subscription Benefits */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Subscription Benefits</Text>
            
            <View style={styles.benefitsCard}>
              <View style={styles.benefitItem}>
                <View style={styles.benefitIcon}>
                  <CreditCard size={20} color="#059669" />
                </View>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Save up to 15%</Text>
                  <Text style={styles.benefitDescription}>
                    Get discounted rates on all subscription orders
                  </Text>
                </View>
              </View>
              
              <View style={styles.benefitItem}>
                <View style={styles.benefitIcon}>
                  <Clock size={20} color="#2563EB" />
                </View>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Priority Delivery</Text>
                  <Text style={styles.benefitDescription}>
                    Subscribers get priority slots and faster delivery
                  </Text>
                </View>
              </View>
              
              <View style={styles.benefitItem}>
                <View style={styles.benefitIcon}>
                  <Calendar size={20} color="#7C3AED" />
                </View>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Flexible Scheduling</Text>
                  <Text style={styles.benefitDescription}>
                    Pause, modify, or reschedule anytime
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  subscriptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  subscriptionInfo: {
    flex: 1,
  },
  subscriptionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  subscriptionSupplier: {
    fontSize: 12,
    color: '#64748B',
  },
  subscriptionControls: {
    marginLeft: 16,
  },
  subscriptionDetails: {
    marginBottom: 12,
  },
  subscriptionItems: {
    marginBottom: 8,
  },
  subscriptionItem: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 2,
  },
  subscriptionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  frequencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  frequencyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  frequencyText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
  subscriptionAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
  },
  nextDelivery: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  nextDeliveryText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
    marginLeft: 6,
  },
  subscriptionActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  editButton: {
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2563EB',
  },
  pauseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  pauseButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#F59E0B',
    marginLeft: 4,
  },
  deleteButton: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  newSubscriptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newSubscriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  newSubscriptionDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 20,
  },
  frequencyOptions: {
    marginBottom: 20,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 12,
  },
  frequencyButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  frequencyButton: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  frequencyButtonActive: {
    backgroundColor: '#2563EB',
  },
  frequencyButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  frequencyButtonTextActive: {
    color: '#FFFFFF',
  },
  createSubscriptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 12,
  },
  createSubscriptionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  benefitsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
});