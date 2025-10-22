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
import React, {useRef, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from '../../BaseURL/BaseUrl';

const OTP = ({length = 6, resendDelay = 60, onVerify, navigation, route}) => {
  const {Data} = route.params || {};
  // console.log('Data received:', Data);
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(resendDelay);
  const [isWaiting, setIsWaiting] = useState(true);
  const hiddenInputRef = useRef(null);

  const sendOTP = async () => {
    const token = await AsyncStorage.getItem('guardnerworld');

    if (!Data[0] || !Data[0].id) {
      Alert.alert('Error', 'User data not found for OTP sending.');
      return;
    }

    const payload = {
      AD_Client_ID: Data[0]?.AD_Client_ID?.id,
      AD_User_ID: Data[0]?.id,
      EMail: Data[0]?.EMail,
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

  // Verify when OTP complete
  useEffect(() => {
    if (code.length === length) {
      Keyboard.dismiss();
      if (onVerify) onVerify(code);
    }
  }, [code]);

  const digits = code
    .split('')
    .concat(Array.from({length}).fill(''))
    .slice(0, length);

  const handleChangeText = text => {
    const newVal = text.replace(/\D/g, '').slice(0, length);
    setCode(newVal);

    // When OTP complete (6 digits)
    if (newVal.length === length) {
      Keyboard.dismiss();
      handleVerify(newVal);
    }
  };

  const handleVerify = async enteredCode => {
    const otp = enteredCode || code;
    if (!Data[0] || !Data[0].id) {
      Alert.alert('Alert', 'User data not found for OTP verification.');
      return;
    }
    if (otp.length !== length) {
      Alert.alert('Alert', 'Please enter a valid 6-digit OTP.');
      return;
    }
    const token = await AsyncStorage.getItem('guardnerworld');
    const payload = {
      AD_User_ID: Data[0]?.id,
      OTP: otp,
    };
    console.log('Verify OTP payload:', payload);
    try {
      const response = await instance.post('/v1/processes/verifyotp', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('OTP verification successful:', response.data);
      if (response.data?.isError === false) {
        // Proceed to update password
        Alert.alert('Success', 'OTP verified successfully.', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('ResetPassword', {Data}),
          },
        ]);
      }
    } catch (error) {
      console.error('OTP Verification Error:', error);
    }
  };
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Citi Developers</Text> */}
      <Image
        style={{width: 52, height: 69, alignSelf: 'center'}}
        source={require('../../asserts/Images/CitiDev-logo2.png')}
      />

      <Text style={styles.heading}>Verify Reset Code</Text>

      {/* OTP Boxes */}
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

      {/* Hidden Input */}
      <TextInput
        ref={hiddenInputRef}
        value={code}
        placeholder="..."
        placeholderTextColor="gray"
        onChangeText={handleChangeText}
        keyboardType="number-pad"
        maxLength={length}
        style={styles.hiddenInput}
        autoFocus
      />

      <Text style={styles.hint}>
        Enter the 6-digit OTP sent to your email/phone
      </Text>

      {/* Resend / Status */}
      {isWaiting ? (
        <View
          style={{
            alignSelf: 'center',
            marginTop: 40,
          }}>
          <View style={styles.timerContainer}>
            <Text style={styles.resendText}>
              Resend (00:{timer.toString().padStart(2, '0')})
            </Text>
          </View>
          <Text style={styles.timerText}>
            We've sent a reset code to your registered email/phone
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          style={resendButton}
          onPress={() => {
            sendOTP(); // 🔁 Resend the OTP
            setIsWaiting(true); // Restart the timer
          }}>
          <Text style={[styles.resendText]}>Resend Code</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.smallHint}>Didn’t receive code?</Text>
    </View>
  );
};

export default OTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: '15%',
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  heading: {
    marginTop: '30%',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'ChronicleDisp-Semibold',
    color: '#000',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  otpBox: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  otpBoxActive: {
    borderColor: '#000',
  },
  otpText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
  },
  hint: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
    fontFamily: 'FuturaStdBook',
    fontSize: 10,
  },
  timerContainer: {
    justifyContent: 'center',
    backgroundColor: '#828282',
    height: 40,
    width: 235,
  },
  timerText: {
    color: '#828282',
    marginTop: 15,
    fontFamily: 'FuturaStdBook',
    fontSize: 10,
  },
  resendText: {
    // marginTop: 80,
    textAlign: 'center',
    fontWeight: '500',
    color: '#fff',
  },
  resendButton: {
    backgroundColor: '#828282',
    height: 40,
    width: 235,
    alignSelf: 'center',
    marginTop: 40,
    justifyContent: 'center',
  },
  smallHint: {
    marginTop: 10,
    textAlign: 'center',
    color: '#666',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#000',
    paddingVertical: 14,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
