import React from 'react'
import { View, Text, StyleSheet, Image, Alert, StatusBar } from 'react-native'
import CustomButton from '../../../components/CustomButton'
import * as Animatable from 'react-native-animatable';
import { windowWidth, windowHeight } from '../../../utils/Dimensions'


const SupplierRegistrationSuccess = ({ navigation }) => {

    const emailValidationToast = () => {
        Alert.alert(
            'Success',
            'Email Verified Successfully!!',
            [
                { text: 'OK', onPress: () => navigation.navigate("SupplierProfile") },
            ]
        )
    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#01ab9b" barStyle="light-contant" />
            <View style={styles.header}>
                <Image
                    source={require('../../../assets/images/logo/logo.png')}
                    style={styles.logo}
                />
            </View>
            <Animatable.View animation="fadeInDownBig" >
                <View style={{ padding: 5, marginBottom: 120 }}>
                    <Image
                        source={require('../../../assets/images/email.jpg')}
                        style={styles.email}
                    />
                    <Text></Text>
                    <Text style={styles.text}>We emailed a confirmation link to your Email</Text>
                    <Text style={styles.text}>Check your for the link to verify your Account</Text>
                    <Text></Text>
                    <CustomButton
                        buttonTitle="VERIFY EMAIL"
                        buttonTheme="normal"
                        buttonLoading={false}
                        style={styles.btn}
                        onPress={() => {
                            emailValidationToast();
                        }}
                    />
                </View>
            </Animatable.View>
        </View>
    )
}

export default SupplierRegistrationSuccess

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flex: 2,
        height: windowHeight * 0.28,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    logo: {
        height: windowHeight * 0.2,
        width: windowWidth * 0.8,
        resizeMode: 'stretch',
        marginBottom: 30,
        marginLeft: 10,
    },
    text: {
        margin: 8,
        marginLeft: 7,
        marginTop: 3,
        marginBottom: 3,
        fontSize: 18,
        fontWeight: 'bold',
    },
    btn: {
        marginLeft: 100,
        width: '40%',
        height: windowHeight * 0.08,
        padding: 10,
    },
    email: {
        height: 140,
        width: 140,
        resizeMode: 'stretch',
        marginBottom: 10,
        marginLeft: 120,
        justifyContent: 'center',
    },
})
