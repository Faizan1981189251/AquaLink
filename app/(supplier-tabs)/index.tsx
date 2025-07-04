import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DollarSign, Package, TrendingUp, Users, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Calendar, Eye, Bell, Zap, Navigation, MessageCircle } from 'lucide-react-native';

export default function SupplierDashboardScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const periods = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
  ];

  const todayStats = {
    totalOrders: 32,
    totalEarnings: 2450,
    pendingOrders: 5,
    completedOrders: 27,
    avgOrderValue: 77,
    newCustomers: 8,
    expressOrders: 18,
    avgDeliveryTime: '9 mins'
  };

  const liveOrders = [
    {
      id: '#AQ001240',
      customer: 'Rajesh Kumar',
      items: '2x 20L Jars',
      amount: 100,
      status: 'out_for_delivery',
      time: '5 mins ago',
      address: 'HSR Layout, Bangalore',
      deliveryPerson: 'Amit Singh',
      estimatedDelivery: '3 mins',
      expressOrder: true,
      customerPhone: '+91 9876543210'
    },
    {
      id: '#AQ001241',
      customer: 'Priya Sharma',
      items: '24x 1L Bottles',
      amount: 240,
      status: 'preparing',
      time: '8 mins ago',
      address: 'Koramangala, Bangalore',
      expressOrder: false,
      customerPhone: '+91 9876543211'
    },
    {
      id: '#AQ001242',
      customer: 'Amit Patel',
      items: '1x 20L Jar',
      amount: 50,
      status: 'pending',
      time: '2 mins ago',
      address: 'Whitefield, Bangalore',
      expressOrder: true,
      customerPhone: '+91 9876543212'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#F59E0B';
      case 'preparing':
        return '#2563EB';
      case 'out_for_delivery':
        return '#059669';
      case 'delivered':
        return '#059669';
      default:
        return '#64748B';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={14} color="#F59E0B" />;
      case 'preparing':
        return <Package size={14} color="#2563EB" />;
      case 'out_for_delivery':
        return <Navigation size={14} color="#059669" />;
      case 'delivered':
        return <CheckCircle size={14} color="#059669" />;
      default:
        return <AlertCircle size={14} color="#64748B" />;
    }
  };

  const handleAcceptOrder = (orderId: string) => {
    Alert.alert(
      'Accept Order',
      `Accept order ${orderId}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Accept', onPress: () => Alert.alert('Order Accepted!', 'Order has been accepted and is now being prepared.') }
      ]
    );
  };

  const handleAutoAssignDelivery = (orderId: string) => {
    Alert.alert(
      'Auto-Assign Delivery',
      'Automatically assign nearest delivery person?',
      [
        { text: 'Manual Assign', style: 'cancel' },
        { text: 'Auto-Assign', onPress: () => Alert.alert('Delivery Assigned!', 'Nearest delivery person has been automatically assigned.') }
      ]
    );
  };

  const handleContactCustomer = (phone: string) => {
    Alert.alert(
      'Contact Customer',
      `Call customer at ${phone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => Alert.alert('Calling...', phone) }
      ]
    );
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
            <Text style={styles.supplierName}>AquaPure Solutions</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#FFFFFF" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>5</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.quickStats}>
          <View style={styles.quickStat}>
            <Text style={styles.quickStatNumber}>₹{todayStats.totalEarnings}</Text>
            <Text style={styles.quickStatLabel}>Today's Earnings</Text>
          </View>
          <View style={styles.quickStat}>
            <Text style={styles.quickStatNumber}>{todayStats.totalOrders}</Text>
            <Text style={styles.quickStatLabel}>Total Orders</Text>
          </View>
          <View style={styles.quickStat}>
            <Text style={styles.quickStatNumber}>{todayStats.avgDeliveryTime}</Text>
            <Text style={styles.quickStatLabel}>Avg Delivery</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Period Selector */}
      <View style={styles.periodSelector}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period.id}
            style={[
              styles.periodButton,
              selectedPeriod === period.id && styles.periodButtonActive
            ]}
            onPress={() => setSelectedPeriod(period.id)}
          >
            <Text style={[
              styles.periodText,
              selectedPeriod === period.id && styles.periodTextActive
            ]}>
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Enhanced Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <DollarSign size={24} color="#059669" />
          </View>
          <Text style={styles.statNumber}>₹{todayStats.totalEarnings}</Text>
          <Text style={styles.statLabel}>Total Earnings</Text>
          <Text style={styles.statChange}>+18% from yesterday</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Package size={24} color="#2563EB" />
          </View>
          <Text style={styles.statNumber}>{todayStats.totalOrders}</Text>
          <Text style={styles.statLabel}>Total Orders</Text>
          <Text style={styles.statChange}>+12% from yesterday</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Zap size={24} color="#DC2626" />
          </View>
          <Text style={styles.statNumber}>{todayStats.expressOrders}</Text>
          <Text style={styles.statLabel}>Express Orders</Text>
          <Text style={styles.statChange}>10-min delivery</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Users size={24} color="#7C3AED" />
          </View>
          <Text style={styles.statNumber}>{todayStats.newCustomers}</Text>
          <Text style={styles.statLabel}>New Customers</Text>
          <Text style={styles.statChange}>+3 from yesterday</Text>
        </View>
      </View>

      {/* Live Order Management */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Live Order Management</Text>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>

        {liveOrders.map((order) => (
          <View key={order.id} style={styles.liveOrderCard}>
            <View style={styles.orderHeader}>
              <View style={styles.orderInfo}>
                <View style={styles.orderTitleRow}>
                  <Text style={styles.orderNumber}>{order.id}</Text>
                  {order.expressOrder && (
                    <View style={styles.expressOrderBadge}>
                      <Zap size={10} color="#FFFFFF" />
                      <Text style={styles.expressOrderText}>EXPRESS</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.customerName}>{order.customer}</Text>
                <Text style={styles.orderTime}>{order.time}</Text>
              </View>
              <View style={styles.orderAmount}>
                <Text style={styles.amountText}>₹{order.amount}</Text>
                <View style={[styles.orderStatus, { backgroundColor: getStatusColor(order.status) + '20' }]}>
                  {getStatusIcon(order.status)}
                  <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                    {order.status.replace('_', ' ').toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.orderDetails}>
              <Text style={styles.orderItems}>{order.items}</Text>
              <Text style={styles.orderAddress}>{order.address}</Text>
            </View>

            {order.status === 'out_for_delivery' && (
              <View style={styles.deliveryInfo}>
                <Text style={styles.deliveryPersonText}>
                  Delivery: {order.deliveryPerson} • ETA: {order.estimatedDelivery}
                </Text>
              </View>
            )}

            <View style={styles.orderActions}>
              {order.status === 'pending' && (
                <>
                  <TouchableOpacity 
                    style={styles.acceptButton}
                    onPress={() => handleAcceptOrder(order.id)}
                  >
                    <CheckCircle size={14} color="#FFFFFF" />
                    <Text style={styles.acceptButtonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.autoAssignButton}
                    onPress={() => handleAutoAssignDelivery(order.id)}
                  >
                    <Navigation size={14} color="#2563EB" />
                    <Text style={styles.autoAssignButtonText}>Auto-Assign</Text>
                  </TouchableOpacity>
                </>
              )}
              
              {order.status === 'preparing' && (
                <TouchableOpacity 
                  style={styles.readyButton}
                  onPress={() => Alert.alert('Mark Ready', 'Mark order as ready for delivery?')}
                >
                  <Package size={14} color="#FFFFFF" />
                  <Text style={styles.readyButtonText}>Mark Ready</Text>
                </TouchableOpacity>
              )}

              {order.status === 'out_for_delivery' && (
                <TouchableOpacity 
                  style={styles.trackButton}
                  onPress={() => Alert.alert('Live Tracking', 'View live delivery tracking')}
                >
                  <Navigation size={14} color="#FFFFFF" />
                  <Text style={styles.trackButtonText}>Live Track</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity 
                style={styles.contactButton}
                onPress={() => handleContactCustomer(order.customerPhone)}
              >
                <MessageCircle size={14} color="#64748B" />
                <Text style={styles.contactButtonText}>Contact</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Order Status Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Performance</Text>
        <View style={styles.orderStatusGrid}>
          <View style={styles.orderStatusCard}>
            <View style={[styles.orderStatusIcon, { backgroundColor: '#FEF3C7' }]}>
              <Clock size={20} color="#F59E0B" />
            </View>
            <Text style={styles.orderStatusNumber}>{todayStats.pendingOrders}</Text>
            <Text style={styles.orderStatusLabel}>Pending</Text>
          </View>

          <View style={styles.orderStatusCard}>
            <View style={[styles.orderStatusIcon, { backgroundColor: '#DBEAFE' }]}>
              <Package size={20} color="#2563EB" />
            </View>
            <Text style={styles.orderStatusNumber}>8</Text>
            <Text style={styles.orderStatusLabel}>Preparing</Text>
          </View>

          <View style={styles.orderStatusCard}>
            <View style={[styles.orderStatusIcon, { backgroundColor: '#D1FAE5' }]}>
              <Navigation size={20} color="#059669" />
            </View>
            <Text style={styles.orderStatusNumber}>12</Text>
            <Text style={styles.orderStatusLabel}>Out for Delivery</Text>
          </View>

          <View style={styles.orderStatusCard}>
            <View style={[styles.orderStatusIcon, { backgroundColor: '#D1FAE5' }]}>
              <CheckCircle size={20} color="#059669" />
            </View>
            <Text style={styles.orderStatusNumber}>{todayStats.completedOrders}</Text>
            <Text style={styles.orderStatusLabel}>Completed</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Calendar size={20} color="#2563EB" />
            <Text style={styles.actionButtonText}>Manage Inventory</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <TrendingUp size={20} color="#2563EB" />
            <Text style={styles.actionButtonText}>View Analytics</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  supplierName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
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
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickStat: {
    flex: 1,
    alignItems: 'center',
  },
  quickStatNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 20,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  periodButtonActive: {
    backgroundColor: '#2563EB',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  periodTextActive: {
    color: '#FFFFFF',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    marginTop: 20,
    gap: 12,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  statChange: {
    fontSize: 10,
    color: '#059669',
    fontWeight: '500',
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
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DC2626',
    marginRight: 6,
  },
  liveText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
  },
  liveOrderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  orderInfo: {
    flex: 1,
  },
  orderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginRight: 8,
  },
  expressOrderBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC2626',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  expressOrderText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700',
    marginLeft: 2,
  },
  customerName: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 2,
  },
  orderTime: {
    fontSize: 10,
    color: '#94A3B8',
  },
  orderAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
    marginBottom: 4,
  },
  orderStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '600',
    marginLeft: 4,
  },
  orderDetails: {
    marginBottom: 8,
  },
  orderItems: {
    fontSize: 12,
    color: '#1E293B',
    marginBottom: 4,
  },
  orderAddress: {
    fontSize: 11,
    color: '#64748B',
  },
  deliveryInfo: {
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  deliveryPersonText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '500',
  },
  orderActions: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  acceptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  acceptButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
    marginLeft: 4,
  },
  autoAssignButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  autoAssignButtonText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '500',
    marginLeft: 4,
  },
  readyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  readyButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
    marginLeft: 4,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  trackButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
    marginLeft: 4,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  contactButtonText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginLeft: 4,
  },
  orderStatusGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  orderStatusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderStatusIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderStatusNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  orderStatusLabel: {
    fontSize: 10,
    color: '#64748B',
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '500',
    marginLeft: 8,
  },
});