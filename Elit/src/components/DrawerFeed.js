import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme, Avatar, Title, Drawer, TouchableRipple, Switch } from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import * as constFunction from '../utils/const.functions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const DrawerFeed = (props) => {

    const [userInfo, setUserInfo] = useState({
        roleName: '',
        userName: '',
        picture: '',
    })

    useEffect(() => {
        getUserInfo()
    }, []);

    const getUserInfo = async () => {
        var data = await AsyncStorage.getItem('userinfo')
        var res = JSON.parse(data)
        setUserInfo({ roleName: res.roleName, userName: res.userName, picture: res.picture })
    }

    const logoutNow = () => {
        constFunction.storeDataToAsyncStorage('userinfo', null)
        props.navigation.navigate("Login")
    }

    const paperTheme = useTheme();

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} style={{ padding: 0 }}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Icon size={50} icon="account" />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>{userInfo.userName}</Title>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        {userInfo.roleName === 'BUYER' || userInfo.roleName === 'SRC_TMEMBER' ?
                            <>
                                <DrawerItem
                                    icon={({ color, size }) => (
                                        <Icon
                                            name="view-grid-outline"
                                            color={color}
                                            size={size}
                                        />
                                    )}
                                    label="Sourcing"
                                //onPress={() => { props.navigation.navigate('Profile') }}
                                />
                                <DrawerItem
                                    icon={({ color, size }) => (
                                        <Icon
                                            name="thumb-up-outline"
                                            color={color}
                                            size={size}
                                        />
                                    )}
                                    label="Approvals"
                                //onPress={() => { props.navigation.navigate('BookmarkScreen') }}
                                />
                                <DrawerItem
                                    icon={({ color, size }) => (
                                        <Icon
                                            name="chart-pie"
                                            color={color}
                                            size={size}
                                        />
                                    )}
                                    label="General"
                                //onPress={() => { props.navigation.navigate('SettingsScreen') }}
                                />
                                <DrawerItem
                                    icon={({ color, size }) => (
                                        <Icon
                                            name="bell-outline"
                                            color={color}
                                            size={size}
                                        />
                                    )}
                                    label="Notifications"
                                //onPress={() => { props.navigation.navigate('SupportScreen') }}
                                />
                            </>
                            : userInfo.roleName === 'SUP_USER' || userInfo.roleName === 'SUP_ADMIN' ?
                                <>
                                    <DrawerItem
                                        icon={({ color, size }) => (
                                            <Icon
                                                name="chart-pie"
                                                color={color}
                                                size={size}
                                            />
                                        )}
                                        label="Supplier"
                                    //onPress={() => { props.navigation.navigate('BookmarkScreen') }}
                                    />
                                    <DrawerItem
                                        icon={({ color, size }) => (
                                            <Icon
                                                name="view-grid-outline"
                                                color={color}
                                                size={size}
                                            />
                                        )}
                                        label="Sourcing"
                                    //onPress={() => { props.navigation.navigate('SettingsScreen') }}
                                    />
                                    <DrawerItem
                                        icon={({ color, size }) => (
                                            <Icon
                                                name="bell-outline"
                                                color={color}
                                                size={size}
                                            />
                                        )}
                                        label="Notifications"
                                    //onPress={() => { props.navigation.navigate('SupportScreen') }}
                                    />
                                </>
                                :
                                <>
                                    <DrawerItem
                                        icon={({ color, size }) => (
                                            <Icon
                                                name="chart-pie"
                                                color={color}
                                                size={size}
                                            />
                                        )}
                                        label="General"
                                    //onPress={() => { props.navigation.navigate('SettingsScreen') }}
                                    />
                                    <DrawerItem
                                        icon={({ color, size }) => (
                                            <Icon
                                                name="thumb-up-outline"
                                                color={color}
                                                size={size}
                                            />
                                        )}
                                        label="Approvals"
                                    //onPress={() => { props.navigation.navigate('BookmarkScreen') }}
                                    />
                                    <DrawerItem
                                        icon={({ color, size }) => (
                                            <Icon
                                                name="bell-outline"
                                                color={color}
                                                size={size}
                                            />
                                        )}
                                        label="Notifications"
                                    //onPress={() => { props.navigation.navigate('SupportScreen') }}
                                    />
                                </>
                        }

                    </Drawer.Section>
                    <Drawer.Section title="Preferences" style={{ marginLeft: 20 }}>
                        <TouchableRipple>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Logout"
                    onPress={() => logoutNow()}
                />
            </Drawer.Section>
        </View>

    );
}
export default DrawerFeed
const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 8,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
        marginLeft: 10
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
        marginLeft: 12
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});