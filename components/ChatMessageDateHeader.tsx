import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
        backgroundColor: '#cfdafa',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        margin: 5,
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,

    },
})
