import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import moment from 'moment';

const { width } = Dimensions.get('window');

const DuePaymentComponent = ({ FormNoDuePayment, AmountNoDuePayment, DateForDuePayment, ProjectNameDuePayment }) => {
    return (
        <View style={styles.RevealingView}>
            <View style={styles.APIResponseContainer}>
                <View style={styles.flexRow}>
                    <Text style={styles.HeadingTextStyle}>Form No:</Text>
                    <Text style={styles.TextStyle}>{FormNoDuePayment}</Text>
                </View>
                <View style={styles.flexRow}>
                    <Text style={styles.HeadingTextStyle}>Amount:</Text>
                    <Text style={styles.TextStyle}>{AmountNoDuePayment}</Text>
                </View>
            </View>
            <View style={[styles.APIResponseContainer, { marginTop: '2%' }]}>
                <View style={styles.flexRow}>
                    <Text style={styles.HeadingTextStyle}>Project:</Text>
                    <Text style={styles.TextStyle}>{ProjectNameDuePayment}</Text>
                </View>
                <View style={styles.flexRow}>
                    <Text style={[styles.HeadingTextStyle]}>Due Date:</Text>
                    <Text style={[styles.TextStyle, { marginTop: "-10%" }]}>
                        {moment(DateForDuePayment).format('MM/DD/YYYY')}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default DuePaymentComponent;

const styles = StyleSheet.create({
    RevealingView: {
        width: width * 0.9,  // 90% of the screen width
        backgroundColor: '#fafafa',
        marginTop: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 5,
        padding: width * 0.03,  // Padding adjusted based on screen size
        alignSelf: "center",
    },
    APIResponseContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "100%",
    },
    flexRow: {
        flexDirection: "row",
        width: "45%",  // You can adjust this based on the screen size or use flex for dynamic width
    },
    HeadingTextStyle: {
        fontSize: width * 0.035,  // Responsive font size based on screen width
        color: 'black',
        fontWeight: '500',
    },
    TextStyle: {
        fontSize: width * 0.033,  // Responsive font size based on screen width
        color: '#cccccc',
        textAlignVertical: "center",
        paddingLeft: 4,
        fontWeight: "bold",
    },
});
