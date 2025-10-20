import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PayDetails({navigation}) {
  const [selectedMethod, setSelectedMethod] = useState('card');
  // const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* ✅ Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PAYMENT OPTIONS</Text>
        <View style={{width: 22}} />
      </View>

      {/* Scrollable content */}
      <View>
        {/* Make A Payment */}
        <Text style={styles.title}>Enter Payment Details</Text>

        {/* Payment Summary */}
        <Text style={styles.subHeading}>
          Please provide your payment details to continue.
        </Text>

        <View>
          <TextInput
            placeholder="Cardholder Name (text input)"
            placeholderTextColor={'rgba(0, 0, 0, 1)'}
            style={[styles.methodBox, styles.inputText]}
          />
        </View>
        <View>
          <TextInput
            placeholder="Card Number"
            placeholderTextColor={'rgba(0, 0, 0, 1)'}
            style={[styles.methodBox, styles.inputText]}
          />
        </View>
        <Text style={styles.invalidTxt}>Optional: Invalid Card Number</Text>
        <View style={{flexDirection: 'row', gap: 5, width: '82%'}}>
          <View style={{width: '50%'}}>
            <TextInput
              placeholder="Expiry Date (MM/YY)"
              placeholderTextColor={'rgba(0, 0, 0, 1)'}
              style={[styles.methodBox2, styles.inputText]}
            />
          </View>
          <View style={{width: '60%'}}>
            <TextInput
              placeholder="CVV"
              placeholderTextColor={'rgba(0, 0, 0, 1)'}
              style={[styles.methodBox2, styles.inputText]}
            />
          </View>
        </View>
        {/* link to wallet */}
        <TouchableOpacity
          style={styles.linkToWalletBtn}
          onPress={() => navigation.navigate('PaymentOptionScreen')}>
          <Text style={styles.linkToWalletBtnText}>
            If Apple/Google Pay: Link to Wallet {'\n'}(instead of above details)
          </Text>
        </TouchableOpacity>
        {/* summary box */}
        <Text style={styles.sectionTitle}>Payment Summary</Text>
        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Date: 10 Jan 2025</Text>
            <Text style={styles.summaryValue}></Text>
            <Text style={styles.pending}>Pending</Text>
          </View>
          <Text style={styles.amount}>PKR 250,000</Text>
        </View>
      </View>
      {/* Proceed Button */}
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          width: '100%',
          bottom: 10,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.proceedBtn}
          onPress={() => navigation.navigate('PaymentSuccessScreen')}>
          <Text style={styles.proceedText}>Pay now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ✅ Header */
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',

    paddingTop: 50,
    paddingBottom: 15,
  },
  backButton: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 12,

    color: '#000',
  },

  title: {
    fontFamily: 'Chronicle Display Semibold',
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
    marginTop: 25,
    fontWeight: '400',
  },
  subHeading: {
    fontFamily: 'FuturaStdBook',
    fontSize: 10,
    marginTop: 30,
    bottom: 10,
    textAlign: 'center',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 1)',
  },
  sectionTitle: {
    fontFamily: 'FuturaStdMedium',
    fontSize: 14,
    marginTop: 30,
    bottom: 10,

    fontWeight: '400',
    color: 'rgba(0, 0, 0, 1)',
  },
  summaryBox: {
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 15,
    marginBottom: 25,
    height: 70,
    width: 300,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 10,
    color: '#000',
    fontWeight: '400',
    fontFamily: 'FuturaStdBook',
  },
  summaryValue: {
    fontSize: 13,
  },
  pending: {
    fontSize: 12,
    color: '#000',
    fontWeight: '600',
    fontFamily: 'FuturaStdHeavy',
  },
  amount: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'FuturaStdHeavy',
  },
  methodBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(236, 237, 243, 1)',
    // paddingVertical: 17.5,
    // paddingHorizontal: 15,
    marginBottom: 5,
    marginTop: 5,
    width: 324,
    height: 44,
  },
  methodBox2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(236, 237, 243, 1)',
    // paddingVertical: 17.5,
    // paddingHorizontal: 15,
    marginBottom: 5,
    marginTop: 5,

    height: 44,
  },
  inputText: {
    fontSize: 10,
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'FuturaStdBook',
    fontWeight: '400',
  },
  invalidTxt: {
    color: 'rgba(130, 130, 130, 1)',
    fontSize: 8,
    padding: 10,
    fontFamily: 'FuturaStdBook',
  },
  input: {
    fontSize: 10,
    color: ' rgba(0, 0, 0, 1)',
  },
  linkToWalletBtn: {
    backgroundColor: 'rgba(130, 130, 130, 1)',
    padding: 16,
    marginBottom: 10,
    marginTop: 10,
    width: 324,
    height: 60,
  },
  linkToWalletBtnText: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '500',
    fontSize: 12,
    fontFamily: 'FuturaStdMedium',
  },
  proceedBtn: {
    backgroundColor: '#000',
    width: 327,
    height: 40,

    paddingVertical: 10,
  },
  proceedText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'FuturaStdMedium',
  },
});
