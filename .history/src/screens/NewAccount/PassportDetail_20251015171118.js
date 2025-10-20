// import {
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   TextInput,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import instance from '../../BaseURL/BaseUrl';
// // import {TextInput} from 'react-native-paper';

// const PassportDetail = ({navigation}) => {
//   const [Passport, setPassport] = useState('');

//   const passportApi = async () => {
//     try {
//       // 🔹 Token get from AsyncStorage
//       const token = await AsyncStorage.getItem('guardnerworld');

//       if (!token) {
//         console.log('No token found in AsyncStorage');
//         return;
//       }

//       // 🔹 API Call
//       const response = await instance.get(
//         `v1/models/ad_user?$filter=passport in ('${Passport}')&$select=Name`,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`, // dynamic token
//           },
//         },
//       );

//       console.log('API Response:', response.data);
//     } catch (error) {
//       console.error('API Error:', error);
//     }
//   };
//   useEffect(() => {
//     passportApi();
//   }, []);

//   return (
//     <View style={{flex: 1, backgroundColor: '#fff'}}>
//       <View style={styles.Header}>
//         {/* <Text style={styles.HeaderText}>Citi Developers</Text> */}
//         <Image
//           style={{width: 190, height: 150, resizeMode: 'contain'}}
//           source={require('../../asserts/Images/Citidev-brownlogo.png')}
//         />
//       </View>

//       <View style={{alignItems: 'center', marginTop: '30%'}}>
//         <Text
//           style={{
//             color: '#000',
//             fontSize: 18,
//             marginBottom: 20,
//             fontFamily: 'PlayfairDisplay-Bold',
//           }}>
//           Create an account
//         </Text>
//       </View>
//       <TextInput
//         onChangeText={setPassport}
//         value={Passport}
//         placeholder="Passport Number"
//         placeholderTextColor="gray"
//         style={styles.input}
//         maxLength={9}
//       />

//       <TouchableOpacity
//         onPress={() => navigation.navigate('UserDetails')}
//         style={styles.button}>
//         <Text style={{color: '#fff'}}>Continue for Registration</Text>
//       </TouchableOpacity>

//       <View>
//         <Text style={{textAlign: 'center', marginTop: 20, color: 'gray'}}>
//           By clicking continue, you agree to our
//           <Text style={{fontWeight: 'bold', color: '#000'}}>
//             {' '}
//             Terms of Service
//           </Text>{' '}
//           and
//           <Text style={{fontWeight: 'bold', color: '#000'}}>
//             {' '}
//             Privacy Policy
//           </Text>
//         </Text>
//       </View>
//     </View>
//   );
// };

// export default PassportDetail;

// const styles = StyleSheet.create({
//   Header: {
//     alignItems: 'center',
//     marginTop: '30%',
//   },
//   HeaderText: {
//     color: '#000',
//     fontSize: 27,
//     fontWeight: 'bold',
//   },
//   input: {
//     width: '90%',
//     height: 50,
//     backgroundColor: '#f8f8f8',
//     // borderRadius: 5,
//     paddingHorizontal: 10,
//     color: '#000',
//     fontFamily: 'K2D-Regular',
//     borderWidth: 1,
//     borderColor: 'gray',
//     alignSelf: 'center',
//     marginTop: 15,
//   },
//   TextDetail: {
//     color: '#000',
//     fontSize: 16,
//     marginTop: 10,
//     fontWeight: '600',
//   },
//   button: {
//     marginTop: 30,
//     alignItems: 'center',
//     backgroundColor: '#000',
//     width: '90%',
//     alignSelf: 'center',
//     padding: 15,
//     // borderRadius: 10,
//   },
// });

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from '../../BaseURL/BaseUrl';
import axios from 'axios';

const PassportDetail = ({navigation}) => {
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
      Alert.alert('Error', error.message || 'Failed to retrieve token.');
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
        `/v1/models/ad_user?$filter=passport in ('${Passport}')`,
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
        navigation.navigate('UserDetails', {data: responseData});
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
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.Header}>
        <Image
          style={{width: 190, height: 150, resizeMode: 'contain'}}
          source={require('../../asserts/Images/Citidev-brownlogo.png')}
        />
      </View>

      <View style={{alignItems: 'center', marginTop: '30%'}}>
        <Text
          style={{
            color: '#000',
            fontSize: 20,
            marginBottom: 20,
            fontFamily: 'ChronicleDisp-Semibold',
          }}>
          Create an account
        </Text>
      </View>

      <TextInput
        onChangeText={setPassport}
        value={Passport}
        placeholder="Passport Number"
        placeholderTextColor="gray"
        style={styles.input}
        maxLength={9}
      />

      <TouchableOpacity onPress={passportApi} style={styles.button}>
        <Text style={{color: '#fff', fontFamily: 'FuturaStdMedium'}}>
          Continue for Registration
        </Text>
      </TouchableOpacity>

      <View>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 20,
            color: 'gray',
            fontSize: 12,
            alignSelf: 'center',
            paddingHorizontal: 20,
          }}>
          By clicking continue, you agree to our
          <Text style={{fontWeight: 'bold', color: '#000'}}>
            {' '}
            Terms of Service
          </Text>{' '}
          and
          <Text style={{fontWeight: 'bold', color: '#000'}}>
            {' '}
            Privacy Policy
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default PassportDetail;

const styles = StyleSheet.create({
  Header: {
    alignItems: 'center',
    marginTop: '30%',
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 10,
    color: '#000',
    fontFamily: 'FuturaStdBook',
    borderWidth: 1,
    borderColor: 'gray',
    alignSelf: 'center',
    marginTop: 15,
  },
  button: {
    marginTop: 25,
    alignItems: 'center',
    backgroundColor: '#000',
    width: '90%',
    alignSelf: 'center',
    padding: 15,
  },
});
