import { View, StyleSheet, Text, Pressable, FlatList } from 'react-native';
import { Link } from 'expo-router'
import { LegsExercises } from './ExercisesList';

export default function Legs() {
  return (
    <>
   
   
   <View style={Styles.container}>
    <FlatList
    data={LegsExercises}
    KeyExtractor={(item) => item.id.tostring()}
    showsVerticalScrollIndicator={false}
    renderItem={({ item }) => (
    <View style={Styles.containerItems}>
       <View style={Styles.buttonContainer}>
         <Link href={{ pathname: "/routine", params: { name: item.title } }} asChild>
                        <Pressable style={Styles.button}>
                            <Text style={Styles.text}>{item.title}</Text>
                        </Pressable>
                        </Link>
      </View>
    
      </View>
      )}
      />
    </View>
    </>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Center content horizontally
    backgroundColor: '#232627',
  },
  containerItems: {
    marginTop: 50,
    gap: 30,
  },
  buttonContainer: {
    width: 350, // Set a fixed width for better layout
    // height: 50,


  },
  button: {
    backgroundColor: "pink",
    height: 80,
    justifyContent: "center",
    // alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  }
})
