import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import CameraModal from './CameraModal';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createMessage, updateChatRoom, createChatRoom, updateChatRoomUser } from '../src/graphql/mutations';
import { getChatRoom } from '../src/graphql/queries'
import { useNavigation } from '@react-navigation/native';

export type ChatInputProps = {
    chatRoomID: String
}

const ChatInput = (props: ChatInputProps) => {

    const navigation = useNavigation();

    const { chatRoomID } = props;

    const [message, setMessage] = useState('');
    const [cameraModalVisible, setCameraModalVisible] = useState(false);

    const handleSend = () => {
        if (message) {
            sendTextMessage();
        } else {
            sendVoiceMessage();
        }
    }

    const handleAddUser = () => {
        navigation.navigate('Contacts');
    }

    const sendTextMessage = async () => {
        try {
            const currentUser = await Auth.currentAuthenticatedUser();
            const userID = currentUser.attributes.sub;

            const lastMessage = await API.graphql(graphqlOperation(createMessage, {
                input: {
                    chatRoomID: chatRoomID,
                    userID: userID,
                    message: message
                }
            }));

            //update lastMessage of chatRoom
            const lastMessageID = (lastMessage as any).data.createMessage.id;
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

    const sendVoiceMessage = async () => {
        console.warn(`sending voice message`);
    }

    const openCamera = () => {
        setCameraModalVisible(!cameraModalVisible);
    }

    return (
        <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={65} style={styles.keyboardAvoider}>

            <View style={styles.bottomContainer}>
                <View style={styles.chatBoxContainer}>
                    <ScrollView keyboardDismissMode='on-drag'>
                        <TextInput clearButtonMode="always" style={styles.inputStyle} placeholder="send message" onChangeText={setMessage} />
                    </ScrollView>
                    <TouchableOpacity onPress={openCamera}>
                        <Ionicons name='camera' color='grey' size={24} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.voiceSendIcon} onPress={handleSend}>
                    {
                        !message ? <MaterialIcons name="keyboard-voice" size={27} color="white" /> :
                            <MaterialIcons name="send" size={27} color="white" />
                    }
                </TouchableOpacity>
            </View>
            {
                cameraModalVisible &&
                <CameraModal
                    chatRoomID={chatRoomID}
                    modalVisible={cameraModalVisible}
                    onChangeTerm={(newState) => { setCameraModalVisible(newState); }}
                />
            }
        </KeyboardAvoidingView >
    )
}

export default ChatInput

const styles = StyleSheet.create({
    bottomContainer: {
        flexDirection: 'row',
        marginBottom: 20,
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
        justifyContent: 'center'
    }
});
