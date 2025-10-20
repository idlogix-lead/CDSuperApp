import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Alert,
  Linking,
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

  const PrivacyPolicyButton = () => {
    Linking.openURL('https://citideveloper.com/privacy-policy');
  };

  const TermsButton = () => {
    Linking.openURL('https://citideveloper.com/terms-and-conditions');
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
            fontFamily: 'ChronicleDisp-Bold',
            marginTop: 25,
          }}>
          Verify your details
        </Text>
      </View>
      <View style={{marginTop: 15}}>
        <View
          style={{
            width: '90%',
            height: 40,
            alignSelf: 'center',
            marginBottom: 15,
            backgroundColor: '#fff',
            justifyContent: 'center',
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: '#828282',
          }}>
          <Text
            style={{
              color: '#828282',
              fontSize: 14,
              fontFamily: 'FuturaStdBook',
            }}>
            {data[0]?.FullName || 'N/A'}
          </Text>
        </View>
        <View
          style={{
            width: '90%',
            height: 40,
            alignSelf: 'center',
            marginBottom: 15,
            backgroundColor: '#fff',
            justifyContent: 'center',
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gray',
          }}>
          <Text
            style={{color: 'gray', fontSize: 14, fontFamily: 'FuturaStdBook'}}>
            {data[0]?.Nationality || 'N/A'}
          </Text>
        </View>
        <View
          style={{
            width: '90%',
            height: 40,
            alignSelf: 'center',
            marginBottom: 15,
            backgroundColor: '#fff',
            justifyContent: 'center',
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gray',
          }}>
          <Text
            style={{color: 'gray', fontSize: 14, fontFamily: 'FuturaStdBook'}}>
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
          style={[styles.input, !isEmailValid && {borderColor: '#b72618'}]}
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
            backgroundColor: '#fff',
            borderWidth: 1,
            height: 40,
            borderColor: 'gray',
            marginBottom: 15,
          }}
          textContainerStyle={{
            paddingVertical: 0,
            // justifyContent: 'center',
            // height:
          }}
          textInputProps={{
            placeholderTextColor: 'gray', // this controls placeholder color
            value: value,
            style: {
              color: '#000',
              // fontSize: 14,
              textAlignVertical: 'center', // 🔹 key property for Android
              paddingVertical: 0,
              padding: 0,
              margin: 0,
            },
          }}
        />
        <View
          style={{
            width: '90%',
            height: 40,
            alignSelf: 'center',
            marginBottom: 15,
            backgroundColor: '#fff',
            justifyContent: 'center',
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gray',
          }}>
          <Text
            style={{color: 'gray', fontSize: 14, fontFamily: 'FuturaStdBook'}}>
            {data[0]?.ResidenceCountry || 'N/A'}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.Button} onPress={handleContinue}>
        <Text
          style={{color: '#fff', fontFamily: 'FuturaStdMedium', fontSize: 14}}>
          Continue
        </Text>
      </TouchableOpacity>

      <View style={styles.BottomText}>
        <Text
          style={{
            color: 'gray',
            // fontSize: 12,
            textAlign: 'center',
            fontFamily: 'FuturaStdBook',
          }}>
          Changes will be verified by our team. Your account will be pending
          approval until verification is complete.
        </Text>

        <View>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 20,
              color: 'gray',
              // fontSize: 18,
              alignSelf: 'center',
              paddingHorizontal: 60,
              fontFamily: 'FuturaStdBook',
              // marginBottom: 10,
            }}>
            By clicking continue, you agree to our
          </Text>
          <View
            style={{
              alignSelf: 'center',
              paddingHorizontal: 70,
              flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={TermsButton}>
              <Text style={{color: '#000'}}>Terms of Service </Text>
            </TouchableOpacity>
            <Text style={{color: '#828282'}}>and</Text>
            <TouchableOpacity onPress={PrivacyPolicyButton}>
              <Text style={{color: '#000'}}> Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  input: {
    width: '90%',
    height: 40,
    backgroundColor: '#fff',
    // borderRadius: 5,
    paddingHorizontal: 10,
    color: '#000',
    fontFamily: 'FuturaStdBook',
    borderWidth: 1,
    borderColor: 'gray',
    alignSelf: 'center',
    marginBottom: 15,
    fontSize: 14,
  },
  Button: {
    // marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#000',
    width: '90%',
    alignSelf: 'center',
    padding: 15,
    // borderRadius: 10,
  },
  BottomText: {
    marginTop: 30,
    width: '90%',
    alignSelf: 'center',
  },
});
