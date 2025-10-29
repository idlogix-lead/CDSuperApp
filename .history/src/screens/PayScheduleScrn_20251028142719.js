import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from '../BaseURL/BaseUrl';

export default function PayScheduleScrn({navigation}) {
  const [payments, setPayments] = useState([]);

  const fetchSummary = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');

      // Get user details
      const userResponse = await instance.get(`/v1/models/ad_user/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(userResponse.data, 'client data');
      const bPartnerId = userResponse.data.C_BPartner_ID?.id;
      console.log('C_BPartner_ID:', bPartnerId);

      if (!bPartnerId) {
        console.warn('No Business Partner found for this user.');
        return;
      }

      // Fetch summary by C_BPartner_ID
      const summaryResponse = await instance.get(
        `/v1/models/MBL_Custinstall_Summary_V?$filter=C_BPartner_ID eq ${bPartnerId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('Summary:', summaryResponse.data.records);
      setPayments(summaryResponse.data.records); // optional
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      <Header title="PAYMENT SCHEDULE" onPress={logout} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title */}
        <Text style={styles.mainTitle}>Payment Schedule</Text>

        {/* Timeline */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginVertical: 32}}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {payments.map((item, index) => (
            <View
              key={index}
              style={{alignItems: 'center', position: 'relative'}}>
              {/* Line behind circles */}
              {index < payments.length - 1 && (
                <View
                  style={[
                    styles.line,
                    {position: 'absolute', top: 18, left: 25}, // center line vertically with circles
                  ]}
                />
              )}

              {/* Circle */}
              <View
                style={[
                  styles.circle,
                  item.OpenAmt > 0
                    ? styles.inactiveCircle
                    : styles.activeCircle,
                ]}>
                {item.OpenAmt <= 0 && (
                  <Ionicons name="checkmark" color="#fff" size={14} />
                )}
              </View>

              {/* Text below circle */}
              <Text style={styles.timelineText}>
                {item.DateInvoiced
                  ? new Date(item.DateInvoiced).toLocaleDateString('en-GB', {
                      // day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })
                  : ''}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Payment Cards */}
        <View style={{flex: 1, alignItems: 'center'}}>
          {payments.map((pay, index) => {
            const invoiceDate = pay?.DateInvoiced
              ? new Date(pay.DateInvoiced)
              : null;
            const today = new Date();

            // Determine status
            let status = 'Paid';
            if (pay?.OpenAmt > 0) {
              if (invoiceDate && invoiceDate < today) {
                status = 'Overdue';
              } else {
                status = 'Pending';
              }
            }

            // Determine card style based on status
            const cardStyle =
              status === 'Overdue'
                ? styles.cardOverdue
                : status === 'Paid'
                ? styles.cardPaid
                : styles.cardPending;

            // Handle card press
            const handlePress = () => {
              if (status === 'Pending' || status === 'Overdue') {
                navigation.navigate('PayOptions', {payment: pay});
              }
            };

            return (
              <TouchableOpacity
                key={index}
                activeOpacity={status === 'Paid' ? 1 : 0.7} // no opacity feedback for Paid
                onPress={handlePress}
                disabled={status === 'Paid'} // disable press for Paid
                style={[styles.card, cardStyle]}>
                <View style={styles.cardHeader}>
                  <Text style={styles.dateText}>
                    Date:{' '}
                    {pay.DateInvoiced
                      ? new Date(pay.DateInvoiced).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })
                      : ''}
                  </Text>

                  <Text
                    style={[
                      styles.statusText,
                      status === 'Overdue'
                        ? styles.statusOverdue
                        : status === 'Pending'
                        ? styles.statusPending
                        : styles.statusPaid,
                    ]}>
                    {status}
                  </Text>
                </View>

                <Text style={styles.amount}>
                  AED {Number(pay.InvoiceAmt || 0).toFixed(2)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('PayReminderScrn')}
          style={{
            backgroundColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            width: '90%',
            alignSelf: 'center',
            marginBottom: 30,
            marginTop: 10,
          }}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'FuturaStdMedium',
              fontSize: 14,
            }}>
            Payment
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainTitle: {
    fontFamily: 'ChronicleDisp-Semibold',
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
    marginTop: 25,
  },
  timelineItem: {
    alignItems: 'center',
  },

  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2, // make sure circle is above the line
    backgroundColor: '#ccc',
  },

  activeCircle: {
    backgroundColor: '#7d662d',
    borderWidth: 7,
    borderColor: '#F8F4F4',
  },

  inactiveCircle: {
    backgroundColor: '#828282',
    borderWidth: 7,
    borderColor: '#E9E5E5',
  },

  line: {
    width: 80,
    height: 1,
    backgroundColor: 'rgba(0,0,0,1)',
    zIndex: 1,
  },

  timelineText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#000',
    marginTop: 10,
    width: '60%',
    fontFamily: 'FuturaStdBook',
  },

  card: {
    marginBottom: 15,
    width: '80%',
    height: 70,
    paddingTop: 12,
    paddingHorizontal: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    color: '#000',
    fontSize: 10,
    fontFamily: 'FuturaStdBook',
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'FuturaStdHeavy',
  },
  statusPending: {color: '#000'},
  statusOverdue: {color: '#000'},
  statusPaid: {color: '#000'},
  cardPending: {backgroundColor: '#fff', borderWidth: 1, borderColor: '#000'},
  cardOverdue: {backgroundColor: 'rgba(130, 130, 130, .2)'},
  cardPaid: {backgroundColor: 'rgba(130, 130, 130, 0.2)'},
  amount: {
    fontFamily: 'FuturaStdHeavy',
    fontSize: 16,
    color: '#000',
    marginTop: 8,
  },
});
