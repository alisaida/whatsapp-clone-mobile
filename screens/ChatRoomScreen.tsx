import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
// import { ChatRoom } from '../types'

import wallpaper from '../assets/images/wallpaper.png'

const ChatRoom = () => {

    const route = useRoute();

    // console.log(route.params);

    return (
        <ImageBackground source={wallpaper} style={styles.container}>
            <SafeAreaView >
                <View>
                    <Text>Hello</Text>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default ChatRoom

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,

    }
})
