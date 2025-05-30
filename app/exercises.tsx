import { View, StyleSheet, Text, Pressable} from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const exercises = () => {
  return (
    <>
   
   
    <View style={Styles.container}>
       <View style={Styles.buttonContainer}>
        <Link href= "/allexercises/Chest" asChild>
                <Pressable style={Styles.button}>
                  <Text style={Styles.text}>
                  Chest
                  </Text>
                </Pressable>
                </Link>
      </View>
      <View style={Styles.buttonContainer}>
        <Link href= "/allexercises/Back" asChild>
                <Pressable style={Styles.button}>
                  <Text style={Styles.text}>
                  Back
                  </Text>
                </Pressable>
                </Link>
      </View>
      <View style={Styles.buttonContainer}>
        <Link href= "/allexercises/Shoulder" asChild>
                <Pressable style={Styles.button}>
                  <Text style={Styles.text}>
                  Shoulder
                  </Text>
                </Pressable>
                </Link>
      </View>
      <View style={Styles.buttonContainer}>
        <Link href= "/allexercises/Core" asChild>
                <Pressable style={Styles.button}>
                  <Text style={Styles.text}>
                  Core
                  </Text>
                </Pressable>
                </Link>
      </View>
      <View style={Styles.buttonContainer}>
        <Link href= "/allexercises/Arms" asChild>
                <Pressable style={Styles.button}>
                  <Text style={Styles.text}>
                  Arms
                  </Text>
                </Pressable>
                </Link>
      </View>
      <View style={Styles.buttonContainer}>
        <Link href= "/allexercises/Legs" asChild>
                <Pressable style={Styles.button}>
                  <Text style={Styles.text}>
                  Legs
                  </Text>
                </Pressable>
                </Link>
      </View>
    </View>
    </>
  )
}

export default exercises

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 35,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: '#232627',
  },
  buttonContainer: {
    width: 300, // Set a fixed width for better layout
    height: 50,
  },
  button: {
    backgroundColor: "#bae1ff",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25, // Makes the button round (half of the height)
  },
  text: {
    fontSize: 20,
   fontFamily: "sans-serif", 
    // fontWeight: 'bold', // Bold text
    // tahoma, verdana, arial, sans-serif;
  }
});
