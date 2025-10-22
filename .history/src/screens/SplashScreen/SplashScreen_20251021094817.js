import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  StatusBar,
  ImageBackground,
  Alert,
} from 'react-native';
import React, {useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from '../../BaseURL/BaseUrl';

const {height, width} = Dimensions.get('window');

const SplashScreen = ({navigation}) => {
  const getTokens = async () => {
    try {
      const [
        token,
        tokenOk,
        roleId,
        userId,
        userName,
        password,
        clientId,
        organizationId,
        warehouseId,
      ] = await Promise.all([
        AsyncStorage.getItem('token'),
        AsyncStorage.getItem('tokenOk'),
        AsyncStorage.getItem('roleId'),
        AsyncStorage.getItem('userId'),
        AsyncStorage.getItem('userName'),
        AsyncStorage.getItem('password'),
        AsyncStorage.getItem('clientId'),
        AsyncStorage.getItem('organizationId'),
        AsyncStorage.getItem('warehouseId'),
      ]);

      // If not logged in yet → go to SignIn
      if (!token || !userName || !password) {
        setTimeout(() => {
          navigation.replace('SignIn');
        }, 1500);
        return;
      }

      // Try to refresh login session
      try {
        const loginResp = await instance.post(`/v1/auth/tokens`, {
          userName,
          password,
        });

        const loginData = loginResp.data;
        const newToken = loginData?.token;

        const sessionResp = await instance.put(
          `/v1/auth/tokens`,
          {
            clientId,
            roleId: 102,
            organizationId: 11,
            warehouseId: 103,
            language: 'en_US',
          },
          {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          },
        );

        if (sessionResp.status === 200) {
          const sessionData = sessionResp.data;
          await AsyncStorage.setItem('token', sessionData.token);

          setTimeout(() => {
            navigation.replace('PayScheduleScrn', {
              token: sessionData.token,
              userId,
              tokenOk,
              roleId,
            });
          }, 1500);
        } else {
          Alert.alert('Session failed');
          navigation.replace('SignIn');
        }
      } catch (error) {
        console.error('Login/session error:', error);
        Alert.alert('Error contacting server');
        navigation.replace('SignIn');
      }
    } catch (e) {
      console.error('Error retrieving tokens:', e);
      navigation.replace('SignIn');
    }
  };

  useFocusEffect(
    useCallback(() => {
      getTokens();
    }, []),
  );

  return (
    <ImageBackground
      source={require('../../asserts/Images/SignIn-Background.jpg')}
      style={styles.MainContainer}>
      <StatusBar translucent={true} backgroundColor="transparent" />

      <View style={styles.CenterContainer}>
        <Image
          source={require('../../asserts/Images/Citidev-White-Logo.png')}
          style={styles.LogoImage}
          resizeMode="contain"
        />
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  CenterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  LogoImage: {
    width: 200,
    height: 150,
  },
});
