import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const RoutineView = () => {
  const { data } = useLocalSearchParams();
  const workout = JSON.parse(data || '{}');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}>{workout.exercise}</Text>
        <Text style={styles.timestamp}>
          {new Date(workout.timestamp).toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })}
        </Text>

        {workout.sets && Object.keys(workout.sets).length > 0 ? (
          Object.entries(workout.sets).map(([setNum, setData]) => (
            <View key={setNum} style={styles.setCard}>
              <Text style={styles.setTitle}>Set {setNum}</Text>
              <Text style={styles.setInfo}>
                Weight: {setData.weight || '-'}
              </Text>
              <Text style={styles.setInfo}>
                Reps: {setData.reps || '-'}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyMessage}>No sets saved yet.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoutineView;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1e1f22',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    gap: 20,
    paddingBottom: 120,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F4F4F4',
    textTransform: 'capitalize',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  timestamp: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  setCard: {
    backgroundColor: '#2e2f33',
    padding: 20,
    borderRadius: 16,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 20,
  },
  setTitle: {
    color: '#F4F4F4',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  setInfo: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 4,
  },
  emptyMessage: {
    color: '#999',
    fontSize: 18,
    marginTop: 40,
  },
});
