import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ChatListItem from '../components/ChatListItem';

import { Text, View } from '../components/Themed';
import FlatListItemSeparator from '../components/FlatListItemSeparator'

import chatRooms from '../data/chatRooms';
import { ChatRoom } from '../types';

export default function TabTwoScreen() {



  return (
    <View style={styles.container}>
      <FlatList
        data={chatRooms}
        style={styles.flatList}
        renderItem={({ item }) => <ChatListItem chatRoom={item} />}
        ItemSeparatorComponent={FlatListItemSeparator}
      />
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
  },
});
