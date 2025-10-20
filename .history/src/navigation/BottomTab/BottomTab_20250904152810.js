import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreens/HomeScreen';
import HelpScreen from '../../screens/HelpScreen/HelpScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AnnouncementsScreen from '../../screens/AnnouncementsScreen/AnnouncementsScreen';
import UserProfile from '../../screens/ProfileScreens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTab = ({route, navigation}) => {
  const {token, tokenOk, roleId, userId} = route.params;
  //   console.log(token, 'jfvjkbefdvb');

  return (
    <SafeAreaView style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            paddingVertical: 6,
            height: 60,
            // borderRadius: 80,
            width: '100%',
            alignSelf: 'center',
            // marginBottom: 2,
            paddingBottom: 3,

            // position:"absolute"
          },
          tabBarIcon: ({focused, color}) => {
            let icon;
            let iconSize = focused ? 34 : 30;
            if (route.name === 'Home') {
              icon = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Help') {
              icon = focused ? 'help-circle' : 'help-circle-outline';
            } else if (route.name === 'Notification') {
              icon = focused ? 'bell' : 'bell-outline';
            } else if (route.name === 'UserProfile') {
              icon = focused ? 'account' : 'account-outline';
            }

            // You can return any component that you like here!
            return (
              <MaterialCommunityIcons
                name={icon}
                size={iconSize}
                color={color}
              />
            );
          },
        })}>
        <Tab.Screen
          options={{
            // tabBarActiveTintColor: '#2B3944',
            tabBarActiveTintColor: '#82CED9',
          }}
          name="Home"
          component={HomeScreen}
          size={36}
          initialParams={{tokenOk, token, roleId}}
        />

        <Tab.Screen
          name="Help"
          component={HelpScreen}
          options={{
            // tabBarActiveTintColor: '#147D64'

            // tabBarActiveTintColor:'rgba(155,65,136,39)',
            tabBarActiveTintColor: '#2B3944',
            // headerShown: false,
            // tabBarIcon: ({ color, size }) => (
            //     <Feather name="bell" size={31} color={color} />
            // ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={AnnouncementsScreen}
          options={{
            // tabBarActiveTintColor: '#147D64'

            // tabBarActiveTintColor:'rgba(155,65,136,39)',
            tabBarActiveTintColor: '#2B3944',
            // headerShown: false,
            // tabBarIcon: ({ color, size }) => (
            //     <Feather name="bell" size={31} color={color} />
            // ),
          }}
        />
        <Tab.Screen
          options={{
            //  tabBarActiveTintColor: '#147D64'
            // tabBarActiveTintColor:'rgba(155,65,136,39)',
            tabBarActiveTintColor: '#2B3944',
          }}
          name="UserProfile"
          component={UserProfile}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
