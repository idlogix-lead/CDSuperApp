import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TowerTabs from '../../components/TowerTabs';
import Header from '../../components/Header/Header';

export default function MediaAccess() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({headerShown: false}, [navigation]);
  });

  const Brouchers = [
    {id: '1', text: 'Floor Plan – 2 Bed + Lounge'},
    {id: '2', text: '3 Bed + Lounge'},
    {id: '3', text: 'Brochure – Tower A Residences'},
  ];

  const Walkthrough = [
    {id: '1', text: '3D Walkthrough – Floor Plan – 2 Bed + Lounge'},
    {id: '2', text: '3D Walkthrough – Tower A, Unit 101'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* header */}
      <Header title="Digital Media Access" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.mainTitle}>Digital Media Access</Text>
        <Text style={styles.subTitle}>
          Access floor plans, brochures, and 3D walkthroughs for your purchased
          units.
        </Text>
        {/* </View> */}
        {/* Tabs */}
        <TowerTabs />

        <Text style={styles.subTitle}>Select from your purchased units</Text>

        {/* floor Plans & Brouchers */}
        <View style={{height: 50, justifyContent: 'flex-end'}}>
          <Text style={styles.sectionTitle}>Floor Plans & Brochures</Text>
        </View>
        <View style={styles.notificationsContainer}>
          {Brouchers.map(note => (
            <View key={note.id} style={styles.notificationBox}>
              <Text style={styles.notificationText}>{note.text}</Text>

              <TouchableOpacity key={note.id} style={styles.BrouchersBtn}>
                <Text style={styles.BrouchersBtnText}>Download Pdf</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={{height: 30, justifyContent: 'flex-start', marginTop: 10}}>
          <Text style={styles.infoTxt}>
            All downloads are watermark-protected and linked to your ownership
            ID.
          </Text>
        </View>
        {/* 3D Walkthroughs */}
        <View style={{height: 50, justifyContent: 'flex-end'}}>
          <Text style={styles.sectionTitle}>3D Walkthrough</Text>
        </View>
        <View style={styles.notificationsContainer}>
          {Walkthrough.map(note => (
            <View key={note.id} style={styles.notificationBox}>
              <Text style={[styles.notificationText, {width: '58%'}]}>
                {note.text}
              </Text>

              <TouchableOpacity key={note.id} style={styles.BrouchersBtn}>
                <Text style={styles.BrouchersBtnText}>Download Pdf</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={{height: 30, justifyContent: 'flex-start', marginTop: 10}}>
          <Text style={styles.infoTxt}>
            You’ll be redirected securely to Citi Developers’ Sales Hub.
          </Text>
        </View>

        <View
          style={{
            height: 30,
            justifyContent: 'flex-start',
            marginTop: 10,
            bottom: 5,
          }}>
          <Text style={[styles.infoTxt, {textAlign: 'left'}]}>
            ℹ️ Security Note: Access restricted to verified property owners.
            Files and links are securely tied to your ownership record.
          </Text>
        </View>
        {/* Property Cards */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', paddingHorizontal: 12},
  mainTitle: {
    fontSize: 24,
    fontFamily: 'Inter_24pt-SemiBold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#000',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '7%',
  },
  tabButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  tabActive: {backgroundColor: 'rgba(0, 0, 0, 0.4)'},
  tabText: {color: '#fff', fontSize: 10},
  tabTextActive: {color: '#fff'},
  unitSwitcher: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
    height: 40,

    paddingHorizontal: 10,
    justifyContent: 'center',
  },

  picker: {
    color: '#fff',
    fontSize: 8,
    height: 60,
    width: '100%',
    marginTop: -4,
  },
  subTitle: {
    fontFamily: 'Inter_24pt-Medium',
    fontSize: 8,
    color: '#000',
    textAlign: 'center',
    paddingVertical: '2%',
  },

  propertyCard: {
    backgroundColor: '#fff',
    padding: 2,
    marginVertical: 12,
  },

  notificationsContainer: {marginTop: '3%'},
  notificationBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#000',
    height: 81,
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#fff',
    bottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Inter_24pt-Bold',
  },
  BrouchersBtn: {
    height: 30,
    width: 85,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#000',
  },
  BrouchersBtnText: {
    color: '#fff',
    fontSize: 8,
    textAlign: 'center',
    fontFamily: 'Inter_24pt-Medium',
  },
  notificationText: {
    fontSize: 12,
    fontFamily: 'Inter_24pt-Bold',
  },
  infoTxt: {
    fontSize: 8,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Inter_24pt-Medium',
  },
});
