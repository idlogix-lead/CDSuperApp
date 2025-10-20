import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'


const { width, height } = Dimensions.get('window')
const Card = ({ source, txt, handlePress, Icon, IconRight, language }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <View style={styles.TopBox}>
                {Icon && <View >{Icon}</View>}
                <Text style={styles.txt}>{txt}</Text>
            </View>

            {IconRight && (
                <View style={styles.endIcon}>
                    {IconRight}
                </View>
            )}
            {language && (
                <View style={{ padding: 2, paddingHorizontal: 10, backgroundColor: '#eee',borderRadius:5 }}>
                    <Text style={{color:'gray'}}>{language}</Text>
                </View>
            )}
        </TouchableOpacity>
    )
}

export default Card

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5
    },
    TopBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    txt: {
        fontSize: 17,
        fontFamily: 'K2D-Regular',
        color: 'black',
        marginLeft: 10,
    },


})