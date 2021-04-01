import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import moment from 'moment';

import { ChatRoom } from '../types';
import { Dimensions } from 'react-native';

export type ChatListItemProps = {
    chatRoom: ChatRoom;
}

const ChatListItem = (props: ChatListItemProps) => {

    const { chatRoom } = props;

    const user = chatRoom.users[1];

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image source={{ uri: user.imageUri }} style={styles.image} />
                <View style={styles.midContainer}>
                    <Text style={styles.recipientName}>{user.name}</Text>
                    <View style={styles.lastMessageContainer}>
                        <Text ellipsizeMode={'tail'} numberOfLines={1} style={styles.lastMessagePreview}>{chatRoom.lastMessage.content}</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.time}>{moment(chatRoom.lastMessage.createdAt).fromNow()}</Text>
        </View>
    )
}

export default ChatListItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 15,
    },
    leftContainer: {
        flexDirection: 'row'
    },
    midContainer: {
        flexDirection: 'column',
    },
    image: {
        marginRight: 10,
        borderRadius: 50,
        width: 55,
        height: 55,
    },
    recipientName: {
        fontSize: 16,
        fontWeight: '600',
        paddingBottom: 2
    },
    lastMessageContainer: {
        flexDirection: 'row',
    },
    lastMessagePreview: {
        fontSize: 14.5,
        color: '#828282',
        width: 200
    },
    time: {
        fontSize: 14.5,
        color: '#828282',
        // padding: 5
    }
})
