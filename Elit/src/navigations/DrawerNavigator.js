import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import Dashboard from '../screens/general/Dashboard'
import Profile from '../screens/supplier/profile/complete.profile.sceen'
import Register from '../screens/supplier/register/supplier.registe.form.screen'
import DrawerFeed from '../components/DrawerFeed'

const Drawer = createDrawerNavigator();

const DrawerNavigator = (props) => {
    return (
        <Drawer.Navigator
            drawerStyle={{
                backgroundColor: '#3C38B1',
            }}
            drawerContent={props => <DrawerFeed {...props} />}
        >
            <Drawer.Screen name="Dashboard" component={Dashboard} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator
