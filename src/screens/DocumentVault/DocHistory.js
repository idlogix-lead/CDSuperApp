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
import { useNavigation } from '@react-navigation/native';

export default function DocHistory() {
  const navigation = useNavigation();

  const towers = ['All', 'Pending', 'Approved', 'Rejected'];
  const [activeTab, setActiveTab] = useState('All'); // 🔹 track selected tower

  const DocList = [
    {
      id: '1',
      Field_Updated: 'Passport',
      Issue: '15 Aug 2025',
      Expiry: '15 Aug 2029',
      Status: '🟢 Approved',
      Reviewed_By: 'Admin – Employee Name (Optional)',
    },
    {
      id: '2',
      Field_Updated: 'Emirates ID',
      Issue: '15 Aug 2025',
      Expiry: '15 Aug 2029',
      Status: '🟡 Pending',
      Reviewed_By: '—',
    },
    {
      id: '3',
      Field_Updated: 'Utility Bill',
      Issue: '15 Aug 2025',
      Expiry: '15 Aug 2029',
      Status: '🔴 Rejected',
      Reviewed_By: 'Admin – Ali',
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
      <Header title="Document History" />

      <Text style={styles.mainTitle}>Document History</Text>
      <Text style={styles.subtitle}>
        View all changes submitted for your profile and their verification
        status.
      </Text>

      <Text style={[styles.sectionTitle, { paddingHorizontal: '1%' }]}>
        Filter Bar
      </Text>

      {/* 🔹 Tower Buttons */}
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

      {/* 🔹 Filtered Document List */}
      <Text
        style={[
          styles.sectionTitle,
          { verticalAlign: 'bottom', marginTop: '7%' },
        ]}
      >
        Upload History (List View)
      </Text>

      <View style={styles.documentListContainer}>
        {filteredDocs.map((doc) => (
          <View key={doc.id} style={styles.documentCard}>
            <Text style={[styles.documentTxt, { fontFamily: 'Inter_24pt-Bold' }]}>
              {doc.Field_Updated}
            </Text>
            <Text style={styles.documentTxt}>Issue Date: {doc.Issue}</Text>

            <View style={styles.documentFooterRow}>
              <Text style={styles.documentTxt}>Expiry Date: {doc.Expiry}</Text>
              <Text style={styles.documentTxt}>Status: {doc.Status}</Text>
            </View>
            <Text style={styles.documentTxt}>Reviewed By: {doc.Reviewed_By}</Text>
          </View>
        ))}
      </View>

      <Text style={[styles.subtitle, { paddingVertical: '15%' }]}>
        Only verified documents are marked Approved. You can re-upload if any
        document is rejected or expired.
      </Text>

      <TouchableOpacity
        style={styles.profileBtn}
        onPress={() => navigation.goBack('DocCenter')}
      >
        <Text style={styles.profileBtnTxt}>Back to Document Center</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 15 },

  mainTitle: {
    fontSize: 24,
    fontFamily: 'Inter_24pt-SemiBold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    color: '#000',
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'Inter_24pt-Regular',
    paddingHorizontal: '10%',
    paddingVertical: '5%',
    bottom: 10,
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
  documentListContainer: {},
  documentCard: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    height: 90,
    paddingHorizontal: 10,
    paddingVertical:10,
    marginBottom: 10,
  },
  documentTxt: {
    fontSize: 10,
    color: '#000',
    fontFamily: 'Inter_24pt-Regular',
  },
  documentFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});
