import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';


import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import CallsTab from '../screens/CallsTab';
import ChatsTab from '../screens/ChatsTab';
import ContactsTab from '../screens/ContactsTab';
import CameraTab from '../screens/CameraTab';
import { MainTabParamList, CameraTabParamList, CallsTabParamList, ChatsTabParamList, ContactsTabParamList } from '../types';


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
          height: 4,
        },
        style: {
          backgroundColor: Colors[colorScheme].tint,
        },
        labelStyle: {
          fontWeight: 'bold'
        },
        showIcon: true,
      }}
    >
      <MainTab.Screen
        name="Camera"
        component={CameraTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons
            name="camera"
            size={24}
            color={color}
            style={[]}
          />,
          tabBarLabel: () => null,
        }}
      />
      <MainTab.Screen name="Chats" component={ChatsTabNavigator} />
      <MainTab.Screen name="Calls" component={CallsTabNavigator} />
      {/* <MainTab.Screen name="Contacts" component={ContactsTabNavigator} /> */}
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
const CameraTabStack = createStackNavigator<CameraTabParamList>();

function CameraTabNavigator() {
  return (
    <CameraTabStack.Navigator>
      <CameraTabStack.Screen
        name="CameraTab"
        component={CameraTab}
        options={{
          headerShown: false,
        }}
      />
    </CameraTabStack.Navigator>
  );
}

const CallsTabStack = createStackNavigator<CallsTabParamList>();

function CallsTabNavigator() {
  return (
    <CallsTabStack.Navigator>
      <CallsTabStack.Screen
        name="CallsTab"
        component={CallsTab}
        options={{
          headerShown: false,
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
        name="ChatsTab"
        component={ChatsTab}
        options={{
          headerShown: false,
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
        name="ContactsTab"
        component={ContactsTab}
        options={{
          headerShown: false,
        }}
      />
    </ContactsTabStack.Navigator>
  );
}