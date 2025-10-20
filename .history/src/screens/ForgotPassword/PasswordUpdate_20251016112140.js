import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PasswordUpdate = ({navigation}) => {
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
        {/* <Text style={{color: '#8b7048', fontSize: 28, fontWeight: 'bold'}}>
          Citi Developers
        </Text> */}
        <Image
          style={{width: 51, height: 69}}
          source={require('../../asserts/Images/CitiDev-logo2.png')}
        />

        <Text
          style={{
            color: '#000',
            fontSize: 20,
            // fontWeight: 'bold',
            fontFamily: 'ChronicleDisp-Semibold',
            marginTop: '20%',
          }}>
          Password Updated
        </Text>

        <Text style={{color: 'gray', marginTop: 35}}>
          Your password has been reset successfully.
        </Text>
        <Text style={{color: 'gray'}}>Use your new password to log in.</Text>
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

export default PasswordUpdate;

const styles = StyleSheet.create({});
