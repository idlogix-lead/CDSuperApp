import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from '../../../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function KycSuccess() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({headerShown: false}, [navigation]);
  });
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Header title=" KYC Survey" />
      <Text style={styles.mainTitle}>KYC Survey</Text>

      <View style={styles.inputWrapper}>
        <Text style={styles.text}>
          Thank you! Your KYC insights have been saved successfully.
        </Text>
        <Text style={styles.text}>
          {' '}
          You’ll be notified if we need any further information.
        </Text>

        <View
          style={{height: 200, alignItems: 'center', justifyContent: 'center'}}>
          <Ionicons name="checkmark" color="green" size={70} />
        </View>

        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() => {
            navigation.navigate('MyProfile');
            navigation.getParent()?.openDrawer();
          }}>
          <Text style={styles.profileBtnTxt}>Back to Profile</Text>
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
    // backgroundColor:"beige",
    paddingVertical: '30%',
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
    fontSize: 14,
    // paddingVertical:'20%'
  },
});
