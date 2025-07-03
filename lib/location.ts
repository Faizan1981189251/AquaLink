import * as Location from 'expo-location';
import { Platform } from 'react-native';

export interface LocationCoords {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export interface LocationPermissionStatus {
  granted: boolean;
  canAskAgain: boolean;
}

// Request location permissions
export const requestLocationPermission = async (): Promise<LocationPermissionStatus> => {
  try {
    const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
    
    return {
      granted: status === 'granted',
      canAskAgain,
    };
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return {
      granted: false,
      canAskAgain: false,
    };
  }
};

// Get current location
export const getCurrentLocation = async (): Promise<LocationCoords | null> => {
  try {
    const permission = await requestLocationPermission();
    
    if (!permission.granted) {
      throw new Error('Location permission not granted');
    }
    
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
      timeInterval: 5000,
      distanceInterval: 10,
    });
    
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      accuracy: location.coords.accuracy,
    };
  } catch (error) {
    console.error('Error getting current location:', error);
    return null;
  }
};

// Watch location changes
export const watchLocation = async (
  callback: (location: LocationCoords) => void,
  errorCallback?: (error: string) => void
) => {
  try {
    const permission = await requestLocationPermission();
    
    if (!permission.granted) {
      errorCallback?.('Location permission not granted');
      return null;
    }
    
    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 10,
      },
      (location) => {
        callback({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          accuracy: location.coords.accuracy,
        });
      }
    );
    
    return subscription;
  } catch (error) {
    console.error('Error watching location:', error);
    errorCallback?.('Failed to watch location');
    return null;
  }
};

// Calculate distance between two points
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance;
};

// Calculate ETA based on distance and average speed
export const calculateETA = (distanceKm: number, averageSpeedKmh: number = 30): number => {
  const timeHours = distanceKm / averageSpeedKmh;
  const timeMinutes = Math.round(timeHours * 60);
  return Math.max(timeMinutes, 5); // Minimum 5 minutes
};

// Reverse geocoding - get address from coordinates
export const reverseGeocode = async (latitude: number, longitude: number): Promise<string | null> => {
  try {
    const result = await Location.reverseGeocodeAsync({ latitude, longitude });
    
    if (result.length > 0) {
      const address = result[0];
      const addressString = [
        address.name,
        address.street,
        address.city,
        address.region,
        address.postalCode,
      ].filter(Boolean).join(', ');
      
      return addressString;
    }
    
    return null;
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    return null;
  }
};

// Forward geocoding - get coordinates from address
export const forwardGeocode = async (address: string): Promise<LocationCoords | null> => {
  try {
    const result = await Location.geocodeAsync(address);
    
    if (result.length > 0) {
      return {
        latitude: result[0].latitude,
        longitude: result[0].longitude,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error forward geocoding:', error);
    return null;
  }
};