import React, {useEffect, useState} from 'react';
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
import instance from '../BaseURL/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header/Header';

export default function PayDetails({navigation}) {
  const [selectedMethod, setSelectedMethod] = useState('card');

  const CCAvenueAPI = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token, 'token');

    const payload = {
      Order_ID: 1132387,
      Amount: 500.0,
      Currency: 'AED',
    };
    console.log(payload, 'CC Avenue payload');

    try {
      const response = await instance.post(
        `/v1/processes/ccavenuegeneratepayload`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const json = await response.json();
      const summary = JSON.parse(json.summary);
      if (summary.status === 'success') {
        const payload = summary.data;
        payload.access_code = 'AVUQ0387HJHEWURB';
        payload.merchant_id = '65770';
        payload.redirect_url =
          'https://secure.ccavenue.ae/transaction/transaction.do?command=initiateTransaction';
        payload.cancel_url =
          'https://secure.ccavenue.ae/transaction/transaction.do?command=initiateTransaction';
        await CcAvenueModule.startPayment(JSON.stringify(payload));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CCAvenueAPI();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* ✅ Header Section */}
      <Header title="PAYMENT OPTIONS" onPress={() => navigation.goBack()} />

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
            maxLength={16}
            keyboardType="number-pad"
          />
        </View>
        <Text style={styles.invalidTxt}>Invalid Card Number</Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            width: '80%',
            alignSelf: 'center',
          }}>
          <View style={{width: '50%'}}>
            <TextInput
              placeholder="Expiry Date (MM/YY)"
              placeholderTextColor={'rgba(0, 0, 0, 1)'}
              style={[styles.methodBox2, styles.inputText]}
            />
          </View>
          <View style={{width: '48%'}}>
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
            Link to Wallet {'\n'}(instead of above details)
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
          onPress={() => navigation.navigate('paySucceed')}>
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
    fontFamily: 'ChronicleDisp-Semibold',
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
    marginTop: 25,
    fontWeight: '400',
  },
  subHeading: {
    fontFamily: 'FuturaStdBook',
    fontSize: 10,
    marginTop: 40,
    bottom: 10,
    textAlign: 'center',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 1)',
  },
  sectionTitle: {
    fontFamily: 'FuturaStdBook',
    fontSize: 14,
    marginTop: 30,
    bottom: 10,
    color: 'rgba(0, 0, 0, 1)',
    marginLeft: 60,
  },
  summaryBox: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 12,
    marginBottom: 25,
    height: 70,
    width: 324,
    alignSelf: 'center',
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
    fontFamily: 'FuturaStdHeavy',
  },
  amount: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: 'FuturaStdHeavy',
    color: '#000',
  },
  methodBox: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(236, 237, 243, 1)',
    marginBottom: 5,
    marginTop: 5,
    width: 324,
    height: 44,
    paddingLeft: 12,
  },
  methodBox2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(236, 237, 243, 1)',
    marginBottom: 5,
    marginTop: 5,

    height: 44,
  },
  inputText: {
    fontSize: 10,
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'FuturaStdBook',
  },
  invalidTxt: {
    color: 'rgba(130, 130, 130, 1)',
    fontSize: 8,
    padding: 10,
    fontFamily: 'FuturaStdBook',
    marginLeft: 40,
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
    alignSelf: 'center',
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
    marginBottom: 10,
  },
  proceedText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'FuturaStdMedium',
  },
});
