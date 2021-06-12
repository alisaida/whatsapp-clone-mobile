import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Amplify, { Storage, Auth, API, graphqlOperation } from 'aws-amplify';
import { createMessage, updateChatRoom } from '../src/graphql/mutations';
import shorthash from 'shorthash';
import * as ImageManipulator from 'expo-image-manipulator';

import { FontAwesome } from '@expo/vector-icons';
import GestureRecognizer from 'react-native-swipe-gestures';

export type ImageModalProps = {
  imageUri: any,
  modalVisible: boolean,
  onChangeTerm: any,
}

const ImageModal = (props: ImageModalProps) => {

  const { imageUri, modalVisible, onChangeTerm } = props;
  const [startY, setStartY] = useState(0 as number);

  return (

    <SafeAreaView style={styles.centeredView}>
      <Modal
        animationType='slide'
        presentationStyle='pageSheet'
        visible={modalVisible}
      >
        <View
          onTouchStart={e => setStartY(e.nativeEvent.locationY)}
          onTouchCancel={e => {
            const endY: number = e.nativeEvent.locationY;
            if (endY - startY > 0) {
              onChangeTerm(!modalVisible)
            }
          }}
          style={styles.container} >
          <Image source={{ isStatic: true, uri: imageUri }} style={styles.previewImage} />
          <TouchableOpacity style={styles.exitButton} onPress={() => { onChangeTerm(!modalVisible) }}><AntDesign name="close" size={35} color="white" /></TouchableOpacity>
        </View>

      </Modal>
    </SafeAreaView >

  );
}

export default ImageModal;

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
