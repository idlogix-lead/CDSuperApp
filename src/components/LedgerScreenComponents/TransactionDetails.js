import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const TransactionDetails = ({item, index}) => {
    const colors = ['#198FF1', '#1E7643', '#F1192F'];
    const backgroundColor = colors[index % colors.length];

    return (
        <View style={styles.container}>
            <View style={[styles.topBox, { backgroundColor}]}></View>

            <View style={styles.detailBox}>

                <View style={styles.bookingRow}>
                    <Text style={styles.bookingText}>{item?.schedule_des}</Text>
                    <View style={styles.calendarRow}>
                        <View style={styles.calendarIcon}>
                            <AntDesign name="calendar" size={18} color="#1E7643" />
                        </View>
                        <Text style={styles.dateText}>{item?.DueDate}</Text>
                    </View>
                </View>

                <View style={styles.amountRow}>
                    <View style={styles.amountItem}>
                        <Text style={styles.amountTitle}>Due</Text>
                        <Text style={[styles.amountValue, { color: 'red' }]}>{item?.InvoiceAmt ? Number(item?.InvoiceAmt).toLocaleString() : 'N/A' }</Text>
                    </View>
                    <View style={styles.amountItem}>
                        <Text style={styles.amountTitle}>Paid</Text>
                        <Text style={[styles.amountValue, { color: '#16a4dd' }]}>{item?.InvoiceAmt - item?.OpenAmt ? Number(item?.InvoiceAmt - item?.OpenAmt).toLocaleString() : 'N/A'}</Text>
                    </View>
                    <View style={styles.amountItem}>
                        <Text style={styles.amountTitle}>Balance</Text>
                        <Text style={[styles.amountValue, { color: 'green' }]}>{item?.OpenAmt ? Number(item?.OpenAmt).toLocaleString() : 'N/A'}</Text>
                    </View>
                </View>
            </View>

            {/* {isLoading && <Loader/>} */}
        </View>
    );
};

export default TransactionDetails;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    topBox: {
        height: 50,
        width: 60,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    detailBox: {
        width: '100%',
        backgroundColor: '#FBFBFB',
        padding: 5,
        borderRadius: 5,
        borderTopLeftRadius: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginTop: -48,
        marginLeft: 2,
    },
    bookingRow: {
        // height: 40,
        width: '100%',
        // justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    bookingText: {
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold',
        width:'60%',
        paddingLeft:10,
    },
    calendarRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width:'40%',
    },
    calendarIcon: {
        height: 30,
        width: 30,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(30, 118, 67, 0.07)',
    },
    dateText: {
        fontSize: 12,
        color: '#000',
        marginLeft: 5,
    },
    amountRow: {
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom:5,
        marginTop:5
        // backgroundColor:'blue'
    },
    amountItem: {
        alignItems: 'center',
    },
    amountTitle: {
        fontSize: 12,
        color: 'grey',
    },
    amountValue: {
        fontSize: 14,
        // fontFamily: 'Lora-MediumItalic',
        fontStyle:'italic',
    },
});
