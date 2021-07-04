import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { useRoute, useNavigation } from '@react-navigation/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export type SettingsMenuProps = {
    displaySettings: boolean;
    displayAddContact: boolean;
    chatRoomID: string;
}

const SettingsMenu = (props: SettingsMenuProps) => {

    const { displaySettings, displayAddContact, chatRoomID } = props;

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

    const handleAddContact = () => {
        handleDisplayMenu();

        if (chatRoomID === '') {
            return;
        }

        navigation.navigate('Contacts', { chatRoomID: chatRoomID });
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
                {displaySettings && <MenuItem onPress={handleNavigation}>Settings</MenuItem>}
                <MenuDivider />
                {displayAddContact && <MenuItem onPress={handleAddContact}>Add Contact to chat</MenuItem>}
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
