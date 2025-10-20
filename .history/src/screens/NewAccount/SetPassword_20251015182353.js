import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from '../../BaseURL/BaseUrl';

const SetPassword = ({navigation, route}) => {
  const {userData, userEmail} = route.params;
  console.log('Data received:', userData);
  console.log('Email received:', userEmail);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleCountinue = async () => {
    setPasswordError(false);
    setConfirmPasswordError(false);

    if (!password.trim() || !confirmPassword.trim()) {
      setPasswordError(!password.trim());
      setConfirmPasswordError(!confirmPassword.trim());
      Alert.alert('Alert', 'Password and Confirm Password are required.');
      return; // stop function here
    }

    if (!password || !confirmPassword) {
      setPasswordError(true);
      setConfirmPasswordError(true);
      Alert.alert('Alert', 'Please enter and confirm your password.');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError(true);
      setConfirmPasswordError(true);
      Alert.alert('Alert', 'Passwords do not match.');
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      Alert.alert(
        'Alert',
        'Password must be at least 8 characters long and contain at least one letter, one number, and one special character.',
      );
      return;
    }

    navigation.navigate('VerifyAccount', {
      Data: userData,
      password: password,
      confirmPassword: confirmPassword,
      userEmail: userEmail,
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
          height: 50,
          alignSelf: 'center',
          marginBottom: 15,
          marginTop: 15,
          backgroundColor: '#f8f8f8',
          justifyContent: 'center',
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: 'gray',
        }}>
        <Text style={{color: 'gray', fontSize: 16}}>
          {userData?.SF_AccountID || 'N/A'}
        </Text>
      </View>

      <View style={{marginLeft: 20}}>
        <Text
          style={{
            color: '#000',
            fontSize: 20,
            fontWeight: '500',
            marginTop: 20,
            fontFamily: 'FuturaStdBook',
          }}>
          Set Your Password
        </Text>
      </View>

      {/* Password Field */}
      <View
        style={[styles.inputContainer, passwordError && {borderColor: 'red'}]}>
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
          confirmPasswordError && {borderColor: 'red'},
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
        <Text style={{color: 'gray', marginTop: 15, fontSize: 12}}>
          Min 8 Characters, Include Uppercase, number, and special character.
        </Text>

        <TouchableOpacity
          onPress={handleCountinue}
          style={{
            backgroundColor: '#000',
            padding: 15,
            marginTop: 30,
            width: '90%',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SetPassword;

const styles = StyleSheet.create({
  inputContainer: {
    width: '90%',
    height: 50,
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
    fontFamily: 'K2D-Regular',
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
});
