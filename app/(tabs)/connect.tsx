import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  // Load the saved profile photo when this screen mounts.
  useEffect(() => {
    const loadPhoto = async () => {
      try {
        // Use a unique key for the profile photo.
        const storedPhoto = await AsyncStorage.getItem('profilePhoto');
        if (storedPhoto) setPhotoUri(storedPhoto);
      } catch (error) {
        Alert.alert('Error', 'Failed to load photo.');
      }
    };

    loadPhoto();
  }, []);

  // Function to pick an image from the gallery.
  const pickImage = async () => {
    // Request permission to access the media library.
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please grant permission to access your gallery.');
      return;
    }
    
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled && result.assets?.[0]?.uri) {
        const uri = result.assets[0].uri;
        setPhotoUri(uri);
        // Store this photo under the 'profilePhoto' key.
        await AsyncStorage.setItem('profilePhoto', uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick an image.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {photoUri ? (
        // Display the profile photo full-screen and allow editing.
        <Pressable style={styles.fullScreenImageWrapper} onPress={pickImage}>
          <Image source={{ uri: photoUri }} style={styles.fullScreenImage} />
          <View style={styles.editOverlay}>
            <Text style={styles.editText}>Tap to Edit Photo</Text>
          </View>
        </Pressable>
      ) : (
        // If no photo exists, show a centered "Add Photo" button.
        <View style={styles.noImageContainer}>
          <Pressable style={styles.addPhotoButton} onPress={pickImage}>
            <Text style={styles.addPhotoText}>Add Photo</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#232627',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
  },
  fullScreenImageWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  fullScreenImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  editOverlay: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  editText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232627',
  },
  addPhotoButton: {
    backgroundColor: '#F472B6',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addPhotoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
});
