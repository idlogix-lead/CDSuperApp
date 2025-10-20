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

export default function ReceiptsAndStatement({navigation}) {
  const receipts = [
    {
      id: 1,
      status: 'Pending',
      amount: 'PKR 250,000',
      date: '10 Jan 2025',
      txn: 'TXN#123456',
    },
    {
      id: 2,
      status: 'Pending',
      amount: 'PKR 250,000',
      date: '10 Jan 2025',
      txn: 'TXN#123456',
    },
    {
      id: 3,
      status: 'Paid',
      amount: 'PKR 250,000',
      date: '10 Jan 2025',
      txn: 'TXN#123456',
    },
    {
      id: 4,
      status: 'Overdue',
      amount: 'PKR 250,000',
      date: '10 Jan 2025',
      txn: 'TXN#123456',
    },
    {
      id: 5,
      status: 'Overdue',
      amount: 'PKR 250,000',
      date: '10 Jan 2025',
      txn: 'TXN#123456',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Header
        title={'RECEIPTS & STATEMENTS'}
        onPress={() => navigation.goBack()}
      />
      <View style={{alignItems: 'center'}}>
        {/* Title Section */}
        <View style={styles.headerArea}>
          <Text style={styles.title}>Receipts & Statements</Text>
        </View>

        {/* Download Full Statement Button */}
        <TouchableOpacity style={styles.downloadFullBtn}>
          <Text style={styles.downloadFullText}>
            Download Full Statement (PDF)
          </Text>
        </TouchableOpacity>

        <Text style={styles.helper}>
          <Text style={{fontWeight: '700'}}>Helper:</Text> (Branded,
          date-stamped PDFs with transaction IDs.)
        </Text>

        {/* List of Receipts */}
        <ScrollView
          style={{marginTop: 15}}
          showsVerticalScrollIndicator={false}>
          {receipts.map(item => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.txn}>{item.txn}</Text>
                <Text style={styles.status}>{item.status}</Text>
              </View>
              <Text style={styles.date}>Date: {item.date}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.amount}>Amount: {item.amount}</Text>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}>
                  <Text style={styles.downloadPDF}>Download PDF</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
  },
  headerArea: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'ChronicleDisp-Semibold',
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
    marginTop: 20,
    bottom: 10,
    // fontWeight: '400',
  },
  downloadFullBtn: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 10,

    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: '10%',
    width: 327,
    height: 40,
  },
  downloadFullText: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 14,
    fontFamily: 'FuturaStdMedium',
    // verticalAlign: 'middle',
  },
  helper: {
    fontSize: 12,
    color: '#000',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: 'futuraStdHeavy',
  },
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 12,
    marginBottom: 15,
    width: 327,
    height: 104,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txn: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'FuturaStdMedium',
    fontWeight: '500',
  },
  status: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: '600',
    // fontFamily: 'FuturaStdHeavy',
  },
  date: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'FuturaStdMedium',
    marginVertical: '4%',
  },
  amount: {
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: '600',
    // fontFamily: 'FuturaStdHeavy',
    fontSize: 16,
  },
  downloadPDF: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: '600',
    // fontFamily: 'FuturaStdHeavy',
    // marginTop: 5,
    textAlign: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    // width:"30%"
  },
});
