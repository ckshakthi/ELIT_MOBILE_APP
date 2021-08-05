import constVariable from './const.variables';
import libphonenumber from 'google-libphonenumber';
import ApiProvider from '../services/ApiProvider.js';
import validator from 'validator';

    const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    export const allowSupLineSelectionFlag = (flag, lineList) => {
        var returnVal = true
        if (flag === "N") {
            var allowLineRespond = true
            for (var i = 0; i < lineList.length; i++) {
                if (lineList[i].PRICE === "" || lineList[i].PRICE === null) {
                    allowLineRespond = false
                }
            }
            if (!allowLineRespond) {
                alert("error", constVariable.MESSAGES_SCREEN.REQUIRED_ALL_LINES)
                returnVal = false
            }
        } else {
            var allowLineRespondMin = false
            for (var j = 0; j < lineList.length; j++) {
                if (lineList[j].PRICE !== "" && lineList[j].PRICE !== null) {
                    allowLineRespondMin = true
                }
            }
            if (!allowLineRespondMin) {
                alert("error", constVariable.MESSAGES_SCREEN.MINIMUM_ONE_LINE)
                returnVal = false
            }
        }
        return returnVal
    }
    export const isValidPhoneNumber = (text, country) => {
        try {
            const phone = phoneUtil.parse(text, country);
            return phoneUtil.isValidNumber(phone)
        } catch (error) {
            return true
        }

    }
    export const isValidEmailAddress = (text) => {
        return validator.isEmail(text)
    }
    export const isValidPOBox = (text) => {
        return /^[0-9]{5}$/.test(text)
    }
    export const isValidURL = (text) => {
        return /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/.test(text);
    }
    export const isValidAmountCharacter = (event) => {
        var validKeys = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 46, 101]
        return validKeys.includes(event.charCode)
    }
    export const isValidNumbers = (event) => {
        var validKeys = [46]
        return validKeys.includes(event.charCode)
    }
    export const isZero = (event) => {
        var validKeys = [48]
        return validKeys.includes(event.charCode)
    }
    export const isSpecialCharactor = (event) => {
        var validKeys = [96, 126, 33, 64, 35, 36, 37, 94, 38, 42, 40, 41, 45, 43, 34, 39, 91, 123, 125, 93, 63, 32, 95, 61, 44, 46, 60, 62, 124, 92, 47, 58, 59]
        return validKeys.includes(event.charCode)
    }
    export const isValidUserName = (text) => {
        if (isValidEmailAddress(text)) {
            return true
        } else {
            return /^(?![0-9]*$)[A-Za-z0-9_@./#&-]+$/.test(text)
        }
    }
    export const isExistData = (action, text) => {
        return new Promise((resolve, reject) => {
            var request = {}
            var result = {}
            if (action === "EMAIL_ADDRESS_REGISTER") {
                if (!isValidEmailAddress(text)) {
                    result.STATUS = "error"
                    result.ERROR_MESSAGE = "is Invalid"
                    result.ERROR = true
                    resolve(result)
                }
                request = {
                    "tableName": "[ELIT].[ATS_SUP_REGISTRATIONS]",
                    "fieldName": "EMAIL_ADDRESS",
                    "fieldValue": text
                }
            } else if (action === "EMAIL_ADDRESS_CONTACT") {
                if (!isValidEmailAddress(text)) {
                    result.STATUS = "error"
                    result.ERROR_MESSAGE = "is Invalid"
                    result.ERROR = true
                    resolve(result)
                }
                request = {
                    "tableName": "[ELIT].[ATS_SUP_CONTACTS]",
                    "fieldName": "EMAIL_ADDRESS",
                    "fieldValue": text
                }
            } else if (action === "EMAIL_ADDRESS_REFERENCE") {
                if (!isValidEmailAddress(text)) {
                    result.STATUS = "error"
                    result.ERROR_MESSAGE = "is Invalid"
                    result.ERROR = true
                    resolve(result)
                }
                request = {
                    "tableName": "[ELIT].[ATS_SUP_REFERENCES]",
                    "fieldName": "EMAIL_ADDRESS",
                    "fieldValue": text
                }
            } else if (action === "EMAIL_ADDRESS_SITE") {
                if (!isValidEmailAddress(text)) {
                    result.STATUS = "error"
                    result.ERROR_MESSAGE = "is Invalid"
                    result.ERROR = true
                    resolve(result)
                }
                request = {
                    "tableName": "[ELIT].[ATS_SUP_SUPPLIER_SITES]",
                    "fieldName": "EMAIL_ADDRESS",
                    "fieldValue": text
                }
            } else if (action === "EMAIL_ADDRESS_ACCOUNT") {
                if (!isValidEmailAddress(text)) {
                    result.STATUS = "error"
                    result.ERROR_MESSAGE = "is Invalid"
                    result.ERROR = true
                    resolve(result)
                }
                request = {
                    "tableName": "[ELIT].[ATS_SUP_BANK_ACCOUNTS]",
                    "fieldName": "CONTACT_EMAIL",
                    "fieldValue": text
                }
            }
            else if (action === " EMAIL_ADDRESS_USER") {
                if (!isValidEmailAddress(text)) {
                    result.STATUS = "error"
                    result.ERROR_MESSAGE = "is Invalid"
                    result.ERROR = true
                    resolve(result)
                }
                request = {
                    "tableName": "[ELIT].[ATS_ELIT_USER]",
                    "fieldName": "EMAIL_ADDRESS",
                    "fieldValue": text
                }
            }
            else if (action === "TAX_PAYER_ID") {
                request = {
                    "tableName": "[ELIT].[ATS_SUPPLIER_DETAILS]",
                    "fieldName": "TAX_PAYER_ID",
                    "fieldValue": text
                }
            }
            else if (action === "TAX_REGISTRATION_NUMBER") {
                request = {
                    "tableName": "[ELIT].[ATS_SUPPLIER_DETAILS]",
                    "fieldName": "TAX_REGISTRATION_NUMBER",
                    "fieldValue": text
                }
            }
            else if (action === "IBAN_NUMBER") {
                request = {
                    "tableName": "[ELIT].[ATS_SUP_BANK_ACCOUNTS]",
                    "fieldName": "IBAN",
                    "fieldValue": text
                }
            }
            else if (action === "DUNS_NUMBER") {
                request = {
                    "tableName": "[ELIT].[ATS_SUPPLIER_DETAILS]",
                    "fieldName": "DUNS_NUMBER",
                    "fieldValue": text
                }
            }
            else if (action === "BANK_ACCOUNT_NUMBER") {
                request = {
                    "tableName": "[ELIT].[ATS_SUP_BANK_ACCOUNTS]",
                    "fieldName": "BANK_ACCOUNT_NUM",
                    "fieldValue": text
                }
            }
            else if (action === "LICENSE_NUMBER") {
                request = {
                    "tableName": "[ELIT].[ATS_SUP_REGISTRATIONS]",
                    "fieldName": "TRADE_LICENSE_NUMBER",
                    "fieldValue": text
                }
            }
            else if (action === "USER_NAME") {
                request = {
                    "tableName": "[ELIT].[ATS_ELIT_USER]",
                    "fieldName": "USER_NAME",
                    "fieldValue": text
                }
            }
            else if (action === "MODULE_CODE") {
                request = {
                    "tableName": "[ELIT].[ATS_ELIT_PRIVILAGE_MODULE]",
                    "fieldName": "MODULE_CODE",
                    "fieldValue": text
                }
            }
            else if (action === "MODULE_NAME") {
                request = {
                    "tableName": "[ELIT].[ATS_ELIT_PRIVILAGE_MODULE]",
                    "fieldName": "MODULE_NAME",
                    "fieldValue": text
                }
            }
            else if (action === "PAGE_ORDER") {
                request = {
                    "tableName": "[ELIT].[ATS_ELIT_PRIVILAGE_PAGE]",
                    "fieldName": "PAGE_ORDER",
                    "fieldValue": text
                }
            }
            else if (action === "PAGE_NAME") {
                request = {
                    "tableName": "[ELIT].[ATS_ELIT_PRIVILAGE_PAGE]",
                    "fieldName": "PAGE_NAME",
                    "fieldValue": text
                }
            }
            else if (action === "ACTION_CODE") {
                request = {
                    "tableName": "[ELIT].[ATS_ELIT_PRIVILAGE_ACTION]",
                    "fieldName": "ACTION_CODE",
                    "fieldValue": text
                }
            }
            else if (action === "ROLE_CODE") {
                request = {
                    "tableName": "[ELIT].[ATS_ELIT_ROLE]",
                    "fieldName": "ROLE_CODE",
                    "fieldValue": text
                }
            }
            else if (action === "ROLE_NAME") {
                request = {
                    "tableName": "[ELIT].[ATS_ELIT_ROLE]",
                    "fieldName": "ROLE_NAME",
                    "fieldValue": text
                }
            }
            else if (action === "MENU_CODE") {
                request = {
                    "tableName": "[ELIT].[ATS_ELIT_PRIVILAGE_MENU]",
                    "fieldName": "MENU_CODE",
                    "fieldValue": text
                }
            }
            else if (action === "ROLE_ID") {
                request = {
                    "tableName": "[ELIT].[ATS_ELIT_USER]",
                    "fieldName": "ROLE_ID",
                    "fieldValue": text
                }
            }
            else if (action === "COLUMN_REF_CODE") {
                request = {
                    "tableName": "[ELIT].[ATS_ELIT_COLUMN_REFERENCE]",
                    "fieldName": "COLUMN_REF_CODE",
                    "fieldValue": text
                }
            }
            else if (action === "COLUMN_REF_NAME") {
                request = {
                    "tableName": "[ELIT].[ATS_ELIT_COLUMN_REFERENCE]",
                    "fieldName": "COLUMN_REF_NAME",
                    "fieldValue": text
                }
            }
            ApiProvider.post("utility/check/duplicate", request).then(res => {
                if (res.DML_RETURN > 0) {
                    result.STATUS = "error"
                    result.ERROR_MESSAGE = " is already taken."
                    result.ERROR = true
                } else {
                    result.STATUS = "success"
                    result.ERROR_MESSAGE = ""
                    result.ERROR = false
                }
                resolve(result)
            })
        })
    }
