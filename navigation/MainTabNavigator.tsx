import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';


import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import CallsTabScreen from '../screens/CallsTabScreen';
import ChatsTabScreen from '../screens/ChatsTabScreen';
import ContactsTabScreen from '../screens/ContactsTabScreen';
import { MainTabParamList, CallsTabParamList, ChatsTabParamList, ContactsTabParamList } from '../types';

const MainTab = createMaterialTopTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <MainTab.Navigator
      initialRouteName="Chats"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].background,
        indicatorStyle: {
          backgroundColor: Colors[colorScheme].background,
          height: 4
        },
        style: {
          backgroundColor: Colors[colorScheme].tint,
        },
        labelStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <MainTab.Screen name="Calls" component={CallsTabNavigator} />
      <MainTab.Screen name="Chats" component={ChatsTabNavigator} />
      <MainTab.Screen name="Contacts" component={ContactsTabNavigator} />
    </MainTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const CallsTabStack = createStackNavigator<CallsTabParamList>();

function CallsTabNavigator() {
  return (
    <CallsTabStack.Navigator>
      <CallsTabStack.Screen
        name="CallsTabScreen"
        component={CallsTabScreen}
        options={{
          headerShown: false,
          headerTitle: 'Tab One Title'
        }}
      />
    </CallsTabStack.Navigator>
  );
}

const ChatsTabStack = createStackNavigator<ChatsTabParamList>();

function ChatsTabNavigator() {
  return (
    <ChatsTabStack.Navigator>
      <ChatsTabStack.Screen
        name="ChatsTabScreen"
        component={ChatsTabScreen}
        options={{
          headerShown: false,
          headerTitle: 'Tab Two Title'
        }}
      />
    </ChatsTabStack.Navigator>
  );
}

const ContactsTabStack = createStackNavigator<ContactsTabParamList>();

function ContactsTabNavigator() {
  return (
    <ContactsTabStack.Navigator>
      <ContactsTabStack.Screen
        name="ContactsTabScreen"
        component={ContactsTabScreen}
        options={{
          headerShown: false,
          headerTitle: 'Tab Three Title'
        }}
      />
    </ContactsTabStack.Navigator>
  );
}

