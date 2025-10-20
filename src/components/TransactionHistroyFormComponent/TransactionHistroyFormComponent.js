import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Foundation from 'react-native-vector-icons/dist/Foundation';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { Icon } from 'react-native-vector-icons/Icon';

const TransactionHistroyFormComponent = ({ index, PropsUnit_Name, Date, Amount, Form_No, Created_By, Transaction_Type, Document_No }) => {
    const backgroundColor = index % 2 === 0 ? "#F6F6F6" : "#FFF";
    // F6FFFD  old Color for Green and 

    return (
        <View style={[styles.MianContainer, { backgroundColor }]}>
            <View style={{ padding: 1 }}>
                <View style={styles.DirectionRowStyle}>
                    <View style={[styles.DirectionRowStyle, { width: "70%", }]}>
                        <View style={styles.ImageVIewStyle}>
                            <Image
                                source={require('../../asserts/Images/GroupForTransactionHistory.png')}
                                // source={require('../../asserts/Images/Transaction.png')}
                                style={{ width: 20, height: 25, }} />
                        </View>
                        <View style={{ marginLeft: "2%" }}>
                            <Text style={styles.HeadingStyle}>{PropsUnit_Name}</Text>
                            <View style={{flexDirection:"row"}}>
                                <AntDesign name='calendar' size={14} color="#82CED9" style={{paddingTop:"3%"}} />
                            <Text style={[styles.BottomContainerTxtStye, { width: "100%", paddingLeft:"0.5%" }]}>{Date}</Text>
                            </View>
                        </View>
                    </View>
                    {/* Amount View  */}
                    <View style={styles.AmountIconStyle} >
                        {/* <Image
                            source={require('../../asserts/Images/VectorForTransactionHistory.png')}
                            // source={require('../../asserts/Images/Vector(1)MomeyIcon.png')}
                            style={
                            { width: 25, height: 30, resizeMode: "contain", marginRight: "2%" }}
                        /> */}
                        <Foundation
                        name='dollar-bill' size={24} color="#82CED9" style={{paddingTop:"2%"}} />
                        <View style={styles.LineStyle}></View>
                        <Text style={styles.AmountTxtStyle}>{Amount}</Text>
                    </View>
                </View>

                {/* Bottom Container */}
                <View style={{ padding: 5 }}>
                    <View style={styles.DirectionRowStyle}>
                        <Text style={styles.BottomContainerTxtStye} >Form No:</Text>
                        <Text style={[styles.boldTxtStyle, { color: "#156CFF" }]} >{Form_No}</Text>
                    </View>
                    <View style={[styles.DirectionRowStyle, { paddingVertical: 3 }]}>
                        <Text style={styles.BottomContainerTxtStye} >Created By:</Text>
                        <Text style={[styles.boldTxtStyle, { color: "black" }]} >{Created_By}</Text>
                    </View>
                    <View style={styles.DirectionRowStyle}>
                        <Text style={[styles.BottomContainerTxtStye]} >Transaction Type:</Text>
                        <Text style={[styles.boldTxtStyle, { color: "black" }]} >{Transaction_Type}</Text>
                    </View>
                    <View style={styles.DirectionRowStyle}>
                        <Text style={[styles.BottomContainerTxtStye,]} >Document No:</Text>
                        <Text style={[styles.boldTxtStyle, { color: "black" }]} >{Document_No}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default TransactionHistroyFormComponent;

const styles = StyleSheet.create({
    MianContainer: {
        width: "93%",
        alignSelf: "center",
        borderRadius: 15,
        padding: 5,
        elevation: 10,
        paddingLeft: 10,
        marginBottom: '2%',
        // backgroundColor: "red"
    },
    DirectionRowStyle: {
        flexDirection: "row"
    },
    rImageVIewStyle: {
        // width: "16%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#DEF9E9",
        padding: 10,
        borderRadius: 20,
    },
    HeadingStyle: {
        fontSize: 13,
        color: "black",
        fontWeight: "bold"
    },
    TextStyle: { color: "gray", fontSize: 13 },
    AmountIconStyle: {
        // backgroundColor: "#DEF9E9",
        backgroundColor: "#E9F4F6",
        width: "30%",
        justifyContent: "center",
        padding: 5,
        borderRadius: 5,
        flexDirection: "row",
        height:"80%",
        // borderColor:"#9B4188",
        borderColor:"#000",
        borderWidth:1
    },
    LineStyle: {
        // backgroundColor: "green",
        backgroundColor: "5#9B4188",
        width: '2%',
        height: "80%",
        marginLeft: "3%",
        marginTop:"3%",
    },
    AmountTxtStyle: {
        color: "black",
        paddingVertical: 4
    },
    boldTxtStyle: {
        fontWeight: "500",
        fontSize: 14
    },
    BottomContainerTxtStye: {
        color: "gray",
        fontWeight: "500",
        width: "40%",
        fontSize: 13,
        paddingVertical: 5,
    }
})
