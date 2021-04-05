import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function CallsScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.info}>
          <View style={styles.bottomContainer}>
            <View style={styles.buttons}>
              <TouchableOpacity><FontAwesome name="photo" size={40} color="white" /></TouchableOpacity>
              <View style={styles.captureContainer}>
                <TouchableOpacity style={styles.capture}></TouchableOpacity>

              </View>
              <TouchableOpacity
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}>
                <Ionicons name="ios-camera-reverse-outline" size={53} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.text}>Hold for video, tap for photo</Text>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  camera: {
    flex: 1,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    alignItems: 'center',
  },
  buttons: {
    flex: 1,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  captureContainer: {
    flex: 1,
    alignItems: 'center',
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 5,
  },
  info: {
    flex: 1,
  },
  text: {
    color: 'white',
    alignSelf: 'center',
    marginBottom: 25
  }
});
