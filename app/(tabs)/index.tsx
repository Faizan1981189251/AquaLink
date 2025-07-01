import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
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
  Truck
} from 'lucide-react-native';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const quickActions = [
    { id: 1, title: 'Quick Order', icon: <Zap size={24} color="#FFFFFF" />, color: '#2563EB' },
    { id: 2, title: 'Schedule', icon: <Clock size={24} color="#FFFFFF" />, color: '#059669' },
    { id: 3, title: 'Track Order', icon: <Truck size={24} color="#FFFFFF" />, color: '#DC2626' },
    { id: 4, title: 'Eco Points', icon: <Recycle size={24} color="#FFFFFF" />, color: '#7C3AED' },
  ];

  const nearbySuppliers = [
    {
      id: 1,
      name: 'AquaPure Solutions',
      distance: '0.8 km',
      rating: 4.8,
      deliveryTime: '15-30 min',
      image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      certified: true,
      price: '₹25/jar'
    },
    {
      id: 2,
      name: 'Crystal Water Co.',
      distance: '1.2 km',
      rating: 4.6,
      deliveryTime: '20-35 min',
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      certified: true,
      price: '₹22/jar'
    },
    {
      id: 3,
      name: 'Pure Drop Waters',
      distance: '1.5 km',
      rating: 4.7,
      deliveryTime: '25-40 min',
      image: 'https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      certified: false,
      price: '₹20/jar'
    },
  ];

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
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#FFFFFF" />
          </TouchableOpacity>
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
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.quickActionCard, { backgroundColor: action.color }]}
            >
              <View style={styles.quickActionIcon}>
                {action.icon}
              </View>
              <Text style={styles.quickActionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Nearby Suppliers */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Suppliers</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {nearbySuppliers.map((supplier) => (
          <TouchableOpacity key={supplier.id} style={styles.supplierCard}>
            <Image source={{ uri: supplier.image }} style={styles.supplierImage} />
            <View style={styles.supplierInfo}>
              <View style={styles.supplierHeader}>
                <Text style={styles.supplierName}>{supplier.name}</Text>
                {supplier.certified && (
                  <View style={styles.certifiedBadge}>
                    <Shield size={12} color="#059669" />
                  </View>
                )}
              </View>
              
              <View style={styles.supplierMeta}>
                <View style={styles.ratingContainer}>
                  <Star size={12} color="#F59E0B" />
                  <Text style={styles.rating}>{supplier.rating}</Text>
                </View>
                <Text style={styles.distance}>{supplier.distance}</Text>
                <Text style={styles.deliveryTime}>{supplier.deliveryTime}</Text>
              </View>
              
              <View style={styles.supplierFooter}>
                <Text style={styles.price}>{supplier.price}</Text>
                <TouchableOpacity style={styles.orderButton}>
                  <Text style={styles.orderButtonText}>Order Now</Text>
                </TouchableOpacity>
              </View>
            </View>
            <ChevronRight size={20} color="#94A3B8" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Eco Stats */}
      <View style={styles.section}>
        <View style={styles.ecoCard}>
          <View style={styles.ecoHeader}>
            <Recycle size={24} color="#059669" />
            <Text style={styles.ecoTitle}>Your Eco Impact</Text>
          </View>
          <View style={styles.ecoStats}>
            <View style={styles.ecoStat}>
              <Text style={styles.ecoNumber}>12</Text>
              <Text style={styles.ecoLabel}>Jars Returned</Text>
            </View>
            <View style={styles.ecoStat}>
              <Text style={styles.ecoNumber}>240</Text>
              <Text style={styles.ecoLabel}>Points Earned</Text>
            </View>
            <View style={styles.ecoStat}>
              <Text style={styles.ecoNumber}>₹60</Text>
              <Text style={styles.ecoLabel}>Savings</Text>
            </View>
          </View>
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
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
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
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  quickActionCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  quickActionIcon: {
    marginBottom: 8,
  },
  quickActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  supplierCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  supplierImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  supplierInfo: {
    flex: 1,
  },
  supplierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  supplierName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
  },
  certifiedBadge: {
    marginLeft: 8,
  },
  supplierMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  rating: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  distance: {
    fontSize: 12,
    color: '#64748B',
    marginRight: 12,
  },
  deliveryTime: {
    fontSize: 12,
    color: '#64748B',
  },
  supplierFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  orderButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
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
});