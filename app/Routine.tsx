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
    <View style={styles.safeAreaHack}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.heading}>{name}</Text> {/* <-- Exercise Heading */}

          {fields.map((setNumber) => (
            <InputFields key={setNumber} setNumber={setNumber} />
          ))}
        </ScrollView>

        <View style={styles.buttonWrapper}>
          <Pressable style={styles.button} onPress={addNewSet}>
            <Text style={styles.text}>+ New Set</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
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
