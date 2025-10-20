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
import Header from '../components/Header/Header';

export default function PaySucceed() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* ✅ Header Section */}
      <Header title={'PAYMENT OPTIONS'} onPress={() => navigation.goBack()} />

      {/* Scrollable content */}
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          width: '100%',
          bottom: 10,
          marginTop: 80,
        }}>
        {/* Payment success label */}
        <Text style={styles.title}>Your Payment was Successful</Text>
        {/* <Text style={{color: 'gray'}}>sdfcjejsdk</Text> */}

        {/* Payment Summary */}
        <Text style={styles.sectionTitle}>
          Your installment has been paid. A receipt {'\n'}has been sent to your
          email
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 30,
            marginTop: 15,
          }}>
          <View style={styles.successRadio}>
            <Ionicons name="checkmark" size={50} color={'white'} />
          </View>
        </View>

        <View style={{flex: 1, alignItems: 'center', paddingVertical: '10%'}}>
          <TouchableOpacity
            style={styles.proceedBtn}
            onPress={() => navigation.navigate('PayProof')}>
            <Text style={styles.proceedText}>Go To Dashboard</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Proceed Button */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 20,
    // alignItems: 'flex-start',
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
  },
  sectionTitle: {
    fontFamily: 'FuturaStdBook',
    color: '#000',
    fontSize: 14,
    marginTop: 30,
    bottom: 10,
    textAlign: 'center',
    fontWeight: '400',
  },

  proceedBtn: {
    backgroundColor: '#000',
    paddingVertical: 10,
    width: 327,
    height: 40,

    // flex:1,
    // justifyContent:'flex-end'
  },
  proceedText: {
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'FuturaStdMedium',
  },
  successRadio: {
    height: 65,
    width: 65,
    borderRadius: 32,
    backgroundColor: 'rgba(125, 102, 45, 1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
