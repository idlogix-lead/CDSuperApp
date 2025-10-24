import React from 'react';
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

export default function PayScheduleScrn({navigation,route}) {
  const pc=route.params;
  const payments = [
    {date: '10 Jan 2025', amount: 'PKR 250,000', status: 'Pending'},
    {date: '10 Feb 2025', amount: 'PKR 250,000', status: 'Overdue'},
    {date: '10 Mar 2025', amount: 'PKR 250,000', status: 'Paid'},
    {date: '10 Apr 2025', amount: 'PKR 250,000', status: 'Paid'},
    {date: '10 May 2025', amount: 'PKR 250,000', status: 'Paid'},
    {date: '10 Jun 2025', amount: 'PKR 250,000', status: 'Overdue'},
    {date: '10 July 2025', amount: 'PKR 250,000', status: 'Overdue'},
    {date: '10 Aug 2025', amount: 'PKR 250,000', status: 'Overdue'},
    {date: '10 Sep 2025', amount: 'PKR 250,000', status: 'Overdue'},
    {date: '10 Oct 2025', amount: 'PKR 250,000', status: 'Overdue'},
    {date: '10 Nov 2025', amount: 'PKR 250,000', status: 'Overdue'},
    {date: '10 Dec 2025', amount: 'PKR 250,000', status: 'Overdue'},
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      <Header title="PAYMENT SCHEDULE" onPress={() => navigation.navigate("Drawer")}  onpresimg={()=>navigation.navigate("UserDetails",{
   pc
      })}/>

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
          {[
            '10 Jan Paid',
            '10 Feb Pending',
            '10 Mar Pending',
            '10 Apr Pending',
            '10 May Pending',
            '10 Jun Pending',
            '10 July Pending',
            '10 Aug Pending',
            '10 Sep Pending',
            '10 Oct Pending',
            '10 Nov Pending',
            '10 Dec Pending',
          ].map((item, index) => (
            <View
              key={index}
              style={{alignItems: 'center', position: 'relative'}}>
              {/* Line behind circles */}
              {index < 11 && (
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
                  index === 0 ? styles.activeCircle : styles.inactiveCircle,
                ]}>
                {index === 0 && (
                  <Ionicons name="checkmark" color="#fff" size={14} />
                )}
              </View>

              {/* Text below circle */}
              <Text style={styles.timelineText}>{item}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Payment Cards */}
        <View style={{flex: 1, alignItems: 'center'}}>
          {payments.map((pay, index) => (
            <View
              key={index}
              style={[
                styles.card,
                pay.status === 'Overdue'
                  ? styles.cardOverdue
                  : pay.status === 'Paid'
                  ? styles.cardPaid
                  : styles.cardPending,
              ]}>
              <View style={styles.cardHeader}>
                <Text style={styles.dateText}>Date: {pay.date}</Text>
                <Text
                  style={[
                    styles.statusText,
                    pay.status === 'Paid'
                      ? styles.statusPaid
                      : pay.status === 'Overdue'
                      ? styles.statusOverdue
                      : styles.statusPending,
                  ]}>
                  {pay.status}
                </Text>
              </View>
              <Text style={styles.amount}>{pay.amount}</Text>
            </View>
          ))}
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
    width: '70%',
    fontFamily: 'FuturaStdBook',
    fontWeight: '400',
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
    fontWeight: '600',
  },
});
