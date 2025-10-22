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
      <View style={styles.header}>
        <Image
          style={{width: 51, height: 69}}
          source={require('../../asserts/Images/CitiDev-logo2.png')}
        />

        <Text style={styles.headerText}>Password Updated</Text>

        <Text style={[styles.text, {marginTop: 35}]}>
          Your password has been reset successfully.
        </Text>
        <Text style={styles.text}>Use your new password to log in.</Text>
      </View>

      <View style={{alignItems: 'center', marginTop: '10%'}}>
        <FontAwesome name="check" size={64} color="#000" />
      </View>

      <TouchableOpacity onPress={handleLoginNavigation} style={styles.button}>
        <Text style={styles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordUpdate;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: '15%',
  },
  headerText: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'ChronicleDisp-Semibold',
    marginTop: '20%',
  },
  text: {
    color: 'gray',
    fontFamily: 'FuturaStdBook',
    fontSize: 12,
  },
  button: {
    alignItems: 'center',
    marginTop: '15%',
    backgroundColor: '#000',
    padding: 15,
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {color: '#fff', fontFamily: 'FuturaStdMedium', fontSize: 12},
});
