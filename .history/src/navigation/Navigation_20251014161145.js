import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
// import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import SignIn from '../screens/AuthScreens/SignIn';
// import SelectRoleScreen from '../screens/SelectRoleScreens/SelectRoleScreen';
import BottomTab from './BottomTab/BottomTab';
// import FingerPrintScreen from '../screens/AddFingerPrint/FingerPrintScreen';
// import CreateNewReq from '../screens/RequestScreens/CreateNewReq';
// import ChatScreen from '../screens/ChatScreens/ChatScreen';
import SplashIconPopUpScreen from '../screens/SplashScreen/SplashIconPopUpScreen';
// import PropertyLeadger from '../screens/PropertyLeadgerScreens/PropertyLeadger';
// import CompanyInformationScreen from '../screens/CompanyInformationScreen/CompanyInformationScreen';
// import ViewLedger from '../screens/PropertyLeadgerScreens/ViewLedger';
// import Performance from '../screens/RequestScreens/Performance';
// import PoliciesScreen from '../screens/PoliciesScreen/PoliciesScreen';
// import TransactionHistorySrn from '../screens/TransactionHistorySrn/TransactionHistorySrn';
// import LedgerScreenForClient from '../screens/LedgerScreenForClient/LedgerScreenForClient';
// import LedgerDetailScrn from '../screens/LedgerScreenForClient/LedgerDetailScrn';
// import Announcement from '../screens/AnnouncementsScreen/AnnouncementsScreen';
// import AnnouncementsScreenDetailScreen from '../screens/AnnouncementsScreen/AnnouncementsScreenDetailScreen';
// import UserProfile from '../screens/ProfileScreenForClient/ProfileScreenForClient';
// import DuePaymentScreen from '../screens/DuePaymentScreen/DuePaymentScreen';
// import DetailSrnForMyTicket from '../screens/AllTaskScreen/DetailSrnForMyTicket';
// import CloseStatusTricket from '../screens/AllTaskScreen/CloseStatusTricket';
import TopTab from './TopTab/TopTab';
// import AdvertisementSrn from '../screens/AdvertisementSrn/AdvertisementSrn';
import Carousel2 from '../components/HomeScreenComponents/Carousel2';
// import RentalSrn from '../screens/PropertyLeadgerScreens/RentalSrn';
// import InvestmentRentialTopTab from './TopTab/InvestmentRentialTopTab';
// import DetailSrnForRental from '../screens/AllTaskScreen/DetailSrnForRental';
// import RentalPayableSrn from '../screens/RentalPayableSrn/RentalPayableSrn';
// import RentalPayableTab from './TopTab/RentalPayableTab';
// import PayableDetailSrn from '../screens/AllTaskScreen/PayableDetailSrn';
// import InventoryScreen from '../screens/Inventory/InventoryScreen';
// import CrmScreen from '../screens/CrmScreem/CrmScreen';
// import CrmTotal from '../screens/CrmScreem/CRMTotalLeads/CrmTotal';
// import CrmNew from '../screens/CRMNewLeads/CrmNew';
// import CrmConverted from '../screens/CRMConvertedLeads/CrmConverted';
// import CrmExpire from '../screens/CRMExpireLeads/CrmExpire';
// import LeadsDetails from '../screens/CRMLeadsDetails/LeadsDetails';
// import CrmActivitySrn from '../screens/CRMActivity/CrmActivitySrn';
// import ActivityList from '../screens/CRMActivity/ActivityList';
import PassportDetail from '../screens/NewAccount/PassportDetail';
import UserDetails from '../screens/NewAccount/UserDetails';
import SetPassword from '../screens/NewAccount/SetPassword';
import VerifyAccount from '../screens/NewAccount/VerifyAccount';
import AccountActive from '../screens/NewAccount/AccountActive';
import Passport from '../screens/ForgotPassword/Passport';
import OTP from '../screens/ForgotPassword/OTP';
import ResetPassword from '../screens/ForgotPassword/ResetPassword';
import PasswordUpdate from '../screens/ForgotPassword/PasswordUpdate';
import DrawerNavigator from './Drawer';
import PaymentScheduleScreen from '../screens/PayScheduleScrn';
import PaymentOptionScreen from '../screens/PaymentDetails';
import PaymentFailedScreen from '../screens/PaymentFailed';
import PaymentProofScreen from '../screens/uploadPaymentProof';
import PaymentSuccessScreen from '../screens/paymentSucceed';
import PayScheduleScrn from '../screens/PayScheduleScrn';
import PayReminderScrn from '../screens/PayReminderScrn';
import PayOptions from '../screens/PayOptions';
// import Blank from '../screens/Blank';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          name="SplashIconPopUpScreen"
          component={SplashIconPopUpScreen}
        />
        {/* <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} /> */}
        <Stack.Screen name="SignIn" component={SignIn} />
        {/* <Stack.Screen name="Blank" component={Blank} /> */}
        {/* <Stack.Screen name="SelectRoleScreen" component={SelectRoleScreen} /> */}
        {/* <Stack.Screen name="BottomTab" component={BottomTab} /> */}
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
        {/* <Stack.Screen name="FingerPrintScreen" component={FingerPrintScreen} /> */}
        {/* <Stack.Screen name="CreateNewReq" component={CreateNewReq} /> */}
        {/* <Stack.Screen name="ChatScreen" component={ChatScreen} /> */}
        {/* <Stack.Screen name="AllTaskScreen" component={TopTab} /> */}
        <Stack.Screen name="PayScheduleScrn" component={PayScheduleScrn} />
        <Stack.Screen name="PayReminderScrn" component={PayReminderScrn} />
        <Stack.Screen name="PayOptions" component={PayOptions} />
        <Stack.Screen
          name="PaymentSuccessScreen"
          component={PaymentSuccessScreen}
        />
        <Stack.Screen
          name="PaymentScheduleScreen"
          component={PaymentScheduleScreen}
        />
        <Stack.Screen
          name="PaymentOptionScreen"
          component={PaymentOptionScreen}
        />
        <Stack.Screen
          name="PaymentFailedScreen"
          component={PaymentFailedScreen}
        />
        <Stack.Screen
          name="PaymentProofScreen"
          component={PaymentProofScreen}
        />

        {/* <Stack.Screen
          name="CloseStatusTricket"
          component={CloseStatusTricket}
        /> */}
        {/* <Stack.Screen name="ProfileScreenForClient" component={UserProfile} /> */}
        {/* <Stack.Screen
          name="TransactionHistorySrn"
          component={TransactionHistorySrn}
        /> */}
        {/* <Stack.Screen
          name="LedgerScreenForClient"
          component={LedgerScreenForClient}
        /> */}
        {/* <Stack.Screen
          name="AnnounInventorycementsScreen"
          component={Announcement}
        /> */}
        {/* <Stack.Screen name="PoliciesScreen" component={PoliciesScreen} /> */}
        {/* <Stack.Screen name="PropertyLeadger" component={PropertyLeadger} /> */}
        {/* <Stack.Screen name="ProjectName" component={InvestmentRentialTopTab} /> */}
        {/* <Stack.Screen name="ViewLedger" component={ViewLedger} /> */}
        {/* <Stack.Screen
          name="CompanyInformationScreen"
          component={CompanyInformationScreen}
        /> */}
        {/* <Stack.Screen name="Performance" component={Performance} /> */}
        {/* <Stack.Screen name="LedgerDetailScrn" component={LedgerDetailScrn} /> */}
        {/* <Stack.Screen
          name="AnnouncementsScreenDetailScreen"
          component={AnnouncementsScreenDetailScreen}
        /> */}
        {/* <Stack.Screen name="DuePaymentScreen" component={DuePaymentScreen} /> */}
        {/* <Stack.Screen
          name="DetailSrnForMyTicket"
          component={DetailSrnForMyTicket}
        /> */}
        {/* <Stack.Screen name="LeadsDetails" component={LeadsDetails} /> */}
        {/* <Stack.Screen name="AdvertisementSrn" component={AdvertisementSrn} /> */}
        <Stack.Screen name="Carousel2" component={Carousel2} />
        {/* <Stack.Screen name="RentalSrn" component={RentalSrn} /> */}
        {/* <Stack.Screen
          name="DetailSrnForRental"
          component={DetailSrnForRental}
        /> */}
        {/* <Stack.Screen name="RentalPayableSrn" component={RentalPayableSrn} /> */}
        {/* <Stack.Screen name="PayableDetailSrn" component={PayableDetailSrn} /> */}
        {/* <Stack.Screen name="RentalPayable" component={RentalPayableTab} /> */}
        {/* <Stack.Screen name="Inventory" component={InventoryScreen} /> */}
        {/* <Stack.Screen name="CrmScreen" component={CrmScreen} /> */}
        {/* <Stack.Screen name="CrmNew" component={CrmNew} /> */}
        {/* <Stack.Screen name="CrmTotal" component={CrmTotal} /> */}
        {/* <Stack.Screen name="CrmConverted" component={CrmConverted} /> */}
        {/* <Stack.Screen name="CrmExpire" component={CrmExpire} /> */}
        {/* <Stack.Screen name="CrmActivitySrn" component={CrmActivitySrn} /> */}
        {/* <Stack.Screen name="ActivityList" component={ActivityList} /> */}
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
