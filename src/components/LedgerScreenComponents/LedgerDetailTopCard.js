import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const LedgerDetailTopCard = ({backgroundColor, icon, color, title, num}) => {
  return (
    <View style={[styles.card, {backgroundColor}]}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.BottomView}>
        <Text style={[styles.cardTitle]}>{title}</Text>
        <Text style={[styles.cardNumber, {color}]}>{num}</Text>
      </View>
    </View>
  );
};

export default LedgerDetailTopCard;

const styles = StyleSheet.create({
  card: {
    // height: 140,
    // width: 118,
    borderRadius: 20,
    // justifyContent: 'center',
    padding: 10,
    // marginHorizontal: 5,
    width: '31%',
    height: 115,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  BottomView: {
    overflow: 'hidden',
    marginTop: -13,
    alignItems: 'center',
  },
  // cardTitle: {
  //     fontSize: 12,
  //     color:'#fff',
  // },
  // cardNumber: {
  //     fontSize: 14,
  //     fontWeight:'bold'
  // },
});
