import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ChatListItem from '../components/ChatListItem';

import { Text, View } from '../components/Themed';
import FlatListItemSeparator from '../components/FlatListItemSeparator'

import chatRooms1 from '../data/chatRooms';
import NewChatIcon from '../components/NewChatIcon';

import { API, Auth, graphqlOperation } from 'aws-amplify';
import { getUser } from '../src/graphql/queries'
import { getUserChatRooms } from '../graphql/queries'

const ChatsTab = () => {

  const [chatRooms, setChatRooms] = useState();

  const fetchChatRooms = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();

      const chatRoomsData = await API.graphql(graphqlOperation(getUserChatRooms, { id: currentUser.attributes.sub }));

      const chatRooms = chatRoomsData.data.getUser.chatRoomUsers.items

      setChatRooms(chatRooms);

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchChatRooms();
  }, []);

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
