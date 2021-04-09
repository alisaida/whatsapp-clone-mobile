import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { User } from '../types';
import Avatar from './Avatar';

import { timeAgo } from '../DateUtil/DateUtil';

export type ContactListItemProps = {
    user: User;
}



const ChatListItem = (props: ContactListItemProps) => {

    const { user } = props;
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate("ChatRoomScreen", { id: user.id, name: user.name, imageUri: user.imageUri });
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.leftContainer}>
                <Avatar uri={user.imageUri} size={50} />
                <View style={styles.midContainer}>
                    <Text style={styles.recipientName}>{user.name}</Text>
                    <View style={styles.statusContainer}>
                        <Text ellipsizeMode={'tail'} numberOfLines={1} style={styles.status}>{user.status}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ChatListItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 15,
    },
    leftContainer: {
        flexDirection: 'row'
    },
    midContainer: {
        flexDirection: 'column',
        marginLeft: 10
    },
    recipientName: {
        fontSize: 16,
        fontWeight: '600',
        paddingBottom: 2
    },
    statusContainer: {
        flexDirection: 'row',
    },
    status: {
        fontSize: 14.5,
        color: '#828282',
        width: 200
    }
})
