import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';

const { width, height } = Dimensions.get('window');

const AdvertismentSrnComponent = ({ imageSource, BroadcastMessage, Expiration }) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.text}>{BroadcastMessage}</Text>
      <Text style={styles.date}>{Expiration}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    width: '95%',
    alignSelf: 'center',
    marginTop: '2%',
    paddingBottom: '2%', 
    elevation:10,
    borderRadius:10
  },
  image: {
    width: '98%',
    height: height * 0.4, 
    borderRadius:10,
    alignSelf:"center",
    marginTop:"1%"
    
  },
  text: {
    color: 'black',
    textAlign: "justify", 
    fontSize: width * 0.04, 
    padding:10,
  },
  date:{
    fontSize:width * 0.03,
    alignSelf:"flex-end",
    paddingLeft:"4%",
    fontWeight:"700"

  }
});

export default AdvertismentSrnComponent;
