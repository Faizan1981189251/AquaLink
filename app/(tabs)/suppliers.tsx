import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Shield, 
  Clock,
  Zap,
  ChevronRight
} from 'lucide-react-native';

export default function SuppliersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'certified', label: 'Certified' },
    { id: 'nearby', label: 'Nearby' },
    { id: 'fastest', label: 'Fastest' },
    { id: 'cheapest', label: 'Cheapest' },
  ];

  const suppliers = [
    {
      id: 1,
      name: 'AquaPure Solutions',
      distance: '0.8 km',
      rating: 4.8,
      reviews: 1250,
      deliveryTime: '15-30 min',
      image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      certified: true,
      price: '₹25/jar',
      tags: ['Premium Quality', 'Fast Delivery'],
      availability: 'Available'
    },
    {
      id: 2,
      name: 'Crystal Water Co.',
      distance: '1.2 km',
      rating: 4.6,
      reviews: 890,
      deliveryTime: '20-35 min',
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      certified: true,
      price: '₹22/jar',
      tags: ['Eco-Friendly', 'Bulk Orders'],
      availability: 'Available'
    },
    {
      id: 3,
      name: 'Pure Drop Waters',
      distance: '1.5 km',
      rating: 4.7,
      reviews: 654,
      deliveryTime: '25-40 min',
      image: 'https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      certified: false,
      price: '₹20/jar',
      tags: ['Budget Friendly', 'Local Supplier'],
      availability: 'Available'
    },
    {
      id: 4,
      name: 'Himalayan Springs',
      distance: '2.1 km',
      rating: 4.9,
      reviews: 2100,
      deliveryTime: '30-45 min',
      image: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      certified: true,
      price: '₹30/jar',
      tags: ['Natural Spring', 'Premium'],
      availability: 'Available'
    },
    {
      id: 5,
      name: 'Fresh Flow Water',
      distance: '2.8 km',
      rating: 4.5,
      reviews: 432,
      deliveryTime: '35-50 min',
      image: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      certified: false,
      price: '₹18/jar',
      tags: ['Affordable', 'RO Purified'],
      availability: 'Busy'
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Water Suppliers</Text>
        <View style={styles.searchContainer}>
          <Search size={20} color="#64748B" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search suppliers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#64748B"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#2563EB" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterChip,
              selectedFilter === filter.id && styles.filterChipActive
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter.id && styles.filterTextActive
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>{suppliers.length} suppliers found</Text>
        <TouchableOpacity style={styles.mapButton}>
          <MapPin size={16} color="#2563EB" />
          <Text style={styles.mapButtonText}>Map View</Text>
        </TouchableOpacity>
      </View>

      {/* Suppliers List */}
      <ScrollView style={styles.suppliersList} showsVerticalScrollIndicator={false}>
        {suppliers.map((supplier) => (
          <TouchableOpacity key={supplier.id} style={styles.supplierCard}>
            <Image source={{ uri: supplier.image }} style={styles.supplierImage} />
            
            <View style={styles.supplierInfo}>
              <View style={styles.supplierHeader}>
                <View style={styles.supplierTitleRow}>
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
                    <Text style={styles.reviews}>({supplier.reviews})</Text>
                  </View>
                  <View style={styles.distanceContainer}>
                    <MapPin size={12} color="#64748B" />
                    <Text style={styles.distance}>{supplier.distance}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.supplierTags}>
                {supplier.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.supplierFooter}>
                <View style={styles.deliveryInfo}>
                  <Clock size={14} color="#64748B" />
                  <Text style={styles.deliveryTime}>{supplier.deliveryTime}</Text>
                  <View style={[
                    styles.availabilityBadge,
                    supplier.availability === 'Available' 
                      ? styles.availableStatus 
                      : styles.busyStatus
                  ]}>
                    <Text style={[
                      styles.availabilityText,
                      supplier.availability === 'Available' 
                        ? styles.availableText 
                        : styles.busyText
                    ]}>
                      {supplier.availability}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.priceRow}>
                  <Text style={styles.price}>{supplier.price}</Text>
                  <TouchableOpacity style={styles.orderButton}>
                    <Text style={styles.orderButtonText}>Order</Text>
                    <Zap size={14} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <ChevronRight size={20} color="#94A3B8" />
          </TouchableOpacity>
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
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  filtersContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    marginRight: 12,
  },
  filterChipActive: {
    backgroundColor: '#2563EB',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  resultsText: {
    fontSize: 14,
    color: '#64748B',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#EBF4FF',
  },
  mapButtonText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '500',
    marginLeft: 4,
  },
  suppliersList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  supplierCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    marginBottom: 12,
  },
  supplierTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
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
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  rating: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  reviews: {
    fontSize: 12,
    color: '#94A3B8',
    marginLeft: 2,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  supplierTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
  supplierFooter: {
    gap: 8,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryTime: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
    marginRight: 12,
  },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  availableStatus: {
    backgroundColor: '#ECFDF5',
  },
  busyStatus: {
    backgroundColor: '#FEF2F2',
  },
  availabilityText: {
    fontSize: 10,
    fontWeight: '500',
  },
  availableText: {
    color: '#059669',
  },
  busyText: {
    color: '#DC2626',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
  },
  orderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
});