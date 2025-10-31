import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { ApplePayButton } from '@stripe/stripe-react-native';
// Alternative: import { PaymentRequest } from 'react-native-payments';

const ApplePayComponent = ({ 
  amount, 
  currency = 'USD', 
  merchantIdentifier = 'merchant.com.yourcompany.app',
  merchantName = 'Your Store',
  onSuccess, 
  onError 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      checkApplePayAvailability();
    }
  }, []);

  // Check if Apple Pay is available on the device
  const checkApplePayAvailability = async () => {
    try {
      // Using Stripe's Apple Pay (recommended method)
      // You'll need to install: npm install @stripe/stripe-react-native
      
      // For this example, we'll simulate the check
      // In production, use actual Apple Pay availability check
      if (Platform.OS === 'ios' && Platform.Version >= 11) {
        setIsAvailable(true);
        console.log('Apple Pay is available');
      } else {
        setIsAvailable(false);
      }
    } catch (error) {
      console.log('Apple Pay not available:', error);
      setIsAvailable(false);
    }
  };

  // Create payment request
  const createPaymentRequest = () => {
    return {
      merchantIdentifier: merchantIdentifier,
      supportedNetworks: ['visa', 'mastercard', 'amex', 'discover'],
      countryCode: 'US',
      currencyCode: currency,
      paymentSummaryItems: [
        {
          label: merchantName,
          amount: amount.toString(),
          type: 'final',
        },
      ],
      merchantCapabilities: ['3DS', 'debit', 'credit'],
      shippingType: 'delivery', // or 'shipping', 'servicePickup', 'storePickup'
    };
  };

  // Handle Apple Pay payment
  const handleApplePayPress = async () => {
    if (Platform.OS !== 'ios') {
      Alert.alert(
        'Platform Not Supported',
        'Apple Pay is only available on iOS devices.'
      );
      return;
    }

    if (!isAvailable) {
      Alert.alert(
        'Apple Pay Not Available',
        'Apple Pay is not set up on this device. Please add a card to Wallet and try again.'
      );
      return;
    }

    if (!amount || amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid payment amount.');
      return;
    }

    setIsLoading(true);

    try {
      // Create payment request
      const paymentRequest = createPaymentRequest();
      
      console.log('Payment request:', paymentRequest);

      // In a real implementation, you would:
      // 1. Present Apple Pay sheet using the payment request
      // 2. Get the payment token from Apple Pay
      // 3. Send the token to your backend for processing
      
      // Simulating Apple Pay flow
      await simulateApplePayFlow(paymentRequest);

      // Show success message
      Alert.alert(
        'Payment Successful',
        `Your payment of ${currency} ${amount} was processed successfully!`,
        [{ text: 'OK' }]
      );

      // Call success callback
      if (onSuccess) {
        onSuccess({
          success: true,
          transactionId: 'APPLE_TXN_' + Date.now(),
          amount: amount,
          currency: currency,
        });
      }

    } catch (error) {
      console.log('Apple Pay error:', error);

      let errorMessage = 'Payment failed. Please try again.';

      if (error.message.includes('cancel')) {
        errorMessage = 'Payment was canceled.';
      } else if (error.message.includes('not available')) {
        errorMessage = 'Apple Pay is not available.';
      } else if (error.message.includes('network')) {
        errorMessage = 'Network error. Please check your connection.';
      }

      Alert.alert('Payment Failed', errorMessage);

      // Call error callback
      if (onError) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate Apple Pay flow (replace with actual implementation)
  const simulateApplePayFlow = async (paymentRequest) => {
    return new Promise((resolve, reject) => {
      // Simulate Apple Pay processing delay
      setTimeout(() => {
        // Simulate successful payment
        const paymentToken = {
          paymentData: 'simulated_token_' + Date.now(),
          transactionIdentifier: 'TXN_' + Date.now(),
          paymentMethod: {
            displayName: 'Visa •••• 1234',
            network: 'Visa',
            type: 'credit',
          },
        };

        console.log('Payment token received:', paymentToken);
        
        // In production, send this token to your backend
        resolve(paymentToken);
      }, 1500);
    });
  };

  // Process payment token with backend
  const processPaymentWithBackend = async (paymentToken) => {
    try {
      // Send the payment token to your backend
      const response = await fetch('https://your-backend.com/api/process-apple-pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentToken: paymentToken,
          amount: amount,
          currency: currency,
        }),
      });

      const result = await response.json();

      if (result.success) {
        return result;
      } else {
        throw new Error(result.message || 'Payment processing failed');
      }
    } catch (error) {
      throw new Error('Backend processing failed: ' + error.message);
    }
  };

  // Only show on iOS
  if (Platform.OS !== 'ios') {
    return (
      <View style={styles.unavailableContainer}>
        <Text style={styles.unavailableText}>
          Apple Pay is only available on iOS
        </Text>
      </View>
    );
  }

  // If Apple Pay is not available
  if (!isAvailable) {
    return (
      <View style={styles.unavailableContainer}>
        <Text style={styles.unavailableText}>
          Apple Pay is not available on this device
        </Text>
        <Text style={styles.unavailableSubtext}>
          Please add a card to Apple Wallet
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Standard Apple Pay Button */}
      <TouchableOpacity
        style={[styles.applePayButton, isLoading && styles.buttonDisabled]}
        onPress={handleApplePayPress}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <View style={styles.buttonContent}>
            <View style={styles.applePayLogo}>
              <Text style={styles.appleIcon}></Text>
              <Text style={styles.applePayText}>Pay</Text>
            </View>
            <Text style={styles.amountText}>
              {currency} {amount}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Payment info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Secure payment with Apple Pay
        </Text>
      </View>

      {/* Touch ID / Face ID indicator */}
      <View style={styles.biometricContainer}>
        <Text style={styles.biometricText}>
          🔒 Authenticate with Touch ID or Face ID
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  applePayButton: {
    backgroundColor: '#000000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  applePayLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appleIcon: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  applePayText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  amountText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 6,
    opacity: 0.9,
    fontWeight: '500',
  },
  unavailableContainer: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    alignItems: 'center',
  },
  unavailableText: {
    color: '#666666',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
  unavailableSubtext: {
    color: '#999999',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  infoContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  infoText: {
    color: '#666666',
    fontSize: 12,
    textAlign: 'center',
  },
  biometricContainer: {
    marginTop: 12,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  biometricText: {
    color: '#999999',
    fontSize: 11,
    textAlign: 'center',
  },
});

export default ApplePayComponent;

