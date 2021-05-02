import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native'

import { Auth } from 'aws-amplify';

const SettingsScreen = () => {
    return (
        <SafeAreaView>
            <Text>HelloWorld</Text>
            <Button title="Sign Out" onPress={() => Auth.signOut()} />
        </SafeAreaView>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({})
