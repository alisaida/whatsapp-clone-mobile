import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const NewChatIcon = () => {

    const navigation = useNavigation();

    const handleOnPress = () => {
        navigation.navigate('Contacts');
    }

    return (
        <TouchableOpacity style={styles.icon} onPress={handleOnPress}>
            <MaterialCommunityIcons name="android-messages" size={27} color="white" />
        </TouchableOpacity>
    );
}

export default NewChatIcon;

const styles = StyleSheet.create({
    icon: {
        backgroundColor: '#25D366',
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 20,
        bottom: 20,
        borderRadius: 50,
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
    }
});