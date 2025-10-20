import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from '../../BaseURL/BaseUrl';

const SetPassword = ({navigation, route}) => {
  const {userData, userEmail, Phone} = route.params;
  console.log('Data received:', userData);
  console.log('Email received:', userEmail);
  console.log('Phone no', Phone);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

  // 🔹 Live validation for password
  useEffect(() => {
    if (passwordRegex.test(password)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  }, [password]);

  // 🔹 Live validation for confirm password
  useEffect(() => {
    if (confirmPassword && confirmPassword === password) {
      setConfirmPasswordValid(true);
    } else {
      setConfirmPasswordValid(false);
    }
  }, [confirmPassword, password]);

  const handleContinue = () => {
    if (!password || !confirmPassword) {
      Alert.alert('Alert', 'Password and Confirm Password are required.');
      return;
    }

    if (!passwordRegex.test(password)) {
      Alert.alert(
        'Alert',
        'Password must be at least 8 characters long and contain at least one letter, one number, and one special character.',
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Alert', 'Passwords do not match.');
      return;
    }

    navigation.navigate('VerifyAccount', {
      Data: userData,
      password,
      confirmPassword,
      userEmail,
      Phone,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{alignItems: 'center', marginTop: '15%'}}>
        <Image
          style={{width: 52, height: 69}}
          source={require('../../asserts/Images/CitiDev-logo2.png')}
        />
      </View>
      <View style={{marginTop: '15%', marginLeft: 20}}>
        <Text
          style={{
            color: '#000',
            fontSize: 20,
            fontWeight: '500',
            fontFamily: 'FuturaStdBook',
          }}>
          User ID
        </Text>
      </View>
      <View
        style={{
          width: '90%',
          height: 40,
          alignSelf: 'center',
          marginBottom: 15,
          marginTop: 15,
          backgroundColor: '#fff',
          justifyContent: 'center',
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: 'gray',
        }}>
        <Text
          style={{color: 'gray', fontSize: 16, fontFamily: 'FuturaStdBook'}}>
          {userData?.SF_AccountID || 'N/A'}
        </Text>
      </View>

      <View style={{marginLeft: 20}}>
        <Text
          style={{
            color: '#000',
            fontSize: 20,
            fontWeight: '500',
            marginTop: 15,
            fontFamily: 'FuturaStdBook',
          }}>
          Set Your Password
        </Text>
      </View>

      {/* Password Field */}
      <View
        style={[
          styles.inputContainer,
          {borderColor: password ? (passwordValid ? 'green' : 'red') : 'red'},
        ]}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={22}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password Field */}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: confirmPassword
              ? confirmPasswordValid
                ? 'green'
                : 'red'
              : 'red',
          },
        ]}>
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="gray"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          style={styles.eyeIcon}>
          <Ionicons
            name={showConfirmPassword ? 'eye-off' : 'eye'}
            size={22}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            color: 'gray',
            marginTop: 15,
            fontSize: 10,
            fontFamily: 'FuturaStdBook',
          }}>
          Min 8 Characters, Include Uppercase, number, and special character.
        </Text>

        <TouchableOpacity
          onPress={handleContinue}
          style={{
            backgroundColor: '#000',
            padding: 15,
            marginTop: 30,
            width: '90%',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff', fontFamily: 'FuturaStdMedium'}}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SetPassword;

const styles = StyleSheet.create({
  inputContainer: {
    width: '90%',
    height: 40,
    alignSelf: 'center',
    marginTop: 15,
    borderWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: '#000',
    fontFamily: 'FuturaStdBook',
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
});
