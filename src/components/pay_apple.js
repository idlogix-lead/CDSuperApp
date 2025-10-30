import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ApplePayComponent from "./applepay";

const PaymentScreen = () => {
  const handlePaymentSuccess = (paymentDetails) => {
    console.log('✅ Payment Successful:', paymentDetails);
    alert(`Payment Successful: ${paymentDetails.amount} ${paymentDetails.currency}`);
  };

  const handlePaymentError = (error) => {
    console.log('❌ Payment Failed:', error);
    alert('Payment failed, please try again.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Apple Pay Checkout</Text>

      <ApplePayComponent
        amount={19.99}
        currency="USD"
        merchantIdentifier="merchant.com.yourcompany.app"
        merchantName="My React Store"
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
});

export default PaymentScreen;
