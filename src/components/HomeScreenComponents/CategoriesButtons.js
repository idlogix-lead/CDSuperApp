import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useCallback, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const CategoriesButtons = ({
  text,
  path,
  font,
  size,
  fontType,
  iconColor,
  HomeButtonCardbackgroundColor,
  IconImage,
}) => {
  const navigation = useNavigation();
  const [isSelected, setIsSelected] = useState(false);

  const renderIcon = () => {
    const iconProps = {
      name: font,
      size: size,
      color: iconColor,
    };

    switch (fontType) {
      case 'FontAwesome':
        return <FontAwesome {...iconProps} />;
      case 'AntDesign':
        return <AntDesign {...iconProps} />;
      case 'MaterialIcons':
        return <MaterialIcons {...iconProps} />;
      case 'EvilIcons':
        return <EvilIcons {...iconProps} />;
      default:
        return null; // Return null if fontType is not recognized
    }
  };

  const handlePress = () => {
    setIsSelected(prevState => !prevState);
    navigation.navigate(path);
  };

  useFocusEffect(
    useCallback(() => {
      setIsSelected(false); // Reset selection when screen regains focus
    }, []),
  );

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.CategoriesBtn,
          isSelected && styles.selectedBtn,
          {backgroundColor: HomeButtonCardbackgroundColor},
        ]}
        onPress={handlePress}>
        <View style={styles.contentContainer}>
          {IconImage ? (
            <Image source={IconImage} style={{height: 35, width: 35}} />
          ) : (
            <View style={styles.iconContainer}>{renderIcon()}</View>
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.categoryTextStyle}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CategoriesBtn: {
    padding: 10,
    height: 60,
    width: 60,
    borderRadius: 40,
    justifyContent: 'center',
    margin: 7,
    padding: 7,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  selectedBtn: {
    backgroundColor: '#24446A', // Change background color when selected
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 30,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTextStyle: {
    color: 'black',
    fontWeight: '700',
  },
});

export default CategoriesButtons;
