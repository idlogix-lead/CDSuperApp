import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';

const TaskCard = ({
  onPress,
  taskNo,
  taskName,
  ClientName,
  imageTicket,
  Status,
  Description,
  date,
}) => {
  return (
    <View style={styles.card}>
      {ClientName && (
        <View style={styles.header}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.value}>Subject:</Text>
            <Text style={[styles.label, {paddingLeft: 10}]}>{taskName}</Text>
          </View>
          <View style={styles.dateContainer}>
            <AntDesign name="calendar" size={18} />
            <Text
              style={[styles.date, {paddingLeft: '1%', alignSelf: 'center'}]}>
              {date}
            </Text>
          </View>
        </View>
      )}
      <View style={styles.details}>
        <Text style={styles.value}>Ticket No:</Text>
        <Text style={[styles.label, {paddingLeft: 10}]}>{taskNo}</Text>
      </View>
      <View style={styles.actions}>
        {Status && (
          <TouchableOpacity style={styles.statusButton}>
            <Text style={styles.statusText}>{Status.replace('1_', '')}</Text>
          </TouchableOpacity>
        )}
        {imageTicket && (
          <TouchableOpacity style={styles.actionButton} onPress={onPress}>
            <Image source={imageTicket} style={{width: 30, height: 30}} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.details}>
        {Description && (
          <Text style={styles.value}>
            {' '}
            Description:
            <Text style={{fontSize: 12, fontWeight: 400}}>{Description}</Text>
          </Text>
        )}
      </View>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    width: 300,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 20,
    width: '90%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  dateContainer: {
    backgroundColor: '#82CED9',
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 2,
    borderColor: '#82CED9',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    color: '#F6F6F6',
    fontSize: 12,
  },
  details: {
    paddingTop: 5,
    flexDirection: 'row',
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderBottomColor: '#3AC1C5',
    borderBottomWidth: 2,
  },
  statusText: {
    color: '#333',
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: '#82CED9',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    color: '#fff',
    fontSize: 20,
  },
});
