import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Home Screen
import Home from '../screens/My Properties dashboard/Home';
import ConstructionDrawer from './Drawer/constructionDrawer';
import ProfileDrawer from './Drawer/ProfileDrawer';
import DocumentDrawer from './Drawer/DocumentDrawer';

// Dummy placeholder screens
const PaymentBilling = () => (
  <View style={styles.screen}>
    <Text>Payment & Billing Screen</Text>
  </View>
);

const Notifications = () => (
  <View style={styles.screen}>
    <Text>Notifications Screen</Text>
  </View>
);
const Settings = () => (
  <View style={styles.screen}>
    <Text>Settings Screen</Text>
  </View>
);
const CustomerSupport = () => (
  <View style={styles.screen}>
    <Text>Customer Support Screen</Text>
  </View>
);

const Drawer = createDrawerNavigator();

const MainDrawer = (props, navigation) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1}}>
      {/* Header Section */}
      <View style={styles.profileSection}>
        <View>
          {/* {' '} */}
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            }}
            style={styles.profileImage}
          />
        </View>
        <View style={{marginLeft: '5%'}}>
          <Text style={styles.profileName}>[customerName]</Text>
          <Text style={styles.profileRole}>Tower A – Unit 101</Text>
        </View>
      </View>

      {/* Drawer Items */}
      <View style={styles.drawerItemsContainer}>
        <DrawerItem
          label="Home"
          labelStyle={styles.drawerLabel}
          icon={({color, size}) => (
            <Ionicons name="home" color={color} size={18} />
          )}
          onPress={() => props.navigation.navigate('Home')}
        />
        <DrawerItem
          label="Payment & Billing"
          labelStyle={styles.drawerLabel}
          icon={({color, size}) => (
            <Ionicons name="card-outline" color={color} size={18} />
          )}
          onPress={() => props.navigation.navigate('PaymentBilling')}
        />
        <DrawerItem
          label="Construction Updates"
          labelStyle={styles.drawerLabel}
          icon={({color, size}) => (
            <Ionicons name="business-outline" color={color} size={18} />
          )}
          onPress={() => props.navigation.navigate('ConstructionUpdates')}
        />
        <DrawerItem
          label="Document Vault"
          labelStyle={styles.drawerLabel}
          icon={({color, size}) => (
            <Ionicons name="document-outline" color={color} size={18} />
          )}
          onPress={() => props.navigation.navigate('DocumentDrawer')}
        />
        <DrawerItem
          label="My Profile & KYC"
          labelStyle={styles.drawerLabel}
          icon={({color, size}) => (
            <Ionicons name="person-outline" color={color} size={18} />
          )}
          onPress={() => props.navigation.navigate('MyProfile')}
        />
        <DrawerItem
          label="Notifications"
          labelStyle={styles.drawerLabel}
          icon={({color, size}) => (
            <Ionicons name="notifications-outline" color={color} size={18} />
          )}
          onPress={() => props.navigation.navigate('Notifications')}
        />
        <DrawerItem
          label="Settings"
          labelStyle={styles.drawerLabel}
          icon={({color, size}) => (
            <Ionicons name="settings-outline" color={color} size={18} />
          )}
          onPress={() => props.navigation.navigate('Settings')}
        />
        <DrawerItem
          label="Customer Support"
          labelStyle={styles.drawerLabel}
          icon={({color, size}) => (
            <Ionicons name="call" color={color} size={18} />
          )}
          onPress={() => props.navigation.navigate('CustomerSupport')}
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('SignIn')}>
          <Ionicons name="log-out-outline" size={18} color="#FF4D4D" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};
// export default MainDrawer;
export default function App() {
  return (
    <Drawer.Navigator
      drawerContent={props => <MainDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#000',
        drawerInactiveTintColor: '#444',
        drawerLabelStyle: {marginLeft: -10, fontSize: 14},
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="PaymentBilling" component={PaymentBilling} />
      <Drawer.Screen
        name="ConstructionUpdates"
        component={ConstructionDrawer}
      />
      <Drawer.Screen name="DocumentDrawer" component={DocumentDrawer} />
      <Drawer.Screen name="MyProfile" component={ProfileDrawer} />
      <Drawer.Screen name="Notifications" component={Notifications} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="CustomerSupport" component={CustomerSupport} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 80,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 15,
    marginBottom: 2,
  },
  profileName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  profileRole: {
    fontSize: 12,
    color: '#555',
  },
  drawerItemsContainer: {
    flex: 1,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  drawerLabel: {
    fontSize: 13,
    color: '#000',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoutText: {
    color: '#FF4D4D',
    fontWeight: '600',
    fontSize: 14,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
