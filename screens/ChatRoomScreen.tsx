import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, ImageBackground, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

import moment from 'moment';

import chats from '../data/chats';
import wallpaper from '../assets/images/wallpaper.png';
import ChatMessage from '../components/ChatMessage';
import ChatMessageDateHeader from '../components/ChatMessageDateHeader';
import ChatInput from '../components/ChatInput';


const ChatRoom = () => {

    const route = useRoute();

    const renderItems = ({ item, index }) => {

        //only display contact name for chat groups consisting more than 3 users
        const shouldDisplayContacts = (chats.users.length > 2);

        let prevDate = '';
        if (index > 0) {
            prevDate = moment(chats.messages[index - 1].createdAt).format('L');
        } else {
            prevDate = moment(chats.messages[index].createdAt).format('L');
        }

        let current = moment(chats.messages[index].createdAt).format('L');
        let currentDateFormated = moment(chats.messages[index].createdAt).format('LL');

        return (
            <View>
                {
                    (index === 0 || (prevDate && !moment(current).isSame(prevDate, 'day'))) ? (<ChatMessageDateHeader date={currentDateFormated} />) : null
                }
                <ChatMessage message={item} shouldDisplayContacts={true} />
            </View>
        )
    }

    return (

        <ImageBackground source={wallpaper} style={styles.background}>

            <FlatList
                data={chats.messages}
                renderItem={renderItems}
                keyExtractor={item => item.id}
                style={{ flex: 1 }}
                inverted={false} //break auto scroll to top, not sure why
            />
            <ChatInput />
        </ImageBackground>
    )
}

export default ChatRoom

const styles = StyleSheet.create({
    background: {
        height: '100%',
        width: '100%'
    },
})
