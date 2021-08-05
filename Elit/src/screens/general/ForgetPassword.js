import React, {useState} from 'react';
import {View, Image, Text, StyleSheet, StatusBar, Alert} from 'react-native';
import ApiList from '../../utils/const.apis';
import ApiProvider from '../../services/ApiProvider';
import * as Animatable from 'react-native-animatable';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {windowHeight, windowWidth} from '../../utils/Dimensions';

const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState();

  const forgetPasswordEnter = e => {
    if (e.keyCode === 13) {
      forgetPassword();
    }
  };
  const forgetPassword = async () => {
    if (email !== null && email !== undefined) {
      var body = {
        email: email,
      };
      ApiProvider.post(ApiList.API_URL_FOR_FORGOT_PASSWORD, body).then(res => {
        console.log('inside api call ');
        if (res.DML_STATUS === 'S') {
          Alert.alert('Success', 'Password reset link send to your mail !', [
            {text: 'OK', onPress: () => navigation.navigate('Login')},
          ]);
        } else {
          Alert.alert('Failed', res.DML_MESSAGE);
        }
      });
      setEmail('');
    } else {
      alert('please provide valid email!');
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#01ab9b" barStyle="light-contant" />
      {/* <LinearGradient colors={['#08d4c4', '#33adff']} style={styles.header}>
                <Image
                    source={require("../../assets/images/logo/logo.png")}
                    style={styles.logo}
                />
                <Text style={styles.text_header}>Forgot Password? 🔒</Text>
            </LinearGradient> */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/logo/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.text_header}>Forgot Password? 🔒</Text>
        <Text style={styles.text_sub_header}>
          Enter your email and we'll send you instructions to reset your
          password
        </Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <View style={{padding: 10, marginTop: 30}}>
          <CustomInput
            Label="Email Address"
            inputType="loginText"
            inputIcon="envelope-o"
            placeholderText="Email Address"
            style={styles.textInput}
            labelValue={email}
            onChangeText={userEmail => setEmail(userEmail)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <CustomButton
            buttonTitle="Send reset link"
            buttonTheme="normal"
            buttonLoading={false}
            style={styles.btn}
            onPress={() => {
              forgetPassword();
            }}
          />
        </View>
      </Animatable.View>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#33adff'
    backgroundColor: '#e6e6e6',
  },
  header: {
    flex: 3,
    height: windowHeight * 0.28,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  logo: {
    height: windowHeight * 0.2,
    width: windowWidth * 0.8,
    resizeMode: 'stretch',
    marginBottom: 5,
    marginLeft: 10,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 130,
    borderTopRightRadius: 0,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#262626',
    fontWeight: 'bold',
    fontSize: 27,
    paddingBottom: 20,
    paddingLeft: 20,
  },
  text_sub_header: {
    color: '#262626',
    fontWeight: '100',
    fontSize: 19,
    paddingBottom: 20,
    paddingLeft: 20,
  },
  btn: {
    width: '100%',
    height: windowHeight * 0.1,
    padding: 10,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});
