import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useStripe, ApplePayButton, isApplePaySupported } from '@stripe/stripe-react-native';

const StripeApplePayComponent = ({
  amount,
  currency = 'USD',
  merchantName = 'Your Store',
  productDescription = 'Purchase',
  onSuccess,
  onError,
  clientSecret, // Get this from your backend
}) => {
  const { presentApplePay, confirmApplePayPayment } = useStripe();
  const [isLoading, setIsLoading] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    checkApplePaySupport();
  }, []);

  const checkApplePaySupport = async () => {
    if (Platform.OS !== 'ios') {
      setIsSupported(false);
      return;
    }

    try {
      const supported = await isApplePaySupported();
      setIsSupported(supported);
      console.log('Apple Pay supported:', supported);
    } catch (error) {
      console.log('Error checking Apple Pay support:', error);
      setIsSupported(false);
    }
  };

  const handleApplePayPress = async () => {
    if (!isSupported) {
      Alert.alert(
        'Apple Pay Not Available',
        'Apple Pay is not set up on this device. Please add a card to Wallet.'
      );
      return;
    }

    if (!amount || amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid payment amount.');
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Get payment intent from your backend
      const paymentIntentClientSecret = clientSecret || await fetchPaymentIntent();

      if (!paymentIntentClientSecret) {
        throw new Error('Failed to create payment intent');
      }

      // Step 2: Present Apple Pay sheet
      const { error: presentError, paymentMethod } = await presentApplePay({
        cartItems: [
          {
            label: productDescription,
            amount: amount.toFixed(2),
            type: 'final',
          },
        ],
        country: 'US',
        currency: currency,
        requiredShippingAddressFields: [], // Add fields if you need shipping info
        requiredBillingContactFields: [], // Add fields if you need billing info
      });

      if (presentError) {
        console.log('Present Apple Pay Error:', presentError);
        throw new Error(presentError.message);
      }

      // Step 3: Confirm the payment
      const { error: confirmError } = await confirmApplePayPayment(
        paymentIntentClientSecret
      );

      if (confirmError) {
        console.log('Confirm Apple Pay Error:', confirmError);
        throw new Error(confirmError.message);
      }

      // Step 4: Payment successful
      Alert.alert(
        'Payment Successful',
        `Your payment of ${currency} ${amount.toFixed(2)} was processed successfully!`
      );

      if (onSuccess) {
        onSuccess({
          success: true,
          paymentMethod: paymentMethod,
          amount: amount,
          currency: currency,
        });
      }

    } catch (error) {
      console.log('Apple Pay Error:', error);

      let errorMessage = 'Payment failed. Please try again.';

      if (error.message.includes('cancel')) {
        errorMessage = 'Payment was cancelled.';
      } else if (error.message.includes('not available')) {
        errorMessage = 'Apple Pay is not available.';
      } else {
        errorMessage = error.message || errorMessage;
      }

      Alert.alert('Payment Failed', errorMessage);

      if (onError) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch payment intent from your backend
  const fetchPaymentIntent = async () => {
    try {
      const response = await fetch('https://your-backend.com/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to cents
          currency: currency.toLowerCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create payment intent');
      }

      return data.clientSecret;
    } catch (error) {
      console.error('Error fetching payment intent:', error);
      throw error;
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

  // If Apple Pay is not supported
  if (!isSupported) {
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
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#000000" size="small" />
          <Text style={styles.loadingText}>Processing payment...</Text>
        </View>
      ) : (
        <>
          <ApplePayButton
            onPress={handleApplePayPress}
            type="plain" // or 'buy', 'setUp', 'inStore', 'donate'
            buttonStyle="black" // or 'white', 'whiteOutline'
            borderRadius={8}
            style={styles.applePayButton}
          />

          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>Amount to pay:</Text>
            <Text style={styles.amountValue}>
              {currency} {amount.toFixed(2)}
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              🔒 Secure payment with Apple Pay
            </Text>
            <Text style={styles.biometricText}>
              Authenticate with Touch ID or Face ID
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  applePayButton: {
    width: '100%',
    height: 60,
  },
  loadingContainer: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  loadingText: {
    marginTop: 10,
    color: '#666666',
    fontSize: 14,
  },
  amountContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#F9F9F9',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountLabel: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '500',
  },
  amountValue: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '700',
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
    marginTop: 12,
    alignItems: 'center',
  },
  infoText: {
    color: '#666666',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
  biometricText: {
    color: '#999999',
    fontSize: 11,
    textAlign: 'center',
  },
});

export default StripeApplePayComponent;