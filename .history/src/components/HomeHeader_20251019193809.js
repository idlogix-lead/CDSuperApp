import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HomeHeader({ title }) {
  const navigation = useNavigation();

  const openDrawerSafely = () => {
    //  opens the current drawer, or parent drawer if nested
    const parent = navigation.getParent();
    if (parent?.openDrawer) parent.openDrawer();
    else if (navigation.openDrawer) navigation.openDrawer();
  };

  return (
    <View style={styles.header}>
      {/* Menu Icon */}
      <TouchableOpacity onPress={openDrawerSafely}>
        <Ionicons name="menu-outline" size={26} color="#000" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.headerTitle}>{title}</Text>

      {/* Profile Icon */}
      <TouchableOpacity
        onPress={() => navigation.navigate('ConstructionUpdates')}
      >
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
  },
  headerTitle: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter_24pt-SemiBold',
    marginLeft: 10,
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
