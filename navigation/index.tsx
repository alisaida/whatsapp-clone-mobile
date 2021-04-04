import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Octicons, MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import MainTabNavigator from './MainTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

import Colors from '../constants/Colors'

import ChatRoomScreen from '../screens/ChatRoomScreen';
import Avatar from '../components/Avatar';


// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {

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
              <MaterialCommunityIcons name="dots-vertical" size={24} color="white" />
            </View>
          )
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
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

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