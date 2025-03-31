import { View, StyleSheet, Text, Pressable} from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const routine = () => {
  return (
    <> 
      <View style={Styles.container}>
         <View style={Styles.buttonContainer}>
          <Link href= "/allexercises/Chest" asChild>
            <Pressable style={Styles.button}>
              <Text style={Styles.text}>
                hemlo
              </Text>
            </Pressable>
          </Link>
        </View>    
      </View>
    </>
  )
}

export default routine

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