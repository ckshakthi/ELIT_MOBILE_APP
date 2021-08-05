import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Collapsible from 'react-native-collapsible'
import MaterialIon from 'react-native-vector-icons/MaterialIcons'


const Accordion = (props) => {
    const [collapsed, setcollapsed] = useState(false)
    const { title, children } = props
    const { header, headerText, content, collapsing } = styles
    const toggleExpanded = () => {
        setcollapsed(!collapsed)
    }
    return (
        <View>
            <TouchableOpacity onPress={toggleExpanded}>
                <View style={header}>
                    <Text style={headerText}>{title}</Text>
                    {collapsed ?
                        <MaterialIon
                            name='keyboard-arrow-down'
                            color='#FFF'
                            size={25}
                            style={styles.icon}
                        />
                        :
                        <MaterialIon
                            name='keyboard-arrow-up'
                            color='#FFF'
                            size={25}
                            style={styles.icon}
                        />
                    }
                </View>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed} align="center">
                <View style={content}>
                    {children}
                </View>
            </Collapsible>
        </View>
    );
}

export default Accordion

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#404040',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icon: {
        textAlign: 'right',
        padding: 10
    },
    headerText: {
        textAlign: 'left',
        fontSize: 16,
        padding: 10,
        color: 'white',
        fontWeight: '500',
    },
    content: {
        paddingTop: 10,
        paddingLeft: 10,
        backgroundColor: '#FFF',

    },
    collapsing: {
        borderBottomWidth: 1,
        borderBottomColor: '#262626'
    }
})