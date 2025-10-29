import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import Header from '../../../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function KycInsights() {
  const navigation = useNavigation();
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [familySize, setFamilySize] = useState('');
  const [incomeRange, setIncomeRange] = useState('');
  const [nationality, setNationality] = useState('');
  const [showGoalsDropdown, setShowGoalsDropdown] = useState(false);
  const [goals, setGoals] = useState({
    investment: false,
    holiday: false,
    growth: false,
  });

  const [progress, setProgress] = useState([false, false, false, false, false]);

  // Update progress automatically when dropdowns are changed
  useEffect(() => {
    setProgress([
      selectedPurpose !== '', // Investment
      familySize !== '', // Family Size
      nationality !== '',
      incomeRange !== '', // Income
      Object.values(goals).some(Boolean), // Real Estate goals
      false,
    ]);
  }, [selectedPurpose, familySize, nationality, incomeRange, goals]);

  const handleSubmit = () => {
    console.log({
      selectedPurpose,
      familySize,
      nationality,
      incomeRange,
      goals,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title={'KYC Insights'} />

        <Text style={styles.mainTitle}>KYC Survey</Text>

        {/* 🟩 Progress Bar */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: '1%', borderWidth: 1, height: 132, width: '100%' }}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
          }}
        >
          {['Investment', 'Family Size', 'Nationality', 'Income', 'Real Estate'].map(
            (item, index) => (
              <View
                key={index}
                style={{ alignItems: 'center', position: 'relative', marginRight: 20 }}
              >
                {index < 4 && (
                  <View
                    style={[
                      styles.line,
                      { position: 'absolute', top: 20, left: 30 },
                    ]}
                  />
                )}

                <View
                  style={[
                    styles.circle,
                    progress[index] ? styles.activeCircle : styles.inactiveCircle,
                  ]}
                >
                  {progress[index] && (
                    <Ionicons name="checkmark" color="#fff" size={16} />
                  )}
                </View>

                <Text style={styles.timelineText}>{item}</Text>
              </View>
            )
          )}
        </ScrollView>

        {/* 🟨 Form */}
        <View style={styles.formContainer}>
          {/* Investment Purpose */}
          <View style={styles.dropdownBox}>
            <Picker
              selectedValue={selectedPurpose}
              onValueChange={setSelectedPurpose}
              style={styles.picker}
            >
              <Picker.Item label="Investment Purpose" value="" style={styles.pickerTxt} />
              <Picker.Item label="Self-Use" value="self" style={styles.pickerTxt} />
              <Picker.Item label="Rental" value="rental" style={styles.pickerTxt} />
              <Picker.Item label="Airbnb" value="airbnb" style={styles.pickerTxt} />
              <Picker.Item label="Real Estate" value="realestate" style={styles.pickerTxt} />
            </Picker>
          </View>

          {/* Family Size */}
          <View style={styles.dropdownBox}>
            <Picker
              selectedValue={familySize}
              onValueChange={setFamilySize}
              style={styles.picker}
            >
              <Picker.Item label="Family Size (1–10)" value="" style={styles.pickerTxt} />
              {[...Array(10)].map((_, i) => (
                <Picker.Item
                  label={`${i + 1}`}
                  value={`${i + 1}`}
                  key={i}
                  style={styles.pickerTxt}
                />
              ))}
            </Picker>
          </View>

          {/* Nationality */}
          <View style={styles.dropdownBox}>
            <Picker
              selectedValue={nationality}
              onValueChange={setNationality}
              style={styles.picker}
            >
              <Picker.Item label="Nationality" value="" style={styles.pickerTxt} />
              <Picker.Item label="Pak" value="pak" style={styles.pickerTxt} />
              <Picker.Item label="UAE" value="uae" style={styles.pickerTxt} />
              <Picker.Item label="USA" value="usa" style={styles.pickerTxt} />
            </Picker>
          </View>

          {/* Income Range */}
          <View style={styles.dropdownBox}>
            <Picker
              selectedValue={incomeRange}
              onValueChange={setIncomeRange}
              style={styles.picker}
            >
              <Picker.Item label="Income Range" value="" style={styles.pickerTxt} />
              <Picker.Item label="Below $50,000" value="low" style={styles.pickerTxt} />
              <Picker.Item label="$50,000 - $100,000" value="mid" style={styles.pickerTxt} />
              <Picker.Item label="Above $100,000" value="high" style={styles.pickerTxt} />
            </Picker>
          </View>

          {/* ✅ Real Estate Goals Dropdown (Custom Dropdown with Checkboxes) */}
          <View style={[styles.dropdownBox, { flexDirection: 'column' }]}>
            <TouchableOpacity
              onPress={() => setShowGoalsDropdown(!showGoalsDropdown)}
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.pickerTxt}>Real Estate Goals</Text>
              
            </TouchableOpacity>

            {showGoalsDropdown && (
              <View style={styles.dropdownContent}>
                {[
                  { key: 'investment', label: 'Long-term Investment' },
                  { key: 'holiday', label: 'Holiday Home' },
                  { key: 'growth', label: 'Capital Growth' },
                ].map(item => (
                  <View key={item.key} style={styles.checkboxRow}>
                    <CheckBox
                      value={goals[item.key]}
                      onValueChange={val => setGoals({ ...goals, [item.key]: val })}
                    />
                    <Text style={styles.checkboxText}>{item.label}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={() => navigation.navigate('KycSuccess')}
          >
            <Text style={styles.submitText}>Submit KYC Form</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Your responses help us tailor offers and updates for you.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

//  STYLES
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 12 },
  mainTitle: {
    fontSize: 24,
    fontFamily: 'Inter_24pt-SemiBold',
    textAlign: 'center',
    marginVertical: '7%',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    backgroundColor: '#ccc',
  },
  activeCircle: {
    backgroundColor: 'green',
    borderWidth: 7,
    borderColor: '#F8F4F4',
  },
  inactiveCircle: {
    backgroundColor: 'yellow',
    borderWidth: 7,
    borderColor: '#E9E5E5',
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: '#D9D9D9',
    marginLeft: '15%',
  },
  timelineText: {
    fontSize: 8,
    textAlign: 'center',
    color: '#000',
    marginTop: 10,
    width: 80,
    fontFamily: 'Inter_24pt-Medium',
  },
  formContainer: {
    gap: 12,
    marginTop: 10,
  },
  dropdownBox: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    minHeight: 40,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  picker: { width: '100%', height: 50 },
  pickerTxt: {
    fontSize: 14,
    color: '#828282',
    fontFamily: 'Inter_24pt-Regular',
  },
  dropdownContent: {
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 6,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  checkboxText: {
    fontFamily: 'Inter-Regular',
    color: '#333',
  },
  submitBtn: {
    height: 40,
    borderRadius: 8,
    backgroundColor: '#000',
    width: '100%',
    justifyContent: 'center',
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Inter_24pt-Medium',
    fontSize: 14,
  },
  footerText: {
    fontSize: 12,
    color: '#828282',
    textAlign: 'center',
    marginTop: 12,
    fontFamily: 'Inter_24pt-Regular',
  },
});
