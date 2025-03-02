import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import exercises from '@/app/exercises';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Link href= "/exercises" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.text}>
          New Routine
          </Text>
        </Pressable>
        </Link>
         
       

      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: '#232627',
  },
  buttonContainer: {
    width: 200, // Set a fixed width for better layout
    height: 50,


  },
  button: {
    backgroundColor: "pink",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
