import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Pressable,
  FlatList,
} from "react-native"
import { Link } from 'expo-router'
import { CoreExercises } from './ExercisesList';

export default function Core() {
  return (
      <SafeAreaView style={Styles.container}>
        <Text style={Styles.heading}>Core Exercises ❚█══█❚</Text>
        <FlatList
          data={CoreExercises}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={Styles.containerItems}>
              <View style={Styles.buttonContainer}>
                <Link
                  href={{ pathname: "/routine", params: { name: item.title } }}
                  asChild
                >
                  <Pressable style={Styles.button}>
                    <Text style={Styles.text}>{item.title}</Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // Center content horizontally
    backgroundColor: "#232627",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#F4F4F4",
    marginTop: 70,
    textTransform: "capitalize",
  },
  containerItems: {
    marginTop: 30,
    gap: 30,
  },
  buttonContainer: {
    width: 350, // Fixed width for the button container
  },
  button: {
    backgroundColor: "#bae1ff",
    height: 80,
    justifyContent: "center",
    borderRadius: 18,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
});
