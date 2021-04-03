import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ChatRoom } from '../types';
import Avatar from './Avatar';

import { timeAgo } from '../DateUtil/DateUtil';

export type ChatListItemProps = {
    chatRoom: ChatRoom;
}



const ChatListItem = (props: ChatListItemProps) => {

    const { chatRoom } = props;

    const user = chatRoom.users[0];

    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate("ChatRoomScreen", { id: chatRoom.id, name: user.name, imageUri: user.imageUri });
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.leftContainer}>
                <Avatar uri={user.imageUri} size={50} />
                <View style={styles.midContainer}>
                    <Text style={styles.recipientName}>{user.name}</Text>
                    <View style={styles.lastMessageContainer}>
                        <Text ellipsizeMode={'tail'} numberOfLines={1} style={styles.lastMessagePreview}>{chatRoom.lastMessage.content}</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.time}>{timeAgo(chatRoom.lastMessage.createdAt)}</Text>
        </TouchableOpacity>
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
        marginLeft: 10
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
