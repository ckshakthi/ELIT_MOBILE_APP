import React,{ useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserInternal from './userInternal'
import UserExternal from './userExternal'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

const User = () =>  {
  return (
    <Tab.Navigator
      initialRouteName="userinternal"
      tabBarOptions={{
        activeTintColor: '#01ab9b',
        labelStyle: {
          fontSize: 16,
          margin: 0,
          padding: 0,
          color:'black'

        },
      }}
    >
      <Tab.Screen
        name="userinternal"
        component={UserInternal}
        options={{
          tabBarLabel: 'Internal User',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="house-user" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="userexternal"
        component={UserExternal}
        options={{
          tabBarLabel: 'External User',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-friends" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
}
export default User