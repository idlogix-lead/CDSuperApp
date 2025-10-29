import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Header({title}) {
  const navigation = useNavigation();

  const openDrawerSafely = () => {
    // Check if this screen is part of ConstructionDrawer
    const drawerNav = navigation.getParent('ConstructionUpdates');
    if (drawerNav?.openDrawer) {
      drawerNav.openDrawer(); // open the ConstructionDrawer
    } else if (navigation.openDrawer) {
      navigation.openDrawer();
    }
  };

  // 🔹 Always open MainDrawer (root)
  const openMainDrawer = () => {
    let parent = navigation;
    while (parent) {
      if (parent?.openDrawer && parent?.getId?.() === 'MainDrawer') {
        parent.openDrawer();
        return;
      }
      parent = parent.getParent?.();
    }
    console.warn('MainDrawer not found in parent hierarchy.');
  };

  return (
    <View style={styles.header}>
      {/* Menu Icon */}
      <TouchableOpacity
        onPress={openDrawerSafely}
        onLongPress={openMainDrawer}
        delayLongPress={300}>
        <Ionicons name="menu-outline" size={26} color="#000" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.headerTitle}>{title}</Text>

      {/* Profile Icon */}
      <TouchableOpacity
        onPress={() => navigation.navigate('ConstructionUpdates')}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          }}
          style={styles.profileImage}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
    paddingHorizontal: 10,
    marginTop: '15%',
  },
  headerTitle: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter_24pt-SemiBold',
    marginLeft: '2%',
    color: '#000',
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
