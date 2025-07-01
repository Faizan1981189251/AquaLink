import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Package, Clock, CircleCheck as CheckCircle, Truck, MapPin, Phone, Star, RotateCcw, ChevronRight } from 'lucide-react-native';

export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState('active');

  const tabs = [
    { id: 'active', label: 'Active', count: 2 },
    { id: 'completed', label: 'Completed', count: 15 },
    { id: 'cancelled', label: 'Cancelled', count: 1 },
  ];

  const activeOrders = [
    {
      id: 1,
      orderNumber: '#AQ001234',
      supplier: 'AquaPure Solutions',
      supplierImage: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      status: 'out_for_delivery',
      statusText: 'Out for Delivery',
      items: [
        { name: '20L Water Jar', quantity: 2, price: 50 }
      ],
      total: 50,
      orderTime: '2 hours ago',
      estimatedDelivery: '15-20 mins',
      deliveryAddress: '123 Main Street, Bangalore',
      deliveryPerson: 'Rajesh Kumar',
      deliveryPhone: '+91 9876543210',
      trackingSteps: [
        { step: 'Order Placed', completed: true, time: '2:30 PM' },
        { step: 'Preparing', completed: true, time: '2:45 PM' },
        { step: 'Out for Delivery', completed: true, time: '3:15 PM' },
        { step: 'Delivered', completed: false, time: '' }
      ]
    },
    {
      id: 2,
      orderNumber: '#AQ001235',
      supplier: 'Crystal Water Co.',
      supplierImage: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      status: 'preparing',
      statusText: 'Preparing',
      items: [
        { name: '20L Water Jar', quantity: 1, price: 22 }
      ],
      total: 22,
      orderTime: '1 hour ago',
      estimatedDelivery: '30-40 mins',
      deliveryAddress: '123 Main Street, Bangalore',
      trackingSteps: [
        { step: 'Order Placed', completed: true, time: '3:00 PM' },
        { step: 'Preparing', completed: true, time: '3:10 PM' },
        { step: 'Out for Delivery', completed: false, time: '' },
        { step: 'Delivered', completed: false, time: '' }
      ]
    }
  ];

  const completedOrders = [
    {
      id: 3,
      orderNumber: '#AQ001230',
      supplier: 'Himalayan Springs',
      supplierImage: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      status: 'delivered',
      statusText: 'Delivered',
      items: [
        { name: '20L Water Jar', quantity: 3, price: 90 }
      ],
      total: 90,
      orderTime: '1 day ago',
      deliveryTime: 'Delivered at 4:30 PM',
      deliveryAddress: '123 Main Street, Bangalore',
      rating: 4.5,
      canReorder: true
    },
    {
      id: 4,
      orderNumber: '#AQ001229',
      supplier: 'Pure Drop Waters',
      supplierImage: 'https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      status: 'delivered',
      statusText: 'Delivered',
      items: [
        { name: '20L Water Jar', quantity: 2, price: 40 }
      ],
      total: 40,
      orderTime: '2 days ago',
      deliveryTime: 'Delivered at 2:15 PM',
      deliveryAddress: '123 Main Street, Bangalore',
      rating: 4.0,
      canReorder: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing':
        return '#F59E0B';
      case 'out_for_delivery':
        return '#2563EB';
      case 'delivered':
        return '#059669';
      default:
        return '#64748B';
    }
  };

  const renderActiveOrder = (order: any) => (
    <View key={order.id} style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>{order.orderNumber}</Text>
          <Text style={styles.orderTime}>{order.orderTime}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
            {order.statusText}
          </Text>
        </View>
      </View>

      <View style={styles.supplierInfo}>
        <Image source={{ uri: order.supplierImage }} style={styles.supplierImage} />
        <View style={styles.supplierDetails}>
          <Text style={styles.supplierName}>{order.supplier}</Text>
          <View style={styles.deliveryInfo}>
            <MapPin size={12} color="#64748B" />
            <Text style={styles.deliveryAddress}>{order.deliveryAddress}</Text>
          </View>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        {order.items.map((item: any, index: number) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemName}>{item.name} x{item.quantity}</Text>
            <Text style={styles.itemPrice}>₹{item.price}</Text>
          </View>
        ))}
      </View>

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>₹{order.total}</Text>
      </View>

      {order.status === 'out_for_delivery' && (
        <View style={styles.deliverySection}>
          <View style={styles.deliveryPersonInfo}>
            <Truck size={16} color="#2563EB" />
            <Text style={styles.deliveryPersonName}>{order.deliveryPerson}</Text>
            <TouchableOpacity style={styles.callButton}>
              <Phone size={14} color="#2563EB" />
            </TouchableOpacity>
          </View>
          <Text style={styles.estimatedDelivery}>Estimated delivery: {order.estimatedDelivery}</Text>
        </View>
      )}

      <View style={styles.trackingContainer}>
        <Text style={styles.trackingTitle}>Order Tracking</Text>
        <View style={styles.trackingSteps}>
          {order.trackingSteps.map((step: any, index: number) => (
            <View key={index} style={styles.trackingStep}>
              <View style={styles.trackingStepLeft}>
                <View style={[
                  styles.trackingDot,
                  step.completed && styles.trackingDotCompleted
                ]} />
                {index < order.trackingSteps.length - 1 && (
                  <View style={[
                    styles.trackingLine,
                    step.completed && styles.trackingLineCompleted
                  ]} />
                )}
              </View>
              <View style={styles.trackingStepContent}>
                <Text style={[
                  styles.trackingStepText,
                  step.completed && styles.trackingStepTextCompleted
                ]}>
                  {step.step}
                </Text>
                {step.time && (
                  <Text style={styles.trackingStepTime}>{step.time}</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.orderActions}>
        <TouchableOpacity style={styles.trackButton}>
          <MapPin size={16} color="#2563EB" />
          <Text style={styles.trackButtonText}>Track Live</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportButton}>
          <Phone size={16} color="#64748B" />
          <Text style={styles.supportButtonText}>Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCompletedOrder = (order: any) => (
    <TouchableOpacity key={order.id} style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>{order.orderNumber}</Text>
          <Text style={styles.orderTime}>{order.orderTime}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
          <CheckCircle size={14} color={getStatusColor(order.status)} />
          <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
            {order.statusText}
          </Text>
        </View>
      </View>

      <View style={styles.supplierInfo}>
        <Image source={{ uri: order.supplierImage }} style={styles.supplierImage} />
        <View style={styles.supplierDetails}>
          <Text style={styles.supplierName}>{order.supplier}</Text>
          <Text style={styles.deliveryTime}>{order.deliveryTime}</Text>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        {order.items.map((item: any, index: number) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemName}>{item.name} x{item.quantity}</Text>
            <Text style={styles.itemPrice}>₹{item.price}</Text>
          </View>
        ))}
      </View>

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>₹{order.total}</Text>
      </View>

      <View style={styles.completedOrderActions}>
        <View style={styles.ratingContainer}>
          <Star size={14} color="#F59E0B" />
          <Text style={styles.ratingText}>{order.rating}</Text>
        </View>
        <TouchableOpacity style={styles.reorderButton}>
          <RotateCcw size={14} color="#2563EB" />
          <Text style={styles.reorderButtonText}>Reorder</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText
            ]}>
              {tab.label}
            </Text>
            {tab.count > 0 && (
              <View style={styles.tabBadge}>
                <Text style={styles.tabBadgeText}>{tab.count}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Orders List */}
      <ScrollView style={styles.ordersList} showsVerticalScrollIndicator={false}>
        {activeTab === 'active' && activeOrders.map(renderActiveOrder)}
        {activeTab === 'completed' && completedOrders.map(renderCompletedOrder)}
        {activeTab === 'cancelled' && (
          <View style={styles.emptyState}>
            <Package size={48} color="#94A3B8" />
            <Text style={styles.emptyStateText}>No cancelled orders</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#F1F5F9',
  },
  activeTab: {
    backgroundColor: '#2563EB',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  tabBadge: {
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  tabBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
  },
  ordersList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  orderCard: {
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  orderTime: {
    fontSize: 12,
    color: '#64748B',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  supplierInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  supplierImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  supplierDetails: {
    flex: 1,
  },
  supplierName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 2,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryAddress: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  deliveryTime: {
    fontSize: 12,
    color: '#64748B',
  },
  itemsContainer: {
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  itemName: {
    fontSize: 14,
    color: '#1E293B',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
  },
  deliverySection: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  deliveryPersonInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  deliveryPersonName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
    marginLeft: 8,
    flex: 1,
  },
  callButton: {
    padding: 4,
  },
  estimatedDelivery: {
    fontSize: 12,
    color: '#64748B',
  },
  trackingContainer: {
    marginBottom: 12,
  },
  trackingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  trackingSteps: {
    paddingLeft: 8,
  },
  trackingStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  trackingStepLeft: {
    alignItems: 'center',
    marginRight: 12,
  },
  trackingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
  },
  trackingDotCompleted: {
    backgroundColor: '#2563EB',
  },
  trackingLine: {
    width: 2,
    height: 20,
    backgroundColor: '#E2E8F0',
    marginTop: 4,
  },
  trackingLineCompleted: {
    backgroundColor: '#2563EB',
  },
  trackingStepContent: {
    flex: 1,
    paddingBottom: 16,
  },
  trackingStepText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  trackingStepTextCompleted: {
    color: '#1E293B',
    fontWeight: '500',
  },
  trackingStepTime: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
    marginRight: 8,
  },
  trackButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2563EB',
    marginLeft: 4,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
    marginLeft: 8,
  },
  supportButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
    marginLeft: 4,
  },
  completedOrderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  reorderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  reorderButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2563EB',
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#94A3B8',
    marginTop: 12,
  },
});