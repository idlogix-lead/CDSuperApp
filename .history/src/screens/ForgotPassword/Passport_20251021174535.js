import {
  StyleSheet,
  Text,
  View,
  //   TextInput,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from '../../BaseURL/BaseUrl';
// import {TextInput} from 'react-native-paper';

const Passport = ({navigation}) => {
  const [Passport, setPassport] = useState('');

  const tokenPick = async () => {
    const payload = {
      userName: 'GardenAdmin',
      password: 'GardenAdmin',
      parameters: {
        clientId: 11,
        roleId: 102,
        organizationId: 11,
        warehouseId: 103,
        language: 'en_US',
      },
    };
    try {
      const response = await instance.post('/v1/auth/tokens', payload);
      const token = response.data.token;
      console.log('Token Response:', token);
      await AsyncStorage.setItem('guardnerworld', token);
      // Alert.alert('Success', 'Token retrieved and stored successfully.');
    } catch (error) {
      console.error('Error retrieving token:', error);
      if (error) {
        Alert.alert('Alert', error.message || 'Failed to retrieve token.');
        navigation.goBack();
      }
    }
  };

  const passportApi = async () => {
    try {
      if (!Passport) {
        Alert.alert('Error', 'Please enter your Passport Number');
        return;
      }

      // Token get from AsyncStorage
      const token = await AsyncStorage.getItem('guardnerworld');

      if (!token) {
        Alert.alert('Error', 'No token found in storage.');
        console.log('No token found in AsyncStorage');
        return;
      }

      //  API Call
      const response = await instance.get(
        `/v1/models/ad_user?$filter=passport in ('${Passport}') AND ( isActive eq true or isActive eq false )`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // dynamic token
          },
        },
      );

      // Example: Navigate if passport is found
      if (response.data && response.data.records?.length > 0) {
        const responseData = response.data.records;
        const inactiveUser = responseData.find(user => user.IsActive === true);
        if (inactiveUser) {
          Alert.alert(
            'A 6-digit code has been sent to your email/phone.',
            '', // optional message
            [
              {
                text: 'OK',
                onPress: () => navigation.navigate('OTP', {Data: responseData}),
              },
            ],
            {cancelable: false},
          );
        } else {
          Alert.alert('Alert', 'User not found');
        }
      } else {
        Alert.alert('Not Found', 'No user found with this passport number.');
      }
    } catch (error) {
      console.error(' API Error:', error);
      Alert.alert('Error', 'Failed to fetch passport details.');
    }
  };

  useEffect(() => {
    tokenPick();
  }, []);

  const borderColor =
    Passport.length === 0
      ? '#ccc' // default
      : Passport.length < 9
      ? '#b72618' // typing but not complete
      : 'green'; // completed 9 digits

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.Header}>
        <Image
          style={{width: 52, height: 69}}
          source={require('../../asserts/Images/CitiDev-logo2.png')}
        />
      </View>

      <View style={{alignItems: 'center', marginTop: '20%'}}>
        <Text style={styles.headerText}>Forgot Your Password?</Text>
        <Text style={[styles.TextDetail, {marginTop: 15}]}>
          No Worries! Enter Your Passport Number and we'll send you
        </Text>
        <Text style={styles.TextDetail}>a code to reset your password.</Text>

        <Text style={styles.passportText}>Passport Number</Text>
      </View>
      <TextInput
        onChangeText={setPassport}
        value={Passport}
        placeholder="Passport Number"
        placeholderTextColor="gray"
        style={[styles.input, {borderColor}]}
        maxLength={9}
      />

      <TouchableOpacity onPress={passportApi} style={styles.button}>
        <Text
          style={{color: '#fff', fontFamily: 'FuturaStdMedium', fontSize: 14}}>
          Send reset code
        </Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 20,
            color: 'gray',
            fontFamily: 'FuturaStdBook',
            fontSize: 12,
          }}>
          Remember your password?
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
          style={{marginTop: 20, marginLeft: 3}}>
          <Text
            style={{fontFamily: 'FuturaStdHeavy', fontSize: 16, color: 'gray'}}>
            Back to Login
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: 'gray',
          marginTop: 30,
          textAlign: 'center',
          fontWeight: '500',
          paddingHorizontal: 20,
        }}>
        (after submit): A 6-digit code has been sent to your email/phone.
      </Text>
    </View>
  );
};

export default Passport;

const styles = StyleSheet.create({
  Header: {
    alignItems: 'center',
    marginTop: '15%',
  },
  headerText: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'ChronicleDisp-Semibold',
  },
  passportText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'FuturaStdMedium',
    marginTop: 30,
  },
  input: {
    width: '90%',
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    color: '#000',
    fontFamily: 'FuturaStdBook',
    borderWidth: 1,
    borderColor: 'gray',
    alignSelf: 'center',
    marginTop: 15,
  },
  TextDetail: {
    color: 'gray',
    fontSize: 13,
    marginHorizontal: 20,
    textAlign: 'center',
    fontFamily: 'FuturaStdBook',
  },
  button: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#000',
    width: '90%',
    alignSelf: 'center',
    padding: 15,
  },
});
