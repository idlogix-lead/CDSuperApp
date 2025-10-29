import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function ConstructionProgress() {
  // Example progress + custom width ratio for each stage
  const stages = [
    {id: 1, name: 'Stage 1', progress: 100, width: 12}, // smaller
    {id: 2, name: 'Stage 2', progress: 100, width: 60}, // double width
    {id: 3, name: 'Stage 3', progress: 60, width: 15}, // medium
    {id: 4, name: 'Complete', progress: 0, width: 13}, // smallest
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Construction Progress – Tower A Unit 101</Text>

      <View style={styles.stagesRow}>
        {stages.map(stage => (
          <View
            key={stage.id}
            style={[styles.stageBox, {flex: stage.width}]} // dynamic width
          >
            <Text style={styles.stageLabel}>{stage.name}</Text>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressFill, {width: `${stage.progress}%`}]}
              />
            </View>
          </View>
        ))}
      </View>

      <View style={{marginTop: 15}}>
        <Text style={styles.milestoneTitle}>
          Current Milestone:
          <Text style={{fontFamily: 'Inter_24pt-Regular', color: '#000'}}>
            Stage 3 – Tiling & Interior Work In Progress
          </Text>
        </Text>
        <Text style={styles.nextMilestone}>
          Next Milestone:
          <Text style={{fontFamily: 'Inter_24pt-Medium'}}>
            {' '}
            Handover Inspection
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 10,
    height: 180,
    // Shadow (bottom-only black outer)
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#fff',
    bottom: 10,
  },
  title: {
    fontSize: 12,
    fontFamily: 'Inter_24pt-Bold',
    color: '#000',
    paddingVertical: 5,
  },
  stagesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  stageBox: {
    alignItems: 'center',
    marginHorizontal: 3,
  },
  stageLabel: {
    fontSize: 8,
    height: 16,
    bottom: '10%',
    color: 'rgba(111, 111, 111, 1)',
  },
  progressBar: {
    width: '100%',
    height: 6,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#7D662D',
  },
  milestoneTitle: {
    fontSize: 12,
    fontFamily: 'Inter_24pt-Bold',
    paddingHorizontal: 4,
    bottom: '5%',
    color: '#000',
  },
  nextMilestone: {
    fontSize: 8,
    color: '#000',
    marginTop: 3,
    fontFamily: 'Inter_24pt-Bold',
    bottom: '5%',
    paddingHorizontal: 5,
    marginBottom: '10%',
  },
});
