import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  StatusBar,
  ImageBackground,
  Animated,
  Alert,
} from 'react-native';
import React, {useEffect, useCallback, useRef, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTab from '../../navigation/BottomTab/BottomTab';
import instance from '../../BaseURL/BaseUrl';

const {height, width} = Dimensions.get('window');
const SplashScreen = ({navigation}) => {
  const getTokens = async () => {
    // try {
    const [
      token,
      tokenOk,
      roleId,
      userId,
      userName,
      password,
      protocol,
      host,
      port,
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
      AsyncStorage.getItem('protocol'),
      AsyncStorage.getItem('host'),
      AsyncStorage.getItem('port'),
      AsyncStorage.getItem('clientId'),
      AsyncStorage.getItem('organizationId'),
      AsyncStorage.getItem('warehouseId'),
    ]);

    if (!protocol || !host || !port) {
      // First time or config deleted manually
      setTimeout(() => {
        navigation.replace('SignIn');
      }, 2000);
      return;
    }

    if (token && userName && password) {
      try {
        const loginResp = await instance.post(`/v1/auth/tokens`, {
          // method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({userName, password}),
        });

        const loginData = await loginResp.json();
        const newToken = loginData.token;

        const sessionResp = await instance.put(`/v1/auth/tokens`, {
          // method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newToken}`,
          },
          body: JSON.stringify({
            clientId,
            roleId: 102,
            organizationId: 11,
            warehouseId: 103,
            language: 'en_US',
          }),
        });

        if (sessionResp.ok) {
          const sessionData = await sessionResp.json();
          await AsyncStorage.setItem('token', sessionData.token);
          setTimeout(() => {
            navigation.replace('PayScheduleScrn', {
              token: sessionData.token,
              userId,
              tokenOk,
              roleId,
            });
          }, 2000);
        } else {
          alert('Session failed');
          navigation.replace('SignIn');
        }
      } catch (error) {
        console.error('Login/session error:', error);
        alert('Error contacting server');
        navigation.replace('SignIn');
      }
    } else {
      navigation.replace('SignIn'); // Config present but not logged in
    }
  };

  useFocusEffect(
    useCallback(() => {
      getTokens();
    }, []),
  );

  //  new splash screen for Animation code
  const backgroundAnimation = useRef(new Animated.Value(0)).current;
  const logoOpacity1 = useRef(new Animated.Value(2)).current;
  const logoOpacity2 = useRef(new Animated.Value(0)).current;
  const bottomViewOpacity = useRef(new Animated.Value(0)).current;

  const scalingDuration = 1000;

  useEffect(() => {
    const animationSequence = Animated.sequence([
      // Fade in the bottom view opacity
      Animated.timing(bottomViewOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Expand the bottom container to cover the entire screen
      Animated.timing(backgroundAnimation, {
        toValue: 1, // Fully expanded
        duration: scalingDuration, // Use the scalingDuration constant
        useNativeDriver: true,
      }),
      // Fade in the logo (or any other image) opacity
      Animated.timing(logoOpacity2, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    animationSequence.start(() => {
      // getTokens();
    });
  }, [scalingDuration]); // Add scalingDuration to the dependency array

  // Interpolations for scaling and opacity
  const bottomContainerStyle = {
    opacity: bottomViewOpacity,
    transform: [
      {
        scale: backgroundAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 120], // Scale from 0 to 120%
        }),
      },
    ],
  };

  return (
    <ImageBackground
      source={require('../../asserts/Images/SignIn-Background.jpg')}
      style={styles.MainContainer}>
      <StatusBar translucent={true} backgroundColor="transparent" />

      {/* this is a new Splash screen */}

      {/* <Animated.View style={styles.AnimatedBackground} /> */}

      <View style={styles.CenterContainer}>
        <Image
          source={require('../../asserts/Images/Citidev-White-Logo.png')}
          style={[styles.LogoImage, {opacity: 1}]}
          resizeMode="contain"
        />
      </View>

      {/* <Animated.View style={[styles.BottomTextContainer, bottomContainerStyle]}>
        <Text style={styles.BottomText}></Text>
      </Animated.View> */}

      {/* <Animated.Image
        source={require('../../asserts/Images/emlaak45.png')}
        style={[
          styles.LogoImage,
          {opacity: logoOpacity2}, // Controlled opacity
        ]}
        resizeMode="contain"
      /> */}
    </ImageBackground>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  AnimatedBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // backgroundColor: '#82CED9',
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
    position: 'absolute',
  },
  BottomTextContainer: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%',
    height: '5%',
  },
  BottomText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
