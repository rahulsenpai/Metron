import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const SetRow = ({ setNumber, onChange, initialData }) => {
  const [kg, setKg] = useState(initialData?.weight || '');
  const [reps, setReps] = useState(initialData?.reps || '');

  useEffect(() => {
    if (onChange) {
      onChange({ weight: kg, reps });
    }
  }, [kg, reps]);

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>SET</Text>
        <Text style={styles.label}>KG</Text>
        <Text style={styles.label}>REPS</Text>
      </View>

      <View style={styles.dataRow}>
        <Text style={styles.setNumber}>{setNumber}</Text>

        <TextInput 
          style={styles.input} 
          placeholder="-" 
          placeholderTextColor="gray"
          keyboardType="numeric"
          value={kg}
          onChangeText={setKg}
        />

        <TextInput 
          style={styles.input} 
          placeholder="-" 
          placeholderTextColor="gray"
          keyboardType="numeric"
          value={reps}
          onChangeText={setReps}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#232627',
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 5,
  },
  label: {
    color: 'gray',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  setNumber: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    color: 'white',
    width: 50,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default SetRow;
