import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header/Header';

export default function PayReminderScrn({navigation}) {
  const [selected, setSelected] = useState('billingDate');
  const [notification, setNotification] = useState('email');
  const [construction, setConstruction] = useState(false); // toggle boolean

  const reminderOptions = [
    {id: 'billingDate', label: 'On billing date (when bill is ready)'},
    {id: '1day', label: '1 day before due'},
    {id: '3days', label: '1 day after due'},
    {id: '1week', label: 'Day until paid'},
  ];

  const notificationOptions = [
    {id: 'push', label: 'Push Notifications'},
    {id: 'WhatsApp', label: 'WhatsApp'},
    {id: 'email', label: 'Email'},
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Header
        title="REMINDERS AND NOTIFICATIONS"
        onPress={() => navigation.goBack()}
      />
      <ScrollView
        style={{paddingHorizontal: 20}}
        showsVerticalScrollIndicator={false}>
        {/* ---- Payment Section ---- */}
        <Text style={styles.mainTitle}>Payment Reminders</Text>
        <Text style={styles.subHeading}>
          Helper: Reminder dates are based on your SPA schedule
        </Text>

        {/* Time Input */}
        <View style={styles.centerWrapper}>
          <View style={styles.timeInput}>
            <Ionicons
              name="time-outline"
              size={20}
              color={'#000'}
              style={{marginRight: 8}}
            />
            <Text style={styles.inputBox}>
              Choose when you’d like to receive reminders
            </Text>
          </View>
        </View>

        {/* Reminder Radio Buttons */}
        {reminderOptions.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.paymentReminderBtnHolder}
            onPress={() => setSelected(item.id)}
            activeOpacity={0.8}>
            <View style={styles.paymentReminderBtn}>
              <Text
                style={[
                  styles.paymentReminderBtnTxt,
                  selected === item.id && {color: '#000', fontWeight: '500'},
                ]}>
                {item.label}
              </Text>
            </View>

            <View
              style={[
                styles.circle,
                selected === item.id
                  ? styles.activeCircle
                  : styles.inactiveCircle,
              ]}>
              {selected === item.id && (
                <Ionicons name="checkmark" size={16} color="#fff" />
              )}
            </View>
          </TouchableOpacity>
        ))}

        {/* ---- Construction Updates Section ---- */}
        <Text style={styles.mainTitle}>Construction Updates</Text>
        <TouchableOpacity
          style={styles.paymentReminderBtnHolder}
          onPress={() => setConstruction(!construction)} // toggle
          activeOpacity={0.8}>
          <View style={styles.paymentReminderBtn}>
            <Text
              style={[
                styles.paymentReminderBtnTxt,
                construction && {
                  color: 'rgba(37, 43, 92, 1)',
                  fontWeight: '400',
                },
              ]}>
              Receive Construction Updates for your purchased units
            </Text>
          </View>

          <View
            style={[
              styles.circle,
              construction ? styles.activeCircle : styles.inactiveCircle,
            ]}>
            {construction && (
              <Ionicons name="checkmark" size={16} color="#fff" />
            )}
          </View>
        </TouchableOpacity>

        {/* ---- Notifications Section ---- */}
        <View style={styles.divider} />

        <Text style={styles.sectionHeading}>Notification Channels</Text>

        {notificationOptions.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.paymentReminderBtnHolder}
            onPress={() => setNotification(item.id)}
            activeOpacity={0.8}>
            <View style={styles.paymentReminderBtn}>
              <Text
                style={[
                  styles.paymentReminderBtnTxt,
                  notification === item.id && {
                    color: 'rgba(0, 0, 0, 1)',
                    fontWeight: '400',
                  },
                ]}>
                {item.label}
              </Text>
            </View>

            <View
              style={[
                styles.circle,
                notification === item.id
                  ? styles.activeCircle
                  : styles.inactiveCircle,
              ]}>
              {notification === item.id && (
                <Ionicons name="checkmark" size={16} color="#fff" />
              )}
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.savePreferencesBtn}
          onPress={() => {
            navigation.navigate('PayOptions');
          }}>
          <Text style={styles.savePreferencesBtnTxt}>Save Preferences</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  mainTitle: {
    fontFamily: 'ChronicleDisp-Semibold',
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
    marginTop: 25,
  },
  subHeading: {
    textAlign: 'center',
    fontSize: 10,
    color: 'rgba(130, 130, 130, 1)',
    marginTop: 15,
    fontFamily: 'FuturaStdBook',
    fontWeight: '400',
  },
  centerWrapper: {
    alignItems: 'center',
    marginTop: 30,
  },
  timeInput: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    paddingHorizontal: 16,
    // paddingVertical: 17.5,
    width: 325,
  },
  inputBox: {
    flex: 1,
    fontSize: 10,
    color: 'rgba(140, 140, 140, 1)',
    fontFamily: 'FuturaStdBook',
    fontWeight: '400',
  },
  paymentReminderBtnHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginTop: 10,
    height: 49,
    // width: '100%',
  },
  paymentReminderBtn: {
    flexDirection: 'row',
    // gap: 10,
    width: 288,
    borderWidth: 1,
    borderColor: 'rgba(236, 237, 243, 1)',
    paddingHorizontal: 16,
    // paddingVertical: 17.5,
    marginRight: 15,
    marginLeft: 23,
  },
  paymentReminderBtnTxt: {
    color: 'rgba(140, 140, 140, 1)',
    fontSize: 11,
    fontFamily: 'Inter_24pt-Regular',
    fontWeight: '400',
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  activeCircle: {
    backgroundColor: '#7D662D',
  },
  inactiveCircle: {
    backgroundColor: 'rgba(135, 135, 135, 0.2)',
  },
  divider: {
    height: 2,
    backgroundColor: '#000',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  sectionHeading: {
    fontFamily: 'FuturaStdBook',
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
    marginBottom: 10,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 15,
    fontWeight: '400',
  },
  savePreferencesBtn: {
    width: 335,
    height: 40,
    backgroundColor: '#000',
    marginTop: 20,
    marginLeft: 10,
    padding: 10,
    marginBottom: 40,
    bottom: 6,
  },
  savePreferencesBtnTxt: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'FuturaStdMedium',
    fontWeight: 'bold',
  },
});
