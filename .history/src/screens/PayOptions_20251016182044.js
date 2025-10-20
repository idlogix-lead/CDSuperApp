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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header/Header';

export default function PayOptions({navigation}) {
  const [selectedMethod, setSelectedMethod] = useState('card');
  // const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header title="PAYMENT OPTIONS" onPress={() => navigation.goBack()} />

      {/* Scrollable content */}
      <ScrollView
        style={{paddingHorizontal: 20}}
        showsVerticalScrollIndicator={false}>
        {/* Make A Payment */}
        <Text style={styles.title}>Make A Payment</Text>

        {/* Card Section */}
        <View style={styles.cardBox}>
          <View style={styles.cardIcons}>
            <View style={styles.chip}>
              {/* <Image source={require('../../../asset/images/Chip.png')} /> */}
            </View>

            <View style={styles.payIcons}>
              {/* <Image source={require('../../../asset/images/Touch.png')} />
              <Image
                source={require('../../../asset/images/Contactless.png')}
              /> */}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  padding: 2,
                  borderRadius: 3,
                }}>
                <Ionicons name="logo-apple" size={12} color={'#000'} />
                <Text style={{marginLeft: 4, fontSize: 12}}>Pay</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  padding: 2,
                  borderRadius: 8,
                }}>
                {/* <Image
                  source={require('../../../asset/images/logo_Google.png')}
                /> */}
                <Text style={{marginLeft: 4, fontSize: 12}}>Pay</Text>
              </View>
            </View>
          </View>

          <Text style={styles.cardNumber}>**** **** **** 1234</Text>
          <View style={styles.cardFooter}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={styles.validText}>VALID THRU</Text>
              </View>
              <View>
                <Text style={styles.expiry}>01/22</Text>
              </View>
            </View>
          </View>

          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.switchCircle}></View>
              <View style={styles.switchInner} />
            </View>
          </View>
        </View>

        {/* Payment Summary */}
        <Text style={styles.sectionTitle}>Payment Summary</Text>
        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Date: 10 Jan 2025</Text>
            <Text style={styles.pending}>Pending</Text>
          </View>
          <Text style={styles.amount}>PKR 250,000</Text>
        </View>

        {/* Payment Methods */}
        <Text style={styles.sectionTitle}>Payment Methods</Text>

        {[
          {id: 'card', label: 'CC Avenue Debit/Credit Card'},
          {id: 'bank', label: 'Upload Bank Transfer Proof'},
          {id: 'apple', label: 'Apple Pay'},
          {id: 'google', label: 'Google Pay'},
        ].map(method => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.methodBox,
              selectedMethod === method.id && styles.activeMethod,
            ]}
            onPress={() => setSelectedMethod(method.id)}>
            <View
              style={[
                styles.radioCircle,
                selectedMethod === method.id && styles.radioSelected,
              ]}>
              {selectedMethod === method.id && (
                <Ionicons name="checkmark" size={16} color="#fff" />
              )}
            </View>
            <Text style={styles.methodText}>{method.label}</Text>
          </TouchableOpacity>
        ))}

        {/* Proceed Button */}
        <TouchableOpacity
          style={styles.proceedBtn}
          onPress={() => navigation.navigate('PayDetails')}>
          <Text style={styles.proceedText}>Proceed</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 20,
    // alignItems: 'center',
  },
  title: {
    fontFamily: 'ChronicleDisp-Semibold',
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
    marginTop: 20,
    bottom: 10,
    fontWeight: '375',
  },
  cardBox: {
    backgroundColor: '#000',
    borderRadius: 9,
    padding: 20,
    marginBottom: 25,
    width: 324,
    height: 172,
    alignSelf: 'center',
  },
  chip: {
    width: 40,
    height: 30,
    backgroundColor: '#c5b358',
    borderRadius: 4,
  },
  cardIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  payIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  cardNumber: {
    color: '#fff',
    fontSize: 24,
    letterSpacing: 2,
    marginTop: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  validText: {
    color: '#fff',
    fontSize: 8,
    width: '50%',
  },
  expiry: {
    color: '#fff',
    fontSize: 18,
  },
  switchCircle: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 3,
    zIndex: 1,
    marginRight: 6,
  },
  switchInner: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: 'rgba(145, 145, 145, 0.7)',
    zIndex: 2,
    marginRight: 40,
    position: 'absolute',
    marginLeft: 15,
  },
  sectionTitle: {
    fontSize: 16,
    bottom: 15,
    textAlign: 'center',
    fontFamily: 'FuturaStdMedium',
    color: '#000',
  },
  summaryBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 25,
    height: 70,
    width: '100%',
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
    color: '#000',
  },
  pending: {
    fontSize: 12,
    color: '#000',
    fontWeight: '650',
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
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 12,
  },
  activeMethod: {
    borderColor: '#000',
    color: 'rgba(64, 64, 64, 1)',
    fontWeight: '700',
    fontFamily: 'Raleway-Bold',
  },
  radioCircle: {
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: 'rgba(135, 135, 135, 0.2)',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    backgroundColor: '#7D662D',
  },
  methodText: {
    fontSize: 10,
    color: 'rgba(64, 64, 64, 1)',
    fontFamily: '',
    fontWeight: '500',
  },
  proceedBtn: {
    backgroundColor: '#000',
    paddingVertical: 16,
    marginTop: 15,
    bottom: 16,
  },
  proceedText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'FuturaStdMedium',
  },
});
