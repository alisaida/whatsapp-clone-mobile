import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { ChatRoom } from '../types';
import Avatar from './Avatar';

import { getChatRoom } from '../src/graphql/queries'
import { onCreateMessage } from '../src/graphql/subscriptions'

import { timeAgo } from '../DateUtil/DateUtil';

export type ChatListItemProps = {
    chatRoom: ChatRoom;
}



const ChatListItem = (props: ChatListItemProps) => {

    const { chatRoom } = props;

    const navigation = useNavigation();

    const user = chatRoom.chatRoomUser.items[0].user;
    const [recipient, setRecipient] = useState(null);
    const [lastMessage, setLastMessage] = useState(null);
    const [currentUser, setcurrentUser] = useState(null);

    useEffect(() => {
        const getRecipient = async () => {
            const currentUser = await Auth.currentAuthenticatedUser();
            setcurrentUser(currentUser);

            const userID = currentUser.attributes.sub;

            const users = chatRoom.chatRoomUser.items;

            if (users[0].user.id === userID) {
                setRecipient(users[1].user);
            } else {
                setRecipient(users[0].user);
            }
        }
        getRecipient();
    }, []);

    useEffect(() => {
        fetchLastMessage();
    }, []);

    const fetchLastMessage = async () => {
        try {
            const chatRoomData = await API.graphql(graphqlOperation(getChatRoom, { id: chatRoom.id }));
            const lastMessage = chatRoomData.data.getChatRoom.lastMessage;

            setLastMessage(lastMessage);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const subscription = API.graphql(graphqlOperation(onCreateMessage)).
            subscribe({
                next: (data) => {
                    const subscriptionData = data.value.data;
                    const lastMessaegeData = subscriptionData.onCreateMessage;

                    //check if message was intended for this chatRoom
                    if (lastMessaegeData.chatRoomID != chatRoom.id) {
                        return;
                    }

                    setLastMessage(lastMessaegeData);

                    return () => subscription.unsubscribe();
                }
            })
    }, [])

    const onPress = () => {
        navigation.navigate("ChatRoomScreen", { id: chatRoom.id, name: recipient.name, imageUri: recipient.imageUri });
    }

    if (!recipient) {
        return null;
    }

    if (!lastMessage) {
        return null;
    }

    const lastMessageDisplay = () => {
        return (lastMessage && lastMessage.userID === currentUser.attributes.sub)
            ? 'You: ' + lastMessage.message : lastMessage.message
    }

    //lastMessage.user.id === userID
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.leftContainer}>
                <Avatar uri={recipient.imageUri} size={50} />
                <View style={styles.midContainer}>
                    <Text style={styles.recipientName}>{recipient.name}</Text>
                    <View style={styles.lastMessageContainer}>
                        <Text ellipsizeMode={'tail'} numberOfLines={1} style={styles.lastMessagePreview}>
                            {
                                lastMessageDisplay()
                            }
                        </Text>
                    </View>
                </View>
            </View>
            <Text style={styles.time}>{timeAgo(lastMessage.createdAt)}</Text>

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
