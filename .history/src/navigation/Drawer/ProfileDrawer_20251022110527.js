import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';

// import MyProperties from '../../screens/My Properties dashboard/MyProperties';
// import MediaAccess from '../../screens/My Properties dashboard/MediaAccess';
// import UpdateFeed from '../../screens/My Properties dashboard/UpdateFeed';
// import DocumentVault from '../../screens/My Properties dashboard/DocumentVault';
import MyProfile from '../../screens/Profile/MyProfile';
import EditProfile from '../../screens/Profile/EditProfile';
import ChangeHistory from '../../screens/Profile/ChangeHistory';
const Drawer = createDrawerNavigator();

export default function ProfileDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#FF4D4D',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: { fontSize: 15 },
      }}
    >
      <Drawer.Screen
        name="My Profile"
        component={MyProfile}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="create-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Change History"
        component={ChangeHistory}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="refresh-circle-outline" size={size} color={color} />
          ),
        }}
      />
     
    </Drawer.Navigator>
  );
}
