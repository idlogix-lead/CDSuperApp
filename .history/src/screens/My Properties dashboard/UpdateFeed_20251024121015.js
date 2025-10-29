import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ConstructionProgress from '../../components/ConstructionProgress';
import TowerTabs from '../../components/TowerTabs';
import Header from '../../components/Header/Header';

export default function UpdatesFeed() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <Header title="Construction Updates Feed" />

      {/* Title & Subtitle */}
      <Text style={styles.mainTitle}>Construction Updates Feed</Text>
      <Text style={styles.subtitle}>
        Track your properties construction progress, photos, and milestones in
        real-time.
      </Text>

      {/* Buttons */}
      <TowerTabs />

      <Text style={styles.subtitle}>Switch between your purchased units</Text>

      {/* Estimated Handover Progress */}
      <Text style={styles.sectionTitle}>Estimated Handover Progress</Text>
      <ConstructionProgress />
      {/* Updates Feed */}
      <Text style={[styles.sectionTitle, {alignItems: 'center', bottom: '1%'}]}>
        Updates Feed (Chronological List)
      </Text>

      {[{date: '2 Oct 2025'}, {date: '15 Sep 2025'}, {date: '30 Aug 2025'}].map(
        (item, index) => (
          <View key={index} style={styles.updateCard}>
            <Text style={styles.updateDate}>Date – {item.date}</Text>
            <Text style={styles.updateLabel}>
              <Text style={styles.bold}>Update Title:</Text> Exterior Paint
              Completed for Tower A Levels
            </Text>
            <Text style={styles.updateLabel}>
              <Text style={styles.bold}>Description:</Text> Short text summary
              of the update (if required)
            </Text>
            <Text style={[styles.bold, {marginBottom: 15}]}>Attachments:</Text>

            {/* Attachments */}
            <View style={styles.attachmentsRow}>
              <Text style={[styles.bold, {marginTop: 10}]}>Photos:</Text>
              <View style={styles.mediaBox}>
                <TouchableOpacity style={styles.heartIcon}>
                  <Ionicons name="heart-outline" size={12} color="#333" />
                </TouchableOpacity>
              </View>
              <View style={styles.mediaBox}>
                <TouchableOpacity style={styles.heartIcon}>
                  <Ionicons name="heart-outline" size={12} color="#333" />
                </TouchableOpacity>
              </View>
              <View style={styles.mediaBox}>
                <TouchableOpacity style={styles.heartIcon}>
                  <Ionicons name="heart-outline" size={12} color="#333" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.attachmentsRow}>
              <Text style={[styles.bold, {marginTop: 10}]}>Videos:</Text>

              <View style={styles.mediaBox}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    marginLeft: 10,
                  }}>
                  <Ionicons name="play" size={20} color="#444" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.heartIcon}>
                  <Ionicons name="heart-outline" size={12} color="#333" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ),
      )}

      {/* Footer Note */}
      <Text style={styles.footerNote}>
        You’ll receive push alerts whenever a new construction update is posted
        for your unit.
      </Text>
      <Text style={styles.footerSmall}>
        Updates and media are restricted to verified property owners. Files are
        sourced directly from Citi Developers’ Sales Hub.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  mainTitle: {
    fontSize: 24,
    fontFamily: 'Inter_24pt-SemiBold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#000',
  },
  subtitle: {
    color: '#000',
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 8,
    fontFamily: 'Inter_24pt-Medium',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    gap: 7,
  },
  tabButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    width: '30%',
    gap: 7,
  },
  tabButtonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  switchHint: {
    textAlign: 'center',
    color: '#000',
    fontSize: 8,
    marginTop: 4,
    fontFamily: 'Inter_24pt-Medium',
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: 'Inter_24pt-Bold',
    fontSize: 12,
    marginVertical: 10,
    color: '#000',
    // bottom: 10,
  },
  progressCard: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  progressTitle: {fontWeight: '600', fontSize: 13, marginBottom: 6},
  progressContainer: {marginBottom: 8},
  stagesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  stageLabel: {fontSize: 10, color: '#444'},
  progressBarBackground: {
    height: 6,
    borderRadius: 4,
    backgroundColor: '#ddd',
  },
  progressBarFill: {
    height: 6,
    borderRadius: 4,
    backgroundColor: '#8B6E4B',
  },
  milestoneText: {fontSize: 12, color: '#333', lineHeight: 18},
  updateCard: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 12,
    marginBottom: 12,
    // Shadow (bottom-only black outer)
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#fff',
    bottom: 10,
  },
  updateDate: {
    fontFamily: 'Inter_24pt-Bold',
    fontSize: 12,
    marginBottom: 6,
    color: '#000',
  },
  updateLabel: {
    fontSize: 12,
    fontFamily: 'Inter_24pt-Regular',
    color: '#333',
    marginBottom: 3,
  },
  bold: {fontFamily: 'Inter_24pt-Bold', fontSize: 12, color: '#000'},
  attachmentsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 5,
    gap: 10,
    marginBottom: 15,
  },
  mediaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 80,
    height: 40,
    backgroundColor: 'rgba(136, 74, 246, 0.08)',
    borderRadius: 15,
  },
  footerNote: {
    textAlign: 'center',
    fontSize: 8,
    marginTop: '-2%',
    color: '#000',
    fontFamily: 'Inter_24pt-Medium',
  },
  footerSmall: {
    textAlign: 'flex-start',
    fontSize: 8,
    color: '#000',
    marginBottom: '5%',
    marginTop: '13%',
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
});
