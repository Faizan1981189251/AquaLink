import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { X, Flashlight, FlashlightOff } from 'lucide-react-native';

interface BarcodeScannerProps {
  visible: boolean;
  onClose: () => void;
  onScanComplete: (productData: any) => void;
}

export default function BarcodeScanner({ visible, onClose, onScanComplete }: BarcodeScannerProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [flashOn, setFlashOn] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    
    // Process barcode data
    const productData = processBarcode(data);
    
    if (productData) {
      Alert.alert(
        'Product Found',
        `${productData.name} - ₹${productData.price}`,
        [
          { text: 'Cancel', onPress: () => setScanned(false) },
          { 
            text: 'Add to Cart', 
            onPress: () => {
              onScanComplete(productData);
              onClose();
            }
          }
        ]
      );
    } else {
      Alert.alert(
        'Product Not Found',
        'This product is not available for delivery.',
        [{ text: 'OK', onPress: () => setScanned(false) }]
      );
    }
  };

  const processBarcode = (barcode: string) => {
    // Mock product database for demo
    const products: { [key: string]: any } = {
      '8901030875236': {
        id: 'aquafina_1l',
        name: 'Aquafina 1L Bottle',
        price: 20,
        category: 'water',
        brand: 'Aquafina',
        size: '1L'
      },
      '8901030875243': {
        id: 'bisleri_20l',
        name: 'Bisleri 20L Jar',
        price: 60,
        category: 'water',
        brand: 'Bisleri',
        size: '20L'
      },
      '8901030875250': {
        id: 'kinley_500ml',
        name: 'Kinley 500ml Bottle',
        price: 10,
        category: 'water',
        brand: 'Kinley',
        size: '500ml'
      }
    };

    return products[barcode] || null;
  };

  if (hasPermission === null) {
    return (
      <Modal visible={visible} onRequestClose={onClose}>
        <View style={styles.permissionContainer}>
          <Text>Requesting camera permission...</Text>
        </View>
      </Modal>
    );
  }

  if (hasPermission === false) {
    return (
      <Modal visible={visible} onRequestClose={onClose}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>No access to camera</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Scan Product Barcode</Text>
          <TouchableOpacity style={styles.headerCloseButton} onPress={onClose}>
            <X size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Scanner */}
        <View style={styles.scannerContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.scanner}
            flashMode={flashOn ? 'torch' : 'off'}
          />
          
          {/* Overlay */}
          <View style={styles.overlay}>
            <View style={styles.scanArea}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            Position the barcode within the frame to scan
          </Text>
          
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.flashButton}
              onPress={() => setFlashOn(!flashOn)}
            >
              {flashOn ? (
                <FlashlightOff size={24} color="#FFFFFF" />
              ) : (
                <Flashlight size={24} color="#FFFFFF" />
              )}
              <Text style={styles.flashButtonText}>
                {flashOn ? 'Flash Off' : 'Flash On'}
              </Text>
            </TouchableOpacity>
            
            {scanned && (
              <TouchableOpacity
                style={styles.rescanButton}
                onPress={() => setScanned(false)}
              >
                <Text style={styles.rescanButtonText}>Tap to Scan Again</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 24,
  },
  permissionText: {
    fontSize: 16,
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 24,
  },
  closeButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerContainer: {
    flex: 1,
    position: 'relative',
  },
  scanner: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#FFFFFF',
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  instructions: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  instructionText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  flashButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  flashButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  rescanButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  rescanButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});