import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PaymentScheduleScreen from '../screens/PayScheduleScrn';
import PaymentReminderScreen from '../screens/PaymentReminder';
import PaymentOptionScreen from '../screens/PaymentDetails';
import ReceiptsAndStatementsScreen from '../screens/ReciptAndStatement';
import RaiseDisputeProofScreen from '../screens/RaiseDispute';
import MyDisputesScreen from '../screens/MyDisputes';
import ReminderAndNotificationScreen from '../screens/RemindersAndNotifications';
import PaymentDetailsScreen from '../screens/PaymentDetails';
import PaymentFailedScreen from '../screens/PaymentFailed';

// Screens

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({navigation}) {
  return (
    <Drawer.Navigator
      screenOptions={({navigation, route}) => ({
        // 🧱 Header Style (no shadow, clean white)
        headerStyle: {
          backgroundColor: '#fff',
          shadowOpacity: 0, // iOS shadow remove
          elevation: 0, // Android shadow remove
        },
        headerTitle: '', // We’ll make custom title in left side manually
        drawerActiveTintColor: '#000',
        drawerInactiveTintColor: 'gray',

        // 👈 Left Side: Menu + Title
        headerLeft: () => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 15,
            }}>
            {/* Menu Button */}
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{marginRight: 10}}>
              <Ionicons name="menu" size={24} color="#000" />
            </TouchableOpacity>

            {/* Title Text */}
            <Text
              style={{
                fontSize: 14,
                // fontWeight: '600',
                color: '#000',
                fontFamily: 'PlayfairDisplay',
              }}>
              {route.name === 'PaymentSchedule'
                ? 'Payment Schedule'
                : route.name}
            </Text>
          </View>
        ),

        // 👉 Right Side: Bell + Profile Image
        headerRight: () => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 15,
            }}>
            {/* Bell Icon */}
            <TouchableOpacity
              onPress={() => console.log('Notifications pressed')}
              style={{marginRight: 15}}>
              <Ionicons name="notifications-outline" size={24} color="#000" />
            </TouchableOpacity>

            {/* Profile Image */}
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: '#ddd',
                }}
              />
            </TouchableOpacity>
          </View>
        ),
      })}>
      <Drawer.Screen name="MyDisputesScreen" component={MyDisputesScreen} />
      <Drawer.Screen name="Payment Details" component={PaymentDetailsScreen} />
      <Drawer.Screen
        name="PaymentFailedScreen"
        component={PaymentFailedScreen}
      />
      <Drawer.Screen
        name="PaymentOptionScreen"
        component={PaymentOptionScreen}
      />
      <Drawer.Screen
        name="REMINDERS AND NOTIFICATIONS"
        component={PaymentReminderScreen}
      />
      <Drawer.Screen
        name="Payment Schedule"
        component={PaymentScheduleScreen}
      />
      <Drawer.Screen
        name="RaiseADisputeScreen"
        component={RaiseDisputeProofScreen}
      />
      <Drawer.Screen
        name="RECEIPTS & STATEMENTS"
        component={ReceiptsAndStatementsScreen}
      />
      <Drawer.Screen
        name="ReminderAndNotificationScreen"
        component={ReminderAndNotificationScreen}
      />
      {/* <Drawer.Screen name="MyDisputesScreen" component={uploadPaymentProofScreen} /> */}
    </Drawer.Navigator>
  );
}
