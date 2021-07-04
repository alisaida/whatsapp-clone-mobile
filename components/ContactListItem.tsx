import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { User } from '../types';
import Avatar from './Avatar';

import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createChatRoom, createChatRoomUser, updateChatRoom } from '../src/graphql/mutations'

import { getUserChatRooms } from '../src/graphql/custom-queries';

export type ContactListItemProps = {
    user: User;
    chatRoomID: string;
}

const ContactListItem = (props: ContactListItemProps) => {

    const { user, chatRoomID } = props;
    const navigation = useNavigation();

    const onPress = async () => {
        if (chatRoomID !== '') {
            addUserToGroup();
        } else {
            initialiseChatRoom();
        }
    }

    const addUserToGroup = async () => {
        console.log(chatRoomID);
        try {

            //add new user to chatroom users
            await API.graphql(graphqlOperation(createChatRoomUser, {
                input: {
                    chatRoomID: chatRoomID,
                    userID: user.id
                }
            }));

            //update chatroom
            await API.graphql(graphqlOperation(updateChatRoom, {
                input: {
                    id: chatRoomID
                }
            }));

            navigation.navigate("ChatRoomScreen", { id: chatRoomID, name: 'group chat', imageUri: 'https://www.pngkit.com/png/full/44-443934_post-navigation-people-icon-grey.png' });
        } catch (error) {
            console.log(error);
        }
    }

    const initialiseChatRoom = async () => {
        try {
            //setup chatroom, add user-prop and current auth user
            const currentUser = await Auth.currentAuthenticatedUser();

            //all chatRoom for current authenticated user
            const currentUserChats = await API.graphql(graphqlOperation(getUserChatRooms, { id: currentUser.attributes.sub }));
            const userChats = currentUserChats.data.getUser.chatRoomUsers.items;

            //find chatRoom between current and selected users
            let existingChat = userChats.find(chats => chats.chatRoom.chatRoomUser.items[0].userID === user.id && chats.chatRoom.chatRoomUser.items < 3);
            if (!existingChat) {
                existingChat = userChats.find(chats => chats.chatRoom.chatRoomUser.items[1].userID === user.id && chats.chatRoom.chatRoomUser.items < 3);
            }

            let chatRoom = null;

            //if chat room between current user and selected user is found
            if (existingChat && existingChat.chatRoom) {
                chatRoom = existingChat.chatRoom;
            } else {

                //otherwise create a new chatroom between current authenticated and selected user
                console.log('no conversation exists between current and selected users');
                console.log('initialising a new chatroom between current and selected users');
                const newChatRoomData = await API.graphql(graphqlOperation(createChatRoom, { input: {} }));

                if (!newChatRoomData) {
                    console.log('chatroom creation failed!');
                    return null;
                }

                chatRoom = newChatRoomData.data.createChatRoom;

                await API.graphql(graphqlOperation(createChatRoomUser, {
                    input: {
                        chatRoomID: chatRoom.id,
                        userID: user.id
                    }
                }));

                await API.graphql(graphqlOperation(createChatRoomUser, {
                    input: {
                        chatRoomID: chatRoom.id,
                        userID: currentUser.attributes.sub
                    }
                }));

                //update chatroom
                await API.graphql(graphqlOperation(updateChatRoom, {
                    input: {
                        id: chatRoom.id
                    }
                }));

            }

            navigation.navigate("ChatRoomScreen", { id: chatRoom.id, name: user.name, imageUri: user.imageUri });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.leftContainer}>
                <Avatar uri={user.imageUri} size={50} />
                <View style={styles.midContainer}>
                    <Text style={styles.recipientName}>{user.name}</Text>
                    <View style={styles.statusContainer}>
                        <Text ellipsizeMode={'tail'} numberOfLines={1} style={styles.status}>{user.status}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ContactListItem;

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
    recipientName: {
        fontSize: 16,
        fontWeight: '600',
        paddingBottom: 2
    },
    statusContainer: {
        flexDirection: 'row',
    },
    status: {
        fontSize: 14.5,
        color: '#828282',
        width: 200
    }
})
