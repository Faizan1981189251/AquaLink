import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DollarSign, Package, TrendingUp, Users, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Calendar, Eye, Bell } from 'lucide-react-native';

export default function SupplierDashboardScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const periods = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
  ];

  const todayStats = {
    totalOrders: 24,
    totalEarnings: 1850,
    pendingOrders: 3,
    completedOrders: 21,
    avgOrderValue: 77,
    newCustomers: 5
  };

  const recentOrders = [
    {
      id: '#AQ001240',
      customer: 'Rajesh Kumar',
      items: '2x 20L Jars',
      amount: 100,
      status: 'pending',
      time: '10 mins ago',
      address: 'HSR Layout, Bangalore'
    },
    {
      id: '#AQ001239',
      customer: 'Priya Sharma',
      items: '1x 20L Jar',
      amount: 50,
      status: 'completed',
      time: '25 mins ago',
      address: 'Koramangala, Bangalore'
    },
    {
      id: '#AQ001238',
      customer: 'Amit Patel',
      items: '3x 20L Jars',
      amount: 150,
      status: 'in_progress',
      time: '45 mins ago',
      address: 'Whitefield, Bangalore'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#F59E0B';
      case 'in_progress':
        return '#2563EB';
      case 'completed':
        return '#059669';
      default:
        return '#64748B';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={14} color="#F59E0B" />;
      case 'in_progress':
        return <Package size={14} color="#2563EB" />;
      case 'completed':
        return <CheckCircle size={14} color="#059669" />;
      default:
        return <AlertCircle size={14} color="#64748B" />;
    }
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
              <Text style={styles.notificationCount}>3</Text>
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

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <DollarSign size={24} color="#059669" />
          </View>
          <Text style={styles.statNumber}>₹{todayStats.totalEarnings}</Text>
          <Text style={styles.statLabel}>Total Earnings</Text>
          <Text style={styles.statChange}>+12% from yesterday</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Package size={24} color="#2563EB" />
          </View>
          <Text style={styles.statNumber}>{todayStats.totalOrders}</Text>
          <Text style={styles.statLabel}>Total Orders</Text>
          <Text style={styles.statChange}>+8% from yesterday</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <TrendingUp size={24} color="#7C3AED" />
          </View>
          <Text style={styles.statNumber}>₹{todayStats.avgOrderValue}</Text>
          <Text style={styles.statLabel}>Avg Order Value</Text>
          <Text style={styles.statChange}>+5% from yesterday</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Users size={24} color="#DC2626" />
          </View>
          <Text style={styles.statNumber}>{todayStats.newCustomers}</Text>
          <Text style={styles.statLabel}>New Customers</Text>
          <Text style={styles.statChange}>+2 from yesterday</Text>
        </View>
      </View>

      {/* Order Status Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Status Overview</Text>
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
            <Text style={styles.orderStatusNumber}>5</Text>
            <Text style={styles.orderStatusLabel}>In Progress</Text>
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

      {/* Recent Orders */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {recentOrders.map((order) => (
          <TouchableOpacity key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderNumber}>{order.id}</Text>
                <Text style={styles.customerName}>{order.customer}</Text>
              </View>
              <View style={styles.orderAmount}>
                <Text style={styles.amountText}>₹{order.amount}</Text>
                <Text style={styles.orderTime}>{order.time}</Text>
              </View>
            </View>

            <View style={styles.orderDetails}>
              <Text style={styles.orderItems}>{order.items}</Text>
              <Text style={styles.orderAddress}>{order.address}</Text>
            </View>

            <View style={styles.orderFooter}>
              <View style={styles.orderStatus}>
                {getStatusIcon(order.status)}
                <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                  {order.status.replace('_', ' ').toUpperCase()}
                </Text>
              </View>
              <TouchableOpacity style={styles.viewButton}>
                <Eye size={16} color="#2563EB" />
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Calendar size={20} color="#2563EB" />
            <Text style={styles.actionButtonText}>Schedule Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Package size={20} color="#2563EB" />
            <Text style={styles.actionButtonText}>Update Inventory</Text>
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
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
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
  viewAllText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
  orderStatusGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  orderStatusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
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
  orderStatusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderStatusNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  orderStatusLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  orderNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  customerName: {
    fontSize: 12,
    color: '#64748B',
  },
  orderAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
    marginBottom: 2,
  },
  orderTime: {
    fontSize: 10,
    color: '#94A3B8',
  },
  orderDetails: {
    marginBottom: 12,
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
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  viewButtonText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '500',
    marginLeft: 4,
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