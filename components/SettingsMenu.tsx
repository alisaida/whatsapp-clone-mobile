import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { useRoute, useNavigation } from '@react-navigation/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import ProfileScreen from '../screens/SettingsScreen'

const SettingsMenu = () => {

    const [menuRef, setMenuRef] = useState(null);
    const [displayMenu, setDisplayMenu] = useState(false);
    const navigation = useNavigation();

    const handleDisplayMenu = () => {
        setDisplayMenu(!displayMenu);
        if (displayMenu) {
            menuRef.show();
        } else {
            menuRef.hide();
        }
    }

    const handleNavigation = () => {
        handleDisplayMenu();
        navigation.navigate('Settings');
    }

    //render() {
    return (
        <View style={styles.menu}>
            <Menu
                ref={ref => { setMenuRef(ref); }}
                button={
                    <MaterialCommunityIcons onPress={handleDisplayMenu} name="dots-vertical" size={24} color="white" />
                }
            >
                {<MenuItem onPress={handleNavigation}>Settings</MenuItem>}
                {/* <MenuDivider /> */}
            </Menu>
        </View >
    );
    //} 
}

export default SettingsMenu;

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
