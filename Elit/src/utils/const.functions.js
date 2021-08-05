import React from 'react'
import { RSA } from 'react-native-rsa-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ApiProvider from '../services/ApiProvider'
import ApiList from './const.apis'
import { isValidPOBox, isValidPhoneNumber, isValidEmailAddress, isValidUserName, isValidURL } from './const.validation'

// Encypt the user text 
export const encryptText = (text) => {
    return new Promise((resolve, reject) => {
        const ENCRYPTION_PUBLIC_KEY = '-----BEGIN PUBLIC KEY-----\n' +
            'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvSQNJd/L6tSgxVUs/9O8\n' +
            'o7Q0ZAbrx+ZiN1l6y2SnZVULZQUbHsp1yjQMS8YYsRZOep9KtfKGFmcOvcOH0ynl\n' +
            'RlcC21BAHXSoC5fKD9Il251x7Kaxl2QIxBURxiLDDY/pIijAc+uDIgEghKbAYMp3\n' +
            'xuEqogeb6FSe6jEkt/i0o696E/iMdT3E1pu6om7TJG/l77OzqWg1InoLGNA86tYN\n' +
            'Asqu2YH6J9XHuKazBHdvtd16Fj408gQRM0U0tgVRyUejvnpUmAYqWcKEnVqICl+o\n' +
            'vdkmNm3HTjWy/RW4O3tkN4RDQmhtpRVzF5lcZ6fMIi1AiJpl36jnuUM6jeeRljhT\n' +
            'OQIDAQAB\n' +
            '-----END PUBLIC KEY-----';
        RSA.encrypt(text, ENCRYPTION_PUBLIC_KEY).then(encodedMessage => {
            resolve(encodedMessage)
        });
    })
}
// storing the data to the AsyncStore
export const storeDataToAsyncStorage = async (key, value) => {
    try {
        const data = JSON.stringify(value)
        await AsyncStorage.setItem(key, data);
        // AsyncStorage.clear();
    } catch (error) {
        console.warn("Data setting to Async storage is failed" + error)
    }
};
// get the data from  AsyncStore
export const getDataFromAsyncStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value)
        }
    } catch (error) {
        console.warn("Data retrieve from Async storage is failed" + error)
    }
};
// Get the token from dB to select the database.
export const initialSetup = async () => {
    var request = {
        ApplicationUrl: "http://149.202.70.54:4001/"
    }
    ApiProvider.auth(ApiList.API_URL_FOR_INIT, request).then(res => {
        if (res.length > 0) {
            var token = {
                S: res[0].ENCRYPTED_SQL_TOKEN,
                E: res[0].ENCRYPTED_ERP_TOKEN,
                L: "http://localhost:5002/"
            }
            storeDataToAsyncStorage('TOKEN', token)
        }
    })
}

export const getReqConfig = async () => {
    return {
        browserName: "",
        browserVersion: "",
        osName: "",
        osVersion: "",
        deviceType: "",
        ip: "0.0.0.0.0"
    }
}
// Authentication token 
export const getAuthToken = async (url, body) => {
    try {
        const Token = await AsyncStorage.getItem('TOKEN')
        const User = await AsyncStorage.getItem('userinfo')
        var token = JSON.parse(Token)
        var userInfo = JSON.parse(User)
        if (token !== undefined && token !== null) {
            var authToken = ""
            if (token.S !== null) {
                authToken = token.S
            }
            if (token.E !== null) {
                authToken = authToken + "CONN"
                authToken = authToken + token.E
            }
            // if (userInfo !== null) {
            //     authToken = authToken + "ELIT"
            //     authToken = authToken + userInfo.token
            // } 
            // else {
                if (ApiList.API_URL_FOR_LOGIN === url) {
                    authToken = authToken + "ELIT"
                    authToken = authToken + body
                }
            // }
            console.log(authToken)
            return authToken

        } else {
            return null
        }
    } catch (e) {
        console.warn(e)
    }
}
export const getStatusCode = (json) => {
    return json.header['statusCode'];
}
export const getBody = (json) => {
    return json.body
}
export const getStatusMessage = (json) => {
    return new Promise((resolve, reject) => {
        var statusJson = JSON.parse(localStorage.getItem("status"))
        var message = "Message not found!"
        for (var i = 0; i < statusJson.length; i++) {
            if (statusJson[i].STATUSCODE === json.header.statusCode) {
                message = statusJson[i].MESSAGE
            }
        }
        resolve(message);
    })
}
export const getWebText = async (valueType) => {
    getDataFromAsyncStorage("lang").then(res => {
        var lang = res === null ? "EN" : res
        if (lang === "EN") {
            return en[valueType]
        } else if (lang === "AR-AE") {
            return ar[valueType]
        }
    })
}
export const getFieldError = (stateName, stateKey) => {
    var fieldList = stateName === "fields" ? stateName : stateName + "_mandatory"
    for (var i = 0; i < fieldList.length; i++) {
        if (fieldList[i].key === stateKey) {
            fieldList[i].error = false
            if (fieldList[i].errorMessage !== undefined) {
                fieldList[i].errorMessage = ""
            }
            if (fieldList[i].status !== undefined) {
                fieldList[i].status = ""
            }
        }
    }
    return fieldList
}
export const getFieldValidateDirect = (type) => {
    var fieldList = type
    var errorFound = false
    for (var i = 0; i < fieldList.length; i++) {
        if (fieldList[i].mandatory) {
            if (fieldList[i].error) {
                errorFound = true
            } else {
                if (fieldList[i].value === "" || fieldList[i].value === null) {
                    fieldList[i].error = true
                    errorFound = true
                } else {
                    fieldList[i].error = false
                }
            }
        }
        if (fieldList[i].value !== "" && fieldList[i].value !== null && !fieldList[i].error) {
            var valueValidate = false
            if (fieldList[i].type === "poBox") {
                valueValidate = !constValidation.isValidPOBox(fieldList[i].value)
            }
            if (fieldList[i].type === "phoneNumber") {
                valueValidate = !constValidation.isValidPhoneNumber(fieldList[i].value, fieldList[i].country)
            }
            if (fieldList[i].type === "email") {
                valueValidate = !constValidation.isValidEmailAddress(fieldList[i].value)
            }
            if (fieldList[i].type === "url") {
                valueValidate = !constValidation.isValidURL(fieldList[i].value)
            }
            if (fieldList[i].type === "userName") {
                valueValidate = !constValidation.isValidUserName(fieldList[i].value)
            }

            fieldList[i].error = valueValidate
            fieldList[i].errorMessage = valueValidate ? " is Invalid" : ""
            errorFound = valueValidate ? true : errorFound
        }

    }
    return {
        fieldList: fieldList,
        errorFound: errorFound,
    }
}
export const getDateOnlyToServer = (date) => {
    if (date !== null && date !== undefined) {

        var dateOnlyObj = date
        var date = dateOnlyObj.getDate()
        var month = dateOnlyObj.getMonth() + 1
        var year = dateOnlyObj.getFullYear()
        if (date <= 9) {
            date = "0" + date
        }
        if (month <= 9) {
            month = "0" + month
        }

        return `${year}-${month}-${date}`
    } else {
        return null
    }
}

export const isLogin = async () => {
    const User = await AsyncStorage.getItem('userinfo')
    var userInfo = JSON.parse(User)
    if (userInfo !== null && userInfo !== undefined) {
        if (userInfo.accessLeft !== 1) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}
// Session management time stamp detail
export const loginTimeDiff = async () => {
    const User = await AsyncStorage.getItem('userinfo')
    var userInfo = JSON.parse(User)
    if (userInfo !== null && userInfo !== undefined) {
        const today = new Date();
        const endDate = new Date(userInfo.loggedInTime);
        const days = parseInt((endDate - today) / (1000 * 60 * 60 * 24));
        const hours = parseInt(Math.abs(endDate - today) / (1000 * 60 * 60) % 24);
        const minutes = parseInt(Math.abs(endDate.getTime() - today.getTime()) / (1000 * 60) % 60);
        var seconds = parseInt(Math.abs(endDate.getTime() - today.getTime()) / (1000) % 60);
        if (endDate.getTime() === today.getTime()) {
            seconds = 2
        }
        return {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        }
    } else {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        }
    }
}

export const getWebTextGender = async () => {
    const lan = await AsyncStorage.getItem('lang')
    var result = JSON.parse(lan)
    var lang = result === null ? "EN" : result
    if (lang === "EN") {
        return [
            { title: "Select", value: "" },
            { title: "Mr.", value: "Mr." },
            { title: "Mrs.", value: "Mrs." },
            { title: "Miss.", value: "Miss." },
        ]
    } else if (lang === "AR-AE") {
        return [
            { title: this.getWebText("SELECT_TEXT"), value: "" },
            { title: this.getWebText("MR_TEXT"), value: "Mr." },
            { title: this.getWebText("MRS_TEXT"), value: "Mrs." },
            { title: this.getWebText("MISS_TEXT"), value: "Miss." },
        ]
    }
    else {
        return [
            { title: "Select", value: "" },
            { title: "Mr.", value: "Mr." },
            { title: "Mrs.", value: "Mrs." },
            { title: "Miss.", value: "Miss." },
        ]
    }
}


// export const setFieldListInfo = (key, value) => {
//     console.log('key',key,value)
//       var stateFields = data.fields
//       for(var i = 0; i < stateFields.length; i++){
//           if(stateFields[i].key === key){
//               if(stateFields[i].max !== undefined){
//                   if(!(value.length > stateFields[i].max)){
//                       stateFields[i].value = value
//                       stateFields[i].error = false
//                   }
//               }else{ 
//                   stateFields[i].value = value
//                   stateFields[i].error = false
//               }

//           }
//       }
//       setData({fields:stateFields})

//       // if(value.length < 2)
//       // constFunction.getFieldError(this.state, "fields", key)
//   }
export const getFieldListInfo = (state, which, stateName, key) => {
    var stateNameValue = state[stateName]
    if (which === "label") {
        for (var i = 0; i < stateNameValue.length; i++) {
            if (stateNameValue[i].key === key) {
                var mandatory = stateNameValue[i].mandatory === true ? "*" : ""
                return stateNameValue[i].title + mandatory
            }
        }
    } else if (which === "errorFlag") {
        for (var i = 0; i < stateNameValue.length; i++) {
            if (stateNameValue[i].key === key) {
                return stateNameValue[i].error
            }
        }
    } else if (which === "select") {
        for (var i = 0; i < stateNameValue.length; i++) {
            if (stateNameValue[i].key === key) {
                return stateNameValue[i].select
            }
        }
    }
}


export const getFieldListInfoIndex = (state, which, stateName, key) => {
    var stateNameValue = state[stateName]
    if(which === "label" ){
        var mandatory =  stateNameValue[key].mandatory === true ? "*" : ""
        return stateNameValue[key].title + mandatory
    }else if(which ==="errorFlag"){
        return stateNameValue[key].error
    }else if(which === "select"){
        return stateNameValue[key].select
    }else if(which ==="invalidFlag"){
        return stateNameValue[key].invalid
    }else if(which === "clabel"){
        var mandatory =  stateNameValue[key].mandatory === true ? "*" : ""
        return mandatory + stateNameValue[key].title
    }
}
