import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Amplify, { Storage, Auth, API, graphqlOperation } from 'aws-amplify';
import { createMessage, updateChatRoom } from '../src/graphql/mutations';
import shorthash from 'shorthash';
import * as ImageManipulator from 'expo-image-manipulator';

import { FontAwesome } from '@expo/vector-icons';

export type CameraModalProps = {
  chatRoomID: string,
  modalVisible: boolean,
  onChangeTerm: any,
}

const CameraModal = (props: CameraModalProps) => {

  const { chatRoomID, modalVisible, onChangeTerm } = props;

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

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

      const resizedPhoto = await ImageManipulator.manipulateAsync(
        photo.uri, [{ resize: { width: 300 } }], // resize to width of 300 and preserve aspect ratio 
        { compress: 0.7, format: 'jpeg' },
      );
      setImage(resizedPhoto);
    }
  }

  const exit = () => {
    setImage(null);
  }

  const send = async () => {
    try {
      const hash = shorthash.unique(image.uri);
      const response = await fetch(image.uri);
      const blob = await response.blob();

      await Storage.put(hash, blob, {
        contentType: 'image/jpeg',
        level: 'protected'
      });

      sendTextMessage(hash);
      onChangeTerm(!modalVisible);

    } catch (error) {
      console.log(error)
    }
  }


  const sendTextMessage = async (key) => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      const userID = currentUser.attributes.sub;

      const lastMessage = await API.graphql(graphqlOperation(createMessage, {
        input: {
          chatRoomID: chatRoomID,
          userID: userID,
          message: message,
          imageUri: key
        }
      }));

      const lastMessageID = lastMessage.data.createMessage.id;
      await API.graphql(graphqlOperation(updateChatRoom, {
        input: {
          id: chatRoomID,
          lastMessageID: lastMessageID
        }
      }));
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <SafeAreaView style={styles.centeredView}>
      <Modal
        animationType='slide'
        presentationStyle='pageSheet'
        visible={modalVisible}
      >

        <View style={styles.container} >
          {
            image ?
              <ImageBackground source={{ isStatic: true, uri: image.uri }} style={styles.previewImage} >
                <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={80} style={styles.keyboardAvoider}>
                  <View style={styles.preview}>
                  </View>
                  <View style={styles.sendContainer}>
                    <View style={styles.chatBoxContainer}>
                      <ScrollView keyboardDismissMode='on-drag'>
                        <TextInput clearButtonMode="always" style={styles.inputStyle} placeholder="send message" onChangeText={setMessage} />
                      </ScrollView>
                    </View>
                    <TouchableOpacity style={styles.voiceSendIcon} onPress={send}>
                      <MaterialIcons name="send" size={27} color="white" />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.exitButton} onPress={exit}>
                    <AntDesign name="close" size={35} color="white" />
                  </TouchableOpacity>
                </KeyboardAvoidingView>
              </ImageBackground> :
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
    </SafeAreaView>

  );
}

export default CameraModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
  },
  sendContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginTop: 2
  },
  chatBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 50,
    paddingHorizontal: 20,
    height: 45,
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  inputStyle: {
    flex: 1,
  },
  voiceSendIcon: {
    backgroundColor: '#128C7E',
    padding: 7,
    marginLeft: 5,
    borderRadius: 50,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  keyboardAvoider: {
    flexShrink: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%'
  },
  preview: {
    height: '90%',
  }
});
