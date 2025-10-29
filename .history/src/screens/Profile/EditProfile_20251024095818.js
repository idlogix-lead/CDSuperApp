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
import Header from '../../components/Header';

export default function EditProfile() {
  const Nationality = ['Nationality (Dropdown List)', 'PAK', 'UAE', 'USA'];
  const Residence = [
    'Country of Residence (Dropdown List)',
    'Pakistan',
    'Dubai',
    'America',
  ];
  const [selectedNationality, setSelectedNationality] = useState(
    Nationality[0],
  );
  const [selectedResidence, setSelectedResidence] = useState(Residence[0]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleSelect = Nationality => {
    setSelectedNationality(Nationality);
    setIsDropdownOpen(false);
  };

  const [isDropdown, setIsDropdown] = useState(false);
  const handleResidence = Residence => {
    setSelectedResidence(Residence);
    setIsDropdownOpen(false);
  };

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({headerShown: false}, [navigation]);
  });
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Header title="My Profile and KYC Status" />
      <Text style={styles.mainTitle}>Edit Profile</Text>
      <Text style={[styles.text, {fontSize: 14}]}>
        Please update your profile
      </Text>

      <View style={styles.inputWrapper}>
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

        {/* Nationality dropdown */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
          <Text style={styles.dropdownText}>{selectedNationality}</Text>
        </TouchableOpacity>

        {isDropdownOpen && (
          <View style={styles.dropdownList}>
            {Nationality.slice(1).map(item => (
              <TouchableOpacity
                key={item}
                style={styles.option}
                onPress={() => handleSelect(item)}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Residence Dropdown */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setIsDropdown(!isDropdown)}>
          <Text style={styles.dropdownText}>{selectedResidence}</Text>
        </TouchableOpacity>

        {isDropdown && (
          <View style={styles.dropdownList}>
            {Residence.slice(1).map(item => (
              <TouchableOpacity
                key={item}
                style={styles.option}
                onPress={() => handleResidence(item)}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() => navigation.navigate('EditSuccess')}>
          <Text style={styles.profileBtnTxt}>Submit for Verification</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>Changes will be verified by our team.</Text>
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
    marginTop: '20%',
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
  dropdownButton: {
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
    paddingVertical: 10,
  },
  dropdownText: {
    color: '#828282',
    textAlign: 'left',
    fontFamily: 'Inter_24pt-Regular',
    fontSize: 14,
  },
  dropdownList: {
    backgroundColor: '#fff',
    marginTop: '-3%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
    width: '100%',
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 10,
    color: '#828282',
    fontFamily: 'Inter_24pt-Regular',
  },
});
