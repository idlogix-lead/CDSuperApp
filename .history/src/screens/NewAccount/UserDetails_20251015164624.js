import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import PhoneInput from 'react-native-phone-number-input';

const UserDetails = ({navigation, route}) => {
  const {data} = route.params;
  console.log('Data received:', data);

  const [value, setValue] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const phoneInput = useRef(null);

  useEffect(() => {
    if (data && data[0]?.EMail) {
      setUserEmail(data[0].EMail);
    }
    console.log(data[0]?.EMail);
  }, [data]);

  useEffect(() => {
    if (data && data[0]?.Phone) {
      setValue(data[0].Phone.toString());
    }
  }, [data]);

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // ✅ Handle Continue
  const handleContinue = () => {
    if (!validateEmail(userEmail)) {
      setIsEmailValid(false);
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    // If valid, reset border & navigate
    setIsEmailValid(true);
    navigation.navigate('SetPassword', {
      userData: data[0],
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
        <Text
          style={{
            color: '#000',
            fontSize: 20,
            fontFamily: 'PlayfairDisplay-Bold',
            marginTop: 184,
          }}>
          Verify your details
        </Text>
      </View>
      <View style={{marginTop: 10}}>
        <View
          style={{
            width: '90%',
            height: 50,
            alignSelf: 'center',
            marginBottom: 15,
            backgroundColor: '#f8f8f8',
            justifyContent: 'center',
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gray',
          }}>
          <Text style={{color: 'gray', fontSize: 16}}>
            {data[0]?.FullName || 'N/A'}
          </Text>
        </View>
        <View
          style={{
            width: '90%',
            height: 50,
            alignSelf: 'center',
            marginBottom: 15,
            backgroundColor: '#f8f8f8',
            justifyContent: 'center',
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gray',
          }}>
          <Text style={{color: 'gray', fontSize: 16}}>
            {data[0]?.Nationality || 'N/A'}
          </Text>
        </View>
        <View
          style={{
            width: '90%',
            height: 50,
            alignSelf: 'center',
            marginBottom: 15,
            backgroundColor: '#f8f8f8',
            justifyContent: 'center',
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gray',
          }}>
          <Text style={{color: 'gray', fontSize: 16}}>
            {data[0]?.ProjectName || 'N/A'}
          </Text>
        </View>
        <TextInput
          onChangeText={text => {
            setUserEmail(text);
            setIsEmailValid(true);
          }}
          value={userEmail}
          placeholder="Email"
          placeholderTextColor="gray"
          style={[styles.input, !isEmailValid && {borderColor: 'red'}]}
        />
        <PhoneInput
          ref={phoneInput}
          defaultValue={value}
          defaultCode="AE" // default country
          layout="first"
          onChangeFormattedText={text => {
            setValue(text);
          }}
          autoFocus={false}
          containerStyle={{
            width: '90%',
            alignSelf: 'center',
            backgroundColor: '#f8f8f8',
            borderWidth: 1,
            height: 50,
            borderColor: 'gray',
            marginBottom: 15,
          }}
          textContainerStyle={{
            paddingVertical: 0,
          }}
          textInputProps={{
            placeholderTextColor: 'gray', // this controls placeholder color
            value: value,
          }}
        />
        <View
          style={{
            width: '90%',
            height: 50,
            alignSelf: 'center',
            marginBottom: 15,
            backgroundColor: '#f8f8f8',
            justifyContent: 'center',
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gray',
          }}>
          <Text style={{color: 'gray', fontSize: 16}}>
            {data[0]?.ResidenceCountry || 'N/A'}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.Button} onPress={handleContinue}>
        <Text style={{color: '#fff'}}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.BottomText}>
        <Text style={{color: 'gray', fontSize: 15, textAlign: 'center'}}>
          Changes will be verified by our team. Your account will be pending
          approval until verification is complete.
        </Text>
        <Text
          style={{
            color: 'gray',
            fontSize: 15,
            marginTop: 30,
            textAlign: 'center',
          }}>
          By clicking continue, you agree to our
          <Text style={{color: 'blue', color: '#000'}}>
            {' '}
            Terms of Service
          </Text>{' '}
          and
          <Text style={{color: 'blue', color: '#000'}}> Privacy Policy.</Text>
        </Text>
      </View>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#f8f8f8',
    // borderRadius: 5,
    paddingHorizontal: 10,
    color: '#000',
    fontFamily: 'K2D-Regular',
    borderWidth: 1,
    borderColor: 'gray',
    alignSelf: 'center',
    marginBottom: 15,
  },
  Button: {
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: '#000',
    width: '90%',
    alignSelf: 'center',
    padding: 15,
    // borderRadius: 10,
  },
  BottomText: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
});
