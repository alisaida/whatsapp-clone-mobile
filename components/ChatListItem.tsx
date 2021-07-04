import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { ChatRoom, User } from '../types';
import Avatar from './Avatar';

import { getChatRoom, getUser } from '../src/graphql/queries'
import { onCreateMessage } from '../src/graphql/subscriptions'

import { timeAgo } from '../DateUtil/DateUtil';
import { Ionicons } from '@expo/vector-icons';


export type ChatListItemProps = {
    chatRoom: ChatRoom;
}



const ChatListItem = (props: ChatListItemProps) => {

    const { chatRoom } = props;

    // console.log(chatRoom)

    const navigation = useNavigation();

    // const user = (chatRoom as any).chatRoomUser[0];
    const [recipient, setRecipient] = useState(null);
    const [lastMessage, setLastMessage] = useState(null);
    const [currentUser, setcurrentUser] = useState(null);

    useEffect(() => {
        const getRecipient = async () => {
            const currentUser = await Auth.currentAuthenticatedUser();
            setcurrentUser(currentUser);

            if (chatRoom.chatRoomUser.length === 2) {
                const currentUserID = currentUser.attributes.sub
                loadUserDetails(currentUserID);
            } else {
                const recipientData = {
                    imageUri: 'https://www.pngkit.com/png/full/44-443934_post-navigation-people-icon-grey.png',
                    name: 'group chat',
                };
                setRecipient(recipientData);
            }
        }
        getRecipient();
    }, []);

    useEffect(() => {
        return () => {
            // console.log("cleaned up");
        };
    }, []);

    const loadUserDetails = async (currentUserID: string) => {

        const users: Array<any> = (chatRoom as ChatRoom).chatRoomUser;

        let recipientUserID: string;
        if (users[0].userID === currentUserID) {
            recipientUserID = users[1].userID;
        } else {
            recipientUserID = users[0].userID;
        }

        try {
            const userDetails = await API.graphql(graphqlOperation(getUser, { id: recipientUserID }));

            const recipientData = {
                createdAt: userDetails.data.getUser.createdAt,
                id: userDetails.data.getUser.id,
                imageUri: userDetails.data.getUser.imageUri,
                name: userDetails.data.getUser.name,
                updatedAt: userDetails.data.getUser.updatedAt,
                userID: userDetails.data.getUser.userID,
            };

            setRecipient(recipientData);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchLastMessage();
    }, []);

    const fetchLastMessage = async () => {
        try {
            const chatRoomData: any = await API.graphql(graphqlOperation(getChatRoom, { id: chatRoom.id }));
            const lastMessage = chatRoomData.data.getChatRoom.lastMessage;

            setLastMessage(lastMessage);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const subscription = API.graphql(graphqlOperation(onCreateMessage)).
            subscribe({
                next: (data: any) => {
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
        navigation.navigate("ChatRoomScreen", { id: chatRoom.id, name: (recipient as any).name, imageUri: (recipient as any).imageUri });
    }

    if (!recipient) {
        return null;
    }

    if (!lastMessage) {
        return null;
    }
    const lastMessageDisplay = () => {
        if (lastMessage) {
            if (lastMessage.imageUri) {
                return <><Ionicons name="camera" size={15} color="grey" /><Text> Photo </Text></>
                    ;
            }
            if (lastMessage.userID === currentUser.attributes.sub) {
                return 'You: ' + lastMessage.message
            } else {
                return lastMessage.message;
            }
        }
    }

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
