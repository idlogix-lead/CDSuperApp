
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Svg, { Circle } from 'react-native-svg';

const { height, width } = Dimensions.get('window');

const HomeCard = ({ iconName, txt, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}
            style={styles.container}>
                <View style={styles.IconView}>{iconName}</View>
                <Text style={[styles.Txt,{}]}>{txt}</Text>
        </TouchableOpacity>
    );
};

export default HomeCard;

const styles = StyleSheet.create({
    container:{
        height:155,
        width:165,
        backgroundColor:'#fff',
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        elevation:2,
        shadowOpacity:2,
        shadowColor:'#000'
    },
    Txt:{
        fontSize:14,
        marginTop:10,
        color:'#000',
        fontWeight:'bold',
    },
    IconView:{
    },
    // container: {
    //     // alignItems: 'center',    
    //     // justifyContent: 'center',
    //     height: "80%",
    //     width: "48%",
    //     backgroundColor: '#fff',
    //     borderRadius: 20,
    //     elevation: 3,
    //     // aspectRatio: 1,
    //     // margin: '2.5%',
        

    // },
    // iconContainer: {
    //     height: "40%",
    //     width: "40%",
    //     // position: 'absolute',
    //     // top: 25,
    //     // alignItems: 'center',
    //     justifyContent: 'center',
    //     borderRadius: 10,
    //     padding: 5,
    //     alignSelf: "flex-start",
    //     marginLeft: 10,
    //     borderWidth: 2,
    //     aspectRatio: 1,
    // },
    // textContainer: {
    //     marginTop: '60%',
    //     height: "45%",
    //     width: "100%",
    //     position: 'absolute',
    //     justifyContent: "flex-start",
    //     alignItems: "flex-start",
    //     borderRadius: 10,
    //     padding: 5,
    //     marginLeft: "5%"

    // },
    // text: {
    //     fontSize: 16,
    //     color: 'black',
    //     fontFamily: 'K2D-Regular',
    // },
});





