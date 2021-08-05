import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, TouchableOpacity, Image } from 'react-native';
import * as constFunction from '../../utils/const.functions';
import ApiProvider from '../../services/ApiProvider';
import ApiList from '../../utils/const.apis';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useSelector, useDispatch } from 'react-redux';
import { setUserName, setPassword } from '../../redux/actions/action';
import { windowHeight, windowWidth } from '../../utils/Dimensions';

const LoginScreen = ({ navigation }) => {
    const { username, password } = useSelector(state => state.loginReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        constFunction.initialSetup();
    }, []);

    const actionLogin = async () => {

        if (username !== '' && password !== '') {
            var body = {
                username: username,
                password: password,
                language: 'US',
                from: 'mob'
            };
            //constFunction.encryptText(JSON.stringify(body)).then(data => {
            ApiProvider.auth(ApiList.API_URL_FOR_LOGIN, JSON.stringify(body)).then(res => {
                if (res.DML_STATUS === 'S') {
                    var userInfo = {
                        userId: res.USER_ID,
                        firstName: res.FULL_NAME,
                        lastName: '',
                        userName: username,
                        employeeID: res.EMPLOYEE_ID,
                        supplierID: res.SUPPLIER_ID,
                        ERP_SupplierID: res.ERP_SUPPLIER_ID,
                        ERP_UserId: res.ERP_USER_ID,
                        roleName: res.ROLE_CODE,
                        token: res.TOKEN,
                        refreshToken: res.REFRESH_TOKEN,
                        userType: res.USER_TYPE,
                        picture: res.IMAGE,
                        accessLeft: res.ACCESSES_LEFT,
                        loggedInTime: Date(),
                    };
                    constFunction.storeDataToAsyncStorage('userinfo', userInfo);
                    constFunction.storeDataToAsyncStorage('access', res.ACCESS);
                    if (res.ACCESSES_LEFT === 1) {
                        navigation.navigate('forget');
                    } else {
                        navigation.replace('dashboard');
                    }
                } else {
                    alert('Login Failed.');
                    alert(res.DML_MESSAGE);
                    navigation.navigate('Login');
                }
            });
            //});
        } else {
            alert('please provide credentials');
        }
    };
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#01ab9b" barStyle="light-contant" />
            <LinearGradient colors={['#08d4c4', '#33adff']} style={styles.header}>
                <Image
                    source={require('../../assets/images/logo/logo.png')}
                    style={styles.logo}
                />
                <Text style={styles.text_header}>Welcome to ELIT!👋</Text>
            </LinearGradient>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <View style={{ padding: 10, marginTop: 30 }}>
                    <CustomInput
                        Label="Username"
                        inputType="loginText"
                        inputIcon="user-o"
                        placeholderText="Username"
                        style={styles.textInput}
                        inputDefaultValue={username !== '' ? username : ''}
                        inputNumberOfLines={1}
                        inputAutoCapitalize="characters"
                        onChangeText={val => dispatch(setUserName(val))}
                    />
                    <CustomInput
                        Label="Password"
                        inputType="password"
                        inputIcon="lock"
                        placeholderText="Password"
                        style={styles.textInput}
                        inputDefaultValue={password !== '' ? password : ''}
                        secureTextEntry={true}
                        inputAutoCapitalize="none"
                        onChangeText={val => dispatch(setPassword(val))}
                    />
                </View>
                <View>
                    <CustomButton
                        buttonTitle="Login"
                        buttonTheme="normal"
                        buttonLoading={false}
                        style={styles.btn}
                        onPress={() => actionLogin()}
                    />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('forget')}
                        style={styles.navButton}>
                        <Text style={[styles.navText, { paddingLeft: 90 }]}>
                            Forget Password?
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('TermsAndConditions')}
                        style={styles.navButton}>
                        <Text style={styles.navText}>
                            Don't have Supplier Account? Create Here
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#33adff',
    },
    header: {
        flex: 1,
        height: windowHeight * 0.28,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 130,
        borderTopRightRadius: 0,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    logo: {
        height: windowHeight * 0.1,
        width: windowWidth * 0.6,
        resizeMode: 'stretch',
        marginBottom: 5,
        marginLeft: 40,
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 28,
        paddingBottom: 20,
        paddingLeft: 45,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    btn: {
        width: '100%',
        height: windowHeight * 0.1,
        padding: 10,
        marginTop: -15
    },
    navButton: {
        padding: 20,
    },
    navText: {
        fontSize: 15,
        color: '#05363a',
        fontWeight: 'bold',
    },
});
