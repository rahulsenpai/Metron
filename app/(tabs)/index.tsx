import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  TextInput,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  const [workouts, setWorkouts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const router = useRouter();

  useEffect(() => {
    loadSavedWorkouts();
  }, []);

  const loadSavedWorkouts = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const workoutKeys = keys.filter((k) => k.startsWith("workout_"));

      const workoutItems = await AsyncStorage.multiGet(workoutKeys);
      const parsedWorkouts = workoutItems.map(([key, value]) => ({
        key,
        ...JSON.parse(value),
      }));

      setWorkouts(parsedWorkouts.reverse()); // latest on top
    } catch (error) {
      console.error("Error loading workouts", error);
    }
  };

  const deleteWorkout = async (key) => {
    Alert.alert(
      "Delete Routine",
      "Are you sure you want to delete this routine?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem(key);
            loadSavedWorkouts();
          },
        },
      ]
    );
  };

  const editWorkout = (workout) => {
    router.push({
      pathname: "/routine-edit",
      params: {
        name: workout.exercise,
        data: JSON.stringify(workout),
      },
    });
  };

  const viewWorkout = (workout) => {
    router.push({
      pathname: "/routine-view",
      params: {
        data: JSON.stringify(workout),
      },
    });
  };

  const handleRefresh = () => {
    loadSavedWorkouts();
  };

  // Filter workouts based on search query (exercise name) and date
  const filteredWorkouts = workouts.filter(workout => {
    const exerciseMatch = workout.exercise
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  
    const dateMatch = selectedDate
      ? new Date(workout.timestamp).toISOString().split('T')[0] === selectedDate
      : true;
  
    return exerciseMatch && dateMatch;
  });

  return (
    <View style={styles.container}>
      {/* Top Button Row */}
      <View style={styles.topButtonRow}>
        <Link href="/exercises" asChild>
          <Pressable style={styles.newRoutineButton}>
            <Text style={styles.text}>+ New Routine</Text>
          </Pressable>
        </Link>

        <Pressable style={styles.refreshButton} onPress={handleRefresh}>
          <Text style={styles.refreshText}>⟳</Text>
        </Pressable>
      </View>

      {/* Search Bar (by exercise name) */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by exercise name"
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Calendar picker trigger (by date) */}
      <Pressable onPress={() => setShowCalendar(true)} style={styles.datePickerBox}>
        <Text style={styles.datePickerText}>
          {selectedDate ? selectedDate : '📅 Select a date'}
        </Text>
      </Pressable>

      {/* Date picker itself */}
      {showCalendar && (
        <DateTimePicker
          value={selectedDate ? new Date(selectedDate) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(event, selected) => {
            // For Android, once a date is selected, dismiss the picker
            setShowCalendar(Platform.OS === 'ios');
            if (selected) {
              const formatted = selected.toISOString().split('T')[0];
              setSelectedDate(formatted);
            }
          }}
        />
      )}

      {/* Workout Cards */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {filteredWorkouts.map((workout, index) => (
          <Pressable
            key={index}
            onPress={() => viewWorkout(workout)}
            style={styles.cardPressable}
          >
            <View style={styles.card}>
              <Text style={styles.routineTitle}>{workout.exercise}</Text>
              <Text style={styles.timestamp}>
                {new Date(workout.timestamp).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
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
    backgroundColor: "#1e1f22",
    alignItems: "center",
    paddingTop: 50,
  },
  topButtonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 50, // Note: If your React Native version doesn't support 'gap', use margin on children instead.
    marginBottom: 30,
    marginTop: 15,
  },
  newRoutineButton: {
    backgroundColor: "#F472B6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  refreshButton: {
    backgroundColor: "#2e2f33",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E1E1E",
  },
  refreshText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  searchInput: {
    width: "90%",
    height: 45,
    backgroundColor: "#2e2f33",
    color: "white",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
  },
  datePickerBox: {
    width: "90%",
    height: 45,
    backgroundColor: "#2e2f33",
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  datePickerText: {
    color: "white",
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 120,
    alignItems: "center",
    width: "100%",
    gap: 16,
  },
  cardPressable: {
    width: "100%",
  },
  card: {
    backgroundColor: "#2e2f33",
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 80,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  routineTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 6,
  },
  timestamp: {
    fontSize: 13,
    color: "#ccc",
    marginBottom: 16,
  },
  cardButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editBtn: {
    backgroundColor: "#3B82F6",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  deleteBtn: {
    backgroundColor: "#EF4444",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
});
