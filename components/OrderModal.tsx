import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, TextInput } from 'react-native';
import { X, Plus, Minus, Home, Building, PartyPopper, MapPin } from 'lucide-react-native';

interface OrderModalProps {
  visible: boolean;
  onClose: () => void;
  supplier: {
    name: string;
    price: string;
    deliveryTime: string;
  };
}

export default function OrderModal({ visible, onClose, supplier }: OrderModalProps) {
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [selectedUsage, setSelectedUsage] = useState('home');
  const [deliveryAddress, setDeliveryAddress] = useState('123 Main Street, Bangalore');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const products = [
    {
      id: '20l_jar',
      name: '20L Water Jar',
      price: 50,
      unit: 'jar',
      description: 'Perfect for home and office use',
      minOrder: 1,
      maxOrder: 10
    },
    {
      id: '1l_bottle',
      name: '1L Water Bottle',
      price: 10,
      unit: 'bottle',
      description: 'Ideal for daily consumption',
      minOrder: 6,
      maxOrder: 48
    },
    {
      id: '500ml_bottle',
      name: '500ml Water Bottle',
      price: 4,
      unit: 'bottle',
      description: 'Perfect for on-the-go',
      minOrder: 12,
      maxOrder: 96
    }
  ];

  const usageOptions = [
    { id: 'home', label: 'Home Use', icon: <Home size={20} color="#059669" />, color: '#059669' },
    { id: 'office', label: 'Office Use', icon: <Building size={20} color="#2563EB" />, color: '#2563EB' },
    { id: 'party', label: 'Party/Event', icon: <PartyPopper size={20} color="#7C3AED" />, color: '#7C3AED' },
  ];

  const updateQuantity = (productId: string, change: number) => {
    setSelectedProducts(prev => {
      const existing = prev.find(p => p.id === productId);
      const product = products.find(p => p.id === productId);
      
      if (!product) return prev;
      
      if (!existing && change > 0) {
        return [...prev, { ...product, quantity: Math.max(product.minOrder, change) }];
      }
      
      if (existing) {
        const newQuantity = existing.quantity + change;
        if (newQuantity <= 0) {
          return prev.filter(p => p.id !== productId);
        }
        
        const clampedQuantity = Math.min(Math.max(newQuantity, product.minOrder), product.maxOrder);
        return prev.map(p => p.id === productId ? { ...p, quantity: clampedQuantity } : p);
      }
      
      return prev;
    });
  };

  const getProductQuantity = (productId: string) => {
    return selectedProducts.find(p => p.id === productId)?.quantity || 0;
  };

  const getTotalAmount = () => {
    return selectedProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
  };

  const handlePlaceOrder = () => {
    // Handle order placement logic here
    console.log('Order placed:', {
      products: selectedProducts,
      usage: selectedUsage,
      address: deliveryAddress,
      instructions: specialInstructions,
      total: getTotalAmount()
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Place Order</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#64748B" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Supplier Info */}
          <View style={styles.supplierInfo}>
            <Text style={styles.supplierName}>{supplier.name}</Text>
            <Text style={styles.supplierDetails}>
              {supplier.price} • {supplier.deliveryTime}
            </Text>
          </View>

          {/* Usage Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What's this order for?</Text>
            <View style={styles.usageOptions}>
              {usageOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.usageOption,
                    selectedUsage === option.id && styles.usageOptionActive,
                    { borderColor: selectedUsage === option.id ? option.color : '#E2E8F0' }
                  ]}
                  onPress={() => setSelectedUsage(option.id)}
                >
                  {option.icon}
                  <Text style={[
                    styles.usageOptionText,
                    selectedUsage === option.id && { color: option.color }
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Product Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Products</Text>
            {products.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productDescription}>{product.description}</Text>
                  <Text style={styles.productPrice}>₹{product.price} per {product.unit}</Text>
                  <Text style={styles.productMinOrder}>
                    Min order: {product.minOrder} {product.unit}s
                  </Text>
                </View>
                
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(product.id, -1)}
                  >
                    <Minus size={16} color="#64748B" />
                  </TouchableOpacity>
                  
                  <Text style={styles.quantityText}>
                    {getProductQuantity(product.id)}
                  </Text>
                  
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(product.id, 1)}
                  >
                    <Plus size={16} color="#64748B" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Delivery Address */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <View style={styles.addressContainer}>
              <MapPin size={16} color="#64748B" />
              <TextInput
                style={styles.addressInput}
                value={deliveryAddress}
                onChangeText={setDeliveryAddress}
                placeholder="Enter delivery address"
                multiline
              />
            </View>
          </View>

          {/* Special Instructions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Special Instructions (Optional)</Text>
            <TextInput
              style={styles.instructionsInput}
              value={specialInstructions}
              onChangeText={setSpecialInstructions}
              placeholder="Any special delivery instructions..."
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Order Summary */}
          {selectedProducts.length > 0 && (
            <View style={styles.orderSummary}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              {selectedProducts.map((product) => (
                <View key={product.id} style={styles.summaryItem}>
                  <Text style={styles.summaryItemName}>
                    {product.name} x{product.quantity}
                  </Text>
                  <Text style={styles.summaryItemPrice}>
                    ₹{product.price * product.quantity}
                  </Text>
                </View>
              ))}
              <View style={styles.summaryTotal}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalAmount}>₹{getTotalAmount()}</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.placeOrderButton,
              selectedProducts.length === 0 && styles.placeOrderButtonDisabled
            ]}
            onPress={handlePlaceOrder}
            disabled={selectedProducts.length === 0}
          >
            <Text style={styles.placeOrderButtonText}>
              Place Order • ₹{getTotalAmount()}
            </Text>
          </TouchableOpacity>
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
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  supplierInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  supplierName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  supplierDetails: {
    fontSize: 12,
    color: '#64748B',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  usageOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  usageOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  usageOptionActive: {
    backgroundColor: '#F8FAFC',
  },
  usageOptionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
    marginLeft: 8,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 2,
  },
  productMinOrder: {
    fontSize: 10,
    color: '#94A3B8',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginHorizontal: 16,
    minWidth: 24,
    textAlign: 'center',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addressInput: {
    flex: 1,
    fontSize: 14,
    color: '#1E293B',
    marginLeft: 12,
    textAlignVertical: 'top',
  },
  instructionsInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#1E293B',
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderSummary: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryItemName: {
    fontSize: 14,
    color: '#64748B',
  },
  summaryItemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
  },
  summaryTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#059669',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  placeOrderButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  placeOrderButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  placeOrderButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});