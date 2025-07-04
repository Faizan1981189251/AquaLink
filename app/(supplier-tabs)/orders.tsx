import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Search, Filter, Clock, CheckCircle, Package, MapPin, Phone, Eye, MoreVertical } from 'lucide-react-native';

export default function SupplierOrdersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Orders', count: 156 },
    { id: 'pending', label: 'Pending', count: 8 },
    { id: 'in_progress', label: 'In Progress', count: 12 },
    { id: 'completed', label: 'Completed', count: 136 },
  ];

  const orders = [
    {
      id: '#AQ001240',
      customer: 'Rajesh Kumar',
      phone: '+91 9876543210',
      items: [
        { name: '20L Water Jar', quantity: 2, price: 100 }
      ],
      total: 100,
      status: 'pending',
      orderTime: '10:30 AM',
      deliveryAddress: 'HSR Layout, Sector 2, Bangalore - 560102',
      paymentMethod: 'UPI',
      orderDate: 'Today',
      usage: 'Home'
    },
    {
      id: '#AQ001239',
      customer: 'Priya Sharma',
      phone: '+91 9876543211',
      items: [
        { name: '1L Bottle', quantity: 24, price: 240 }
      ],
      total: 240,
      status: 'in_progress',
      orderTime: '09:15 AM',
      deliveryAddress: 'Koramangala, 4th Block, Bangalore - 560034',
      paymentMethod: 'Cash on Delivery',
      orderDate: 'Today',
      usage: 'Party'
    },
    {
      id: '#AQ001238',
      customer: 'Amit Patel',
      phone: '+91 9876543212',
      items: [
        { name: '500ml Bottle', quantity: 48, price: 192 }
      ],
      total: 192,
      status: 'completed',
      orderTime: '08:45 AM',
      deliveryAddress: 'Whitefield, ITPL Main Road, Bangalore - 560066',
      paymentMethod: 'Card',
      orderDate: 'Today',
      usage: 'Office'
    },
    {
      id: '#AQ001237',
      customer: 'Sneha Reddy',
      phone: '+91 9876543213',
      items: [
        { name: '20L Water Jar', quantity: 1, price: 50 },
        { name: '1L Bottle', quantity: 12, price: 120 }
      ],
      total: 170,
      status: 'completed',
      orderTime: '07:30 AM',
      deliveryAddress: 'Indiranagar, 100 Feet Road, Bangalore - 560038',
      paymentMethod: 'UPI',
      orderDate: 'Today',
      usage: 'Home'
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
        return <Clock size={14} color="#64748B" />;
    }
  };

  const getUsageColor = (usage: string) => {
    switch (usage.toLowerCase()) {
      case 'home':
        return '#059669';
      case 'office':
        return '#2563EB';
      case 'party':
        return '#7C3AED';
      default:
        return '#64748B';
    }
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order Management</Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color="#64748B" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search orders..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#64748B"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#2563EB" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContent}
      >
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
            <View style={styles.tabBadge}>
              <Text style={styles.tabBadgeText}>{tab.count}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Orders List */}
      <ScrollView style={styles.ordersList} showsVerticalScrollIndicator={false}>
        {filteredOrders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderNumber}>{order.id}</Text>
                <Text style={styles.orderDate}>{order.orderDate} • {order.orderTime}</Text>
              </View>
              <View style={styles.orderActions}>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
                  {getStatusIcon(order.status)}
                  <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                    {order.status.replace('_', ' ').toUpperCase()}
                  </Text>
                </View>
                <TouchableOpacity style={styles.moreButton}>
                  <MoreVertical size={16} color="#64748B" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.customerInfo}>
              <View style={styles.customerDetails}>
                <Text style={styles.customerName}>{order.customer}</Text>
                <View style={styles.customerMeta}>
                  <Phone size={12} color="#64748B" />
                  <Text style={styles.customerPhone}>{order.phone}</Text>
                </View>
              </View>
              <View style={[styles.usageBadge, { backgroundColor: getUsageColor(order.usage) + '20' }]}>
                <Text style={[styles.usageText, { color: getUsageColor(order.usage) }]}>
                  {order.usage}
                </Text>
              </View>
            </View>

            <View style={styles.addressContainer}>
              <MapPin size={14} color="#64748B" />
              <Text style={styles.deliveryAddress}>{order.deliveryAddress}</Text>
            </View>

            <View style={styles.itemsContainer}>
              <Text style={styles.itemsTitle}>Items:</Text>
              {order.items.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <Text style={styles.itemName}>{item.name} x{item.quantity}</Text>
                  <Text style={styles.itemPrice}>₹{item.price}</Text>
                </View>
              ))}
            </View>

            <View style={styles.orderFooter}>
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentMethod}>{order.paymentMethod}</Text>
                <Text style={styles.totalAmount}>Total: ₹{order.total}</Text>
              </View>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.viewButton}>
                  <Eye size={14} color="#2563EB" />
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
                
                {order.status === 'pending' && (
                  <TouchableOpacity style={styles.acceptButton}>
                    <CheckCircle size={14} color="#FFFFFF" />
                    <Text style={styles.acceptButtonText}>Accept</Text>
                  </TouchableOpacity>
                )}
                
                {order.status === 'in_progress' && (
                  <TouchableOpacity style={styles.completeButton}>
                    <Package size={14} color="#FFFFFF" />
                    <Text style={styles.completeButtonText}>Complete</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ))}
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
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
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
  filterButton: {
    padding: 8,
  },
  tabsContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tabsContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
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
    marginRight: 8,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  tabBadge: {
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
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
    alignItems: 'flex-start',
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
  orderDate: {
    fontSize: 12,
    color: '#64748B',
  },
  orderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  moreButton: {
    padding: 4,
  },
  customerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  customerDetails: {
    flex: 1,
  },
  customerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  customerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerPhone: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  usageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  usageText: {
    fontSize: 10,
    fontWeight: '600',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  deliveryAddress: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 8,
    flex: 1,
    lineHeight: 16,
  },
  itemsContainer: {
    marginBottom: 12,
  },
  itemsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
  },
  itemName: {
    fontSize: 12,
    color: '#64748B',
  },
  itemPrice: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1E293B',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentMethod: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 2,
  },
  totalAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#059669',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
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
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  completeButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
    marginLeft: 4,
  },
});