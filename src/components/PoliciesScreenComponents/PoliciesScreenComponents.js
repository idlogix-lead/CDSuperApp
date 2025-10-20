import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


const PoliciesScreenComponents = ({ TitleHeading, MessagePoliciesScreen, DocDatePoliciesScrn }) => {
    return (
        <View style={{ flex: 1 }}>

            <View style={styles.MianContainer}>

                <View>
                    <Text style={styles.HeadingStyle}>{TitleHeading}</Text>
                </View>
                <View>
                    <Text style={styles.TextStyle}>{MessagePoliciesScreen}</Text>
                </View>
                <View style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
                    <Text style={[styles.TextStyle, { paddingLeft: 10 }]}>{DocDatePoliciesScrn}</Text>

                </View>

            </View>
        </View>
    )
}

export default PoliciesScreenComponents

const styles = StyleSheet.create({
    MianContainer: {
        width: "93%",
        alignSelf: "center",
        // backgroundColor: "#F6FFFD",
        backgroundColor: "#FFF",
        marginTop: 5,
        borderRadius: 5,
        padding: 10,
        elevation: 10,
        paddingLeft: 10,
        paddingBottom: 13,
        borderLeftColor: "#147D64",
        marginBottom: '2%',

    },
    TextStyle: { color: "gray", fontSize: 13 },
    HeadingStyle: {
        fontSize: 16, color: "black", fontWeight: '500'
    },
})