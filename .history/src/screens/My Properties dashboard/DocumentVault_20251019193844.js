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
import TowerTabs from '../../components/TowerTabs';

export default function DocumentVault() {
  const towers = ['All Docs', 'Legal', 'Financial', 'Formal'];
  const DocList = [
    {
      id: '1',
      text: 'SPA Agreement – Tower A Unit 101',
      category: 'Legal',
      Date: 'Date Uploaded: 15 Aug 2025',
    },
    {
      id: '2',
      text: 'Invoice – July 2025',
      category: 'Financial',
      Date: 'Date Uploaded: 20 Aug 2025',
    },
    {
      id: '3',
      text: 'Receipt – Payment Confirmation #INV-105',
      category: 'Financial',
      Date: 'Date Uploaded: 20 Aug 2025',
    },
    {
      id: '4',
      text: 'Brochure – Tower A Residences',
      category: 'Design',
      Date: 'Date Uploaded: 15 Aug 2025',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* Header */}
      <Header title="Secure Document Vault" />

      {/* Title & Subtitle */}
      <Text style={styles.mainTitle}>Secure Document Vault</Text>
      <Text style={styles.subtitle}>
        Access and download your verified property documents securely — all
        categorized and watermark-protected.
      </Text>

      {/* Tabs + Unit Switcher */}
      <TowerTabs />
      <Text style={styles.subtitle}>Switch between your purchased units</Text>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Document Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.buttonRow}
      >
        {towers.map((item, index) => (
          <TouchableOpacity key={index} style={styles.tabButton}>
            <Text style={styles.tabButtonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Document List */}
      <Text style={styles.sectionTitle}>Document List</Text>
      <View style={styles.documentListContainer}>
        {DocList.map(doc => (
          <View key={doc.id} style={styles.documentCard}>
            <Text style={styles.documentTitle}>{doc.text}</Text>
            <Text style={styles.documentCategory}>{doc.category}</Text>

            <View style={styles.documentFooterRow}>
              <Text style={styles.documentDate}>{doc.Date}</Text>
              <TouchableOpacity style={styles.downloadButton}>
                <Text style={styles.downloadButtonText}>Download Pdf</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.footerNote}>
        🔒 Access restricted to verified property owners. Documents are
        watermarked with your customer ID and download timestamp. Offline
        download is permitted for personal record keeping only.
      </Text>
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
    marginBottom: '1%',
    textAlign: 'center',
    fontSize: 8,
    fontFamily: 'Inter_24pt-Medium',
    paddingHorizontal: '10%',
  },

  switchHint: {
    textAlign: 'center',
    color: '#000',
    fontSize: 8,
    marginTop: 4,
    marginBottom: 15,
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
    width: '42%',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  documentTitle: {
    fontSize: 10,
    fontFamily: 'Inter_24pt-Bold',
    color: '#000',
    marginBottom: 8,
  },
  documentCategory: {
    fontSize: 10,
    color: '#000',
    fontFamily: 'Inter_24pt-Bold',

    marginBottom: 4,
  },
  documentFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 2,
  },
  documentDate: {
    fontSize: 10,
    fontFamily: 'Inter_24pt-Medium',
    color: '#000',
  },
  downloadButton: {
    height: 30,
    width: 85,
    borderRadius: 8,
    backgroundColor: '#000',
    justifyContent: 'center',
    fontFamily: 'Inter_24pt-Medium',
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 8,
    textAlign: 'center',
    fontFamily: 'Inter_24pt-Medium',
  },

  // Footer Note
  footerNote: {
    fontSize: 8,
    color: '#000',
    marginTop: 1,
    paddingHorizontal: 10,
    textAlign: 'left',
    bottom: 10,
    fontFamily: 'Inter_24pt-Medium',
  },
});
