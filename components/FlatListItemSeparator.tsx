import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const FlatListItemSeparator = () => {
    return (
        <View style={styles.line}></View>
    )
}

export default FlatListItemSeparator

const styles = StyleSheet.create({

    line: {
        height: 1,
        alignContent: 'center',
        backgroundColor: "#dbdbdb",
        marginLeft: 75,
        marginRight: 15
    }
})
