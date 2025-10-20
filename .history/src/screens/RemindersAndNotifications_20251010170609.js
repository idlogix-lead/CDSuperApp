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

export default function ReminderAndNotificationScreen() {
  const [selected, setSelected] = useState('billingDate');
  const [notification, setNotification] = useState('email');

  const reminderOptions = [
    {id: 'billingDate', label: 'Alerts for bounced payments'},
    {id: '1day', label: 'Alerts for unverified payments'},
  ];

  const notificationOptions = [
    {id: 'email', label: 'Email Notifications'},
    {id: 'sms', label: 'SMS Notifications'},
    {id: 'push', label: 'Push Notifications'},
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ---- Payment Section ---- */}
        <Text style={styles.mainTitle}>Notification Preferences</Text>
        <Text style={styles.subHeading}>
          Choose your preferred channels and alerts
        </Text>

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
                    color: '#000',
                    fontWeight: '700',
                    fontFamily: 'Inter_24pt-Bold',
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
        <View style={styles.divider} />
        <Text style={[styles.sectionHeading, {marginTop: 1}]}>Alert Types</Text>

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
                  selected === item.id && {
                    color: '#000',
                    fontWeight: '700',
                    fontFamily: 'Inter_24pt-Bold',
                  },
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
      </ScrollView>
      <View style={styles.btnWrapper}>
        <TouchableOpacity style={styles.savePreferencesBtn}>
          <Text style={styles.savePreferencesBtnTxt}>Save Preferences</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', paddingHorizontal: 20},
  mainTitle: {
    fontFamily: 'Chronicle Display Semibold',
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
    marginTop: 20,
    bottom: 10,
    fontWeight: '400',
  },
  subHeading: {
    textAlign: 'center',
    fontSize: 10,
    color: 'rgba(130, 130, 130, 1)',
    marginTop: 4,
    fontFamily: 'FuturaStdBook',
    fontWeight: '400',
  },
  centerWrapper: {
    alignItems: 'center',
    marginTop: 30,
  },
  timeInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 17.5,
    width: '95%',
  },
  inputBox: {
    flex: 1,
    fontSize: 10,
    color: 'rgba(140, 140, 140, 1)',
    fontFamily: 'Inter-24pt-Regular',
    fontWeight: '400',
  },
  paymentReminderBtnHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  paymentReminderBtn: {
    flexDirection: 'row',
    gap: 10,
    width: 288,
    borderWidth: 1,
    borderColor: 'rgba(236, 237, 243, 1)',
    paddingHorizontal: 16,
    paddingVertical: 17.5,
    marginLeft: 10,
  },
  paymentReminderBtnTxt: {
    color: '#828282',
    fontSize: 10,
    fontFamily: 'PlayfairDisplay',
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
    height: 1,
    backgroundColor: '#000',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  sectionHeading: {
    fontFamily: 'FuturaStdBook',
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    marginBottom: 10,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: '17%',
  },
  savePreferencesBtn: {
    width: 327,
    height: 40,
    backgroundColor: 'rgba(0,0,0,1)',
    marginTop: 20,
    marginLeft: 10,
    padding: 10,
  },
  savePreferencesBtnTxt: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'FuturaStdMedium',
    fontWeight: '500',
  },
  btnWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    bottom: 10,
  },
});
