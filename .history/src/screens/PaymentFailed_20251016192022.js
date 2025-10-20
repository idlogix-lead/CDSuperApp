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

export default function PaymentFailed() {
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
          marginTop: '50%',
        }}>
        {/* Payment success label */}
        <Text style={styles.title}>Payment failed, please try again</Text>

        <View style={{flex: 1, alignItems: 'center', paddingVertical: '40%'}}>
          <TouchableOpacity
            style={styles.proceedBtn}
            onPress={() => navigation.navigate('PAYMENT Proof')}>
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
  },
  title: {
    fontFamily: 'Chronicle Display Semibold',
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
    marginTop: 25,
    fontWeight: '375',
  },
  sectionTitle: {
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
    fontWeight: '500',
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
