import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ChatListItem from '../components/ChatListItem';

import { Text, View } from '../components/Themed';
import FlatListItemSeparator from '../components/FlatListItemSeparator'

import chatRooms from '../data/chatRooms';
import NewChatIcon from '../components/NewChatIcon';

// duplicate the chatListItem and replace with contactListItem to render contact details

export default function ContactsTab() {
  return (
    <View style={styles.container}>
      <FlatList
        data={chatRooms}
        style={styles.flatList}
        renderItem={({ item }) => <ChatListItem chatRoom={item} />}
        ItemSeparatorComponent={FlatListItemSeparator}
      />

      <NewChatIcon />
    </View>
  );
}

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
