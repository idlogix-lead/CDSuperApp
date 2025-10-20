import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Navigation from '../../navigation/Navigation';

const Header = ({title, onPress}) => {
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={onPress}>
          <Ionicons name="menu" size={25} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.headerRight}>
          <Ionicons
            name="notifications-outline"
            size={22}
            color="#000"
            style={{marginRight: 15}}
          />
          <Image
            source={require('../../asserts/Images/7084424.png')}
            style={styles.avatar}
          />
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay',
    fontSize: 12,
    color: '#000',
    alignItems: 'flex-start',
    flex: 1,
    paddingHorizontal: 7,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
