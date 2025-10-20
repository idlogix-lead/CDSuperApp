import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';

const ProfileSrnClientComponent = ({ Name, bodyData }) => {
    return (
        <View>
            <View style={{ padding: 15, flexDirection: "row" }}>
                <View style={{ marginTop: "3%" }}>
                    <AntDesign name="user" size={16} color="#147D64" />
                </View>
                <View style={{ paddingLeft: 10 }}>
                    <Text style={{ color: "black", }}>{Name}</Text>
                    <View >
                        <Text style={{ color: 'gray', }}>{bodyData}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ProfileSrnClientComponent

const styles = StyleSheet.create({
    CardViewStyle: {
        width: "95%",
        borderBottomWidth: 3,
        borderBottomColor: "green",
        marginTop: -5, elevation: 1,
        padding: 8,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
    }
})