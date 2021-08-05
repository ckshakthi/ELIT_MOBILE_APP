import React,{ useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MenuCreation from './menuCreation'
import MenuAssignment from './menuAssignment'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const Menu = () =>  {
  return (
    <Tab.Navigator
      initialRouteName="menucreation"
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
        name="menucreation"
        component={MenuCreation}
        options={{
          tabBarLabel: 'Menu Creation',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="menu" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="menuassignment"
        component={MenuAssignment}
        options={{
          tabBarLabel: 'Menu Assignment',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="menu" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
}


export default Menu

