import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native'

import { Auth, graphqlOperation, API } from 'aws-amplify';
import { getUser } from '../src/graphql/queries';

import { User } from '../types';

const SettingsScreen = () => {

    const [user, setUser] = useState({
        name: '',
        username: '',
        imageUri: 'https://example.com', //placeHolder
        status: ''
    });

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const currentUser = await Auth.currentAuthenticatedUser();
            if (currentUser) {
                const backEndUser = await API.graphql(graphqlOperation(getUser, { id: currentUser.attributes.sub }));
                const user = backEndUser.data.getUser;

                if (user) {
                    setUser(user);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (

        <>

            {user &&
                <View style={styles.userContainer}>
                    <View style={styles.containerLeft}>
                        <Image source={{ uri: user.imageUri }} style={styles.profilePicture} />
                        <Text style={styles.username}>{user.username}</Text>
                    </View>
                    <View style={styles.containerRight}>
                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.status}>{user.status}</Text>
                    </View>

                </View>}
            <View style={{ marginTop: 20 }}>
                <Button title="Sign Out" onPress={() => Auth.signOut()} />
            </View>
        </>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({

    profilePicture: {
        width: 75,
        height: 75,
        borderRadius: 50,
    },
    userContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 10,
    },
    containerLeft: {
        alignItems: 'center'
    },
    containerRight: {
        marginTop: 10,
        marginLeft: 10
    },
    username: {
        marginTop: 5,
        color: '#007bff'
    },
    name: {
        fontSize: 27
    },
    status: {
        fontSize: 15
    }

})
