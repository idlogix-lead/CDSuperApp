import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  StatusBar,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {CheckBox} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import instance from '../../BaseURL/BaseUrl';

const {height, width} = Dimensions.get('window');

const SignIn = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const options = [
    // { label: 'Select Language', value: 'Select Language' },
    {label: 'English', value: 'English'},
    // { label: 'Urdu', value: 'Urdu' },
  ];
  const [checked, setChecked] = useState(false);
  const [checkedRem, setCheckedRem] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let protocol, host, port;

  const handleCheckedChange = () => {
    setChecked(!checked);
  };

  const handleCheckedRem = () => {
    setCheckedRem(!checkedRem);
  };

  const login = async () => {
    setIsLoading(true);

    if (!userName.trim()) {
      alert('Please enter userName');
      setIsLoading(false);
      return;
    } else if (!password.trim()) {
      alert('Please enter password');
      setIsLoading(false);
      return;
    }

    const body = {userName, password};
    console.log(body, 'bodyInLoginScreen');

    try {
      // Axios POST request
      const response = await instance.post('/v1/auth/tokens', body, {
        headers: {'Content-Type': 'application/json'},
      });

      console.log('Login Response:', response.data);

      const {token, clients} = response.data;

      // Proper validation
      if (!token || !clients || clients.length === 0) {
        throw new Error('Invalid credentials or missing token.');
      }

      const clientId = clients[0].id;
      const clientName = clients[0].name;

      await AsyncStorage.multiSet([
        ['tokenLogin', token],
        ['userName', userName],
        ['password', password],
        ['clientId', clientId.toString()],
        ['clientName', clientName],
      ]);

      console.log('Token saved successfully:', token);

      // If Remember Me checked
      if (checked) {
        navigation.navigate('MainDrawer', {
          token,
          clientId,
          clientName,
          checkedRem,
          fromProfile: false,
        });
        setIsLoading(false);
        return;
      }

      // ✅ Session creation with PUT (also Axios)
      const roleId = await AsyncStorage.getItem('roleId');
      const organizationId = await AsyncStorage.getItem('organizationId');
      const warehouseId = await AsyncStorage.getItem('warehouseId');

      const sessionResponse = await instance.put(
        '/v1/auth/tokens',
        {
          clientId,
          roleId: 102,
          organizationId: 11,
          warehouseId: 103,
          language: 'en_US',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('Session Response:', sessionResponse.data);

      const {token: sessionToken, userId} = sessionResponse.data;

      if (!sessionToken) {
        throw new Error('Session creation failed. Please try again.');
      }

      await AsyncStorage.multiSet([
        ['token', sessionToken],
        ['userId', userId.toString()],
      ]);

      navigation.navigate('MainDrawer', {
        token: sessionToken,
        userId: userId,
        roleId,
      });
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Login Failed', 'Invalid Credentials. Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const borderColor =
    userName.length === 0
      ? '#ccc' // default
      : userName.length < 9
      ? 'red' // typing but not complete
      : 'green'; // completed 9 digits

  return (
    <ImageBackground
      source={require('../../asserts/Images/SignIn-Background.jpg')}
      style={{flex: 1}}
      resizeMode="cover">
      <StatusBar translucent={true} backgroundColor="transparent" />
      {isLoading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#0050C0" />
        </View>
      ) : (
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={{flex: 1}}>
              {/* Logo */}
              <View style={styles.SignIn_container}>
                <Image
                  source={require('../../asserts/Images/Citidev-White-Logo.png')}
                  style={styles.SignIn_logo}
                />
              </View>

              {/* Heading */}
              <View style={styles.heading_text_container}>
                <Text style={styles.heading_text}>Welcome</Text>
                <Text style={styles.heading_text_2}>
                  Login to access your account
                </Text>
              </View>

              {/* Inputs */}
              <View style={styles.inpucontainer}>
                <TextInput
                  onChangeText={setUserName}
                  value={userName}
                  placeholder="Enter your Passport Number"
                  placeholderTextColor="gray"
                  style={[styles.input, {borderColor}]}
                  maxLength={9}
                />

                <View>
                  <TextInput
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Enter your Password"
                    placeholderTextColor="gray"
                    style={[styles.input, {marginTop: 20}]}
                    secureTextEntry
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
              </View>

              {/* Buttons */}
              <View style={[styles.btnCotainer, {marginTop: '50%'}]}>
                <TouchableOpacity style={styles.btn} onPress={login}>
                  <Text style={styles.btnTxt}>Login</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.btnCotainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('PassportDetail')}
                  style={[styles.btn, {backgroundColor: '#fff'}]}>
                  <Text style={[styles.btnTxt, {color: '#000'}]}>
                    Create an account
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Forgot Password */}
              <TouchableOpacity
                onPress={() => navigation.navigate('Passport')}
                style={{
                  alignSelf: 'flex-end',
                  paddingHorizontal: 20,
                  marginTop: 20,
                }}>
                <Text style={{color: '#fff'}}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </ImageBackground>
  );
};
export default SignIn;
const styles = StyleSheet.create({
  imageCon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height / 7,
    width: width,
  },
  SignIn_container: {
    width: '100%',
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SignIn_logo: {
    width: 190,
    height: 150,
    resizeMode: 'contain',
  },
  circle_adjust: {
    position: 'absolute',
    top: '-30%',
    left: '75%',
    height: 150,
    width: 150,
  },
  circle_adjust_2: {
    position: 'absolute',
    top: 590,
    left: -60,
    height: 120,
    width: 120,
  },
  middleContainer: {
    alignItems: 'center',
  },
  txt: {
    fontSize: 32,
    fontFamily: 'K2D-Bold',
    color: '#800000',
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 3,
  },
  txt2: {
    fontSize: 32,
    fontFamily: 'K2D-Bold',
    color: '#330000',
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 3,
  },
  topMiddleText: {
    flexDirection: 'row',
  },
  input: {
    width: width / 1.3,
    height: 40,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: 'gray',
    fontFamily: 'K2D-Regular',
    borderWidth: 1,
    borderColor: 'gray',
  },
  inpucontainer: {
    alignItems: 'center',
  },
  heading_text_container: {
    width: '80%',
    marginLeft: 35,
  },
  heading_text: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#464646',
    fontFamily: 'K2D-Regular',
    textAlign: 'center',
    marginBottom: 10,
  },
  heading_text_2: {
    color: 'gray',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'K2D-Regular',
    marginBottom: 10,
  },
  imageInput: {
    height: height / 20,
    width: width / 10,
  },
  imageContainer: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  pickerStyle: {
    width: width / 1.3,
    height: 40,
    backgroundColor: '#f8f8f8',
    marginTop: 20,
    borderRadius: 5,
    justifyContent: 'center',
  },
  pickerItem: {
    color: 'gray',
    fontFamily: 'K2D-Regular',
  },
  checkBoxCon: {
    width: width / 1.3,
  },
  checkBoxTxt: {
    fontSize: 14,
    fontFamily: 'K2D-SemiBold',
    color: '#464646',
    fontWeight: 'bold',
  },
  btnCotainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  btnTxt: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'K2D',
  },
  btn: {
    // backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    width: width / 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    height: height / 17,
    // borderRadius: 10,
  },
  WelcomeScreenButton: {
    marginTop: 20,
    alignSelf: 'flex-end',
    marginRight: 20,
    backgroundColor: '#fff',
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderShadowColor: '#000',
    borderShadowOpacity: 0.25,
    borderShadowRadius: 3.84,
    elevation: 5,
  },
});
