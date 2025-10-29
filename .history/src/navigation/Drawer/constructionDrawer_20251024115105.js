import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';

import MyProperties from '../../screens/My Properties dashboard/MyProperties';
import MediaAccess from '../../screens/My Properties dashboard/MediaAccess';
import UpdateFeed from '../../screens/My Properties dashboard/UpdateFeed';
import DocumentVault from '../../screens/My Properties dashboard/DocumentVault';
const Drawer = createDrawerNavigator();

export default function ConstructionDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#FF4D4D',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {fontSize: 15},
      }}>
      <Drawer.Screen
        name="MyProperties"
        component={MyProperties}
        options={{
          drawerIcon: ({color, size}) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="DigitalMediaAccess"
        component={MediaAccess}
        options={{
          drawerIcon: ({color, size}) => (
            <Ionicons name="play-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ConstructionUpdateFeed"
        component={UpdateFeed}
        options={{
          drawerIcon: ({color, size}) => (
            <Ionicons name="construct-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="SecureDocumentVault"
        component={DocumentVault}
        options={{
          drawerIcon: ({color, size}) => (
            <Ionicons name="lock-closed-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
