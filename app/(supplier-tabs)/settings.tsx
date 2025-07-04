import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  User, 
  Store, 
  Bell, 
  CreditCard, 
  Shield, 
  HelpCircle, 
  Settings as SettingsIcon,
  LogOut,
  ChevronRight,
  Clock,
  Package,
  DollarSign,
  MapPin
} from 'lucide-react-native';

export default function SupplierSettingsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState({
    newOrders: true,
    orderUpdates: true,
    payments: true,
    marketing: false,
  });

  const [businessSettings, setBusinessSettings] = useState({
    autoAcceptOrders: false,
    instantDelivery: true,
    bulkOrdersOnly: false,
  });

  const supplierInfo = {
    businessName: 'AquaPure Solutions',
    ownerName: 'Rajesh Kumar',
    email: 'rajesh@aquapure.com',
    phone: '+91 9876543210',
    address: 'HSR Layout, Bangalore',
    rating: 4.8,
    totalOrders: 1250,
    joinedDate: 'January 2023'
  };

  const menuSections = [
    {
      title: 'Business Management',
      items: [
        {
          id: 'business_profile',
          icon: <Store size={20} color="#2563EB" />,
          title: 'Business Profile',
          subtitle: 'Update business information',
          action: () => console.log('Navigate to business profile'),
        },
        {
          id: 'inventory',
          icon: <Package size={20} color="#2563EB" />,
          title: 'Inventory Management',
          subtitle: 'Manage stock and pricing',
          action: () => console.log('Navigate to inventory'),
        },
        {
          id: 'delivery_zones',
          icon: <MapPin size={20} color="#2563EB" />,
          title: 'Delivery Zones',
          subtitle: 'Set delivery areas and charges',
          action: () => console.log('Navigate to delivery zones'),
        },
        {
          id: 'operating_hours',
          icon: <Clock size={20} color="#2563EB" />,
          title: 'Operating Hours',
          subtitle: 'Set business hours',
          action: () => console.log('Navigate to operating hours'),
        },
      ]
    },
    {
      title: 'Financial',
      items: [
        {
          id: 'payments',
          icon: <CreditCard size={20} color="#2563EB" />,
          title: 'Payment Settings',
          subtitle: 'Bank details and payment methods',
          action: () => console.log('Navigate to payments'),
        },
        {
          id: 'pricing',
          icon: <DollarSign size={20} color="#2563EB" />,
          title: 'Pricing & Offers',
          subtitle: 'Set prices and create offers',
          action: () => console.log('Navigate to pricing'),
        },
      ]
    },
    {
      title: 'Account & Support',
      items: [
        {
          id: 'account',
          icon: <User size={20} color="#2563EB" />,
          title: 'Account Settings',
          subtitle: 'Personal information and security',
          action: () => console.log('Navigate to account'),
        },
        {
          id: 'privacy',
          icon: <Shield size={20} color="#2563EB" />,
          title: 'Privacy & Security',
          subtitle: 'Data and security settings',
          action: () => console.log('Navigate to privacy'),
        },
        {
          id: 'help',
          icon: <HelpCircle size={20} color="#2563EB" />,
          title: 'Help & Support',
          subtitle: 'FAQs and customer service',
          action: () => console.log('Navigate to help'),
        },
      ]
    }
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => router.replace('/(auth)/welcome')
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Business Info Card */}
      <View style={styles.businessCard}>
        <View style={styles.businessHeader}>
          <View style={styles.businessIcon}>
            <Store size={24} color="#2563EB" />
          </View>
          <View style={styles.businessInfo}>
            <Text style={styles.businessName}>{supplierInfo.businessName}</Text>
            <Text style={styles.ownerName}>{supplierInfo.ownerName}</Text>
            <Text style={styles.businessEmail}>{supplierInfo.email}</Text>
          </View>
        </View>
        
        <View style={styles.businessStats}>
          <View style={styles.businessStat}>
            <Text style={styles.statNumber}>{supplierInfo.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.businessStat}>
            <Text style={styles.statNumber}>{supplierInfo.totalOrders}</Text>
            <Text style={styles.statLabel}>Total Orders</Text>
          </View>
          <View style={styles.businessStat}>
            <Text style={styles.statNumber}>2+</Text>
            <Text style={styles.statLabel}>Years Active</Text>
          </View>
        </View>
      </View>

      {/* Notification Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Preferences</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Bell size={20} color="#2563EB" />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>New Orders</Text>
              <Text style={styles.settingSubtitle}>Get notified of new orders</Text>
            </View>
          </View>
          <Switch
            value={notifications.newOrders}
            onValueChange={(value) => setNotifications(prev => ({ ...prev, newOrders: value }))}
            trackColor={{ false: '#E2E8F0', true: '#2563EB' }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Package size={20} color="#2563EB" />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Order Updates</Text>
              <Text style={styles.settingSubtitle}>Status changes and delivery updates</Text>
            </View>
          </View>
          <Switch
            value={notifications.orderUpdates}
            onValueChange={(value) => setNotifications(prev => ({ ...prev, orderUpdates: value }))}
            trackColor={{ false: '#E2E8F0', true: '#2563EB' }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <DollarSign size={20} color="#2563EB" />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Payment Notifications</Text>
              <Text style={styles.settingSubtitle}>Payment confirmations and settlements</Text>
            </View>
          </View>
          <Switch
            value={notifications.payments}
            onValueChange={(value) => setNotifications(prev => ({ ...prev, payments: value }))}
            trackColor={{ false: '#E2E8F0', true: '#2563EB' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      {/* Business Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Business Settings</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <SettingsIcon size={20} color="#2563EB" />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Auto Accept Orders</Text>
              <Text style={styles.settingSubtitle}>Automatically accept new orders</Text>
            </View>
          </View>
          <Switch
            value={businessSettings.autoAcceptOrders}
            onValueChange={(value) => setBusinessSettings(prev => ({ ...prev, autoAcceptOrders: value }))}
            trackColor={{ false: '#E2E8F0', true: '#2563EB' }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Clock size={20} color="#2563EB" />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Instant Delivery</Text>
              <Text style={styles.settingSubtitle}>Offer same-day delivery service</Text>
            </View>
          </View>
          <Switch
            value={businessSettings.instantDelivery}
            onValueChange={(value) => setBusinessSettings(prev => ({ ...prev, instantDelivery: value }))}
            trackColor={{ false: '#E2E8F0', true: '#2563EB' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      {/* Menu Sections */}
      {menuSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>{section.title}</Text>
          <View style={styles.menuContainer}>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  itemIndex === section.items.length - 1 && styles.menuItemLast
                ]}
                onPress={item.action}
              >
                <View style={styles.menuIcon}>
                  {item.icon}
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <ChevronRight size={20} color="#94A3B8" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={20} color="#DC2626" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* App Version */}
      <View style={styles.appVersion}>
        <Text style={styles.versionText}>AquaLink Supplier v1.0.0</Text>
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
  businessCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 24,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  businessHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  businessIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EBF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  businessInfo: {
    flex: 1,
  },
  businessName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  ownerName: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 2,
  },
  businessEmail: {
    fontSize: 12,
    color: '#94A3B8',
  },
  businessStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  businessStat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 24,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  menuSection: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  menuSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 24,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#DC2626',
    marginLeft: 8,
  },
  appVersion: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 24,
  },
  versionText: {
    fontSize: 12,
    color: '#94A3B8',
  },
});