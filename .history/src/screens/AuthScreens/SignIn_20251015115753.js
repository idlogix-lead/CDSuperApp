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

  // useEffect(() => {
  //   const URL = `${protocol}://${host}:${port}/api/v1/auth/tokens`;
  //   console.log(URL, 'LoginSrnURL');
  // }, []);

  // const login = async () => {
  //   setIsLoading(true); // Begin loading

  //   // Validation
  //   if (!userName.trim()) {
  //     alert('Please enter userName');
  //     setIsLoading(false);
  //     return;
  //   } else if (!password.trim()) {
  //     alert('Please enter password');
  //     setIsLoading(false);
  //     return;
  //   }

  //   const body = {
  //     userName: userName,
  //     password: password,
  //   };
  //   console.log(body, 'bodyInLoginScreen');
  //   // Prepare for API call
  //   // const protocol = await AsyncStorage.getItem('protocol');
  //   // const host = await AsyncStorage.getItem('host');
  //   // const port = await AsyncStorage.getItem('port');

  //   try {
  //     // Attempt to login
  //     // const URL = `/v1/auth/tokens`;
  //     // console.log(URL, 'LoginSrnURL');
  //     const loginResponse = await instance.post(`/v1/auth/tokens`, body, {
  //       // method: 'POST',
  //       headers: {'Content-Type': 'application/json'},
  //     });
  //     console.log(loginResponse, 'loginResponse');

  //     if (!loginResponse.ok) {
  //       throw new Error(
  //         'Authentication failed. Please check your credentials.',
  //       );
  //     }

  //     const {token, clients} = await loginResponse.json();
  //     const clientId = clients[0].id;
  //     const clientName = clients[0].name;

  //     // Store relevant data in AsyncStorage
  //     await AsyncStorage.multiSet([
  //       ['tokenLogin', token],
  //       ['userName', userName],
  //       ['password', password],
  //       ['clientId', clientId.toString()],
  //       ['clientName', clientName],
  //     ]);

  //     console.log(token, 'tokenInLoginScreen');
  //     console.log(userName, 'userName');
  //     console.log(password, 'password');
  //     console.log(clientName, 'clientName');
  //     if (checked) {
  //       navigation.navigate('SelectRoleScreen', {
  //         token,
  //         clientId,
  //         clientName,
  //         protocol,
  //         host,
  //         port,
  //         checkedRem,
  //         fromProfile: false,
  //       });
  //       setIsLoading(false);
  //       return;
  //     }

  //     const sessionResponse = await instance.put(`/v1/auth/tokens`, {
  //       // method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         clientId,
  //         roleId: await AsyncStorage.getItem('roleId'),
  //         organizationId: await AsyncStorage.getItem('organizationId'),
  //         warehouseId: await AsyncStorage.getItem('warehouseId'),
  //         language: 'en_US',
  //       }),
  //     });

  //     if (!sessionResponse.ok) {
  //       // throw new Error('Session creation failed. Please try again.');
  //       // throw new Error('Please select a Select Role and Remember me');
  //       throw new Error(
  //         "Please select both 'Select Role' and 'Remember Me' to continue.",
  //       );
  //     }

  //     const sessionData = await sessionResponse.json();
  //     await AsyncStorage.multiSet([
  //       ['token', sessionData.token],
  //       ['tokenOk', sessionData.userId.toString()],
  //     ]);

  //     navigation.navigate(
  //       userName.trim() === getPreUser
  //         ? 'FingerPrintScreen'
  //         : 'SelectRoleScreen',
  //       {
  //         token: sessionData.token,
  //         tokenOk: sessionData.userId,
  //         roleId: await AsyncStorage.getItem('roleId'),
  //       },
  //     );
  //   } catch (error) {
  //     console.error(error, 'Login Error');
  //     alert(error.message);
  //   } finally {
  //     setIsLoading(false); // End loading
  //   }
  // };

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
        navigation.navigate('PayScheduleScrn', {
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
        ['tokenOk', userId.toString()],
      ]);

      navigation.navigate('PayScheduleScrn', {
        token: sessionToken,
        tokenOk: userId,
        roleId,
      });
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // const navigateBack = () => {
  //   const unsubscribe = navigation.addListener('focus', async () => {
  //     protocol = await AsyncStorage.getItem('protocol');
  //     host = await AsyncStorage.getItem('host');
  //     port = await AsyncStorage.getItem('port');
  //     setUserName('');
  //     setPassword('');
  //     setChecked(false);
  //     setCheckedRem(false);
  //     setIsLoading(false);
  //   });

  //   return unsubscribe;
  // };

  // useEffect(() => {
  //   navigateBack();

  //   const backAction = () => {
  //     navigation.navigate('WelcomeScreen');
  //     return true;
  //   };
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );
  //   return () => backHandler.remove();
  // }, [navigation]);

  // return (
  //   <>
  //     <ImageBackground
  //       resizeMode="cover"
  //       style={{flex: 1}}
  //       source={require('../../asserts/Images/SignIn-Background.jpg')}>
  //       {isLoading && (
  //         <View style={{alignItems: 'center', justifyContent: 'center'}}>
  //           <ActivityIndicator size="large" color="#0050C0" />
  //         </View>
  //       )}
  //       {!isLoading && (
  //         <View style={{flex: 1, backgroundColor: '#fbf7f2'}}>
  //           <View style={styles.SignIn_container}>
  //             <Image
  //               source={require('../../asserts/Images/CitiDev-logo2.png')}
  //               style={styles.SignIn_logo}
  //             />
  //           </View>
  //           <View style={styles.heading_text_container}>
  //             <Text style={styles.heading_text}>Welcome</Text>
  //             <Text style={styles.heading_text_2}>
  //               Login to access your account
  //             </Text>
  //           </View>
  //           <View style={styles.inpucontainer}>
  //             {/* First input */}
  //             <View style={{marginTop: 12, flexDirection: 'row'}}>
  //               <TextInput
  //                 onChangeText={text => setUserName(text)}
  //                 value={userName}
  //                 placeholder="Enter your Name"
  //                 placeholderTextColor="gray"
  //                 style={styles.input}
  //               />
  //             </View>

  //             {/* Second input */}
  //             <View style={{marginTop: 20, flexDirection: 'row'}}>
  //               <TextInput
  //                 onChangeText={text => setPassword(text)}
  //                 value={password}
  //                 placeholder="Enter your Password"
  //                 placeholderTextColor="gray"
  //                 style={styles.input}
  //                 secureTextEntry
  //               />
  //             </View>

  //             {/* <View style={styles.pickerStyle}>
  //             <Picker
  //               selectedValue={selectedValue}
  //               onValueChange={(itemValue, itemIndex) =>
  //                 setSelectedValue(itemValue)
  //               }
  //               style={styles.pickerItem}
  //               dropdownIconColor={'gray'}>
  //               {options.map((option, index) => (
  //                 <Picker.Item
  //                   // key={option.value}
  //                   key={`${option.value}-${index}`}
  //                   label={option.label}
  //                   value={option.value}
  //                 />
  //               ))}
  //             </Picker>
  //           </View> */}
  //           </View>

  //           {/* Check box */}
  //           {/* <View style={{alignItems: 'center', marginTop: 20}}>
  //           <View style={styles.checkBoxCon}>
  //             <View style={{flexDirection: 'row', alignItems: 'center'}}>
  //               <View style={{width: width / 3}}>
  //                 <Text style={styles.checkBoxTxt}>Select role</Text>
  //               </View>
  //               <CheckBox
  //                 checked={checked}
  //                 onPress={handleCheckedChange}
  //                 containerStyle={{
  //                   borderColor: 'white',
  //                   width: width / 25,
  //                   height: height / 35,
  //                   borderWidth: 1,
  //                   borderRadius: 5,
  //                   alignItems: 'center',
  //                   justifyContent: 'center',
  //                   //   backgroundColor: '#fff',
  //                   borderColor: 'black',
  //                 }}
  //                 checkedIcon={
  //                   <View
  //                     style={{
  //                       height: 30,
  //                       width: 30,
  //                       justifyContent: 'center',
  //                       alignItems: 'center',
  //                     }}>
  //                     <Ionicons
  //                       name="checkmark-sharp"
  //                       color="#07493A"
  //                       size={20}
  //                     />
  //                   </View>
  //                 }
  //                 uncheckedIcon={
  //                   <View style={{backgroundColor: 'white'}}></View>
  //                 }
  //               />
  //             </View>
  //             <View style={{flexDirection: 'row', alignItems: 'center'}}>
  //               <View style={{width: width / 3}}>
  //                 <Text style={styles.checkBoxTxt}>Remember me</Text>
  //               </View>
  //               <CheckBox
  //                 checked={checkedRem}
  //                 onPress={handleCheckedRem}
  //                 containerStyle={{
  //                   borderColor: 'white',
  //                   width: width / 25,
  //                   height: height / 35,
  //                   borderRadius: 5,
  //                   borderWidth: 1,
  //                   alignItems: 'center',
  //                   justifyContent: 'center',
  //                   //   backgroundColor: 'white',
  //                   borderColor: 'black',
  //                 }}
  //                 checkedIcon={
  //                   <View
  //                     style={{
  //                       height: 30,
  //                       width: 30,
  //                       justifyContent: 'center',
  //                       alignItems: 'center',
  //                     }}>
  //                     <Ionicons
  //                       name="checkmark-sharp"
  //                       color="#07493A"
  //                       size={20}
  //                     />
  //                   </View>
  //                 }
  //                 uncheckedIcon={
  //                   <View style={{backgroundColor: 'white'}}></View>
  //                 }
  //               />
  //             </View>
  //           </View>
  //         </View> */}

  //           {/* Button */}
  //           <View style={[styles.btnCotainer, {marginTop: 50}]}>
  //             <TouchableOpacity style={styles.btn} onPress={() => login()}>
  //               <Text style={styles.btnTxt}>Login</Text>
  //             </TouchableOpacity>
  //           </View>
  //           <View style={styles.btnCotainer}>
  //             <TouchableOpacity
  //               onPress={() => navigation.navigate('PassportDetail')}
  //               style={styles.btn}>
  //               <Text style={styles.btnTxt}>Sign Up</Text>
  //             </TouchableOpacity>
  //           </View>

  //           <TouchableOpacity
  //             onPress={() => navigation.navigate('Passport')}
  //             style={{alignItems: 'flex-end', marginRight: 50, marginTop: 20}}>
  //             <Text style={{color: '#8b7048'}}>Forgot Password?</Text>
  //           </TouchableOpacity>
  //           {/* WelcomeScreen Button */}
  //           {/* <TouchableOpacity
  //           onPress={() => navigation.navigate('WelcomeScreen')}
  //           style={styles.WelcomeScreenButton}>
  //           <FontAwesome name="gear" size={30} color="#000" />
  //         </TouchableOpacity> */}
  //         </View>
  //       )}
  //     </ImageBackground>
  //   </>
  // );
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
                  style={styles.input}
                />

                <TextInput
                  onChangeText={setPassword}
                  value={password}
                  placeholder="Enter your Password"
                  placeholderTextColor="gray"
                  style={[styles.input, {marginTop: 20}]}
                  secureTextEntry
                />
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
