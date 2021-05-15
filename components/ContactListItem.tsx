import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { User } from '../types';
import Avatar from './Avatar';

import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createChatRoom, createChatRoomUser } from '../src/graphql/mutations'

import { getUserChatRooms } from '../graphql/queries';

export type ContactListItemProps = {
    user: User;
}



const ContactListItem = (props: ContactListItemProps) => {

    const { user } = props;
    const navigation = useNavigation();

    const onPress = () => {
        const chatRoom = prepareChatRoom();
        if (!chatRoom) {
            console.warn('Chatroom creation failed');
            return;
        }
        navigation.navigate("ChatRoomScreen", { id: user.id, name: user.name, imageUri: user.imageUri });
    }

    const prepareChatRoom = async () => {
        //setup chatroom, add user-prop and current auth user
        try {

            const currentUser = await Auth.currentAuthenticatedUser();

            //all chatRoom for current authenticated user
            const currentUserChats = await API.graphql(graphqlOperation(getUserChatRooms, { id: currentUser.attributes.sub }));
            const userChats = currentUserChats.data.getUser.chatRoomUsers.items;

            //find chatRoom between current and selected users
            const existingChat = userChats.find(chats => chats.chatRoom.chatRoomUser.items[0].user.id === user.id)

            //if chat room between current user and selected user is found return chatRoom
            if (existingChat && existingChat.chatRoom) {
                return existingChat.chatRoom;
            }

            //otherwise create a new chatroom between current authenticated and selected user
            console.log('no conversation exists between current and selected users');
            console.log('initialising a new chatroom between current and selected users');
            const newChatRoomData = await API.graphql(graphqlOperation(createChatRoom, { input: {} }));

            if (!newChatRoomData) {
                console.log('chatroom creation failed!');
                return null;
            }

            const newChatRoom = newChatRoomData.data.createChatRoom;

            await API.graphql(graphqlOperation(createChatRoomUser, {
                input: {
                    chatRoomID: newChatRoom.id,
                    userID: user.id
                }
            }));

            await API.graphql(graphqlOperation(createChatRoomUser, {
                input: {
                    chatRoomID: newChatRoom.id,
                    userID: currentUser.attributes.sub
                }
            }));

            return newChatRoom;
        } catch (err) {
            console.log(err);
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
