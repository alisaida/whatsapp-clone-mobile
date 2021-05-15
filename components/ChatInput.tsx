import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createMessage, updateChatRoom } from '../src/graphql/mutations';

export type ChatInputProps = {
    chatRoomID: String
}

const ChatInput = (props: ChatInputProps) => {

    const { chatRoomID } = props;

    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message) {
            sendTextMessage();
        } else {
            sendVoiceMessage();
        }
    }

    const sendTextMessage = async () => {
        try {
            console.log(`sending message ...`);

            const currentUser = await Auth.currentAuthenticatedUser();
            const userID = currentUser.attributes.sub;

            const lastMessage = await API.graphql(graphqlOperation(createMessage, {
                input: {
                    chatRoomID: chatRoomID,
                    userID: userID,
                    message: message
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

    const sendVoiceMessage = () => {
        console.warn(`sending voice message`);
    }

    return (
        <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={65} style={styles.keyboardAvoider}>
            <View style={styles.bottomContainer}>
                <View style={styles.chatBoxContainer}>
                    <TextInput style={styles.inputStyle} placeholder="send message" onChangeText={setMessage} />
                    <TouchableOpacity>
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
        </KeyboardAvoidingView>
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
