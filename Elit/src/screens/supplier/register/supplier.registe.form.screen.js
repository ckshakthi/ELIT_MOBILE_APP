import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native'
import Accordion from '../../../components/Accordion'
import DocumentPicker from 'react-native-document-picker'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CustomInput from '../../../components/CustomInput'
import CustomButton from '../../../components/CustomButton'
import constVariables from '../../../utils/const.variables'
import { getFieldError, getFieldValidateDirect, getDateOnlyToServer } from '../../../utils/const.functions'
import constVariable from '../../../utils/const.variables'


const SupplierRegistration = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' }
  ]);
  const [data, setData] = useState({
    fields: [
      { title: "COMPANY_NAME_TEXT", key: "companyName", error: false, mandatory: true, value: "", loading: false, errorMessage: "", inputDisabled: false, status: "" }, //0
      { title: "LICENSE_NUMBER", key: "licenseNumber", error: false, mandatory: true, value: "", inputDisabled: false, errorMessage: "", loading: false, status: "", max: 16 }, //1
      { title: "ESTABLISH_DATE_TEXT", key: "establishmentDate", error: false, errorMessage: "", mandatory: true, value: null, inputDisabled: false }, // 2
      { title: "ISSUE_DATE_TEXT", key: "issueDate", error: false, errorMessage: "", mandatory: true, value: null, inputDisabled: false }, // 3
      { title: "EXPIRY_DATE_TEXT", key: "expiryDate", error: false, mandatory: false, value: null, inputDisabled: false },// 4
      { title: "UPLOAD_LICENSE" + "*", key: "uploadLicense", error: false, mandatory: false, value: "", inputDisabled: false },//5
      { title: "TITLE_TEXT", key: "title", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //6
      { title: "FIRST_NAME_TEXT", key: "firstName", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //7
      { title: "MIDDLE_NAME_TEXT", key: "middleName", error: false, mandatory: false, value: "", inputDisabled: false }, //8
      { title: "LAST_NAME_TEXT", key: "lastName", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //9
      { title: "EMAIL_ADDRESS_TEXT", key: "email", error: false, errorMessage: "", mandatory: true, value: "", errorMessage: "", loading: false, inputDisabled: false, status: "", type: "email" }, //10
      { title: "PHONE_NUMBER_TEXT", key: "phoneNumber", error: false, errorMessage: "", mandatory: true, value: "", errorMessage: "", type: "phoneNumber", inputDisabled: false, country: constVariables.CONFIGURATION.DEFAULT_COUNTRY_NAME }, //11
      { title: "ALT_PHONE_NUMBER_TEXT", key: "alternativeNumber", error: false, mandatory: false, value: "", errorMessage: "", type: "phoneNumber", inputDisabled: false, country: constVariables.CONFIGURATION.DEFAULT_COUNTRY_NAME }, //12
    ],
    // open: false,
    // value: null,
    // items: [{ label: 'Apple', value: 'apple' },
    // { label: 'Banana', value: 'banana' }],
    uploadedFile: '',
    loadingRegister: false,
    collapsed: true,
    lastUpdatedBy: 0,
    lastUpdateLogin: 0,
    createdBy: 0,
    supplierID: null,
    value: null,
    setValue: null,
    country: "in",
    countryCode: "+91",
  })
  const setFieldListInfo = (key, value) => {
    var stateFields = data.fields
    for (var i = 0; i < stateFields.length; i++) {
      if (stateFields[i].key === key) {

        if (stateFields[i].key === "companyName" && value.length > 80) {
          continue;
        }
        if (stateFields[i].key === "licenseNumber" && value.length > 10) {
          continue;
        }
        if (stateFields[i].key === "phoneNumber" && value.length > 10) {
          continue;
        }
        if (stateFields[i].key === "alternativeNumber" && value.length > 10) {
          continue;
        }
        stateFields[i].value = value
      }
    }
    setData({ fields: stateFields })
    getFieldError("fields", key)
  }
  const registerNow = () => {
    debugger;
    var fieldErrorReport = getFieldValidateDirect(data.fields)
    if (fieldErrorReport.errorFound) {
      setData({ fields: fieldErrorReport.fieldList })
      return
    }
    if (data.uploadedfile.length === 0) {
      alert("error", "Please upload License!")
      return
    }
    if (supplierID !== null) {
      callAttachment()
    } else {
      var request = {
        "supplierName": data.fields[0].value,
        "tradeLicenseNum": data.fields[1].value,
        "establishmentDate": data.fields[2].value !== null ? data.fields[2].value.getFullYear() : null,
        "issueDate": data.fields[3].value !== null ? getDateOnlyToServer(data.fields[3].value) : null,
        "expiryDate": data.fields[4].value !== null ? getDateOnlyToServer(data.fields[4].value) : null,
        "title": data.fields[6].value,
        "firstName": data.fields[7].value,
        "middleName": data.fields[8].value,
        "lastName": data.fields[9].value,
        "emailAddress": data.fields[10].value,
        "phoneNum": data.fields[11].value,
        "altPhoneNum": data.fields[12].value,
        "createdBy": data.createdBy,
        "lastUpdatedBy": data.lastUpdatedBy,
        "lastUpdateLogin": data.lastUpdateLogin,
        "action": "InsertOrUpdateSupplierRegistrations"
      }
      setData({ loadingRegister: true })
      ApiProvider.post(ApiList.API_URL_FOR_INSERT_UPDATE_DELETE_REGISTER, request).then(res => {
        setData({ supplierID: res.DML_ID })
        if (res.DML_STATUS === "S") {
          callAttachment()
          navigation.navigate("SupplierRegistrationSuccess");
        } else {
          setData({ loadingRegister: false })
          alert("error", res.DML_MESSAGE)
        }
      })
    }
  }

  const callAttachment = () => {
    var requestAttachment = {
      "fileName": data.uploadedFile.name,
      "fileType": data.uploadedFile.type,
      "fileSize": data.uploadedFile.size,
      "fileData": "",
      "filePath": "",
      "title": "License",
      "documentType": "FILE",
      "documentSubType": "",
      "documentCategory": "Trade License",
      "description": "License",
      "refTableName": "ATS_SUP_CERTIFICATES",
      "refTableID": data.supplierID,
      "parentRefTableID": data.supplierID,
      "valid": "Y",
      "active": "Y",
      "enabledFlag": "Y",
      "createdBy": data.createdBy,
      "lastUpdatedBy": data.lastUpdatedBy,
      "lastUpdateLogin": data.lastUpdateLogin,
      "erpDocumentCategory": "FromSupplier",
      "erpEntityName": "PO_VENDORS",
      "action": "InsertAttachments"
    }
    ApiProvider.post(ApiList.API_URL_FOR_INSERT_OF_ATTACHMENT, requestAttachment).then(resAttachment => {
      setData({ loadingRegister: false })
      alert(resAttachment.DML_STATUS === "S" ? "success" : "error", resAttachment.DML_MESSAGE)
      if (resAttachment.DML_STATUS === "S") {
        alert('Supplier Registration Successfull!!')
      } else {
        var stateFields = data.fields
        statedata.fields[0].inputDisabled = true
        stateFields[1].inputDisabled = true
        stateFields[2].inputDisabled = true
        stateFields[3].inputDisabled = true
        stateFields[4].inputDisabled = true
        stateFields[5].inputDisabled = true
        stateFields[6].inputDisabled = true
        stateFields[7].inputDisabled = true
        stateFields[8].inputDisabled = true
        stateFields[9].inputDisabled = true
        stateFields[10].inputDisabled = true
        stateFields[11].inputDisabled = true
        stateFields[12].inputDisabled = true
        setData({ fields: stateFields })
      }
    })
  }
  const clearAllFields = () => {
    var fields = data.fields
    for (var i = 0; i < fields.length; i++) {
      fields[i].value = ""
      fields[i].status = ""
      fields[i].error = ""
      if (fields[i].type === "phoneNumber") {
        fields[i].value = fields[i].countryCode
      }
    }
    setData({ fields: fields })
    setData({ uploadedFile: '' })
  }
  const selectOneFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
      setData({ uploadedFile: res });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled file upload');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Accordion title="Company info">
          <CustomInput
            Label='Company Name*'
            inputType="text"
            inputDefaultValue={data.fields[0].value}
            inputDisabled={data.fields[0].inputDisabled}
            onChangeText={(val) => { setFieldListInfo(data.fields[0].key, val.toUpperCase()) }}
            error={data.fields[0].error}
            errorMessage={data.fields[0].errorMessage}
            isLoading={data.fields[0].loading}

          />
          <CustomInput
            Label='License Number*'
            inputType="number"
            inputDefaultValue={data.fields[1].value}
            inputDisabled={data.fields[1].inputDisabled}
            onChangeText={(val) => { setFieldListInfo(data.fields[1].key, val) }}
            error={data.fields[1].error}
            errorMessage={data.fields[1].errorMessage}
            isLoading={data.fields[1].loading}
          />
          <CustomInput
            Label='Establishment Year*'
            inputType="text"
            inputDefaultValue={data.fields[2].value}
            inputDisabled={data.fields[2].inputDisabled}
            onChangeText={(val) => { setFieldListInfo(data.fields[2].key, val) }}
            error={data.fields[2].error}
            errorMessage={data.fields[2].errorMessage}
            isLoading={data.fields[2].loading}
          />
          <CustomInput
            Label='Issue Date*'
            inputType="DataPicker"
            inputDefaultValue={data.fields[3].value}
            inputDisabled={data.fields[3].inputDisabled}
            onChangeText={(val) => { setFieldListInfo(data.fields[3].key, val) }}
            error={data.fields[3].error}
            errorMessage={data.fields[3].errorMessage}
            isLoading={data.fields[3].loading}
          />
          <CustomInput
            Label='Expiry Date'
            inputType="DataPicker"
            inputDefaultValue={data.fields[4].value}
            inputDisabled={data.fields[4].inputDisabled}
            onChangeText={(val) => { setFieldListInfo(data.fields[4].key, val) }}
            error={data.fields[4].error}
            errorMessage={data.fields[4].errorMessage}
            isLoading={data.fields[4].loading}
          />
          <Text style={styles.lableTextStyle}>Upload License*</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={selectOneFile}>
            <View style={styles.fileUpload}>
              <Icon
                name='upload-file'
                size={30}
                color="#4F8EF7"
              />
              <Text style={styles.uploadFileText}>
                {data.uploadedFile ? data.uploadedFile.name : 'Click me to upload'}
              </Text>
            </View>
          </TouchableOpacity>
        </Accordion>
        <View style={{ padding: 5 }} />
        <Accordion title="Contact Information">
          <CustomInput
            Label='Title*'
            inputType="dropDown"
            inputDefaultValue={data.fields[6].value}
            inputDisabled={data.fields[6].inputDisabled}
            open={open}
            value={value}
            items={[{ label: 'Mr.', value: 'Mr.' },
            { label: 'Ms.', value: 'Ms.' },
            { label: 'Mrs.', value: 'Mrs.' }]}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            error={data.fields[6].error}
            errorMessage={data.fields[6].errorMessage}
            isLoading={data.fields[6].loading}
          />
          <CustomInput
            Label='First Name*'
            inputType="text"
            inputDefaultValue={data.fields[7].value}
            inputDisabled={data.fields[7].inputDisabled}
            onChangeText={(val) => { setFieldListInfo(data.fields[7].key, val) }}
            error={data.fields[7].error}
            errorMessage={data.fields[7].errorMessage}
            isLoading={data.fields[7].loading}
          />
          <CustomInput
            Label='Middle Name'
            inputType="text"
            inputDefaultValue={data.fields[8].value}
            inputDisabled={data.fields[8].inputDisabled}
            onChangeText={(val) => { setFieldListInfo(data.fields[8].key, val) }}
            error={data.fields[8].error}
            errorMessage={data.fields[8].errorMessage}
            isLoading={data.fields[8].loading}
          />
          <CustomInput
            Label='Last Name*'
            inputType="text"
            inputDefaultValue={data.fields[9].value}
            inputDisabled={data.fields[9].inputDisabled}
            onChangeText={(val) => { setFieldListInfo(data.fields[9].key, val) }}
            error={data.fields[9].error}
            errorMessage={data.fields[9].errorMessage}
            isLoading={data.fields[9].loading}
          />
          <CustomInput
            Label='Email Address*'
            inputType="text"
            inputKeyboardType='email-address'
            inputDefaultValue={data.fields[10].value}
            inputDisabled={data.fields[10].inputDisabled}
            onChangeText={(val) => { setFieldListInfo(data.fields[10].key, val) }}
            error={data.fields[10].error}
            errorMessage={data.fields[10].errorMessage}
            isLoading={data.fields[10].loading}
          />
          <CustomInput
            Label='Phone Number*'
            inputType="phoneNumber"
            countryName={constVariable.CONFIGURATION.DEFAULT_COUNTRY_NAME}
            inputDefaultValue={data.fields[11].value}
            inputDisabled={data.fields[11].inputDisabled}
            onChangeText={(val) => { setFieldListInfo(data.fields[11].key, val) }}
            error={data.fields[11].error}
            errorMessage={data.fields[11].errorMessage}
            isLoading={data.fields[11].loading}
          />
          <CustomInput
            Label='Alternative Number'
            inputType="phoneNumber"
            countryName={constVariable.CONFIGURATION.DEFAULT_COUNTRY_NAME}
            inputDefaultValue={data.fields[12].value}
            inputDisabled={data.fields[12].inputDisabled}
            onChangeText={(val) => { setFieldListInfo(data.fields[12].key, val) }}
            error={data.fields[12].error}
            errorMessage={data.fields[12].errorMessage}
            isLoading={data.fields[12].loading}
          />
          <View style={{ padding: 10 }} />
        </Accordion>
        <View style={styles.buttonStyle}>
          <CustomButton
            buttonTitle="SUBMIT"
            buttonTheme="create"
            style={styles.btn}
            buttonLoading={false}
            //onPress={() => registerNow()}
            onPress={() => navigation.navigate("SupplierRegistrationSuccess")}
          />
          <CustomButton
            buttonTitle="CLEAR"
            buttonTheme="create"
            style={styles.btn}
            buttonLoading={false}
            onPress={() => clearAllFields()}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default SupplierRegistration

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    padding: 10
  },
  header: {
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  fileUpload: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 15,
    marginBottom: 20,
    margin: 8,
    width: '92%',
    borderRadius: 8,
  },
  uploadFileText: {
    fontSize: 16,
    marginRight: 5,
    marginLeft: 10,
    color: '#1a1a1a'
  },
  buttonStyle: {
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btn: {
    width: 120,
    height: 60,
    padding: 10,
  },
  lableTextStyle: {
    color: '#05375a',
    padding: 5,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10
  },
})