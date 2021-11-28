import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native';
import ContactListItem from '../components/ContactListItem';

import { Text, View } from '../components/Themed';
import FlatListItemSeparator from '../components/FlatListItemSeparator'

import { API, Auth, graphqlOperation } from 'aws-amplify';
import { listUsers } from '../src/graphql/custom-queries';
import { getChatRoom, getUser, listUsers as listAllUsers } from '../src/graphql/queries';
import { ChatRoomUser, User } from '../types';

const ContactsTab = () => {

  const [contacts, setContacts] = useState<Array<User>>([]);
  const [chatRoomID, setChatRoomID] = useState('');
  const route = useRoute();

  useEffect(() => {
    //fetch contacts for group message
    if (route.params && route.params.chatRoomID) {
      // console.log(route.params.chatRoomID);
      fetchContactsForGroupChat(route.params.chatRoomID);
      setChatRoomID(route.params.chatRoomID);
    } else {
      //fetch contacts for new conversation
      fetchContactsForNewChat();
    }
  }, []);

  const fetchContactsForNewChat = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      const list = await API.graphql(graphqlOperation(listAllUsers, {}));
      const allContacts = list.data.listUsers.items;
      const contacts = allContacts.filter((user) => user.id !== currentUser.attributes.sub);

      if (contacts) {
        setContacts(contacts);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchContactsForGroupChat = async (chatRoomID: string) => {
    try {
      const chatRoomData = await API.graphql(graphqlOperation(getChatRoom, { id: chatRoomID }));
      //currentChatRoom recipients
      const currentRecipeints: Array<string> = chatRoomData.data.getChatRoom.chatRoomUser.items.map((item: ChatRoomUser) => (
        item.userID
      ));

      //fetch all constacts in the system
      const list = await API.graphql(graphqlOperation(listAllUsers, {}));
      const contacts: Array<User> = list.data.listUsers.items;

      //find the relative complement
      const difference = contacts.filter((user) => !currentRecipeints.includes(user.id));
      setContacts(difference);

      // console.log(contacts);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        style={styles.flatList}
        renderItem={({ item }) => <ContactListItem user={item} chatRoomID={chatRoomID} />}
        ItemSeparatorComponent={FlatListItemSeparator}
      />
    </View>
  );
}

export default ContactsTab;

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
