import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from '../../BaseURL/BaseUrl';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ResetPassword = ({navigation, route}) => {
  const {Data} = route.params || {};
  console.log('Data received in ResetPassword:', Data);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const ForgetPassword = async () => {
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

    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('guardnerworld');
      if (!token) {
        Alert.alert('Error', 'Authorization token not found.');
        setIsLoading(false);
        return;
      }

      const payload = {password: password};
      const response = await instance.put(
        `/v1/models/ad_user/${Data[0]?.id}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('Password reset successful:', response.data);
      Alert.alert('Success', 'Password updated successfully.');
      navigation.navigate('PasswordUpdate');
    } catch (error) {
      console.error('Error setting password:', error);
      Alert.alert('Error', 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.header}>
        <Image
          style={{width: 52, height: 69}}
          source={require('../../asserts/Images/CitiDev-logo2.png')}
        />
        <Text style={styles.headerText}>Set your password</Text>
      </View>

      <View style={{alignItems: 'center', paddingTop: 30}}>
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

        <Text style={styles.bottomText}>
          Min 8 characters, include uppercase, number, and special character.
        </Text>
      </View>

      <TouchableOpacity
        onPress={ForgetPassword}
        disabled={isLoading}
        style={[styles.button, isLoading && {opacity: 0.6}]}>
        <Text style={styles.buttonText}>
          {isLoading ? 'Please wait...' : 'Reset Password'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: '15%',
  },
  headerText: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'ChronicleDisp-Semibold',
    marginTop: '35%',
  },
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
  bottomText: {
    color: 'gray',
    marginTop: 15,
    fontSize: 10,
    fontFamily: 'FuturaStdBook',
  },
  button: {
    marginTop: 40,
    backgroundColor: '#000',
    paddingVertical: 14,
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'FuturaStdMedium',
    fontSize: 14,
  },
});
