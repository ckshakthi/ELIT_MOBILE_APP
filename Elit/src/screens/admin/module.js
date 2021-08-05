import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity,TextInput,Alert  } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import constVariables from '../../utils/const.variables'
import * as constFunction from '../../utils/const.functions';
import TopNav from '../../components/Header';
import ApiList from '../../utils/const.apis';
import ApiProvider from '../../services/ApiProvider';

import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import IconShow from 'react-native-vector-icons/MaterialIcons';
import { useRef } from 'react';

const Module = () => {
    const scrollRef = useRef(); 
    const [data, setData] = useState({
        fields:[
            { title: "Module Code", key: "moduleCode", error:false,errorMessage: "",loading:false,inputDisabled:false, status:"", mandatory:true, value: "", max: 80},
            { title: "Module Name", key: "moduleName", error:false,errorMessage: "",loading:false,inputDisabled:false, status:"", mandatory:true, value: "", max: 80},
            { title: "Module Icon", key: "icon", error:false, mandatory:true, value: ""},
            { title: "Module Description", key: "description", error:false, mandatory:true, value: "", max: 1000}
        ],
        // createdBy: userInfo.userId,
        createdBy:'',
        tableHead: ['Module Code', 'Module Name', 'Description', 'Action'],
        tableData: [],
        list_data: [],
        loading_Save:false,
        actionID:null
    })
  const { container } = styles
  
  const element = (data, index) => (
    <View style={styles.iconContainer}>
            <IconShow name="edit" onPress={() => tableAction(data,'Edit')} style={styles.iconButton} size={20} color="#4F8EF7" />
            <IconShow name="delete" onPress={() => tableAction(data,'Delete')} style={styles.iconButton} size={20} color="#4F8EF7" />
    </View>
  );
//  const actionEdit = (id) => {
//     console.log('PRIVILAGE_MODULE_ID',id)
//     Alert.alert(`This is row ${id}`);
//   }


  useEffect(() => {
    getModuleList()
  },[]);


 
  const tableAction = (rowData, type) => {
    if(type === "Edit"){
        clearAllFields()
        var fields = data.fields
        fields[0].value = rowData.MODULE_CODE
        fields[1].value = rowData.MODULE_NAME
        fields[2].value = rowData.ICON
        fields[3].value = rowData.DESCRIPTION
        setData({...data,fields:fields, actionID: rowData.PRIVILAGE_MODULE_ID})
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });
    }else if(type === "Delete"){
        clearAllFields()
        var requestData = {
            "privilageModuleID":rowData.PRIVILAGE_MODULE_ID,
            "lastUpdatedBy": data.createdBy,
            "lastUpdateLogin": data.createdBy,
            "action":"DeleteModule"
        }
        // constFunction.showToast("info", "Deleting Module, Please wait!")
        ApiProvider.post(ApiList.API_URL_FOR_TRANSACTIONS_MODULES,requestData).then(res => {
            // constFunction.showToast(res.DML_STATUS === "S" ? "success" : "error", res.DML_MESSAGE)
            if(res.DML_STATUS === "S"){
                getModuleList()
            }
        })
    }
}

  const getModuleList = () => {
    ApiProvider.post(ApiList.API_URL_FOR_VIEW_ROLES_AND_PRIVILAGES, {}).then(res => {
        if(res.DML_STATUS !== "E"){
            // const rowData=[];
            // for (let i = 0; i < res.length; i += 1) {
            //     rowData.push([res[i]['MODULE_CODE'],res[i]['MODULE_NAME'],res[i]['DESCRIPTION'],res[i]['PRIVILAGE_MODULE_ID']]);
            // }
          setData({...data,tableData:res})
        }else{
            alert("error", res.DML_MESSAGE)
        }
    })
}

  const setFieldListInfo = (key, value) => {
        var stateFields = data.fields
        for(var i = 0; i < stateFields.length; i++){
            if(stateFields[i].key === key){
                if(stateFields[i].max !== undefined){
                    if(!(value.length > stateFields[i].max)){
                        stateFields[i].value = value
                        stateFields[i].error = false
                    }
                }else{ 
                    stateFields[i].value = value
                    stateFields[i].error = false
                }
               
            }
        }
        setData({...data,fields:stateFields})
        
        // if(value.length < 2)
        // constFunction.getFieldError(this.state, "fields", key)
    }

    const clearAllFields = () => {
        var fields = data.fields
        for(var i = 0; i < fields.length; i++){
            fields[i].value = ""
            fields[i].status = ""
            fields[i].error= false
        }
        setData({...data,fields:fields, actionID: null})
    }

    const saveOrUpdate = () =>{
        var fieldErrorReport = getFieldValidateDirect(data, "fields")
        if(fieldErrorReport.errorFound){
            setData({...data,fields: fieldErrorReport.fieldList})
            return
        }
        var requestData = {
            "moduleCode":data.fields[0].value,
            "moduleName":data.fields[1].value,
            "description":data.fields[3].value,
            "icon": data.fields[2].value,
            "createdBy": data.createdBy,
            "lastUpdatedBy": data.createdBy,
            "lastUpdateLogin": data.createdBy,
            "action":"InsertOrUpdateModule"
        }
        if(data.actionID !== null)
            requestData.privilageModuleID = data.actionID
 
         
        setData({...data,loading_Save:true})
        ApiProvider.post(ApiList.API_URL_FOR_TRANSACTIONS_MODULES, requestData).then(res => {
            // constFunction.showToast(res.DML_STATUS === "S" ? "success" : "error", res.DML_MESSAGE)
            alert(res.DML_STATUS === "S" ? "success" : "error", res.DML_MESSAGE)
            if(res.DML_STATUS === "S"){
                setData({...data,loading_Save:false})
                clearAllFields()
                getModuleList()
            }
        })
    }



    const getFieldValidateDirect = (state, type) => {
        var fieldList = state[type]
        var errorFound = false
        for(var i = 0; i < fieldList.length; i++){
            if(fieldList[i].mandatory){
                if(fieldList[i].error){
                    errorFound = true
                }else{
                    if(fieldList[i].value === "" || fieldList[i].value === null){
                        fieldList[i].error = true
                        errorFound = true
                    }else{
                        fieldList[i].error = false
                    }
                }
            }
            if(fieldList[i].value !== "" && fieldList[i].value !== null && !fieldList[i].error){
                var valueValidate = false
                if(fieldList[i].type === "poBox"){
                    // valueValidate = !constValidation.isValidPOBox(fieldList[i].value)
                }
                if(fieldList[i].type === "phoneNumber"){
                    // valueValidate = !constValidation.isValidPhoneNumber(fieldList[i].value,fieldList[i].country)
                }
                if(fieldList[i].type === "email"){
                    // valueValidate = !constValidation.isValidEmailAddress(fieldList[i].value)
                }
                if(fieldList[i].type === "url"){
                    // valueValidate = !constValidation.isValidURL(fieldList[i].value)
                }
                if(fieldList[i].type === "userName"){
                    // valueValidate = !constValidation.isValidUserName(fieldList[i].value)
                }
                
                fieldList[i].error = valueValidate
                fieldList[i].errorMessage = valueValidate ? " is Invalid" : ""
                errorFound = valueValidate ? true: errorFound
            }
         
        }
        return {
            fieldList:fieldList,
            errorFound:errorFound,
        }
    }


    // const getFieldListInfo = (state, which, stateName, key) => {
    //     var stateNameValue = state[stateName]
    //     if(which === "label"){
    //         for(var i = 0; i < stateNameValue.length; i++){
    //             if(stateNameValue[i].key === key){
    //                 var mandatory =  stateNameValue[i].mandatory === true ? "*" : ""
    //                 return stateNameValue[i].title + mandatory
    //             }
    //         }
    //     }else if(which ==="errorFlag"){
    //         for(var i = 0; i < stateNameValue.length; i++){
    //             if(stateNameValue[i].key === key){
    //                 return stateNameValue[i].error
    //             }
    //         }
    //     }else if(which === "select"){
    //         for(var i = 0; i < stateNameValue.length; i++){
    //             if(stateNameValue[i].key === key){
    //                 return stateNameValue[i].select
    //             }
    //         }
    //     }
    // }
    // console.log("tableData here",data.tableData)
  return (
    <View>
    <TopNav/>
      <ScrollView style={{ padding: 3 }} ref={scrollRef}>
          <Card>
              <Card.Title>Add New Module</Card.Title>
              
                <View style={{marginTop:'10%'}}>
                    <CustomInput
                        Label={ constFunction.getFieldListInfo(data,"label", "fields", "moduleCode") }
                        inputType="text"
                        inputDefaultValue={data.fields[0].value}
                        onChangeText={(e) => { setFieldListInfo(data.fields[0].key, e.toUpperCase()) }}
                        // onFocusLost={(e) => {
                        //     if(e !== null && e !== ""){
                        //         var fields = data.fields
                        //         fields[0].status = ""
                        //         fields[0].errorMessage = ""
                        //         fields[0].loading = true
                        //         setData({fields:fields})
                        //         // constValidation.isExistData("MODULE_CODE", e).then(result => {
                        //         //     fields[0].loading = false
                        //         //     fields[0].errorMessage = result.ERROR_MESSAGE
                        //         //     fields[0].status = result.STATUS
                        //         //     fields[0].error = result.ERROR
                        //         //     setData({fields:fields})
                        //         // })
                        //     }
                        // }}
                        error={constFunction.getFieldListInfo(data,"errorFlag", "fields", "moduleCode")}
                        errorMessage={data.fields[0].errorMessage}
                        isLoading={data.fields[0].loading}
                    />
                    <CustomInput
                        Label={ constFunction.getFieldListInfo(data,"label", "fields", "moduleName") }
                        inputType="text"
                        inputDefaultValue={data.fields[1].value}
                        onChangeText={(e) => { setFieldListInfo(data.fields[1].key, e.toUpperCase()) }}
                        error={constFunction.getFieldListInfo(data,"errorFlag", "fields", "moduleName")}
                        errorMessage={data.fields[1].errorMessage}
                        isLoading={data.fields[1].loading}
                    />
                    <CustomInput
                        Label={ constFunction.getFieldListInfo(data,"label", "fields", "icon") }
                        inputType="text"
                        inputDefaultValue={data.fields[2].value}
                        onChangeText={(e) => { setFieldListInfo(data.fields[2].key, e.toUpperCase()) }}
                        error={constFunction.getFieldListInfo(data,"errorFlag", "fields", "icon")}
                        errorMessage={data.fields[2].errorMessage}
                        isLoading={data.fields[2].loading}
                    />
                    <CustomInput
                        Label={ constFunction.getFieldListInfo(data,"label", "fields", "description") }
                        inputType="text"
                        inputDefaultValue={data.fields[3].value}
                        onChangeText={(e) => { setFieldListInfo(data.fields[3].key, e.toUpperCase()) }}
                        error={constFunction.getFieldListInfo(data,"errorFlag", "fields", "description")}
                        errorMessage={data.fields[3].errorMessage}
                        isLoading={data.fields[3].loading}
                    />
                    {/* <TextInput
                        multiline={true}
                        numberOfLines={4}
                        // onChangeText={(text) => this.setState({text})}
                        // value={this.state.text}
                        /> */}
                </View>
                <View style={{marginTop:'20%'}}>
                    <CustomButton
                        buttonTitle="Submit"
                        buttonTheme="create"
                        style={styles.btn}
                        buttonLoading={false}
                        onPress={() => saveOrUpdate()}
                    />
                    <CustomButton
                        buttonTitle="CLEAR"
                        buttonTheme="create"
                        style={styles.btn}
                        buttonLoading={false}
                        onPress={() => clearAllFields()}
                    />
                </View>
          </Card>
          <Card>
                <Table borderStyle={{borderColor: 'transparent'}}>
                        <Row data={data.tableHead} style={styles.head} textStyle={styles.text}/>
                        {
                         
                               data.tableData.map((rowData, index) => {
                                const tempData=[rowData['MODULE_CODE'],rowData['MODULE_NAME'],rowData['DESCRIPTION'],rowData['PRIVILAGE_MODULE_ID']]
                                return <TableWrapper key={index} style={styles.row}>
                                    {
                                     tempData.map((cellData, cellIndex) => (
                                            <Cell key={cellIndex} data={cellIndex === 3 ? element(rowData, index) : cellData} textStyle={styles.text}/>
                                        ))
                                    }
                                </TableWrapper>
                            })
                        }
                </Table>
          </Card>
      </ScrollView>
    </View>
  );
}

export default Module

const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f2f2f2',
//     paddingTop: 20,
//   },
  buttonStyle: {
    margin: 10,
    paddingLeft: 5,
    paddingRight: 140,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btn: {
    marginTop: 10,
    marginBottom: 10,
    // width: 80,
    height: 40,
    backgroundColor: '#01ab9b',
    padding: 2,
    alignItems: 'center',
    borderRadius: 5,
  },
  actionbtn: {
    marginTop: 10,
    marginBottom: 10,
    width: 70,
    height: 30,
    backgroundColor: '#01ab9b',
    padding:5,
    alignItems: 'center',
    borderRadius: 5,
  },
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 3 },
  row: { flexDirection: 'row', backgroundColor: 'white' },
  btnchange: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' },

  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconButton: {
    width: '50%',
  }
})