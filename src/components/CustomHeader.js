import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {useNavigation} from '@react-navigation/native';

const CustomHeader = ({
  title,
  RightIcon,
  RightPress,
  style,
  token,
  tokenOk,
  roleId,
  userId,
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleHomePress = () => {
    navigation.navigate('BottomTab', {token, tokenOk, roleId, userId});
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={25}
          color={'#fff'}
          onPress={handleBackPress}
        />
        <Text style={styles.title}>{title}</Text>
        {RightIcon ? (
          <MaterialCommunityIcons
            name={RightIcon}
            size={34}
            color="#fff"
            onPress={RightPress}
          />
        ) : (
          <Text> {''}</Text>
        )}
        <TouchableOpacity onPress={handleHomePress}>
          <Ionicons name="home-sharp" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#82CED9',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    height: 130,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'K2D-Regular',
    marginLeft: 20,
  },
  HeaderImage: {
    resizeMode: 'contain',
    width: 200,
    height: 50,
  },
});

export default CustomHeader;
