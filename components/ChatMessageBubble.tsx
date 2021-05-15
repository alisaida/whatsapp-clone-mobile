import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { API, Auth, graphqlOperation } from 'aws-amplify';
import { getUser } from '../src/graphql/queries'

import { Message } from '../types';
import moment from 'moment'

export type MessageProps = {
    message: Message,
    shouldDisplayContacts: boolean,
    isIncomming: boolean,
    contactNameColor: String
}

const ChatMessageBubble = (props: MessageProps) => {

    const { message, shouldDisplayContacts, isIncomming, contactNameColor } = props;

    const [sender, setSender] = useState(null);

    const fetchUserInfo = async () => {
        const userData = await API.graphql(graphqlOperation(getUser, { id: message.userID }))
        setSender(userData.data.getUser);
    };

    useEffect(() => {
        fetchUserInfo();
    }, [])

    if (!sender) {
        return null;
    }

    return (
        <View style={[styles.container, isIncomming ? { justifyContent: 'flex-end', alignSelf: 'flex-end' } : {}]}>
            <View style={[styles.messageBubble, isIncomming ? { backgroundColor: '#c5e3cd' } : { backgroundColor: 'white' }]}>
                {shouldDisplayContacts && <Text style={{ fontWeight: '700', color: contactNameColor }}>{sender.username}</Text>}
                <Text>{message.message}</Text>
                <Text style={[styles.time, isIncomming ? { textAlign: 'right' } : { textAlign: 'left' }]}>{moment(message.createdAt).format('LT')}</Text>
            </View>
        </View>
    )
}

export default ChatMessageBubble

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
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
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
