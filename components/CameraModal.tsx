import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const CameraModal = ({ modalVisible, onChangeTerm }) => {

  // const [modalVisible, setModalVisible] = useState(true);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);

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

  const takePicture = async () => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync();
      setImage(photo.uri);
      console.log(photo);
    }
  }

  const exit = () => {
    setImage(null)
  }
  /*
        {media ?
          <View>
            {
              image ? <Image source={{ isStatic: true, uri: image }} style={[{ width: '100%', height: '100%' }]} /> :
                <Video source={{ isStatic: true, uri: video }} style={[{ width: '100%', height: '100%' }]} />
            }
            <TouchableOpacity style={styles.exitButton} onPress={exit}><AntDesign name="close" size={35} color="white" /></TouchableOpacity>
          </View> :
    */

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        presentationStyle='pageSheet'
        visible={modalVisible}
      >

        <View style={styles.container}>
          {image ?
            <View>
              <Image source={{ isStatic: true, uri: image }} style={[{ width: '100%', height: '100%' }]} />
              <TouchableOpacity style={styles.exitButton} onPress={exit}><AntDesign name="close" size={35} color="white" /></TouchableOpacity>
            </View> :
            <>
              <Camera style={styles.camera} type={type} ref={ref => { setCameraRef(ref); }}>
                <View style={styles.info}>
                  <View style={styles.bottomContainer}>
                    <View style={styles.buttons}>
                      <TouchableOpacity><FontAwesome name="photo" size={40} color="white" /></TouchableOpacity>
                      <View style={styles.captureContainer}>
                        <TouchableOpacity style={styles.capture} onPress={takePicture} ></TouchableOpacity>

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
              <TouchableOpacity style={styles.exitButton} onPress={() => { onChangeTerm(!modalVisible) }}><AntDesign name="close" size={35} color="white" /></TouchableOpacity>

            </>}

        </View>

      </Modal>
    </View>

  );
}

export default CameraModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
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
  },
  exitButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 5,
    top: 5,
  }
});
