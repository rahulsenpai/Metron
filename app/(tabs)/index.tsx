import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [workouts, setWorkouts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadSavedWorkouts();
  }, []);

  const loadSavedWorkouts = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const workoutKeys = keys.filter(k => k.startsWith('workout_'));

      const workoutItems = await AsyncStorage.multiGet(workoutKeys);
      const parsedWorkouts = workoutItems.map(([key, value]) => ({
        key,
        ...(JSON.parse(value)),
      }));

      setWorkouts(parsedWorkouts.reverse()); // latest on top
    } catch (error) {
      console.error("Error loading workouts", error);
    }
  };

  const deleteWorkout = async (key) => {
    Alert.alert("Delete Routine", "Are you sure you want to delete this routine?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem(key);
          loadSavedWorkouts();
        }
      }
    ])
  };

  const editWorkout = (workout) => {
    router.push({
      pathname: '/routine-edit',
      params: {
        name: workout.exercise,
        data: JSON.stringify(workout),
      }
    });
  }

  const viewWorkout = (workout) => {
    router.push({
      pathname: '/routine-view',
      params: {
        data: JSON.stringify(workout),
      },
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Link href="/exercises" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.text}>New Routine</Text>
          </Pressable>
        </Link>
      </View>
  
      <ScrollView contentContainerStyle={styles.listContainer}>
        {workouts.map((workout, index) => (
          <Pressable key={index} onPress={() => viewWorkout(workout)}>
            <View style={styles.card}>
              <Text style={styles.routineTitle}>{workout.exercise}</Text>
              <Text style={styles.timestamp}>
                {new Date(workout.timestamp).toLocaleString()}
              </Text>
              <View style={styles.cardButtons}>
                <Pressable onPress={() => editWorkout(workout)} style={styles.editBtn}>
                  <Text style={styles.btnText}>Edit</Text>
                </Pressable>
                <Pressable onPress={() => deleteWorkout(workout.key)} style={styles.deleteBtn}>
                  <Text style={styles.btnText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
  
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232627',
    paddingTop: 50,
    alignItems: 'center',
  },
  buttonContainer: {
    width: 200,
    height: 50,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'pink',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  listContainer: {
    alignItems: 'center',
    paddingBottom: 100,
    width: '100%',
  },
  card: {
    backgroundColor: '#2E3034',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  routineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  timestamp: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 10,
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editBtn: {
    backgroundColor: '#60A5FA',
    padding: 8,
    borderRadius: 8,
    width: 70,
    alignItems: 'center',
  },
  deleteBtn: {
    backgroundColor: '#EF4444',
    padding: 8,
    borderRadius: 8,
    width: 70,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
