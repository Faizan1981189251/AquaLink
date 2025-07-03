import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot,
  serverTimestamp,
  GeoPoint
} from 'firebase/firestore';
import { db } from './firebase';

// User operations
export const createUser = async (userData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (userId: string, userData: any) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const getUser = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

// Supplier operations
export const createSupplier = async (supplierData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'suppliers'), {
      ...supplierData,
      location: new GeoPoint(supplierData.latitude, supplierData.longitude),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating supplier:', error);
    throw error;
  }
};

export const getNearbySuppliers = async (userLat: number, userLng: number, radiusKm: number = 10) => {
  try {
    // Note: For production, you'd want to use a more sophisticated geo-query
    // This is a simplified version
    const suppliersRef = collection(db, 'suppliers');
    const q = query(suppliersRef, where('isActive', '==', true));
    const querySnapshot = await getDocs(q);
    
    const suppliers: any[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const supplierLat = data.location.latitude;
      const supplierLng = data.location.longitude;
      
      // Calculate distance (simplified)
      const distance = calculateDistance(userLat, userLng, supplierLat, supplierLng);
      
      if (distance <= radiusKm) {
        suppliers.push({
          id: doc.id,
          ...data,
          distance: distance.toFixed(1)
        });
      }
    });
    
    return suppliers.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
  } catch (error) {
    console.error('Error getting nearby suppliers:', error);
    throw error;
  }
};

// Order operations
export const createOrder = async (orderData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId: string, status: string, additionalData?: any) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      status,
      ...additionalData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

export const getUserOrders = async (userId: string) => {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(
      ordersRef, 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const orders: any[] = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    
    return orders;
  } catch (error) {
    console.error('Error getting user orders:', error);
    throw error;
  }
};

export const getSupplierOrders = async (supplierId: string) => {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(
      ordersRef, 
      where('supplierId', '==', supplierId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const orders: any[] = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    
    return orders;
  } catch (error) {
    console.error('Error getting supplier orders:', error);
    throw error;
  }
};

// Real-time order tracking
export const subscribeToOrder = (orderId: string, callback: (order: any) => void) => {
  const orderRef = doc(db, 'orders', orderId);
  return onSnapshot(orderRef, (doc) => {
    if (doc.exists()) {
      callback({ id: doc.id, ...doc.data() });
    }
  });
};

// Subscription operations
export const createSubscription = async (subscriptionData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'subscriptions'), {
      ...subscriptionData,
      isActive: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

export const updateSubscription = async (subscriptionId: string, subscriptionData: any) => {
  try {
    const subscriptionRef = doc(db, 'subscriptions', subscriptionId);
    await updateDoc(subscriptionRef, {
      ...subscriptionData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
};

// Utility function to calculate distance between two points
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
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