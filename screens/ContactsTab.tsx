import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ContactListItem from '../components/ContactListItem';

import { Text, View } from '../components/Themed';
import FlatListItemSeparator from '../components/FlatListItemSeparator'

import users from '../data/users';

export default function ContactsTab() {
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
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
