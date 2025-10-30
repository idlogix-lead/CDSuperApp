import { Alert, Platform } from 'react-native';
import { GooglePay } from 'react-native-google-pay';

// Configure Google Pay
export const configureGooglePay = () => {
  if (Platform.OS !== 'android') return;
  
  try {
    GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST); // Use ENVIRONMENT_PRODUCTION for live
  } catch (error) {
    console.log('Google Pay configuration failed:', error);
  }
};

// Check if Google Pay is available
export const checkGooglePayAvailability = async () => {
  if (Platform.OS !== 'android') return false;

  try {
    const allowedCardNetworks = ['VISA', 'MASTERCARD', 'AMEX'];
    const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];
    
    // Try different method signatures
    try {
      const isReady = await GooglePay.isReadyToPay(
        allowedCardNetworks,
        allowedCardAuthMethods
      );
      return isReady;
    } catch (err) {
      console.log('2-argument call failed:', err.message);
    }

    try {
      const isReady = await GooglePay.isReadyToPay(
        allowedCardNetworks,
        allowedCardAuthMethods,
        2,  // apiVersion
        0   // apiVersionMinor
      );
      return isReady;
    } catch (err) {
      console.log('4-argument call failed:', err.message);
    }

    return false;
  } catch (error) {
    console.log('Google Pay not available:', error);
    return false;
  }
};

// Create payment data request
const getPaymentDataRequest = (amount, currency, merchantName = 'Your Store Name') => {
  const allowedCardNetworks = ['VISA', 'MASTERCARD', 'AMEX'];
  const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];
  
  return {
    cardPaymentMethod: {
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        gateway: 'example',
        gatewayMerchantId: 'your-gateway-merchant-id',
        parameters: {
          gateway: 'stripe',
          'stripe:version': '2018-11-08',
          'stripe:publishableKey': 'pk_test_your_publishable_key',
        },
      },
      allowedCardNetworks,
      allowedCardAuthMethods,
    },
    transaction: {
      totalPrice: amount.toString(),
      totalPriceStatus: 'FINAL',
      currencyCode: currency,
    },
    merchantName: merchantName,
  };
};

// Process payment with backend (replace with your actual API call)
export const processPaymentWithBackend = async (paymentToken, amount, currency) => {
  // Replace this with your actual backend API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (paymentToken) {
        resolve({
          success: true,
          transactionId: 'TXN_' + Date.now(),
          amount: amount,
          currency: currency,
        });
      } else {
        reject(new Error('Invalid payment token'));
      }
    }, 2000);
  });
};

// Main payment function
export const processGooglePayPayment = async (amount, currency = 'USD', callbacks = {}) => {
  const { onSuccess, onError } = callbacks;

  // Platform check
  if (Platform.OS !== 'android') {
    const error = new Error('Google Pay is only available on Android devices.');
    if (onError) onError(error);
    throw error;
  }

  // Availability check
  const isAvailable = await checkGooglePayAvailability();
  if (!isAvailable) {
    const error = new Error('Google Pay is not available on this device.');
    if (onError) onError(error);
    throw error;
  }

  // Amount validation
  if (!amount || amount <= 0) {
    const error = new Error('Please enter a valid payment amount.');
    if (onError) onError(error);
    throw error;
  }

  try {
    // Create payment request
    const paymentDataRequest = getPaymentDataRequest(amount, currency);
    
    // Request payment from Google Pay
    const paymentData = await GooglePay.requestPayment(paymentDataRequest);
    
    // Extract payment token
    const paymentToken = paymentData.paymentMethodData.tokenizationData.token;
    
    // Process payment with backend
    const backendResult = await processPaymentWithBackend(paymentToken, amount, currency);
    
    // Prepare success result
    const result = {
      success: true,
      transactionId: backendResult.transactionId,
      message: 'Payment successful',
      paymentToken: paymentToken,
      amount: amount,
      currency: currency,
    };
    
    // Call success callback
    if (onSuccess) {
      onSuccess(result);
    }
    
    return result;
    
  } catch (error) {
    console.log('Payment error:', error);
    
    // Enhanced error handling
    let errorMessage = 'Payment failed. Please try again.';
    
    if (error.message.includes('canceled')) {
      errorMessage = 'Payment was canceled.';
    } else if (error.message.includes('not available')) {
      errorMessage = 'Google Pay is not available.';
    } else if (error.message.includes('network')) {
      errorMessage = 'Network error. Please check your connection.';
    }
    
    const enhancedError = new Error(errorMessage);
    enhancedError.originalError = error;
    
    // Call error callback
    if (onError) {
      onError(enhancedError);
    }
    
    throw enhancedError;
  }
};

// Utility function to initialize Google Pay
export const initializeGooglePay = async () => {
  configureGooglePay();
  return await checkGooglePayAvailability();
};

// Export for use in components
export default {
  configureGooglePay,
  checkGooglePayAvailability,
  processGooglePayPayment,
  initializeGooglePay,
};