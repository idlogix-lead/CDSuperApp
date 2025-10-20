import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('window');

const TotalItem = () => {
  const [isLongText, setIsLongText] = React.useState(false);
  const [measured, setMeasured] = React.useState(false);
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.card}>
        <View
          style={{position: 'absolute', opacity: 0}}
          onLayout={event => {
            const {height} = event.nativeEvent.layout;
            if (height > 80) setIsLongText(true);
            setMeasured(true);
          }}>
          <Text style={styles.value}>{value || 'N/A'}</Text>
        </View>

        {measured ? (
          isLongText ? (
            <ScrollView style={{maxHeight: 120}} nestedScrollEnabled>
              <Text style={styles.value}>{value || 'N/A'}</Text>
            </ScrollView>
          ) : (
            <Text style={styles.value} numberOfLines={4}>
              {value || 'N/A'}
            </Text>
          )
        ) : (
          <Text style={styles.value} numberOfLines={1}>
            {value || 'N/A'}
          </Text>
        )}
      </View>
    </View>
  );
};

export default TotalItem;

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    color: '#333',
    width: width * 0.4,
    marginLeft: 15,
    marginBottom: 3,
    fontStyle: 'italic',
  },
  value: {
    color: '#555',
    width: width * 0.9,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: width * 0.95,
    alignSelf: 'center',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 10,
  },
});
