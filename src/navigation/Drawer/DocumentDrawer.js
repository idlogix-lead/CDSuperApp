import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';

// import MyProperties from '../../screens/My Properties dashboard/MyProperties';
// import MediaAccess from '../../screens/My Properties dashboard/MediaAccess';
// import UpdateFeed from '../../screens/My Properties dashboard/UpdateFeed';
// import DocumentVault from '../../screens/My Properties dashboard/DocumentVault';
import MyProfile from '../../screens/Profile/MyProfile';
import EditProfile from '../../screens/Profile/EditProfile';
import ChangeHistory from '../../screens/Profile/ChangeHistory';
import DocCenter from '../../screens/DocumentVault/DocCenter';
import DocUpload from '../../screens/DocumentVault/DocUpload';
import DocHistory from '../../screens/DocumentVault/DocHistory';
const Drawer = createDrawerNavigator();

export default function DocumentDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#FF4D4D',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {fontSize: 15},
      }}>
      <Drawer.Screen
        name="DocCenter"
        component={DocCenter}
        options={{
          drawerIcon: ({color, size}) => (
            <Ionicons name="document-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="DocumentUpload"
        component={DocUpload}
        options={{
          drawerIcon: ({color, size}) => (
            <Ionicons name="cloud-upload-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="DocumentHistory"
        component={DocHistory}
        options={{
          drawerIcon: ({color, size}) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
