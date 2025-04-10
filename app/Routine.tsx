import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLocalSearchParams, useRouter } from 'expo-router'
import SetRow from '../components/SetRow'

const Routine = () => {
  const { name } = useLocalSearchParams()
  const router = useRouter()
  const [fields, setFields] = useState([1])
  const [setsData, setSetsData] = useState({})

  const addNewSet = () => {
    const next = fields.length ? Math.max(...fields) + 1 : 1
    setFields(prev => [...prev, next])
  }

  const updateSetData = (setNumber, data) => {
    setSetsData(prev => ({ ...prev, [setNumber]: data }))
  }

  const saveSets = async () => {
    try {
      if (Object.keys(setsData).length === 0) {
        Alert.alert('No data', 'Please add at least one set.')
        return
      }

      const key = `workout_${name}_${new Date().toISOString()}`
      const payload = {
        exercise: name,
        timestamp: new Date().toISOString(),
        sets: setsData,
        key: key,
      }

      await AsyncStorage.setItem(key, JSON.stringify(payload))
      Alert.alert('Success', 'Workout saved locally!')
      router.back()
    } catch (error) {
      Alert.alert('Error', 'Failed to save workout.')
    }
  }

  return (
    <View style={styles.safeAreaHack}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.heading}>{name}</Text>

          {fields.map((setNumber) => (
            <SetRow
              key={setNumber}
              setNumber={setNumber}
              initialData={setsData[setNumber]}
              onChange={(data) => updateSetData(setNumber, data)}
            />
          ))}
        </ScrollView>

        <View style={styles.buttonWrapper}>
          <Pressable style={styles.saveButton} onPress={saveSets}>
            <Text style={styles.text}>Save Sets</Text>
          </Pressable>
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
    backgroundColor: '#1e1f22',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 25,
    paddingBottom: 140,
    alignItems: 'center',
    gap: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F4F4F4',
    marginBottom: 15,
    textTransform: 'capitalize',
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: 15,
  },
  saveButton: {
    backgroundColor: '#FAF9F6',
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    elevation: 6,
  },
  button: {
    backgroundColor: '#F472B6',
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    elevation: 6,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
})
