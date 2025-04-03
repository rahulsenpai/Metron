import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import InputFields from '@/components/InputFields'

const Routine = () => {
  const { name } = useLocalSearchParams() // <-- Get selected exercise name
  const [fields, setFields] = useState([1]) // <-- Track set numbers

  const addNewSet = () => {
    setFields(prev => [...prev, prev.length + 1])
  }

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

export default Routine

const styles = StyleSheet.create({
  safeAreaHack: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#232627',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingBottom: 100,
    alignItems: 'center',
    gap: 35,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'pink',
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
