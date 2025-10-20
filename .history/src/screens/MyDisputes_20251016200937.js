import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import Header from '../components/Header/Header';

export default function MyDisputes() {
  const disputes = [
    {id: 1, status: 'Open', resolveBy: '15 Jan 2025'},
    {id: 2, status: 'Open', resolveBy: '15 Jan 2025'},
    {id: 3, status: 'In Progress', resolveBy: '15 Jan 2025'},
    {id: 4, status: 'Resolved', resolveBy: '15 Jan 2025'},
    {id: 5, status: 'Open', resolveBy: '15 Jan 2025'},
    {id: 6, status: 'In Progress', resolveBy: '15 Jan 2025'},
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* ✅ Keep Your Existing Header */}
      <Header title={'MY DISPUTES'} onPress={() => navigation.goBack()} />

      {/* ✅ Disputes UI from Screenshot */}
      <Text style={styles.mainTitle}>My Disputes</Text>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {disputes.map(item => (
          <View key={item.id} style={styles.disputeBox}>
            <View style={styles.row}>
              <Text style={styles.label}>Ticket ID</Text>
              <Text style={styles.statusText}>
                [<Text style={styles.bold}>Open</Text>] [In Progress] [Resolved]
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Transaction ID</Text>
              <Text style={styles.resolveText}>
                <Text style={styles.bold}>Resolve by:</Text> {item.resolveBy}
              </Text>
            </View>
            <Text style={styles.viewTicket}>View Ticket (INSERT LINK)</Text>
          </View>
        ))}
      </ScrollView>

      {/*  Contact Support Button */}
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity style={styles.contactBtn}>
          <Text style={styles.contactText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /* MAIN CONTAINER */
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },

  /* MAIN TITLE (My Disputes) */
  mainTitle: {
    fontFamily: 'ChronicleDisp-Semibold',
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
    marginTop: 40,
    bottom: 10,
  },

  /* DISPUTE LIST */
  scrollContainer: {
    paddingBottom: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: '30%',
  },
  disputeBox: {
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    height: 91,
    width: 324,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
    fontFamily: 'FuturaStdMedium',
  },
  statusText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '600',
    fontFamily: 'FuturaStdHeavy',
  },
  bold: {
    fontWeight: '600',
  },
  resolveText: {
    fontSize: 12,
    color: '#000',
    textDecorationLine: 'underline',
    fontWeight: '600',
    fontFamily: 'FuturaStdHeavy',
  },
  viewTicket: {
    fontSize: 12,
    color: '#000',
    marginTop: 5,
    textAlign: 'right',
    fontWeight: '400',
    fontFamily: 'FuturaStdBook',
  },

  /* CONTACT SUPPORT BUTTON */
  contactBtn: {
    backgroundColor: 'rgba(0,0,0,1)',
    width: '100%',
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    bottom: 30,
    left: 0,
    height: 40,
    width: 327,
  },
  contactText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'FuturaStdMedium',
  },
});
