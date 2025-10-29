import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import SignIn from '../screens/AuthScreens/SignIn';
import PassportDetail from '../screens/NewAccount/PassportDetail';
import UserDetails from '../screens/NewAccount/UserDetails';
import SetPassword from '../screens/NewAccount/SetPassword';
import VerifyAccount from '../screens/NewAccount/VerifyAccount';
import AccountActive from '../screens/NewAccount/AccountActive';
import Passport from '../screens/ForgotPassword/Passport';
import OTP from '../screens/ForgotPassword/OTP';
import ResetPassword from '../screens/ForgotPassword/ResetPassword';
import PasswordUpdate from '../screens/ForgotPassword/PasswordUpdate';
import PayScheduleScrn from '../screens/PayScheduleScrn';
import PayReminderScrn from '../screens/PayReminderScrn';
import PayOptions from '../screens/PayOptions';
import PayDetails from '../screens/PayDetails';
import PayProof from '../screens/PayProof';
import PaySucceed from '../screens/PaySucceed';
import ReceiptsAndStatement from '../screens/ReceiptsAndStatement';
import PaymentFailed from '../screens/PaymentFailed';
import RaiseDispute from '../screens/RaiseDispute';
import MyDisputes from '../screens/MyDisputes';
import RemindersAndNotifications from '../screens/RemindersAndNotifications';
import MainDrawer from './MainDrawer';
import DocSubmitted from '../screens/DocumentVault/DocSubmitted';
import DocCenter from '../screens/DocumentVault/DocCenter';
import DocUpload from '../screens/DocumentVault/DocUpload';
import Kyc from '../screens/Profile/KYC/Kyc';
import KycInsights from '../screens/Profile/KYC/KycInsights';
import KycSuccess from '../screens/Profile/KYC/KycSuccess';
import MyProfile from '../screens/Profile/MyProfile';
import EditSuccess from '../screens/Profile/EditSuccess';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="MainDrawer" component={MainDrawer} />
        <Stack.Screen name="DocCenter" component={DocCenter} />
        <Stack.Screen name="DocumentUpload" component={DocUpload} />
        <Stack.Screen name="DocSubmitted" component={DocSubmitted} />
        <Stack.Screen name="Kyc" component={Kyc} />
        <Stack.Screen name="KycInsights" component={KycInsights} />
        <Stack.Screen name="KycSuccess" component={KycSuccess} />
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="EditSuccess" component={EditSuccess} />
        {/* <Stack.Screen name="Drawer" component={DrawerNavigator} /> */}
        <Stack.Screen name="PayScheduleScrn" component={PayScheduleScrn} />
        <Stack.Screen name="PayReminderScrn" component={PayReminderScrn} />
        <Stack.Screen name="PayOptions" component={PayOptions} />
        <Stack.Screen name="PayDetails" component={PayDetails} />
        <Stack.Screen name="paySucceed" component={PaySucceed} />
        <Stack.Screen name="PaymentFailed" component={PaymentFailed} />
        <Stack.Screen name="PayProof" component={PayProof} />
        <Stack.Screen
          name="ReceiptsAndStatement"
          component={ReceiptsAndStatement}
        />
        <Stack.Screen name="RaiseDispute" component={RaiseDispute} />
        <Stack.Screen name="MyDisputes" component={MyDisputes} />
        <Stack.Screen
          name="RemindersAndNotifications"
          component={RemindersAndNotifications}
        />

        <Stack.Screen name="PassportDetail" component={PassportDetail} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
        <Stack.Screen name="SetPassword" component={SetPassword} />
        <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
        <Stack.Screen name="AccountActive" component={AccountActive} />
        <Stack.Screen name="Passport" component={Passport} />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="PasswordUpdate" component={PasswordUpdate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
