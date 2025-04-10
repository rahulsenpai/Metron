import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLocalSearchParams, useRouter } from 'expo-router'
import InputFields from '@/components/InputFields'

const RoutineEdit = () => {
  const router = useRouter()
  const { name, data } = useLocalSearchParams()
  const parsed = JSON.parse(data || '{}')

  const [fields, setFields] = useState([])
  const [setsData, setSetsData] = useState({})

  useEffect(() => {
    if (parsed && parsed.sets) {
      const keys = Object.keys(parsed.sets).map(Number)
      setFields(keys)
      setSetsData(parsed.sets)
    }
  }, [data])

  const updateSetData = (setNumber, data) => {
    setSetsData(prev => ({ ...prev, [setNumber]: data }))
  }

  const saveEdits = async () => {
    try {
      const updatedPayload = {
        ...parsed,
        sets: setsData,
        timestamp: new Date().toISOString(),
      }

      await AsyncStorage.setItem(parsed.key, JSON.stringify(updatedPayload))
      Alert.alert('Updated!', 'Routine successfully updated.')
      router.back()
    } catch (err) {
      Alert.alert('Error', 'Could not update routine.')
    }
  }

  const addNewSet = () => {
    const next = Math.max(...fields, 0) + 1
    setFields(prev => [...prev, next])
  }

  return (
    <View style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.heading}>{parsed.exercise || name}</Text>

          {fields.map((setNumber) => (
            <InputFields
              key={setNumber}
              setNumber={setNumber}
              initialData={setsData[setNumber]}
              onChange={(data) => updateSetData(setNumber, data)}
            />
          ))}
        </ScrollView>

        <View style={styles.buttonWrapper}>
          <Pressable style={styles.saveButton} onPress={saveEdits}>
            <Text style={styles.text}>💾 Save Changes</Text>
          </Pressable>
          <Pressable style={styles.addButton} onPress={addNewSet}>
            <Text style={styles.text}>+ New Set</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default RoutineEdit

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: '#1e1f22',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 25,
    paddingBottom: 140,
    alignItems: 'center',
    gap: 30,
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
    backgroundColor: '#34D399',
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    elevation: 4,
  },
  addButton: {
    backgroundColor: '#F472B6',
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    elevation: 4,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
})
