import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const LedgerCards = ({ item, onPress }) => {
    // console.log(item,'item')
    return (
        <View style={styles.main}>
            <View style={styles.headerContainer}>
                <View style={styles.projectInfo}>
                    <View style={styles.iconContainer}>
                        {/* <Entypo name="documents" size={25} color="white" /> */}
                        <Image source={require('../../asserts/LedgerScreen/cardLedgerIcon.png')} />
                    </View>
                    <View style={styles.projectTextContainer}>
                        <Text style={styles.projectTitle}>{item?.project_name}</Text>
                        <Text style={styles.projectCode}>{item?.customername}</Text>
                    </View>
                </View>
                {/* <View style={styles.numberContainer}>
                    <Text style={styles.numberLabel}>FormNo#</Text>
                    <Text style={styles.number}>{item?.Form_No}</Text>
                </View> */}
            </View>

            <View style={styles.amountContainer}>
                <View style={styles.amountSection}>
                    <Text style={styles.totalAmountLabel}>Tot.Amount:</Text>
                    <Text style={styles.totalAmount}>
                        {item?.InvoiceAmt ? Number(item.InvoiceAmt).toLocaleString() : 'N/A'}
                    </Text>
                </View>
                <View style={styles.amountSection}>
                    <Text style={styles.amountLabel}>Rec.Amnt:</Text>
                    <Text style={styles.receivedAmount}>
                        {item?.received_amt ? Number(item.received_amt).toLocaleString() : 'N/A'}
                    </Text>
                </View>
                <View style={styles.amountSection}>
                    <Text style={styles.amountLabel}>Pend.Amnt:</Text>
                    <Text style={styles.pendingAmount}>
                        {item?.OpenAmt ? Number(item.OpenAmt).toLocaleString() : 'N/A'}
                    </Text>
                </View>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.detailsButton}>
                    <Text style={styles.detailsText}>Details</Text>
                </View>
                <TouchableOpacity style={styles.arrowButton} onPress={() => onPress(item?.SalesForm_ID.id)} >
                    <AntDesign name="arrowright" color="#fff" size={25} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LedgerCards;

const styles = StyleSheet.create({
    main: {
        width: '100%',
        backgroundColor: '#f7f7f7',
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        borderRadius: 7,
        marginTop: 10,
    },
    headerContainer: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    projectInfo: {
        flexDirection: 'row',
        marginLeft: 7,
    },
    iconContainer: {
        height: 40,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#157B63',
        // backgroundColor: 'rgba(155,65,136,39)', 
        backgroundColor: '#82CED9',
        borderRadius: 5,
    },
    projectTextContainer: {
        marginLeft: 5,
    },
    projectTitle: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
    },
    projectCode: {
        fontSize: 13,
        color: '#808080',
        fontWeight: 'bold',
        marginTop: 1,
    },
    numberContainer: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
    },
    numberLabel: {
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold',
    },
    number: {
        fontSize: 12,
        color: 'grey',
        fontWeight: 'bold',
    },
    amountContainer: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
        marginTop: 2,
    },
    amountSection: {
        alignItems: 'center',
    },
    amountLabel: {
        color: '#adadad',
        fontSize: 13,
    },
    receivedAmount: {
        color: '#0A4A25',
        fontSize: 11,
    },
    pendingAmount: {
        color: 'red',
        fontSize: 11,
    },
    totalAmountLabel: {
        color: 'grey',
        fontSize: 13,
        fontWeight: 'bold',
    },
    totalAmount: {
        color: 'blue',
        fontSize: 12,
    },
    detailsContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
        marginTop: 2,
    },
    detailsButton: {
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'rgba(21, 123, 99, 0.3)',
        backgroundColor: '#C2F5FD',
        // backgroundColor: '#F7FEFF',
        // backgroundColor: '#157B63',
        borderRadius: 5,
        paddingVertical: 7
    },
    detailsText: {
        fontSize: 16,
        // color: '#157B63',
        color: '#fff',
        fontWeight:"bold"
    },
    arrowButton: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#157B63',
        // backgroundColor: 'rgba(155,65,136,39)',
        backgroundColor: '#82CED9',
        marginLeft: 5,
        borderRadius: 5,
        padding: 5
    },
});
