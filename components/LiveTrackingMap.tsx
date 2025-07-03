import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { X, Navigation, Phone, MessageCircle, RefreshCw } from 'lucide-react-native';
import { LocationCoords, calculateDistance, calculateETA } from '@/lib/location';

interface LiveTrackingMapProps {
  visible: boolean;
  onClose: () => void;
  order: {
    id: string;
    deliveryPerson: {
      name: string;
      phone: string;
      location: LocationCoords;
    };
    customerLocation: LocationCoords;
    estimatedDelivery: string;
  };
}

export default function LiveTrackingMap({ visible, onClose, order }: LiveTrackingMapProps) {
  const [deliveryLocation, setDeliveryLocation] = useState<LocationCoords>(order.deliveryPerson.location);
  const [eta, setEta] = useState(order.estimatedDelivery);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate real-time location updates
  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      // Simulate delivery person moving towards customer
      setDeliveryLocation(prev => {
        const newLat = prev.latitude + (Math.random() - 0.5) * 0.001;
        const newLng = prev.longitude + (Math.random() - 0.5) * 0.001;
        
        const distance = calculateDistance(
          newLat,
          newLng,
          order.customerLocation.latitude,
          order.customerLocation.longitude
        );
        
        const newEta = calculateETA(distance);
        setEta(`${newEta} mins`);
        
        return { latitude: newLat, longitude: newLng };
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [visible, order.customerLocation]);

  const refreshLocation = async () => {
    setIsRefreshing(true);
    
    // Simulate API call to get latest location
    setTimeout(() => {
      setIsRefreshing(false);
      Alert.alert('Location Updated', 'Delivery person location has been refreshed.');
    }, 1000);
  };

  const callDeliveryPerson = () => {
    Alert.alert(
      'Call Delivery Person',
      `Call ${order.deliveryPerson.name} at ${order.deliveryPerson.phone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => console.log('Calling...') }
      ]
    );
  };

  const chatWithDeliveryPerson = () => {
    Alert.alert(
      'Chat',
      `Start a chat with ${order.deliveryPerson.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Chat', onPress: () => console.log('Opening chat...') }
      ]
    );
  };

  const region = {
    latitude: (deliveryLocation.latitude + order.customerLocation.latitude) / 2,
    longitude: (deliveryLocation.longitude + order.customerLocation.longitude) / 2,
    latitudeDelta: Math.abs(deliveryLocation.latitude - order.customerLocation.latitude) * 2 + 0.01,
    longitudeDelta: Math.abs(deliveryLocation.longitude - order.customerLocation.longitude) * 2 + 0.01,
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>Live Tracking</Text>
            <Text style={styles.headerSubtitle}>Order #{order.id}</Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Map */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={region}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={false}
            showsMyLocationButton={false}
            showsTraffic={true}
          >
            {/* Delivery Person Marker */}
            <Marker
              coordinate={deliveryLocation}
              title={order.deliveryPerson.name}
              description="Delivery Person"
              pinColor="#2563EB"
            />
            
            {/* Customer Location Marker */}
            <Marker
              coordinate={order.customerLocation}
              title="Your Location"
              description="Delivery Address"
              pinColor="#059669"
            />
            
            {/* Route Line */}
            <Polyline
              coordinates={[deliveryLocation, order.customerLocation]}
              strokeColor="#2563EB"
              strokeWidth={3}
              lineDashPattern={[5, 5]}
            />
          </MapView>

          {/* Refresh Button */}
          <TouchableOpacity
            style={[styles.refreshButton, isRefreshing && styles.refreshButtonActive]}
            onPress={refreshLocation}
            disabled={isRefreshing}
          >
            <RefreshCw size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Delivery Info */}
        <View style={styles.deliveryInfo}>
          <View style={styles.etaContainer}>
            <Navigation size={24} color="#059669" />
            <View style={styles.etaText}>
              <Text style={styles.etaTime}>ETA: {eta}</Text>
              <Text style={styles.etaLabel}>Estimated arrival time</Text>
            </View>
          </View>

          <View style={styles.deliveryPersonInfo}>
            <View style={styles.deliveryPersonDetails}>
              <Text style={styles.deliveryPersonName}>{order.deliveryPerson.name}</Text>
              <Text style={styles.deliveryPersonStatus}>On the way to you</Text>
            </View>
            
            <View style={styles.deliveryPersonActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={callDeliveryPerson}
              >
                <Phone size={20} color="#2563EB" />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={chatWithDeliveryPerson}
              >
                <MessageCircle size={20} color="#2563EB" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Status Updates */}
          <View style={styles.statusUpdates}>
            <Text style={styles.statusTitle}>Delivery Updates</Text>
            <View style={styles.statusList}>
              <View style={styles.statusItem}>
                <View style={[styles.statusDot, styles.statusDotCompleted]} />
                <Text style={styles.statusText}>Order confirmed</Text>
                <Text style={styles.statusTime}>2:30 PM</Text>
              </View>
              <View style={styles.statusItem}>
                <View style={[styles.statusDot, styles.statusDotCompleted]} />
                <Text style={styles.statusText}>Order prepared</Text>
                <Text style={styles.statusTime}>2:45 PM</Text>
              </View>
              <View style={styles.statusItem}>
                <View style={[styles.statusDot, styles.statusDotActive]} />
                <Text style={styles.statusText}>Out for delivery</Text>
                <Text style={styles.statusTime}>3:15 PM</Text>
              </View>
              <View style={styles.statusItem}>
                <View style={styles.statusDot} />
                <Text style={[styles.statusText, styles.statusTextPending]}>Delivered</Text>
                <Text style={styles.statusTime}>-</Text>
              </View>
            </View>
          </View>
        </View>
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
    paddingBottom: 16,
    backgroundColor: '#2563EB',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  refreshButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  refreshButtonActive: {
    backgroundColor: '#1D4ED8',
  },
  deliveryInfo: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  etaText: {
    marginLeft: 12,
    flex: 1,
  },
  etaTime: {
    fontSize: 18,
    fontWeight: '700',
    color: '#059669',
    marginBottom: 2,
  },
  etaLabel: {
    fontSize: 12,
    color: '#16A34A',
  },
  deliveryPersonInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    marginBottom: 20,
  },
  deliveryPersonDetails: {
    flex: 1,
  },
  deliveryPersonName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  deliveryPersonStatus: {
    fontSize: 12,
    color: '#64748B',
  },
  deliveryPersonActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EBF4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusUpdates: {
    marginTop: 8,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  statusList: {
    gap: 12,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E2E8F0',
    marginRight: 12,
  },
  statusDotCompleted: {
    backgroundColor: '#059669',
  },
  statusDotActive: {
    backgroundColor: '#2563EB',
  },
  statusText: {
    fontSize: 14,
    color: '#1E293B',
    flex: 1,
  },
  statusTextPending: {
    color: '#94A3B8',
  },
  statusTime: {
    fontSize: 12,
    color: '#64748B',
  },
});