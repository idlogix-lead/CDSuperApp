import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountActive = ({navigation}) => {
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
      <View style={{alignItems: 'center', marginTop: '10%'}}>
        {/* <Text style={{color: '#000', fontSize: 28, fontWeight: 'bold'}}>
          Citi Developers
        </Text> */}
        <Image
          style={{width: 100, height: 100}}
          source={require('../../asserts/Images/CitiDev-logo2.png')}
        />

        <Text
          style={{
            color: '#000',
            fontSize: 18,
            // fontWeight: 'bold',
            fontFamily: 'PlayfairDisplay-Bold',
            marginTop: '17%',
          }}>
          Your account is now active!
        </Text>

        <Text
          style={{
            color: 'gray',
            marginTop: 15,
            fontSize: 15,
            textAlign: 'center',
            marginHorizontal: 20,
            marginTop: '10%',
          }}>
          Welcome to CitiDevelopers. Your account is now active. A confirmation
          email has been sent.
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
