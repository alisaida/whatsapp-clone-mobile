import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Message } from '../types';
import moment from 'moment'

export type MessageProps = {
    message: Message,
    shouldDisplayContacts: boolean
}

const ChatMessage = (props: MessageProps) => {

    const brightColor = () => {
        var hue = Math.floor(Math.random() * 360),
            saturation = Math.floor(Math.random() * 100),
            color = "hsl(" + hue + ", " + saturation + "%, " + 50 + "%)"; //lightness is at Max
        return color;
    }

    const { message, shouldDisplayContacts } = props;

    const isIncomming = message.user.id === '2' ? true : false;

    return (

        <View style={[styles.container, isIncomming ? { justifyContent: 'flex-end', alignSelf: 'flex-end' } : {}]}>
            <View style={[styles.messageBubble, isIncomming ? { backgroundColor: '#c5e3cd' } : { backgroundColor: 'white' }]}>
                {shouldDisplayContacts && <Text style={{ fontWeight: '700', color: brightColor() }}>{message.user.name}</Text>}
                <Text>{message.content}</Text>
                <Text style={[styles.time, isIncomming ? { textAlign: 'right' } : { textAlign: 'left' }]}>{moment(message.createdAt).format('LT')}</Text>
            </View>
        </View>
    )
}

export default ChatMessage

const styles = StyleSheet.create({

    containerIncomming: {
        width: '85%',
        flexDirection: 'row',

    },
    messageBubble: {
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#d9d9d9',
    },
    container: {
        width: '85%',
        flexDirection: 'row',
    },
    time: {
        fontSize: 11,
        marginTop: 2,
        color: 'gray'
    },
})
