import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeHeader from '../../components/HomeHeader';

export default function Home({navigation}) {
  const [customerName] = useState('Customer Name');

  const properties = [
    {
      id: '1',
      projectName: 'ABC',
      tower: 'Tower A',
      floorPlan: '2 Bed + Lounge',
      unit: 'Unit 101',
      size: '1,200 sq ft',
      handover: 'Dec 2026',
      progress: '78%',
      status: 'Upcoming',
      nextDue: '20 Oct 2025',
    },
    {
      id: '2',
      projectName: 'ABC',
      tower: 'Tower A',
      floorPlan: '2 Bed + Lounge',
      unit: 'Unit 102',
      size: '1,200 sq ft',
      handover: 'Dec 2026',
      progress: '78%',
      status: 'Upcoming',
      nextDue: '20 Oct 2025',
    },
  ];

  const featuredProperty = properties[0];

  const notifications = [
    {id: '1', text: 'Payment Reminder – Bill ready for Unit 101'},
    {id: '2', text: 'Construction Update – Stage 3 Tiling Completed'},
    {id: '3', text: 'KYC Alert – Document Approved'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader title="City Developer App" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <Text style={styles.welcomeText}>Welcome, [{customerName}]</Text>
        <Text style={styles.subText}>Here’s a summary of your properties.</Text>

        {/* Snapshot Section */}
        <Text style={styles.sectionTitle}>My Properties Snapshot</Text>
        {/* My Properties Snapshot */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.snapshotContainer}>
          {properties.map(item => (
            <View key={item.id} style={styles.snapshotBox}>
              <Text style={styles.snapshotText}>
                {item.tower} – {item.unit}
              </Text>
              <Text style={styles.snapshotDetail}>
                Payment Status: {item.status}
              </Text>
              <Text style={styles.snapshotDetail}>
                {/* Progress: {(item.progress * 100).toFixed(0)}% Complete */}
                Progress : {item.progress} complete
              </Text>
              <Text style={styles.snapshotDetail}>
                Next Due: {item.nextDue || 'N/A'}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation?.navigate('MyPropertiesScreen', {
                    propertyId: item.id,
                  })
                }>
                <Text style={styles.viewDetails}>View Property Details →</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Featured Property */}
        <Text style={styles.sectionTitle}>Featured Property</Text>
        <View style={styles.featuredContainer}>
          <View style={styles.propertyImage}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
              }}
              style={{width: '100%', height: 100}}
              resizeMode="cover"
            />
            <TouchableOpacity style={styles.heartIcon}>
              <Ionicons name="heart-outline" size={11} color="#234F68" />
            </TouchableOpacity>
          </View>

          <View style={styles.propertyInfo}>
            <Text style={styles.propertyDetail}>
              <Text
                style={[styles.propertyTitle, {fontFamily: 'Inter_24pt-Bold'}]}>
                Project Name:
              </Text>{' '}
              ABC
            </Text>
            <Text style={styles.propertyDetail}>Price</Text>
            <Text style={styles.propertyDetail}>Location</Text>
          </View>
        </View>

        {/* Notifications */}
        <View style={{height: 50, justifyContent: 'flex-end'}}>
          <Text style={styles.sectionTitleNotifications}>
            Recent Notifications
          </Text>
        </View>
        <View style={styles.notificationsContainer}>
          {notifications.map(note => (
            <TouchableOpacity key={note.id} style={styles.notificationBox}>
              <Text style={styles.notificationText}>{note.text}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={{marginVertical: 10}}
          onPress={() => alert('View All Notifications')}>
          <Text style={styles.viewAll}>[ View All Notifications → ]</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginVertical: 10}}
          onPress={() => alert('Customer Support')}>
          <Text style={[styles.viewAll, {textAlign: 'center'}]}>
            Need help? Contact Customer Support →
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', paddingHorizontal: 12},
  welcomeText: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'ChronicleDisp-Semibold',
    marginTop: '7%',
    textAlign: 'center',
  },
  subText: {
    fontSize: 20,
    fontFamily: 'ChronicleDisp-Semibold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: 'FuturaStdBold',
    marginVertical: 10,
    color: '#000',
  },
  snapshotContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },

  snapshotBox: {
    width: 268, // ✅ Each box takes 70% width
    borderWidth: 1,
    borderColor: '#000',
    // height: 90,
    padding: 9,
    paddingVertical: 12,
    marginRight: 12, // spacing between boxes
    backgroundColor: '#fff',
  },

  snapshotText: {
    fontFamily: 'FuturaStdBoldOblique',
    marginBottom: 2,
    fontSize: 12,
    color: '#000',
  },

  snapshotDetail: {
    fontSize: 14,
    marginVertical: 0.1,
    fontFamily: 'FuturaStdMedium',
    color: '#000',
  },

  viewDetails: {
    fontSize: 14,
    marginTop: 2,
    color: 'blue',
  },

  featuredContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: 10,
    // gap: 5,
  },
  propertyImage: {
    width: '48%',
    height: 160,
    backgroundColor: 'rgba(136, 74, 246, 0.08)',
    // borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'relative',
  },
  imageText: {
    fontSize: 10,
    color: '#000',
    width: '50%',
    textAlign: 'center',
    fontFamily: 'Inter_24pt-Medium',
  },
  heartIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 10,
  },
  propertyInfo: {
    width: '48%',
    height: 160,
    borderWidth: 1,
    borderColor: '#000',
    // borderRadius: 15,
    padding: 10,
    justifyContent: 'center',
  },
  propertyTitle: {
    fontFamily: 'Inter_24pt-Bold',
    fontSize: 8,
    marginBottom: 4,
    color: '#000',
  },
  propertyDetail: {
    fontSize: 8,
    marginVertical: 2,
    fontFamily: 'Inter_24pt-Medium',
    color: '#000',
  },
  notificationsContainer: {marginTop: '3%'},
  notificationBox: {
    borderWidth: 1,
    borderColor: '#000',

    padding: 10,
    marginVertical: 3,
  },
  sectionTitleNotifications: {
    fontSize: 12,
    fontFamily: 'Inter_24pt-Bold',
    color: '#000',
  },
  detailText: {fontSize: 8, marginVertical: 2},
  notificationText: {
    fontSize: 10,
    fontFamily: 'Inter_24pt-Bold',
    color: '#000',
  },
  viewAll: {
    textAlign: 'flex-start',
    fontFamily: 'Inter_24pt-Bold',
    fontSize: 12,
    color: '#000',
  },
});
