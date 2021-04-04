import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import moment from 'moment'

export type dateProp = {
    date: String
}

const ChatMessageDateHeader = (props: dateProp) => {

    const { date } = props;

    return (
        <View style={styles.container}>
            <Text>{date}</Text>
        </View>
    )
}

export default ChatMessageDateHeader

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        backgroundColor: '#fae49d',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        margin: 5,

    },
})
