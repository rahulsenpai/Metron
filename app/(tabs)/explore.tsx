import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  TextInput,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

// EXAMPLE: ProfileScreen component
export default function ProfileScreen() {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [editingName, setEditingName] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  // Load saved name & profilePic from AsyncStorage
  const loadProfile = async () => {
    try {
      const storedName = await AsyncStorage.getItem('userName');
      const storedPic = await AsyncStorage.getItem('userPhoto');
      if (storedName) setName(storedName);
      if (storedPic) setProfilePic(storedPic);
    } catch (error) {
      Alert.alert('Error', 'Could not load profile data');
    }
  };

  // Save updated name to AsyncStorage
  const saveName = async (updatedName: string) => {
    try {
      await AsyncStorage.setItem('userName', updatedName);
    } catch (error) {
      Alert.alert('Error', 'Could not save name');
    }
  };

  // Save updated photo URI to AsyncStorage
  const savePhoto = async (uri: string) => {
    try {
      await AsyncStorage.setItem('userPhoto', uri);
    } catch (error) {
      Alert.alert('Error', 'Could not save photo');
    }
  };

  // Pick an image from camera roll
  const changeProfilePhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission required', 'Allow access to media library to change photo.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],        // force square
        quality: 0.7,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        const uri = result.assets[0].uri;
        setProfilePic(uri);
        savePhoto(uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not open image picker');
    }
  };

  // Called when user finishes editing name
  const onEndEditingName = () => {
    setEditingName(false);
    saveName(name);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      {/* Dark header with profile photo */}
      <View style={styles.headerContainer}>
        {/* Profile photo (tap to change) */}
        <Pressable onPress={changeProfilePhoto} style={styles.photoWrapper}>
          {profilePic ? (
            <Image source={{ uri: profilePic }} style={styles.profilePhoto} />
          ) : (
            <Text style={styles.noPhotoText}>Tap to add photo</Text>
          )}
        </Pressable>

        {/* Name (tap to edit) */}
        {editingName ? (
          <TextInput
            style={styles.nameInput}
            value={name}
            onChangeText={setName}
            autoFocus
            onEndEditing={onEndEditingName}
            returnKeyType="done"
          />
        ) : (
          <Pressable onPress={() => setEditingName(true)}>
            <Text style={styles.nameText}>
              {name ? name : 'Tap to set name'}
            </Text>
          </Pressable>
        )}
      </View>

      {/* About / Content area */}
      <View style={styles.contentContainer}>
        <Text style={styles.aboutHeading}>About</Text>
        <Text style={styles.aboutDescription}>
        "Track & Progress" is a dynamic, user-friendly workout tracking app designed to help you stay consistent and measure your fitness progress over time. Whether you're a beginner or an experienced athlete, this app provides all the tools you need to plan, record, and analyze your workouts in one place.
        </Text>
      </View>
    </View>
  );
}

// ===================== STYLES =====================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // White for the main area
  },
  // ---------------- Header Styles ----------------
  headerContainer: {
    backgroundColor: '#232627', // Dark top area
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  photoWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#555',
    overflow: 'hidden',
    marginBottom: 15,
  },
  profilePhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  noPhotoText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F4F4F4',
    textTransform: 'capitalize',
  },
  nameInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F4F4F4',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    textAlign: 'center',
  },
  // ---------------- Content Styles ----------------
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  aboutHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#232627',
  },
  aboutDescription: {
    fontSize: 16,
    lineHeight: 22,
    color: '#444',
  },
});
