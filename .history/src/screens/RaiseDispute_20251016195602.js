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

export default function RaiseDispute() {
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
      <Header title={'RAISE A DISPUTE'} onPress={() => navigation.goBack()} />

      {/* Scrollable content */}
      <View style={{flex: 1, width: '100%'}}>
        <Text style={styles.title}>Raise A Dispute</Text>

        <Text style={styles.sectionTitle}>
          Select the transaction and describe your issue
        </Text>

        <View style={{marginTop: '2%', flex: 1, alignItems: 'center', gap: 5}}>
          <TextInput
            placeholder="Transaction ID (dropdown)"
            placeholderTextColor={'rgba(0, 0, 0, 1)'}
            style={[styles.methodBox, styles.inputText]}
          />
          <TextInput
            placeholder="Issue Description (multi-line text area)"
            placeholderTextColor={'rgba(0, 0, 0, 1)'}
            style={[styles.methodBox2, styles.inputText2]}
            multiline
          />
        </View>

        {/* Attach File Button */}
        <TouchableOpacity style={styles.attachFileBtn} onPress={handlePickFile}>
          {selectedFile ? (
            <Image
              source={{uri: selectedFile}}
              style={{width: '100%', height: '100%', borderRadius: 8}}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.attachFileText}>
              Upload File{'\n'}(Optional / Attach {'\n'} Screenshot/DOC)
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.formatNoteContainer}>
          <Text style={styles.acceptedFormat}>Upload supporting documents</Text>
        </View>
      </View>

      {/* Proceed Button */}
      <View style={styles.bottomBtnContainer}>
        <TouchableOpacity style={styles.proceedBtn}>
          <Text style={styles.proceedText}>Raise Dispute</Text>
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
  backButton: {padding: 6},
  headerTitle: {fontSize: 12, color: '#000'},
  title: {
    fontFamily: 'ChronicleDisp-Semibold',
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
    marginTop: 50,
    bottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    marginTop: '15%',
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: 'FuturaStdBook',
    color: 'rgba(0, 0, 0, 1)',
  },
  methodBox: {
    borderWidth: 1,
    borderColor: 'rgba(236, 237, 243, 1)',
    paddingTop: 17.5,
    paddingBottom: 14,
    width: 321,
    height: 44,
    marginTop: 5,
  },
  methodBox2: {
    borderWidth: 1,
    borderColor: 'rgba(236, 237, 243, 1)',
    paddingVertical: 17.5,
    paddingHorizontal: 15,
    width: 321,

    height: 100,
    marginTop: 5,
  },
  inputText: {
    fontSize: 10,
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'Inter_24pt-Regular',
    fontWeight: '400',
  },
  inputText2: {
    fontSize: 10,
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'Inter_24pt-Regular',
    fontWeight: '400',
    textAlignVertical: 'top',
    textAlign: 'left',
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
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: 'FuturaStdMedium',
    lineHeight: 14,
    // bottom: 10,
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
    color: 'rgba(0, 0, 0, 1)',
    // marginTop: '5%',
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

    // flex:1,
    // justifyContent:'flex-end'
  },
  proceedText: {
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'FuturaStdMedium',
  },
});
