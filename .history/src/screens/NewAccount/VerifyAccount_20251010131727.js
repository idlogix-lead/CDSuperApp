// import React, {useRef, useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   Keyboard,
//   Image,
// } from 'react-native';
// import instance from '../../BaseURL/BaseUrl';

// const VerifyAccount = ({
//   length = 6,
//   resendDelay = 30,
//   onVerify,
//   navigation,
//   route,
// }) => {
//   const {Data, password} = route.params;
//   // console.log('Data received:', Data);
//   // console.log('Password received:', password);
//   const [code, setCode] = useState('');
//   const [timer, setTimer] = useState(resendDelay);
//   const [isWaiting, setIsWaiting] = useState(true);
//   const hiddenInputRef = useRef(null);

//   const sendOTP = async () => {
//     if (!userData || !Array.isArray(userData) || userData.length === 0) {
//       Alert.alert('Error', 'User data not found for OTP sending.');
//       return;
//     }
//     // const Data = Data?.map(item => item.AD_Client_ID.id).toString();
//     const payload = {
//       AD_Client_ID: Data[0]?.AD_Client_ID?.id,
//       AD_User_ID: Data[0]?.id,
//       EMail: Data[0]?.EMail,
//     };
//     console.log(payload, 'payload otpsend////');
//     try {
//       const response = await instance.post('/v1/processes/sendotp', payload);
//       console.log('OTP sent successfully:', response.data);
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//     }
//   };

//   useEffect(() => {
//     sendOTP();
//   }, []);
//   // Start timer
//   useEffect(() => {
//     setTimer(resendDelay);
//     setIsWaiting(true);
//     const t = setInterval(() => {
//       setTimer(prev => {
//         if (prev <= 1) {
//           clearInterval(t);
//           setIsWaiting(false);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(t);
//   }, [resendDelay]);

//   // Verify when OTP complete
//   useEffect(() => {
//     if (code.length === length) {
//       Keyboard.dismiss();
//       if (onVerify) onVerify(code);
//     }
//   }, [code]);

//   const digits = code
//     .split('')
//     .concat(Array.from({length}).fill(''))
//     .slice(0, length);

//   const handleChangeText = text => {
//     const newVal = text.replace(/\D/g, '').slice(0, length);
//     setCode(newVal);
//   };

//   return (
//     <View style={styles.container}>
//       {/* <Text style={styles.title}>Citi Developers</Text> */}
//       <Image
//         style={{width: 100, height: 100, alignSelf: 'center'}}
//         source={require('../../asserts/Images/CitiDev-logo2.png')}
//       />

//       <Text style={styles.heading}>Verify your account</Text>

//       {/* OTP Boxes */}
//       <TouchableOpacity
//         activeOpacity={1}
//         onPress={() => hiddenInputRef.current?.focus()}
//         style={styles.otpRow}>
//         {digits.map((d, i) => (
//           <View
//             key={i}
//             style={[
//               styles.otpBox,
//               i === code.length ? styles.otpBoxActive : null,
//             ]}>
//             <Text style={styles.otpText}>{d || ''}</Text>
//           </View>
//         ))}
//       </TouchableOpacity>

//       {/* Hidden Input */}
//       <TextInput
//         ref={hiddenInputRef}
//         value={code}
//         onChangeText={handleChangeText}
//         keyboardType="number-pad"
//         maxLength={length}
//         style={styles.hiddenInput}
//         autoFocus
//       />

//       <Text style={styles.hint}>
//         Enter the 6-digit OTP sent to your email/phone
//       </Text>

//       {/* Resend / Status */}
//       <Text style={styles.resendText}>
//         {isWaiting
//           ? `Resend (00:${timer.toString().padStart(2, '0')})`
//           : 'Verify / Invalid code. Try again'}
//       </Text>

//       <Text style={styles.smallHint}>Didn’t receive code?</Text>

//       {/* Continue button */}
//       <TouchableOpacity
//         onPress={() => navigation.navigate('AccountActive')}
//         style={styles.button}>
//         <Text style={styles.buttonText}>Continue</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default VerifyAccount;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 24,
//     paddingTop: '10%',
//   },
//   title: {
//     textAlign: 'center',
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   heading: {
//     marginTop: '30%',
//     textAlign: 'center',
//     fontSize: 20,
//     // fontWeight: '600',
//     color: '#000',
//     fontFamily: 'PlayfairDisplay-Bold',
//   },
//   otpRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 30,
//   },
//   otpBox: {
//     width: 50,
//     height: 60,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     marginHorizontal: 6,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   otpBoxActive: {
//     borderColor: '#000',
//   },
//   otpText: {
//     fontSize: 22,
//     fontWeight: '600',
//     color: '#000',
//   },
//   hiddenInput: {
//     position: 'absolute',
//     opacity: 0,
//   },
//   hint: {
//     marginTop: 20,
//     textAlign: 'center',
//     color: '#666',
//   },
//   resendText: {
//     marginTop: 80,
//     textAlign: 'center',
//     fontWeight: '500',
//     color: '#000',
//   },
//   smallHint: {
//     marginTop: 10,
//     textAlign: 'center',
//     color: '#666',
//   },
//   button: {
//     marginTop: 30,
//     backgroundColor: '#000',
//     paddingVertical: 14,
//     // borderRadius: 8,
//   },
//   buttonText: {
//     textAlign: 'center',
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });

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

  // const OTPverify = async () => {
  //   if (!Data || !Data.id) {
  //     Alert.alert('Error', 'User data not found for OTP verification.');
  //     return;
  //   }
  //   const payload = {
  //     AD_User_ID: Data?.id,
  //     otp: code,
  //   };

  //   const token = await AsyncStorage.getItem('guardnerworld');

  //   try {
  //     const response = await instance.post('/v1/processes/verifyotp', payload, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log('OTP verified successfully:', response.data);
  //     navigation.navigate('AccountActive');
  //   } catch (error) {
  //     console.error('Error verifying OTP:', error);
  //     Alert.alert('Error', 'Invalid or expired OTP. Please try again.');
  //   }
  // };

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
        style={{width: 100, height: 100, alignSelf: 'center'}}
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
        <Text style={styles.resendText}>
          Resend (00:{timer.toString().padStart(2, '0')})
        </Text>
      ) : (
        <TouchableOpacity
          onPress={() => {
            sendOTP(); // 🔁 Resend the OTP
            setIsWaiting(true); // Restart the timer
          }}>
          <Text style={[styles.resendText, {color: '#007AFF'}]}>
            Resend Code
          </Text>
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
    paddingTop: '10%',
  },
  heading: {
    marginTop: '30%',
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    fontFamily: 'PlayfairDisplay-Bold',
  },
  otpRow: {flexDirection: 'row', justifyContent: 'center', marginTop: 30},
  otpBox: {
    width: 50,
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBoxActive: {borderColor: '#000'},
  otpText: {fontSize: 22, fontWeight: '600', color: '#000'},
  hiddenInput: {position: 'absolute', opacity: 0},
  hint: {marginTop: 20, textAlign: 'center', color: '#666'},
  resendText: {
    marginTop: 80,
    textAlign: 'center',
    fontWeight: '500',
    color: '#000',
  },
  smallHint: {marginTop: 10, textAlign: 'center', color: '#666'},
  button: {marginTop: 30, backgroundColor: '#000', paddingVertical: 14},
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
