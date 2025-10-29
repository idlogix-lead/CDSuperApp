import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import Header from '../../components/Header';

export default function ChangeHistory() {
  const towers = ['All', 'Pending', 'Approved', 'Rejected'];
  const [activeTab, setActiveTab] = useState('All');
  const DocList = [
    {
      id: '1',
      Date: 'Date Uploaded: 15 Aug 2025',
      Field_Updated: 'Phone Number',
      New_Value: '+971 5 83427641',
      Old_Value: '+971 5 63427641',
      Status: '🟢 Approved',
    },
    {
      id: '2',
      Date: 'Date Uploaded: 18 Aug 2025',
      Field_Updated: 'Email Address',
      New_Value: 'user@citydeveloper.com',
      Old_Value: 'olduser@citydeveloper.com',
      Status: '🟡 Pending',
    },
    {
      id: '3',
      Date: 'Date Uploaded: 21 Aug 2025',
      Field_Updated: 'Nationality',
      New_Value: 'UAE',
      Old_Value: 'Pakistan',
      Status: '🔴 Rejected',
    },
    {
      id: '4',
      Date: 'Date Uploaded: 25 Aug 2025',
      Field_Updated: 'Phone Number',
      New_Value: '+971 5 83427641',
      Old_Value: '+971 5 63427641',
      Status: '🟢 Approved',
    },
    {
      id: '5',
      Date: 'Date Uploaded: 29 Aug 2025',
      Field_Updated: 'Phone Number',
      New_Value: '+971 5 83427641',
      Old_Value: '+971 5 63427641',
      Status: '🟢 Approved',
    },
    {
      id: '6',
      Date: 'Date Uploaded: 02 Sep 2025',
      Field_Updated: 'Phone Number',
      New_Value: '+971 5 83427641',
      Old_Value: '+971 5 63427641',
      Status: '🟡 Pending',
    },
    {
      id: '7',
      Date: 'Date Uploaded: 06 Sep 2025',
      Field_Updated: 'Phone Number',
      New_Value: '+971 5 83427641',
      Old_Value: '+971 5 63427641',
      Status: '🟡 Pending',
    },
    {
      id: '8',
      Date: 'Date Uploaded: 10 Sep 2025',
      Field_Updated: 'Phone Number',
      New_Value: '+971 5 83427641',
      Old_Value: '+971 5 63427641',
      Status: '🟢 Approved',
    },
    {
      id: '9',
      Date: 'Date Uploaded: 14 Sep 2025',
      Field_Updated: 'Phone Number',
      New_Value: '+971 5 83427641',
      Old_Value: '+971 5 63427641',
      Status: '🔴 Rejected',
    },
  ];
  // 🔹 Filter documents based on selected tower
  const filteredDocs =
    activeTab === 'All'
      ? DocList
      : DocList.filter((doc) =>
          activeTab === 'Pending'
            ? doc.Status.includes('Pending')
            : activeTab === 'Approved'
            ? doc.Status.includes('Approved')
            : doc.Status.includes('Rejected')
        );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* Header */}
      <Header title="Change History" />

      {/* Title & Subtitle */}
      <Text style={styles.mainTitle}>Change History</Text>
      <Text style={styles.subtitle}>
        View all changes submitted for your profile and their verification
        status.
      </Text>

      {/* Categories */}
      <Text style={[styles.sectionTitle,{paddingHorizontal:'1%'}]}>Filter Bar</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.buttonRow}
      >
           {towers.map((item, index) => (
                 <TouchableOpacity
                   key={index}
                   onPress={() => setActiveTab(item)}
                   style={[
                     styles.tabButton,
                     activeTab === item && { backgroundColor: '#000' }, // highlight active
                   ]}
                 >
                   <Text
                     style={[
                       styles.tabButtonText,
                       activeTab === item && { color: '#fff', fontFamily: 'Inter_24pt-Bold' },
                     ]}
                   >
                     {item}
                   </Text>
                 </TouchableOpacity>
               ))}
      </ScrollView>

      {/* Document List */}
      <Text
        style={[
          styles.sectionTitle,
          { verticalAlign: 'bottom', marginTop: '7%' },
        ]}
      >
        Change History (List View)
      </Text>
      <View style={styles.documentListContainer}>
        {filteredDocs.map(doc => (
          <View key={doc.id} style={styles.documentCard}>
            <Text style={styles.documentTxt}>{doc.Date}</Text>
            <Text style={styles.documentTxt}>
              Field Updated :{doc.Field_Updated}
            </Text>

            <View style={styles.documentFooterRow}>
              <Text style={styles.documentTxt}>New Value :{doc.New_Value}</Text>
              <Text style={styles.documentTxt}>Status: {doc.Status}</Text>
            </View>
            <Text style={styles.documentTxt}>Old Value :{doc.Old_Value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 15 },

  // Header Section
  mainTitle: {
    fontSize: 24,
    fontFamily: 'Inter_24pt-SemiBold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    color: '#000',
    textAlign: 'center',
    fontSize: 8,
    fontFamily: 'Inter_24pt-Medium',
    paddingHorizontal: '10%',
    paddingVertical: '5%',
    bottom:10
  },

  sectionTitle: {
    fontFamily: 'Inter_24pt-Bold',
    fontSize: 12,
    marginVertical: 7,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 7,
  },
  tabButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    width: '40%',
  },
  tabButtonText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Inter_24pt-Medium',
    textAlign: 'center',
  },

  // Document List Section
  documentListContainer: {
    paddingVertical: 10,
  },
  documentCard: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    height: 90,
    padding: 10,
    marginBottom: 12,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.4,
    // shadowRadius: 4,
    // elevation: 5,
  },
  documentTitle: {
    fontSize: 10,
    fontFamily: 'Inter_24pt-Bold',
    color: '#000',
    // marginBottom: 8,
  },
  documentTxt: {
    fontSize: 10,
    color: '#000',
    fontFamily: 'Inter_24pt-Regular',

    // marginBottom: 4,
  },
  documentFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 2,
  },
  
  
  
});
