import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'

import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const ChatInput = () => {
    return (
        <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={65} style={styles.keyboardAvoider}>
            <View style={styles.bottomContainer}>
                <View style={styles.chatBoxContainer}>
                    <TextInput style={styles.inputStyle} placeholder="send message" />
                    <TouchableOpacity>
                        <Ionicons name='camera' color='grey' size={24} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.voiceIcon}>
                    <MaterialIcons name="keyboard-voice" size={27} color="white" />
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
        marginHorizontal: 10,
        marginTop: 2
    },
    chatBoxContainer: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#d9d9d9',
        borderRadius: 50,
        paddingHorizontal: 20,
        height: 45,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    inputStyle: {
        flex: 1,
    },
    voiceIcon: {
        backgroundColor: '#128C7E',
        padding: 5,
        marginLeft: 5,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#d9d9d9',
    },
    keyboardAvoider: {
        flexShrink: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    }
});
