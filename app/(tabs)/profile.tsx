import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  User, 
  MapPin, 
  CreditCard, 
  Bell, 
  Shield, 
  HelpCircle, 
  Star, 
  Gift, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Droplets, 
  Recycle, 
  Edit,
  Calendar,
  TrendingUp,
  Clock,
  Package,
  Building,
  Zap,
  Bot,
  MessageCircle
} from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    memberSince: 'January 2024',
    totalOrders: 67,
    loyaltyPoints: 1840,
    ecoScore: 94,
    subscriptionActive: true,
    preferredSupplier: 'AquaPure Solutions'
  });

  const usageStats = [
    { label: 'This Month', value: '8 orders', icon: <Calendar size={16} color="#2563EB" /> },
    { label: 'Avg Delivery', value: '9 mins', icon: <Clock size={16} color="#059669" /> },
    { label: 'Favorite', value: '20L Jars', icon: <Package size={16} color="#7C3AED" /> },
    { label: 'Saved', value: '₹340', icon: <TrendingUp size={16} color="#F59E0B" /> },
  ];

  const quickActions = [
    {
      id: 'subscription',
      icon: <Calendar size={20} color="#2563EB" />,
      title: 'Manage Subscription',
      subtitle: 'Daily delivery active',
      action: () => Alert.alert('Subscription', 'Manage your daily water delivery subscription'),
      badge: 'ACTIVE'
    },
    {
      id: 'bulk_orders',
      icon: <Building size={20} color="#2563EB" />,
      title: 'Bulk Orders (Office)',
      subtitle: 'Corporate discounts available',
      action: () => Alert.alert('Bulk Orders', 'Setup bulk orders for your office'),
    },
    {
      id: 'usage_analytics',
      icon: <TrendingUp size={20} color="#2563EB" />,
      title: 'Usage Analytics',
      subtitle: 'Track your consumption patterns',
      action: () => Alert.alert('Analytics', 'View your water consumption analytics'),
    },
  ];

  const menuItems = [
    {
      id: 'addresses',
      icon: <MapPin size={20} color="#2563EB" />,
      title: 'My Addresses',
      subtitle: 'Manage delivery addresses',
      action: () => console.log('Navigate to addresses'),
    },
    {
      id: 'payments',
      icon: <CreditCard size={20} color="#2563EB" />,
      title: 'Payment Methods',
      subtitle: 'Cards, UPI, and wallets',
      action: () => console.log('Navigate to payments'),
    },
    {
      id: 'notifications',
      icon: <Bell size={20} color="#2563EB" />,
      title: 'Smart Notifications',
      subtitle: 'AI reminders and delivery alerts',
      action: () => console.log('Navigate to notifications'),
    },
    {
      id: 'loyalty',
      icon: <Gift size={20} color="#2563EB" />,
      title: 'Loyalty Program',
      subtitle: `${user.loyaltyPoints} points available`,
      action: () => console.log('Navigate to loyalty'),
    },
    {
      id: 'privacy',
      icon: <Shield size={20} color="#2563EB" />,
      title: 'Privacy & Security',
      subtitle: 'Account security settings',
      action: () => console.log('Navigate to privacy'),
    },
    {
      id: 'help',
      icon: <HelpCircle size={20} color="#2563EB" />,
      title: 'Help & Support',
      subtitle: '24/7 AI + human support',
      action: () => console.log('Navigate to help'),
    },
    {
      id: 'settings',
      icon: <Settings size={20} color="#2563EB" />,
      title: 'App Settings',
      subtitle: 'Voice search, notifications, theme',
      action: () => console.log('Navigate to settings'),
    },
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
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.editButton}>
            <Edit size={20} color="#2563EB" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
          <View style={styles.profileBadge}>
            <Droplets size={16} color="#FFFFFF" />
          </View>
        </View>
        
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
          <Text style={styles.profilePhone}>{user.phone}</Text>
          <View style={styles.membershipInfo}>
            <Text style={styles.memberSince}>Member since {user.memberSince}</Text>
            {user.subscriptionActive && (
              <View style={styles.subscriptionBadge}>
                <Zap size={12} color="#FFFFFF" />
                <Text style={styles.subscriptionBadgeText}>PREMIUM</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Usage Stats */}
      <View style={styles.statsContainer}>
        {usageStats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <View style={styles.statIcon}>
              {stat.icon}
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Main Stats */}
      <View style={styles.mainStatsContainer}>
        <View style={styles.mainStatCard}>
          <Text style={styles.mainStatNumber}>{user.totalOrders}</Text>
          <Text style={styles.mainStatLabel}>Total Orders</Text>
        </View>
        <View style={styles.mainStatCard}>
          <Text style={styles.mainStatNumber}>{user.loyaltyPoints}</Text>
          <Text style={styles.mainStatLabel}>Loyalty Points</Text>
        </View>
        <View style={styles.mainStatCard}>
          <View style={styles.ecoScoreContainer}>
            <Text style={styles.mainStatNumber}>{user.ecoScore}</Text>
            <Recycle size={16} color="#059669" />
          </View>
          <Text style={styles.mainStatLabel}>Eco Score</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={styles.quickActionCard}
            onPress={action.action}
          >
            <View style={styles.quickActionIcon}>
              {action.icon}
            </View>
            <View style={styles.quickActionContent}>
              <View style={styles.quickActionHeader}>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                {action.badge && (
                  <View style={styles.quickActionBadge}>
                    <Text style={styles.quickActionBadgeText}>{action.badge}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
            </View>
            <ChevronRight size={20} color="#94A3B8" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Achievement */}
      <View style={styles.achievementCard}>
        <View style={styles.achievementIcon}>
          <Star size={20} color="#F59E0B" />
        </View>
        <View style={styles.achievementContent}>
          <Text style={styles.achievementTitle}>Eco Champion</Text>
          <Text style={styles.achievementDescription}>
            You've returned 75+ empty jars this month! You're in the top 5% of eco-friendly users.
          </Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
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

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={20} color="#DC2626" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* App Version */}
      <View style={styles.appVersion}>
        <Text style={styles.versionText}>AquaLink v2.0.0 - AI Enhanced Edition</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBF4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 24,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 2,
  },
  profilePhone: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  membershipInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  memberSince: {
    fontSize: 12,
    color: '#94A3B8',
  },
  subscriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  subscriptionBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 24,
    gap: 8,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: '#64748B',
    textAlign: 'center',
  },
  mainStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 16,
  },
  mainStatCard: {
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
  mainStatNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  mainStatLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  ecoScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  quickActionsSection: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  quickActionCard: {
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
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    flex: 1,
  },
  quickActionBadge: {
    backgroundColor: '#059669',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  quickActionBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  achievementCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 24,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 24,
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