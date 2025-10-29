import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function TowerTabs() {
  const units = [
    'Unit Switcher: [ Unit 101 - Tower A ▼ ]',
    'Unit 101 - Tower A',
    'Unit 203 - Tower 1',
    'Unit 305 - Tower 2',
  ];
  const towers = [
    'All Properties',
    'Tower 1',
    'Tower 2',
    'Tower 3',
    'Tower 4',
    'Tower 5',
  ];
  const [selectedUnit, setSelectedUnit] = useState(units[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleSelect = unit => {
    setSelectedUnit(unit);
    setIsDropdownOpen(false);
  };
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.buttonRow}
      >
        {towers.map((item, index) => (
          <TouchableOpacity key={index} style={styles.tabButton}>
            <Text style={styles.tabButtonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* UnitSwitcher */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <Text style={styles.dropdownText}>
          {selectedUnit.includes('Switcher')
            ? selectedUnit
            : `Unit Switcher: [ ${selectedUnit} ▼ ]`}
        </Text>
      </TouchableOpacity>

      {isDropdownOpen && (
        <View style={styles.dropdownList}>
          {units.slice(1).map(item => (
            <TouchableOpacity
              key={item}
              style={styles.option}
              onPress={() => handleSelect(item)}
            >
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    gap: 7,
  },
  tabButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    width: '25%',
  },
  tabButtonText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Inter_24pt-Medium',
    textAlign: 'center',
  },
  dropdownButton: {
    backgroundColor: '#rgba(0, 0, 0, 0.4)',
    borderRadius: 8,
    paddingHorizontal: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    width: '100%',
    top: '10%',
  },
  dropdownText: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Inter_24pt-Medium',
  },
  dropdownList: {
    backgroundColor: '#fff',
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 10,
    color: '#333',
    fontFamily: 'Inter_24pt-Medium',
  },
});
