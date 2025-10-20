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

export default function RemindersAndNotifications({navigation}) {
  const [selected, setSelected] = useState([]);
  const [selectedNotifications, setSelectedNotifications] = useState([]);

  const reminderOptions = [
    {id: 'billingDate', label: 'Alerts for bounced payments'},
    {id: '1day', label: 'Alerts for unverified payments'},
  ];

  const notificationOptions = [
    {id: 'email', label: 'Email Notifications'},
    {id: 'sms', label: 'SMS Notifications'},
    {id: 'push', label: 'Push Notifications'},
  ];

  const toggleNotification = id => {
    if (selectedNotifications.includes(id)) {
      // remove if already selected
      setSelectedNotifications(prev => prev.filter(item => item !== id));
    } else {
      // add if not selected
      setSelectedNotifications(prev => [...prev, id]);
    }
  };
  const toggleReminder = id => {
    if (selected.includes(id)) {
      // remove if already selected
      setSelected(prev => prev.filter(item => item !== id));
    } else {
      // add if not selected
      setSelected(prev => [...prev, id]);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <Header
        title={'REMINDERS AND NOTIFICATION'}
        onPress={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ---- Payment Section ---- */}
        <Text style={styles.mainTitle}>Notification Preferences</Text>
        <Text style={styles.subHeading}>
          Choose your preferred channels and alerts
        </Text>

        <Text style={styles.sectionHeading}>Notification Channels</Text>

        {notificationOptions.map(item => {
          const isSelected = selectedNotifications.includes(item.id);
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.paymentReminderBtnHolder}
              onPress={() => toggleNotification(item.id)}
              activeOpacity={0.8}>
              <View style={styles.paymentReminderBtn}>
                <Text
                  style={[
                    styles.paymentReminderBtnTxt,
                    isSelected && {
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
                  isSelected ? styles.activeCircle : styles.inactiveCircle,
                ]}>
                {isSelected && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={styles.divider} />
        <Text style={[styles.sectionHeading, {marginTop: 1}]}>Alert Types</Text>

        {/* Reminder Radio Buttons */}
        {reminderOptions.map(item => {
          const isSelected = selected.includes(item.id);
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.paymentReminderBtnHolder}
              onPress={() => toggleReminder(item.id)}
              activeOpacity={0.8}>
              <View style={styles.paymentReminderBtn}>
                <Text
                  style={[
                    styles.paymentReminderBtnTxt,
                    isSelected && {
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
                  isSelected ? styles.activeCircle : styles.inactiveCircle,
                ]}>
                {isSelected && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
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
  container: {flex: 1, backgroundColor: '#fff'},
  mainTitle: {
    fontFamily: 'ChronicleDisp-Semibold',
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
    marginTop: 40,
    bottom: 10,
  },
  subHeading: {
    textAlign: 'center',
    fontSize: 10,
    color: 'rgba(130, 130, 130, 1)',
    // marginTop: 4,
    fontFamily: 'FuturaStdBook',
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
    alignSelf: 'center',
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
    marginLeft: 10,
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
  },
  btnWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    bottom: 30,
    alignItems: 'center',
  },
});
