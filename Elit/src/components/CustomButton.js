import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { windowHeight } from '../utils/Dimensions'
import LinearGradient from 'react-native-linear-gradient'
import { ActivityIndicator } from 'react-native-paper'
const CustomButton = ({ buttonTitle, buttonTheme, buttonLoading, ...rest }) => {

    const buttonStyles = [
        buttonTheme === "normal" && styles.normalContainer,
        buttonTheme === "create" && styles.createContainer
    ]
    const buttonTextStyles = [
        buttonTheme === "normal" && styles.normalText,
        buttonTheme === "create" && styles.createText
    ]
    const colorLoading =
        buttonTheme === "normal" ? "#FFFFFF" :
            buttonTheme === "create" && "#1c2b37"
    return (
        <TouchableOpacity style={buttonStyles} {...rest}>
            <LinearGradient colors={['#08d4c4', '#33adff', '#2974FA']} style={styles.gradient}>
                {buttonLoading ? (
                    <ActivityIndicator size="small" color={colorLoading} />
                ) :
                    (
                        < Text style={buttonTextStyles}>{buttonTitle}</Text>
                    )}
            </LinearGradient>
        </TouchableOpacity >
    )
}

export default CustomButton

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        width: '100%',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: 'Lato-Regular',
    },
    normalContainer: {
        marginTop: 10,
        margin: 10,
        width: '100%',
        height: windowHeight / 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        elevation: 1
    },
    createContainer: {
        marginTop: 10,
        width: '100%',
        height: windowHeight / 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        elevation: 1
    },
    normalText: {
        fontSize: 18,
        color: '#ffffff',
        fontFamily: 'Rubik-Regular',
    },
    createText: {
        fontSize: 18,
        color: '#ffffff',
        fontFamily: 'Rubik-Regular',
    },
})