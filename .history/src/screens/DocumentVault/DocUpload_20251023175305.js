import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';

export default function DocUpload() {
  const navigation = useNavigation();
  const [docType, setDocType] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleSubmit = () => {
    console.log({
      DocumentType: docType,
      IssueDate: date.toDateString(),
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Header title={'Upload Document'} />

        {/* Title */}
        <Text style={styles.mainTitle}>Document Upload</Text>

        {/* Dropdown */}
        <View style={styles.dropdownBox}>
          <Picker
            selectedValue={docType}
            onValueChange={setDocType}
            style={styles.picker}>
            <Picker.Item
              style={styles.pickerTxt}
              label="Document Type (Dropdown): Passport / ID Card / Visa / Utility Bill"
              value=""
            />
            <Picker.Item
              label="Passport"
              value="passport"
              style={styles.pickerTxt}
            />
            <Picker.Item label="ID Card" value="id" style={styles.pickerTxt} />
            <Picker.Item label="Visa" value="visa" style={styles.pickerTxt} />
            <Picker.Item
              label="Utility Bill"
              value="bill"
              style={styles.pickerTxt}
            />
          </Picker>
        </View>

        {/* Date Picker */}
        <TouchableOpacity
          style={styles.dropdownBox}
          onPress={() => setShowPicker(true)}>
          <Text style={styles.dateText}>Issue Date: {date.toDateString()}</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || date;
              setShowPicker(false);
              setDate(currentDate);
            }}
          />
        )}

        {/* Scan / Upload Buttons */}
        <View style={styles.uploadRow}>
          <TouchableOpacity style={styles.blackBtn}>
            <Text style={styles.blackBtnText}>Scan {'\n'} Document</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blackBtn}>
            <Text style={styles.blackBtnText}>Upload File</Text>
          </TouchableOpacity>
        </View>

        {/* Info Text */}
        <Text style={styles.infoText}>
          Your document will be reviewed by our compliance team.{'\n'}Status
          will update once verified.
        </Text>

        {/* Submit Button */}
      </ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          bottom: '2%',
          paddingHorizontal: '5%',
        }}>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => navigation.navigate('DocSubmitted')}>
          <Text style={styles.submitText}>Submit for Verification</Text>
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  mainTitle: {
    fontSize: 24,
    fontFamily: 'Inter_24pt-SemiBold',
    textAlign: 'center',
    marginVertical: '7%',
    color: '#000',
  },
  dropdownBox: {
    borderWidth: 1,
    borderColor: 'rgba(236, 237, 243, 1)',
    borderRadius: 30,
    height: 45,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  picker: {
    width: '100%',
    height: 50,
  },
  pickerTxt: {
    fontSize: 9,
    color: '#828282',
    fontFamily: 'Inter_24pt-Regular',
  },
  dateText: {
    color: '#828282',
    fontFamily: 'Inter_24pt-Regular',
    fontSize: 9,
  },
  uploadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: 30,
    gap: 10,
    width: '100%',
    paddingHorizontal: '10%',
    paddingVertical: '10%',
  },
  blackBtn: {
    backgroundColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 120,
  },
  blackBtnText: {
    color: '#fff',
    fontFamily: 'Inter_24pt-Medium',
    fontSize: 10,
    textAlign: 'center',
  },
  infoText: {
    textAlign: 'center',
    fontSize: 10,
    color: '#000',
    lineHeight: 20,
    fontFamily: 'Inter_24pt-Regular',
    paddingVertical: '10%',
  },
  submitBtn: {
    backgroundColor: '#000',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
    height: 40,
  },
  submitText: {
    color: '#fff',
    fontFamily: 'Inter_24pt-Medium',
    fontSize: 14,
  },
});
// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const DocUpload = () => {
//   return (
//     <View>
//       <Text>DocUpload</Text>
//     </View>
//   )
// }

// export default DocUpload

// const styles = StyleSheet.create({})
