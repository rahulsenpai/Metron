import { View, StyleSheet, Text, Pressable} from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const exercises = () => {
  return (
    <>
   
    <View style={Styles.container}>
       <View style={Styles.button}>
        <Link href= "/(tabs)/explore" asChild>
                <Pressable style={Styles.button}>
                  <Text style={Styles.button}>
                  New Routine
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
})