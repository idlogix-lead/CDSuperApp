import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';

const AnnouncementSrnComponent = ({ title, messageText, date, ProjectOrganization, ReadMore }) => {
    return (
        <View style={styles.MianContainer}>
            {/* <View style={{ marginTop: "3%" }} >
                <Text style={styles.titleStyle}>{title}</Text>
            </View>

            
            <View style={[styles.MianContainer, { marginTop: "0.5%" }]}>
                <View style={{
                    width: "9%",
                    backgroundColor: "#157B63",
                    marginLeft: "-2.7%",
                    paddingVertical: 8,
                    paddingHorizontal: 10,
                    borderBottomEndRadius: 100,
                }}>
                    <Entypo
                        name="star"
                        size={10}
                        color="#FFF"
                    />

                </View>
                <View style={{ padding: 3, }} >
                    <View style={{ flexDirection: "row" }} >
                        <Text style={styles.ProjectTitleStyle}>Project:</Text>
                        <Text style={[styles.HeadingStyle, { fontWeight: '500', fontSize: 15 }]}>{ProjectOrganization}</Text>
                    </View>
                    
                    <View>
                        <Text style={styles.TextStyle}>{messageText}</Text>
                    </View>

                   \
                    <View style={styles.DateContainerView}>
                        <TouchableOpacity style={styles.DateButtonStyles}>
                            <Text style={{ color: "#fff", alignSelf: "center" }}>Date:</Text>
                        </TouchableOpacity>
                        <Text style={[styles.TextStyle, { fontSize: 12 }]}>{date}</Text>
                    </View>
                </View>
            </View> */}

            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image
                    source={require('../../asserts/AnnouncementSrnFakePic/Frame96.png')}
                    style={{ width: "102%", }}
                />
            </View>

            {/* Title VIew */}
            <View>
                <Text style={styles.titleStyle}>{title}</Text>
            </View>

            {/* Description  View*/}

            <Text style={styles.TextStyle}>{messageText}</Text>

            <TouchableOpacity style={styles.ReadMreButtonStyle}>
                <Text style={{ color: 'green', fontSize: 11 }}> {ReadMore}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AnnouncementSrnComponent

const styles = StyleSheet.create({
    MianContainer: {
        width: "97%",
        alignSelf: "center",
        backgroundColor: "#FFF",
        marginTop: 10,
        borderRadius: 10,
        elevation: 10,
        paddingLeft: 10,
        padding: 20,
        // backgroundColor: "red"

    },
    HeadingStyle: {
        fontSize: 13, color: "black", fontWeight: '500'
    },
    TextStyle: {
        color: "gray",
        fontSize: 11,
        width: "90%",
        alignSelf: "center"

    },
    DateContainerView: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginTop: "1%",
        paddingRight: 5,
        flexDirection: "row",
        paddingBottom: 8,
        marginTop: "2%"
    },
    DateButtonStyles: {
        width: "13%",
        backgroundColor: "#006950",
        borderRadius: 20,
        marginRight: "1%"
    },
    ProjectTitleStyle: {
        fontWeight: '500',
        width: "18%",
        color: "#147D64",
        fontSize: 16,
    },
    titleStyle: {
        fontWeight: '700',
        fontSize: 18,
        width: "90%",
        alignSelf: "center",
        marginTop: 5,
        color: "black"
    },
    ReadMreButtonStyle: {
        width: "22%",
        // backgroundColor: "red",
        padding: 5,
        borderRadius: 20,
        borderWidth: 1,
        alignSelf: "flex-end",
        backgroundColor: "#DEF9E9",
        borderColor: "green"

    }
})