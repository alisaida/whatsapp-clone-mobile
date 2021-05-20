import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, ImageBackground, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { getChatRoom, messagesByChatRoom } from '../src/graphql/queries'
import { onCreateMessage } from '../src/graphql/subscriptions'
import moment from 'moment';

import chats from '../data/chats';
import wallpaper from '../assets/images/wallpaper.png';
import ChatMessageBubble from '../components/ChatMessageBubble';
import ChatMessageDateHeader from '../components/ChatMessageDateHeader';
import ChatInput from '../components/ChatInput';
import { ChatRoom } from '../types'

const ChatRoomScreen = () => {

    const route = useRoute();

    const [messages, setMessages] = useState([]);
    const [chatRoom, setChatRoom] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [numUsers, setNumUsers] = useState(null)

    const fetchCurrentUser = async () => {
        const userData = await Auth.currentAuthenticatedUser();
        setCurrentUser(userData);
    }

    const fetchMessages = async () => {
        try {
            const chatRoomData = await API.graphql(graphqlOperation(getChatRoom, { id: route.params.id }));
            const chatRoom = chatRoomData.data.getChatRoom;

            setChatRoom(chatRoom);

            const messageData = await API.graphql(graphqlOperation(messagesByChatRoom,
                {
                    chatRoomID: route.params.id,
                    sortDirection: 'ASC'
                }
            ));
            setMessages(messageData.data.messagesByChatRoom.items);

            if (chatRoom && chatRoom.chatRoomUser) {
                setNumUsers(chatRoom.chatRoomUser.items.length);
            }

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const subscription = API.graphql(graphqlOperation(onCreateMessage))
            .subscribe({
                next: (data) => {
                    const subscriptionData = data.value.data;
                    const newMessageData = subscriptionData.onCreateMessage;
                    //check if message was intended for this chatRoom
                    if (newMessageData.chatRoomID != route.params.id) {
                        return;
                    }

                    setMessages([...messages, newMessageData]);
                }
            });

        return () => subscription.unsubscribe();
    }, [messages]);

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const brightColor = () => {
        var hue = Math.floor(Math.random() * 360),
            saturation = Math.floor(Math.random() * 100),
            color = "hsl(" + hue + ", " + saturation + "%, " + 50 + "%)"; //lightness is at Max
        return color;
    }

    // renders flatlist
    const renderItems = ({ item, index }) => {
        //only display contact name for chat groups consisting more than 3 users
        const shouldDisplayContacts = (numUsers && numUsers > 2);

        //used display message on side of screen
        const isIncomming = currentUser.attributes.sub === item.userID;


        let prevDate = '';
        if (index > 0) {
            prevDate = moment(messages[index - 1].createdAt).format();
        } else {
            prevDate = moment(messages[index].createdAt).format();
        }

        let current = moment(messages[index].createdAt).format();
        let currentDateFormated = moment(messages[index].createdAt).format('LL');

        return (
            <View>
                {
                    (index === 0 || (prevDate && !moment(current).isSame(prevDate, 'day'))) ? (<ChatMessageDateHeader date={currentDateFormated} />) : null
                }
                <ChatMessageBubble message={item} shouldDisplayContacts={shouldDisplayContacts} isIncomming={isIncomming} contactNameColor={brightColor()} />
            </View>
        )
    }

    return (
        <ImageBackground source={wallpaper} style={styles.background}>
            <FlatList
                data={messages}
                renderItem={renderItems}
                keyExtractor={item => item.id}
                style={{ flex: 1 }}

                inverted={false} //break auto scroll to top, not sure why
            />
            <ChatInput chatRoomID={route.params.id} />
        </ImageBackground>
    )
}

export default ChatRoomScreen

const styles = StyleSheet.create({
    background: {
        height: '100%',
        width: '100%'
    },
})
