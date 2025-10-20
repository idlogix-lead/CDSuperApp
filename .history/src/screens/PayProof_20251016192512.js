import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import Header from '../components/Header/Header';

export default function PayProof() {
  const navigation = useNavigation();
  const [selectedFile, setSelectedFile] = useState(null);

  // 📸 Pick image or document from gallery
  const handlePickFile = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    const result = await launchImageLibrary(options);

    if (result.didCancel) {
      console.log('User cancelled picker');
    } else if (result.errorCode) {
      Alert.alert('Error', result.errorMessage || 'Something went wrong');
    } else {
      const asset = result.assets[0];
      setSelectedFile(asset.uri);
      console.log('Selected file:', asset);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* ✅ Header Section */}
      <Header title={'PAYMENT OPTIONS'} onPress={() => navigation.goBack()} />
      {/* Scrollable content */}
      <View style={{flex: 1, width: '100%'}}>
        {/* Make A Payment */}
        <Text style={styles.title}>Upload Payment Proof</Text>

        {/* Payment Summary */}
        <Text style={styles.sectionTitle}>
          Enter your transfer details and upload proof
        </Text>

        <View style={{marginTop: '10%', flex: 1, alignItems: 'center', gap: 5}}>
          <TextInput
            placeholder="Bank Name (text input)"
            placeholderTextColor={'rgba(0, 0, 0, 1)'}
            style={[styles.methodBox, styles.inputText]}
          />
          <TextInput
            placeholder="Transaction ID / Reference No. (text input)"
            placeholderTextColor={'rgba(0, 0, 0, 1)'}
            style={[styles.methodBox, styles.inputText]}
          />
          <TextInput
            placeholder="Amount (numeric input)"
            placeholderTextColor={'rgba(0, 0, 0, 1)'}
            style={[styles.methodBox, styles.inputText]}
          />
        </View>

        {/* 📎 Attach File Button */}
        <TouchableOpacity style={styles.attachFileBtn} onPress={handlePickFile}>
          {selectedFile ? (
            <Image
              source={{uri: selectedFile}}
              style={{width: '100%', height: '100%', borderRadius: 8}}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.attachFileText}>
              Upload File {'\n'}(Screenshot / PDF)
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.formatNoteContainer}>
          <Text style={styles.acceptedFormat}>
            Accepted formats: JPG, PNG, PDF.{'\n'}Optional: File format not
            supported
          </Text>
        </View>
      </View>

      {/* ✅ Submit Button */}
      <View style={styles.bottomBtnContainer}>
        <TouchableOpacity
          style={styles.proceedBtn}
          onPress={() => navigation.navigate('ReceiptsAndStatement')}>
          <Text style={styles.proceedText}>Submit for Verification</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 15,
  },
  backButton: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 12,
    color: '#000',
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
    marginTop: 25,
    fontWeight: '375',
  },
  sectionTitle: {
    fontSize: 14,
    marginTop: 30,
    bottom: 10,
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: 'FuturaStdBook',
  },
  methodBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(236, 237, 243, 1)',
    width: 327,
    height: 44,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 5,
    marginTop: 5,
  },
  inputText: {
    fontSize: 10,
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'FuturaStdBook',
    fontWeight: '400',
  },
  attachFileBtn: {
    marginTop: '60%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    width: 111,
    height: 120,
  },
  attachFileText: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '500',
    color: '#fff',
    fontFamily: 'FuturaStdMedium',
    lineHeight: 14,
  },
  formatNoteContainer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptedFormat: {
    fontSize: 10,
    fontWeight: '400',
    width: '50%',
    textAlign: 'center',
    fontFamily: 'FuturaStdBook',
    color: '#000',
    marginTop: '5%',
  },
  bottomBtnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    bottom: 10,
    alignItems: 'center',
  },
  proceedBtn: {
    backgroundColor: '#000',
    paddingVertical: 10,
    width: 327,
    height: 40,
  },
  proceedText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'FuturaStdMedium',
  },
});
