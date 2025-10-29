import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import TowerTabs from '../../components/TowerTabs';

export default function MyProperties() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false }, [navigation]);
  });
 
  const properties = [
    {
      id: '1',
      projectName: 'ABC',
      tower: 'Tower A',
      floorPlan: '2 Bed + Lounge',
      unit: 'Unit 101',
      size: '1,200 sq ft',
      handover: 'Dec 2026',
      progress: 0.786,
      status: 'On Track',
    },
    {
      id: '2',
      projectName: 'ABC',
      tower: 'Tower A',
      floorPlan: '2 Bed + Lounge',
      unit: 'Unit 102',
      size: '1,200 sq ft',
      handover: 'Dec 2026',
      progress: 0.65,
      status: 'On Track',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Header title="My Properties" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.mainTitle}>My Properties</Text>

        {/* Tabs */}
        <TowerTabs />

        {/* Unit Switcher */}

        <Text style={styles.subTitle}>
          This dropdown if 1 property is selected by the user
        </Text>

        {/* Property Cards */}
        <FlatList
          data={properties}
          scrollEnabled={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.propertyCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 5,
                }}
              >
                <View style={styles.propertyImage}>
                  <Text style={styles.imageText}>IMAGE OF THE PROPERTY</Text>
                  <TouchableOpacity style={styles.heartIcon}>
                    <Ionicons name="heart-outline" size={8} color="#333" />
                  </TouchableOpacity>
                </View>

                <View style={styles.propertyDetails}>
                  <Text style={styles.detailText}>
                    <Text
                      style={[styles.bold, { fontFamily: 'Inter_24pt-Bold' }]}
                    >
                      Project Name:
                    </Text>{' '}
                    {item.projectName}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.bold}>Tower Number:</Text> {item.tower}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.bold}>Floor Plan Type:</Text>{' '}
                    {item.floorPlan}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.bold}>Unit Number → </Text> "{item.unit}
                    "
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.bold}>Unit Size → </Text> "{item.size}"
                  </Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <TouchableOpacity style={styles.infoButton}>
                  <Text style={styles.infoText}>Payment Status</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoButton}>
                  <Text style={styles.infoText}>Estimated Handover Date</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.infoRow, { height: 40, marginTop: '.5%' }]}>
                <View
                  style={[
                    styles.infoBox,
                    { backgroundColor: 'rgba(0, 0, 0, 0.4)' },
                  ]}
                >
                  <Text style={styles.infoText}>{item.status}</Text>
                </View>
                <View
                  style={[
                    styles.infoBox,
                    { backgroundColor: 'rgba(0, 0, 0, 0.4)' },
                  ]}
                >
                  <Text style={styles.infoText}>{item.handover}</Text>
                </View>
              </View>

              {/* Progress Circle */}
              <View style={styles.progressContainer}>
                <TouchableOpacity
                  style={[styles.infoButton, { alignItems: 'center' }]}
                >
                  <Text style={[styles.infoText, { alignItems: 'center' }]}>
                    Construction Progress
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    marginRight: '10%',
                    height: 102,
                    width: 100,
                    backgroundColor: '#rgba(136, 74, 246, 0.04)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AnimatedCircularProgress
                    size={90}
                    width={10}
                    fill={item.progress * 100}
                    tintColor="#FF4D4D"
                    backgroundColor="#FFD6D6"
                    rotation={0}
                    lineCap="round"
                  >
                    {() => (
                      <Text
                        style={{
                          fontSize: 14,
                          color: 'tomato',
                          fontFamily: 'Inter_24pt-ExtraBold',
                        }}
                      >
                        {(item.progress * 100).toFixed(1)}%
                      </Text>
                    )}
                  </AnimatedCircularProgress>
                </View>
              </View>
              <View style={styles.divider} />
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 12 },
  mainTitle: {
    fontSize: 24,
    fontFamily: 'Inter_24pt-SemiBold',
    textAlign: 'center',
    marginVertical: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10%',
  },
  tabButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  tabActive: { backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  tabText: { color: '#fff', fontSize: 10 },
  tabTextActive: { color: '#fff' },
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
  propertyImage: {
    width: '48%',
    height: 160,
    backgroundColor: 'rgba(136, 74, 246, 0.08)',
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: '3%',
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
  propertyDetails: {
    width: '48%',
    height: 160,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
  },
  detailText: { fontSize: 8, marginVertical: 2 },
  bold: { fontFamily: 'Inter_24pt-Medium', fontSize: 8 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
    gap: 10,
  },
  infoButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '48%',
    paddingVertical: 1,
    borderRadius: 10,
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    height: 20,
  },
  infoText: { color: '#fff', fontSize: 10, fontFamily: 'Inter_24pt-Medium' },
  infoBox: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    paddingVertical: 5,
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    width: '50%',
    height: 34,
  },
  progressText: { color: '#fff', fontSize: 10, textAlign: 'center' },
  infoValue: { color: '#fff', fontSize: 13 },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#000',
    marginVertical: 15,
    marginHorizontal: 10,
  },
});
