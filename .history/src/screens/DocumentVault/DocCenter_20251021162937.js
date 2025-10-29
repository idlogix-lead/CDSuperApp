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

export default function DocCenter() {
  const navigation = useNavigation();
  const towers = ['All', 'Pending', 'Approved', 'Rejected'];
  const DocList = [
    {
      id: '1',
      Field_Updated: 'Passport',
      Issue: 'Issue Date: 15 Aug 2025',
      Expiry: 'Expiry Date: 15 Aug 2029',
      Status: '🟢 Approved',
    },
     {
      id: '2',
      Field_Updated: 'Emirtates ID',
      Issue: 'Issue Date: 15 Aug 2025',
      Expiry: 'Expiry Date: 15 Aug 2029',
      Status: '🟡 Pending',
    },
     {
      id: '3',
      Field_Updated: ' Utility Bill',
      Issue: 'Issue Date: 15 Aug 2025',
      Expiry: 'Expiry Date: 15 Aug 2029',
      Status: '🔴 Rejected',
      
    },
    
   
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* Header */}
      <Header title="Document Center" />

      {/* Title & Subtitle */}
      <Text style={styles.mainTitle}>Document Center</Text>
      <Text style={styles.subtitle}>
        Upload, view, and track verification status of your identity and compliance documents.
      </Text>

    

      {/* Document List */}
      <Text
        style={[
          styles.sectionTitle,
          { verticalAlign: 'bottom', marginTop: '7%' },
        ]}
      >
        Uploaded Documents List
      </Text>
      <View style={styles.documentListContainer}>
        {DocList.map(doc => (
          <View key={doc.id} style={styles.documentCard}>
            <Text style={[styles.documentTxt,{fontFamily:"Inter_24pt-Bold"}]}>{doc.Field_Updated}</Text>
            <Text style={styles.documentTxt}>
              Issue Date :{doc.Issue}
            </Text>
            <Text style={styles.documentTxt}>
              Expiry Date :{doc.Expiry}
            </Text>
              <Text style={styles.documentTxt}>Status: {doc.Status}</Text>

           
           
          </View>
        ))}
         <TouchableOpacity style={styles.profileBtn} onPress={()=>navigation.navigate("Document Upload")}>
                      <Text style={styles.profileBtnTxt}>Upload New Document</Text>
                    </TouchableOpacity>
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
  profileBtn:{
    height:40,
    borderRadius:8,
    backgroundColor:'#000',
    width:'100%',
    justifyContent:'center'
  },
  profileBtnTxt:{
    color:"#fff",
    textAlign:'center',
    fontFamily:"Inter_24pt-Medium",
    fontSize:14
  },
  documentFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 2,
  },
  
  
  
});
