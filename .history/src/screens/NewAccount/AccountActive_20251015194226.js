import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from '../../BaseURL/BaseUrl';

const AccountActive = ({navigation}) => {
  const RoleAssigned = async () => {
    const token = await AsyncStorage.getItem('guardnerworld');

    try {
      const response = await instance.post(
        `/v1/models/AD_User_Roles?$filter=AD_User_ID eq 1002865 AND AD_Role_ID eq 102`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data, 'response');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    RoleAssigned();
  }, []);

  const handleLoginNavigation = async () => {
    // const token = await AsyncStorage.getItem('guardnerworld');
    try {
      await AsyncStorage.removeItem('guardnerworld');
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{alignItems: 'center', marginTop: '15%'}}>
        {/* <Text style={{color: '#000', fontSize: 28, fontWeight: 'bold'}}>
          Citi Developers
        </Text> */}
        <Image
          style={{width: 52, height: 69}}
          source={require('../../asserts/Images/CitiDev-logo2.png')}
        />

        <Text
          style={{
            color: '#000',
            fontSize: 20,
            // fontWeight: 'bold',
            fontFamily: 'ChronicleDisp-Semibold',
            marginTop: '30%',
          }}>
          Your account is now active!
        </Text>

        <Text
          style={{
            color: 'gray',
            marginTop: 15,
            fontSize: 12,
            textAlign: 'center',
            paddingHorizontal: 55,
            marginTop: '10%',
            fontFamily: 'FuturaStdBook',
          }}>
          Welcome to CitiDevelopers. Your account is now active.
        </Text>
        <Text
          style={{
            color: 'gray',
            // marginTop: 15,
            fontSize: 12,
            textAlign: 'center',
            // paddingHorizontal: 55,
            marginTop: '10%',
            fontFamily: 'FuturaStdBook',
          }}>
          A confirmation email has been sent.
        </Text>
      </View>

      <View style={{alignItems: 'center', marginTop: '10%'}}>
        <FontAwesome name="check" size={70} color="#000" />
      </View>

      <TouchableOpacity
        onPress={handleLoginNavigation}
        style={{
          alignItems: 'center',
          marginTop: '15%',
          backgroundColor: '#000',
          padding: 15,
          marginHorizontal: 20,
          // borderRadius: 8,
        }}>
        <Text style={{color: '#fff'}}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountActive;

const styles = StyleSheet.create({});
