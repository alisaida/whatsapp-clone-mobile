import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ContactListItem from '../components/ContactListItem';

import { Text, View } from '../components/Themed';
import FlatListItemSeparator from '../components/FlatListItemSeparator'

import { API, Auth, graphqlOperation } from 'aws-amplify';
import { listUsers } from '../graphql/queries'
export default function ContactsTab() {

  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      const list = await API.graphql(graphqlOperation(listUsers, { id: currentUser.attributes.sub }));
      const contacts = list.data.listUsers.items;
      if (contacts) {
        setContacts(contacts);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        style={styles.flatList}
        renderItem={({ item }) => <ContactListItem user={item} />}
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
  }
});
