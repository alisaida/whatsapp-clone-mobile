import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../constants/Colors';
import MainTabNavigator from './MainTabNavigator';
import { RootStackParamList } from '../types';
import { Octicons, MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import ContactsTab from '../screens/ContactsTab';
import SettingsScreen from '../screens/SettingsScreen'
import Avatar from '../components/Avatar';

import { Auth } from 'aws-amplify';

import SettingsMenu from '../components/SettingsMenu'

const Stack = createStackNavigator<RootStackParamList>();

const signOut = async () => {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error)
    }
}

const RootNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerTitleAlign: 'left',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerStyle: {
                backgroundColor: Colors.light.tint,
                shadowOpacity: 0,
                elevation: 0
            },
            headerTintColor: Colors.light.background,

        }}>
            <Stack.Screen
                name="Root"
                component={MainTabNavigator}
                options={{
                    title: "WhatsApp",
                    headerRight: () => (
                        <View style={styles.headerRight}>
                            <Octicons name="search" size={18} color="white" />
                            <SettingsMenu />
                        </View>
                    ),
                    // headerShown: false,

                }}
            />
            <Stack.Screen
                name="ChatRoomScreen" component={ChatRoomScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <View style={styles.chatRoomTitleContainer}>
                            <Text style={styles.chatRoomTitle}>{route.params.name}</Text>
                        </View>
                    ),
                    headerLeft: () => (
                        <View style={styles.chatRoomHeaderLeft}>
                            <TouchableOpacity onPress={
                                () => {
                                    navigation.navigate('ChatsTab');
                                }
                            }>
                                <Feather name="chevron-left" size={34} color="white" />
                            </TouchableOpacity>
                            <Avatar uri={route.params.imageUri} size={40} />
                        </View>
                    ),
                    headerRight: () => (
                        <View style={styles.chatRoomRight}>
                            <Ionicons name="videocam-outline" size={24} color="white" style={{ marginHorizontal: 5 }} />
                            <Ionicons name="call-outline" size={24} color="white" style={{ marginHorizontal: 5 }} />
                        </View>
                    )
                })}

            />
            <Stack.Screen name="Contacts" component={ContactsTab} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            {/* <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} /> */}
        </Stack.Navigator>
    );
}

export default RootNavigator

const styles = StyleSheet.create({
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 55,
        marginRight: 10
    },
    chatRoomHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    chatRoomTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    chatRoomTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 10
    },
    chatRoomRight: {
        marginBottom: 10,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
