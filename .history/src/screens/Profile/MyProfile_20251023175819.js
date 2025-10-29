import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';

export default function MyProfile() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({headerShown: false}, [navigation]);
  });
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Header title="My Profile and KYC Status" />
      <Text style={styles.mainTitle}>My Profile</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Name"
          placeholderTextColor="gray"
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="gray"
          style={styles.input}
        />
        <TextInput
          placeholder="Phone"
          placeholderTextColor="gray"
          style={styles.input}
        />
        <TextInput
          placeholder="Nationality (locked)"
          placeholderTextColor="gray"
          style={styles.input}
        />
        <TextInput
          placeholder="Country of residence"
          placeholderTextColor="gray"
          style={styles.input}
        />
        <TouchableOpacity style={styles.profileBtn}>
          <Text style={styles.profileBtnTxt}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>
        Change History (Link to Change History Screen)
      </Text>

      {/* KYC Status */}
      <Text style={styles.mainTitle}>KYC Status Card</Text>
      <View style={styles.statusCard}>
        <Text style={styles.statusCardTxt}> Last Updated: 05 Oct 2025</Text>
        <Text style={styles.statusCardTxt}> Status: 🟢 Completed</Text>
      </View>
      <View style={{paddingVertical: '10%', paddingHorizontal: 20}}>
        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() => navigation.navigate('Kyc')}>
          <Text style={styles.profileBtnTxt}>Update KYC Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', paddingHorizontal: 12},
  mainTitle: {
    fontSize: 24,
    fontFamily: 'Inter_24pt-SemiBold',
    textAlign: 'center',
    marginVertical: '7%',
    color: '#000',
  },
  inputWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2%',
    paddingHorizontal: 24,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontFamily: 'Inter_24pt-Regular',
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#828282',
    marginBottom: 10,
    borderRadius: 8,
  },
  profileBtn: {
    height: 40,
    borderRadius: 8,
    backgroundColor: '#000',
    width: '100%',
    justifyContent: 'center',
  },
  profileBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Inter_24pt-Medium',
    fontSize: 14,
  },
  text: {
    color: '#828282',
    textAlign: 'center',
    fontFamily: 'Inter_24pt-Regular',
    fontSize: 12,
  },
  statusCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 16,
    marginTop: '5%',
    alignItems: 'center',
    height: 40,
  },
  statusCardTxt: {
    fontSize: 10,
    fontFamily: 'Inter_24pt-Regular',
    color: '#000',
  },
});
