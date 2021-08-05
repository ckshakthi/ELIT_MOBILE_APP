import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import LoginScreen from '../screens/general/Login'
import ForgetPassword from '../screens/general/ForgetPassword'
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ header: () => null }} />
            <Stack.Screen name="forget" component={ForgetPassword} options={{ header: () => null }} />
            <Stack.Screen name="dashboard" component={DrawerNavigator} options={{ header: () => null }} />
        </Stack.Navigator>
    )
}

export default StackNavigator