import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
  Alert,
} from 'react-native';
import instance from '../../BaseURL/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OTP from '../ForgotPassword/OTP';

const VerifyAccount = ({length = 6, resendDelay = 60, navigation, route}) => {
  const {Data, password, userEmail} = route.params || {};
  // console.log(userEmail, 'userEmail in verify////');
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(resendDelay);
  const [isWaiting, setIsWaiting] = useState(true);
  const hiddenInputRef = useRef(null);

  // 🧠 Fix: Correctly send OTP
  const sendOTP = async () => {
    const token = await AsyncStorage.getItem('guardnerworld');

    if (!Data || !Data.id) {
      Alert.alert('Error', 'User data not found for OTP sending.');
      return;
    }

    const payload = {
      AD_Client_ID: Data?.AD_Client_ID?.id,
      AD_User_ID: Data?.id,
      Email: userEmail,
    };

    console.log('OTP payload:', payload);

    try {
      const response = await instance.post('/v1/processes/sendotp', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('OTP sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  useEffect(() => {
    sendOTP();
  }, []);

  // 🕒 Timer logic
  useEffect(() => {
    if (!isWaiting) return; // Only run timer when waiting

    setTimer(resendDelay);
    const t = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(t);
          setIsWaiting(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(t);
  }, [isWaiting]);

  // Handle OTP text
  const handleChangeText = text => {
    const newVal = text.replace(/\D/g, '').slice(0, length);
    setCode(newVal);
  };

  // 🧾 OTP verify handler
  const handleVerify = async () => {
    if (!Data || !Data.id) {
      Alert.alert('Error', 'User data not found for OTP verification.');
      return;
    }

    if (!password || password.trim() === '') {
      Alert.alert('Error', 'Password is required to continue.');
      return;
    }

    if (code.length !== length) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
      return;
    }
    const token = await AsyncStorage.getItem('guardnerworld');
    const payload = {
      AD_User_ID: Data?.id,
      OTP: code,
    };

    console.log('Verifying OTP with payload:', payload);

    try {
      const response = await instance.post('/v1/processes/verifyotp', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Verification successful:', response.data);
      if (response.data?.isError === false) {
        // Proceed to update password
        const updatePayload = {
          // AD_User_ID: Data?.id,
          password: password,
        };

        console.log('Updating password with payload:', updatePayload);

        const updateRes = await instance.put(
          `/v1/models/ad_user/${Data.id}`,
          updatePayload,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log('Password updated successfully:', updateRes.data);

        if (
          updateRes.data?.isError === false ||
          updateRes.data?.id || // check if updated record is returned
          updateRes.status === 200
        ) {
          console.log('Password create successfully');
          // Alert.alert(
          //   'Success',
          //   'Your account has been verified successfully.',
          // );
          navigation.navigate('AccountActive');
        } else {
          Alert.alert('Error', 'Failed to update password.');
        }
      } else {
        Alert.alert('Error', 'Invalid or expired OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Alert.alert('Error', 'Invalid or expired OTP. Please try again.');
    }
  };

  const digits = code
    .split('')
    .concat(Array.from({length}).fill(''))
    .slice(0, length);

  return (
    <View style={styles.container}>
      <Image
        style={{width: 52, height: 69, alignSelf: 'center'}}
        source={require('../../asserts/Images/CitiDev-logo2.png')}
      />

      <Text style={styles.heading}>Verify your account</Text>

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => hiddenInputRef.current?.focus()}
        style={styles.otpRow}>
        {digits.map((d, i) => (
          <View
            key={i}
            style={[
              styles.otpBox,
              i === code.length ? styles.otpBoxActive : null,
            ]}>
            <Text style={styles.otpText}>{d || ''}</Text>
          </View>
        ))}
      </TouchableOpacity>

      <TextInput
        ref={hiddenInputRef}
        value={code}
        onChangeText={handleChangeText}
        keyboardType="number-pad"
        maxLength={length}
        style={styles.hiddenInput}
        autoFocus
      />

      <Text style={styles.hint}>Enter the 6-digit OTP sent to your email</Text>

      {isWaiting ? (
        <View
          style={{
            backgroundColor: '#828282',
            height: 40,
            width: 235,
            alignSelf: 'center',
            marginTop: 80,
            justifyContent: 'center',
          }}>
          <Text style={styles.resendText}>
            Resend (00:{timer.toString().padStart(2, '0')})
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: '#828282',
            height: 40,
            width: 235,
            alignSelf: 'center',
            marginTop: 80,
            justifyContent: 'center',
          }}
          onPress={() => {
            sendOTP(); // 🔁 Resend the OTP
            setIsWaiting(true); // Restart the timer
          }}>
          <Text style={[styles.resendText]}>Resend Code</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.smallHint}>Didn’t receive the code?</Text>

      <TouchableOpacity onPress={handleVerify} style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: '15%',
  },
  heading: {
    marginTop: '30%',
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    fontFamily: 'ChronicleDisp-Semibold',
  },
  otpRow: {flexDirection: 'row', justifyContent: 'center', marginTop: 30},
  otpBox: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    // borderRadius: 8,
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBoxActive: {borderColor: '#000'},
  otpText: {fontSize: 22, fontWeight: '600', color: '#000'},
  hiddenInput: {position: 'absolute', opacity: 0},
  hint: {marginTop: 20, textAlign: 'center', color: '#666'},
  resendText: {
    // marginTop: 80,
    // justifyContent: 'center',
    textAlign: 'center',
    fontWeight: '500',
    color: '#fff',
  },
  smallHint: {
    marginTop: 10,
    textAlign: 'center',
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  button: {marginTop: 30, backgroundColor: '#000', paddingVertical: 14},
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
