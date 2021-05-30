import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ChatListItem from '../components/ChatListItem';

import { Text, View } from '../components/Themed';
import FlatListItemSeparator from '../components/FlatListItemSeparator'

import chatRooms1 from '../data/chatRooms';
import NewChatIcon from '../components/NewChatIcon';

import { API, Auth, graphqlOperation } from 'aws-amplify';
import { getUser, getChatRoom } from '../src/graphql/queries'
import { getUserChatRooms, listChatRoomUsers } from '../graphql/queries'
import { onCreateMessage } from '../src/graphql/subscriptions';

const ChatsTab = () => {
  const [chatRooms, setChatRooms] = useState();

  const fetchChatRooms = async () => {
    try {

      const currentUser = await Auth.currentAuthenticatedUser();
      const chatRoomsData = await API.graphql(graphqlOperation(getUserChatRooms,
        {
          id: currentUser.attributes.sub
        }
      ));

      const chatRooms = chatRoomsData.data.getUser.chatRoomUsers.items

      setChatRooms(chatRooms);
      // console.log(chatRooms);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchChatRooms();
  }, []);


  const getAuthUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return user.attributes.sub;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAuthUser();
  }, [])

  const checkUserIsRecipient = async (userID, chatRoomID) => {
    try {

      const chatRoomsUsersData = await API.graphql(graphqlOperation(listChatRoomUsers,
        {
          id: chatRoomID
        }
      ));

      const userList = chatRoomsUsersData.data.getChatRoom.chatRoomUser.items;

      const isRecipient = userList.find(
        user => user.id === userID
      );

      return isRecipient;
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onCreateMessage)).
      subscribe({
        next: (data) => {
          const subscriptionData = data.value.data;
          const lastMessaegeData = subscriptionData.onCreateMessage;
          const subChatRoomID = subscriptionData.onCreateMessage.chatRoom.id;
          const userID = getAuthUser();

          // console.log(userID)

          //if i didnt send message
          if (lastMessaegeData.userID != userID) {
            const isRecipient = checkUserIsRecipient(userID, lastMessaegeData.chatRoomID);

            if (!isRecipient) {
              return;
            }
          }

          fetchChatRooms(); //need to revisit this

          return () => subscription.unsubscribe();
        }
      })
  }, [])

  return (
    <View style={styles.container}>
      {
        (chatRooms && chatRooms.length === 0) ?
          <View>
            <Text>no conversations</Text>
          </View>

          :
          <FlatList
            data={chatRooms}
            style={styles.flatList}
            keyExtractor={item => item.chatRoom.id}
            renderItem={({ item }) => <ChatListItem chatRoom={item.chatRoom} />}
            ItemSeparatorComponent={FlatListItemSeparator}
          />
      }
      <NewChatIcon />
    </View>
  );
}

export default ChatsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  flatList: {
    width: '100%'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  }
});
