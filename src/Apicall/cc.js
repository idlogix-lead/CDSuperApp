import React, { useState, useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Localhost API configuration
const LOCAL_API_URL = 'http://192.168.100.21:3000';

export default function CCAvenuePayment({ route, navigation }) {
  const { orderId = 1132387, amount = 500.0, currency = 'AED' } = route.params || {};
  
  const [html, setHtml] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [webViewLoading, setWebViewLoading] = useState(false);

  useEffect(() => {
    initializePayment();
  }, []);

  const initializePayment = async () => {
    console.log("🔄 Initializing CCAvenue Payment with Localhost API...");
    try {
      setLoading(true);
      setError(null);

      // Validate inputs
      if (!orderId || !amount || amount <= 0) {
        throw new Error('Invalid order details. Order ID and amount are required.');
      }

      const payload = {
        order_id: orderId.toString(),
        amount: parseFloat(amount),
        currency: currency,
        customer_name: 'Test Customer', // You can pass this from route.params if needed
        customer_email: 'test@example.com' // You can pass this from route.params if needed
      };

      console.log("📤 Sending payload to localhost API:", payload);

      // Use localhost API instead of the instance
      const response = await fetch(`${LOCAL_API_URL}/generate-ccavenue-payload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("📥 Localhost API Response:", responseData);

      if (responseData.status === 'success' && responseData.encRequest) {
        const encRequest = responseData.encRequest;
        const merchant_id = responseData.data?.merchant_id || "45990";
        const access_code = responseData.data?.access_code || "AVUQ03GK18BR25QURB";
        const redirect_url = responseData.data?.redirect_url || "http://localhost:3000/payment-success";
        const cancel_url = responseData.data?.cancel_url || "http://localhost:3000/payment-cancel";

        if (!encRequest) {
          throw new Error('Payment request hash not received from server');
        }

        console.log("✅ Payment parameters received from localhost API");

        // Use test URL for local development
        const isTestMode = false; // Set to false for production
        const ccAvenueUrl = isTestMode 
          ? "https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"
          : "https://secure.ccavenue.ae/transaction/transaction.do?command=initiateTransaction";

        const webHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  display: flex; 
                  justify-content: center; 
                  align-items: center; 
                  height: 100vh; 
                  margin: 0; 
                  background: #f5f5f5;
                }
                .container { 
                  text-align: center; 
                  padding: 20px;
                }
                .loading {
                  font-size: 18px;
                  color: #333;
                  margin-bottom: 20px;
                }
                .info {
                  font-size: 14px;
                  color: #666;
                  margin-top: 10px;
                }
              </style>
            </head>
            <body onload="document.forms['payment'].submit()">
              <div class="container">
                <div class="loading">Redirecting to Secure Payment Gateway...</div>
                <div class="info">Order: ${orderId} | Amount: ${currency} ${amount}</div>
                <form name="payment" method="post" action="${ccAvenueUrl}">
                  <input type="hidden" name="encRequest" value="${encRequest}" />
                  <input type="hidden" name="access_code" value="${access_code}" />
                  <input type="hidden" name="merchant_id" value="${merchant_id}" />
                  <input type="hidden" name="redirect_url" value="${redirect_url}" />
                  <input type="hidden" name="cancel_url" value="${cancel_url}" />
                </form>
              </div>
            </body>
          </html>
        `;
        setHtml(webHtml);
        console.log("✅ Payment form generated successfully");
      } else {
        throw new Error(responseData.message || 'Failed to generate payment request from localhost API');
      }

    } catch (err) {
      console.error("❌ Payment initialization error:", err);
      
      // Handle specific localhost connection errors
      let errorMessage = err.message || 'Failed to initialize payment.';
      
      if (err.message.includes('Network request failed') || err.message.includes('localhost')) {
        errorMessage = 'Cannot connect to local server. Make sure your local server is running on http://localhost:3000';
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      setError(errorMessage);

      Alert.alert(
        'Payment Error',
        errorMessage,
        [
          { text: 'Retry', onPress: () => initializePayment() },
          { text: 'Cancel', style: 'cancel', onPress: () => navigation.goBack() },
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNavigationStateChange = (navState) => {
    const { url, title, loading: navLoading } = navState;
    console.log("🌐 WebView Navigation:", { url, title, loading: navLoading });

    // Check for success patterns (localhost success page)
    if (url.includes('payment-success') || 
        url.includes('success') || 
        (url.includes('localhost') && url.includes('success'))) {
      console.log("✅ Payment successful detected via localhost!");
      setWebViewLoading(false);
      
      Alert.alert(
        'Payment Successful',
        `Your payment of ${currency} ${amount} was processed successfully!`,
        [{ 
          text: 'OK', 
          onPress: () => navigation.navigate('PaymentSuccess', { 
            orderId, 
            amount, 
            currency 
          }) 
        }]
      );
      return;
    }

    // Check for cancellation/failure patterns (localhost cancel page)
    if (url.includes('payment-cancel') || 
        url.includes('cancel') || 
        url.includes('failed') ||
        (url.includes('localhost') && url.includes('cancel'))) {
      console.log("❌ Payment cancelled or failed via localhost!");
      setWebViewLoading(false);
      
      Alert.alert(
        'Payment Cancelled',
        'Your payment was cancelled or failed. Please try again.',
        [
          { text: 'Retry', onPress: () => initializePayment() },
          { text: 'Go Back', style: 'cancel', onPress: () => navigation.goBack() },
        ]
      );
      return;
    }

    // Handle CCAvenue URLs
    if (url.includes('ccavenue.com') || url.includes('secure.ccavenue')) {
      console.log("🔗 Redirected to CCAvenue payment gateway");
      setWebViewLoading(true);
    }
  };

  const handleWebViewError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.error("❌ WebView error:", nativeEvent);
    
    // Don't show alert for localhost connection issues in development
    if (nativeEvent.description.includes('localhost') || 
        nativeEvent.description.includes('cleartext') ||
        nativeEvent.description.includes('ENOTFOUND')) {
      console.log("⚠️ Localhost connection issue - common in development");
      return;
    }
    
    Alert.alert(
      'Loading Error',
      'Failed to load payment page. Please check your internet connection.',
      [
        { text: 'Retry', onPress: () => initializePayment() },
        { text: 'Cancel', style: 'cancel', onPress: () => navigation.goBack() },
      ]
    );
  };

  const handleMessage = (event) => {
    const message = event.nativeEvent.data;
    console.log("📨 Message from WebView:", message);
    
    if (message === 'payment_success') {
      console.log("✅ Payment success message received from WebView");
      Alert.alert(
        'Payment Successful',
        `Your payment of ${currency} ${amount} was processed successfully!`,
        [{ 
          text: 'OK', 
          onPress: () => navigation.navigate('PaymentSuccess', { 
            orderId, 
            amount, 
            currency 
          }) 
        }]
      );
    } else if (message === 'payment_cancelled') {
      console.log("❌ Payment cancelled message received from WebView");
      Alert.alert(
        'Payment Cancelled',
        'Your payment was cancelled. Please try again.',
        [
          { text: 'Retry', onPress: () => initializePayment() },
          { text: 'Go Back', style: 'cancel', onPress: () => navigation.goBack() },
        ]
      );
    }
  };

  // Test function for development
  const simulateLocalhostSuccess = () => {
    console.log("🎯 Simulating localhost success for testing");
    navigation.navigate('PaymentSuccess', { 
      orderId, 
      amount, 
      currency,
      testMode: true 
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.loadingText}>Connecting to Payment Gateway...</Text>
          <Text style={styles.loadingSubtext}>Order #: {orderId}</Text>
          <Text style={styles.loadingSubtext}>Amount: {currency} {amount}</Text>
          <Text style={styles.localhostInfo}>Using Localhost API: {LOCAL_API_URL}</Text>
          
          {/* Development test button */}
          {__DEV__ && (
            <TouchableOpacity 
              style={styles.testButton} 
              onPress={simulateLocalhostSuccess}
            >
              <Text style={styles.testButtonText}>Dev: Simulate Success</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Payment Error</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          
          <TouchableOpacity style={styles.retryButton} onPress={initializePayment}>
            <Text style={styles.retryButtonText}>Retry Payment</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          {/* Development help text */}
          {__DEV__ && error.includes('localhost') && (
            <View style={styles.devHelpContainer}>
              <Text style={styles.devHelpTitle}>Development Tip:</Text>
              <Text style={styles.devHelpText}>
                Make sure your local server is running:{'\n'}
                • Start your Express server{'\n'}
                • Check http://localhost:3000/health{'\n'}
                • Ensure no firewall blocking
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => {
          Alert.alert('Cancel Payment', 'Are you sure you want to cancel this payment?', [
            { text: 'No', style: 'cancel' },
            { text: 'Yes', onPress: () => navigation.goBack() },
          ]);
        }}>
          <Text style={styles.backButtonText}>✕ Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Secure Payment</Text>
        <View style={{ width: 80 }} />
      </View>

      {webViewLoading && (
        <View style={styles.webViewLoadingContainer}>
          <ActivityIndicator size="small" color="#007bff" />
          <Text style={styles.webViewLoadingText}>Loading payment gateway...</Text>
        </View>
      )}

      <WebView
        source={{ html }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        originWhitelist={['*']}
        onNavigationStateChange={handleNavigationStateChange}
        onError={handleWebViewError}
        onLoadStart={() => setWebViewLoading(true)}
        onLoadEnd={() => setWebViewLoading(false)}
        onMessage={handleMessage}
        style={styles.webView}
        allowsBackForwardNavigationGestures={false}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>🔒 Secure Payment Gateway</Text>
        <Text style={styles.footerSubtext}>Order #: {orderId} | Amount: {currency} {amount}</Text>
        {__DEV__ && (
          <Text style={styles.localhostBadge}>🧪 Localhost API Mode</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#F9F9F9' 
  },
  loadingText: { 
    marginTop: 16, 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#333' 
  },
  loadingSubtext: { 
    marginTop: 8, 
    fontSize: 14, 
    color: '#666' 
  },
  localhostInfo: {
    marginTop: 12,
    fontSize: 12,
    color: '#007bff',
    fontWeight: '500'
  },
  errorContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#F9F9F9' 
  },
  errorIcon: { 
    fontSize: 60, 
    marginBottom: 16 
  },
  errorTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#333', 
    marginBottom: 12 
  },
  errorMessage: { 
    fontSize: 14, 
    color: '#666', 
    textAlign: 'center', 
    marginBottom: 24, 
    lineHeight: 20 
  },
  retryButton: { 
    backgroundColor: '#007bff', 
    paddingHorizontal: 32, 
    paddingVertical: 14, 
    borderRadius: 8, 
    marginBottom: 12, 
    minWidth: 200 
  },
  retryButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600', 
    textAlign: 'center' 
  },
  cancelButton: { 
    backgroundColor: '#F5F5F5', 
    paddingHorizontal: 32, 
    paddingVertical: 14, 
    borderRadius: 8, 
    minWidth: 200 
  },
  cancelButtonText: { 
    color: '#666', 
    fontSize: 16, 
    fontWeight: '600', 
    textAlign: 'center' 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    backgroundColor: '#fff', 
    borderBottomWidth: 1, 
    borderBottomColor: '#E0E0E0' 
  },
  backButton: { 
    paddingVertical: 8, 
    paddingHorizontal: 12, 
    width: 80 
  },
  backButtonText: { 
    color: '#007bff', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#333' 
  },
  webView: { 
    flex: 1 
  },
  webViewLoadingContainer: { 
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    transform: [{ translateX: -25 }, { translateY: -25 }], 
    zIndex: 999, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    padding: 16, 
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  webViewLoadingText: { 
    marginLeft: 12, 
    fontSize: 14, 
    color: '#333' 
  },
  footer: { 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    backgroundColor: '#F9F9F9', 
    borderTopWidth: 1, 
    borderTopColor: '#E0E0E0', 
    alignItems: 'center' 
  },
  footerText: { 
    fontSize: 12, 
    color: '#666', 
    fontWeight: '600' 
  },
  footerSubtext: { 
    fontSize: 12, 
    color: '#999', 
    marginTop: 4 
  },
  localhostBadge: {
    fontSize: 10,
    color: '#007bff',
    fontWeight: '600',
    marginTop: 4
  },
  testButton: {
    marginTop: 20,
    backgroundColor: '#28a745',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6
  },
  testButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  devHelpContainer: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#fff3cd',
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107'
  },
  devHelpTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#856404',
    marginBottom: 4
  },
  devHelpText: {
    fontSize: 12,
    color: '#856404',
    lineHeight: 16
  }
});