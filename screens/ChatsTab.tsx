import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ChatListItem from '../components/ChatListItem';

import { Text, View } from '../components/Themed';
import FlatListItemSeparator from '../components/FlatListItemSeparator'

import NewChatIcon from '../components/NewChatIcon';

import { API, Auth, graphqlOperation } from 'aws-amplify';
import { getUser, getChatRoom } from '../src/graphql/queries'
import { getUserChatRooms, listChatRoomUsers } from '../graphql/queries'
import { onUpdateChatRoom } from '../src/graphql/subscriptions';
import { ChatRoom, ChatRoomUser } from '../types'
import chatRooms from '../data/chatRooms';



const ChatsTab = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [refresh, setRefresh] = useState(false);

  const fetchChatRooms = async () => {
    try {

      const currentUser = await Auth.currentAuthenticatedUser();
      const chatRoomsData = await API.graphql(graphqlOperation(getUserChatRooms,
        {
          id: currentUser.attributes.sub
        }
      ));

      // const chatRooms = (chatRoomsData as any).data.getUser.chatRoomUsers.items.map((item: any) => ({
      //   chatRoom: item.chatRoom
      // }));

      const chatRooms = (chatRoomsData as any).data.getUser.chatRoomUsers.items.map((item: ChatRoomUser) => ({
        id: item.chatRoom.id,
        lastMessage: item.chatRoom.lastMessage,
        updatedAt: item.chatRoom.updatedAt,
        chatRoomUser: item.chatRoom.chatRoomUser.items,
      }));

      // console.log(chat[0]);
      // console.log(chatRooms.length);


      setChatRooms(chatRooms);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchChatRooms();
  }, []);

  useEffect(() => {
    return () => {
      // console.log("cleaned up");
    };
  }, []);

  const getAuthUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setCurrentUser(user.attributes.sub);
      return user.attributes.sub;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAuthUser();
  }, [])

  const checkUserIsRecipient = async (userID: any, chatRoomID: any) => {
    try {

      const chatRoomsUsersData = await API.graphql(graphqlOperation(listChatRoomUsers,
        {
          id: chatRoomID
        }
      ));

      const userList = (chatRoomsUsersData as any).data.getChatRoom.chatRoomUser.items;

      const isRecipient = userList.find(
        (user: any) => user.id === userID
      );

      return isRecipient;
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onUpdateChatRoom)).
      subscribe({
        next: (data: any) => {
          const subscriptionData = data.value.data;
          // const updatedChatRoom = subscriptionData.onUpdateChatRoom;
          // const userID = getAuthUser();

          const updatedChatRoom = {
            id: subscriptionData.onUpdateChatRoom.id,
            chatRoomUsers: subscriptionData.onUpdateChatRoom.chatRoomUser.items,
            updatedAt: subscriptionData.onUpdateChatRoom.updatedAt
          };

          // console.log(updatedChatRoom);

          // const chatRoomID = updatedChatRoom.id;
          const chatRoomRecipients = updatedChatRoom.chatRoomUsers;
          // console.log(chatRoomRecipients);

          const isRecipient = chatRoomRecipients.find(
            (recipient: any) => recipient.userID === currentUser
          );

          if (!isRecipient) {
            return;
          }

          let cloneChats = [...chatRooms];

          const updatedChatRoomIdx = cloneChats.findIndex(
            (chatRoom: any) => chatRoom.id === updatedChatRoom.id
          );



          if (updatedChatRoomIdx != -1 && cloneChats.length > 1) {

            cloneChats.splice(updatedChatRoomIdx, 1);

            setChatRooms([updatedChatRoom, ...cloneChats]);

            setRefresh(!refresh);
          }

          return () => subscription.unsubscribe();
        }
      })
  }, [chatRooms])


  return (
    <View style={styles.container}>
      {
        (!chatRooms || (chatRooms && chatRooms.length === 0)) ?
          <View>
            <Text>no conversations</Text>
          </View>

          :
          <FlatList
            // data={chatRooms}
            data={(chatRooms as any).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))}
            style={styles.flatList}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ChatListItem chatRoom={item} />}
            ItemSeparatorComponent={FlatListItemSeparator}
            extraData={refresh}


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
