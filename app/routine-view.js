import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native'
import { useLocalSearchParams } from 'expo-router'

const RoutineView = () => {
  const { data } = useLocalSearchParams()
  const workout = JSON.parse(data || '{}')

  return (
    <View style={styles.container}>
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
              <Text style={styles.setInfo}>Weight: {setData.weight || '-'}</Text>
              <Text style={styles.setInfo}>Reps: {setData.reps || '-'}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyMessage}>No sets saved yet.</Text>
        )}
      </ScrollView>
    </View>
  )
}

export default RoutineView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#1e1f22',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    gap: 20,
    paddingBottom: 100,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'capitalize',
  },
  timestamp: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 10,
  },
  setCard: {
    backgroundColor: '#2e2f33',
    padding: 15,
    borderRadius: 12,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  setTitle: {
    color: '#F4F4F4',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  setInfo: {
    color: '#ccc',
    fontSize: 14,
  },
  emptyMessage: {
    color: '#999',
    fontSize: 16,
    marginTop: 40,
  },
})
