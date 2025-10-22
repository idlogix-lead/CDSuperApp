import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from '../../BaseURL/BaseUrl';

const AccountActive = ({navigation}) => {
  const handleLoginNavigation = async () => {
    try {
      await AsyncStorage.removeItem('guardnerworld');
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={header}>
        <Image
          style={{width: 52, height: 69}}
          source={require('../../asserts/Images/CitiDev-logo2.png')}
        />

        <Text style={headerText}>Your account is now active!</Text>

        <Text style={[styles.text, {marginTop: '12%'}]}>
          Welcome to CitiDevelopers. Your account is now active.
        </Text>
        <Text style={styles.text}>A confirmation email has been sent.</Text>
      </View>

      <View style={{alignItems: 'center', marginTop: '10%'}}>
        <FontAwesome name="check" size={64} color="#000" />
      </View>

      <TouchableOpacity onPress={handleLoginNavigation} style={styles.button}>
        <Text style={{color: '#fff', fontFamily: 'FuturaStdMedium'}}>
          Go to Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountActive;

const styles = StyleSheet.create({
  header: {alignItems: 'center', marginTop: '15%'},
  headerText: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'ChronicleDisp-Semibold',
    marginTop: '30%',
  },
  text: {
    color: 'gray',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'FuturaStdBook',
  },
  button: {
    alignItems: 'center',
    marginTop: '15%',
    backgroundColor: '#000',
    padding: 15,
    marginHorizontal: 20,
  },
});
