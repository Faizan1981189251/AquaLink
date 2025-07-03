import { Platform } from 'react-native';

// Razorpay configuration
const RAZORPAY_KEY_ID = process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID;

export interface PaymentOptions {
  amount: number; // in paise (₹1 = 100 paise)
  currency: string;
  orderId: string;
  description: string;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  orderId?: string;
  signature?: string;
  error?: string;
}

// Initialize Razorpay payment
export const initiateRazorpayPayment = async (options: PaymentOptions): Promise<PaymentResult> => {
  try {
    if (Platform.OS === 'web') {
      // Web implementation using Razorpay Checkout
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          const rzp = new (window as any).Razorpay({
            key: RAZORPAY_KEY_ID,
            amount: options.amount,
            currency: options.currency,
            name: 'AquaLink',
            description: options.description,
            order_id: options.orderId,
            prefill: {
              name: options.customerName,
              email: options.customerEmail,
              contact: options.customerPhone,
            },
            theme: {
              color: '#2563EB',
            },
            handler: (response: any) => {
              resolve({
                success: true,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
              });
            },
            modal: {
              ondismiss: () => {
                resolve({
                  success: false,
                  error: 'Payment cancelled by user',
                });
              },
            },
          });
          rzp.open();
        };
        document.head.appendChild(script);
      });
    } else {
      // For React Native, you would use react-native-razorpay
      // This is a placeholder implementation
      console.log('Razorpay payment for mobile not implemented in this demo');
      return {
        success: false,
        error: 'Mobile payment not implemented in demo',
      };
    }
  } catch (error) {
    console.error('Payment error:', error);
    return {
      success: false,
      error: 'Payment failed',
    };
  }
};

// Create Razorpay order on server
export const createRazorpayOrder = async (amount: number, currency: string = 'INR') => {
  try {
    // This would typically be a call to your backend API
    // For demo purposes, we'll simulate an order creation
    const orderId = `order_${Date.now()}`;
    
    return {
      id: orderId,
      amount,
      currency,
      status: 'created',
    };
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Verify payment signature (should be done on server)
export const verifyPaymentSignature = async (
  paymentId: string,
  orderId: string,
  signature: string
) => {
  try {
    // This should be implemented on your backend for security
    // For demo purposes, we'll return true
    console.log('Payment verification:', { paymentId, orderId, signature });
    return true;
  } catch (error) {
    console.error('Error verifying payment:', error);
    return false;
  }
};

// Payment methods
export const PAYMENT_METHODS = {
  CARD: 'card',
  UPI: 'upi',
  NETBANKING: 'netbanking',
  WALLET: 'wallet',
  COD: 'cod',
} as const;

export type PaymentMethod = typeof PAYMENT_METHODS[keyof typeof PAYMENT_METHODS];