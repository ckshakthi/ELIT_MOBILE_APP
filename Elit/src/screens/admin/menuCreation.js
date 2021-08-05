import React,{ useState,useEffect,useRef } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity,TextInput } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import constVariables from '../../utils/const.variables'
// import  {getFieldListInfo}  from '../../utils/const.functions'
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import TopNav from '../../components/Header';
import ApiList from '../../utils/const.apis';
import ApiProvider from '../../services/ApiProvider';
import IconShow from 'react-native-vector-icons/MaterialIcons';

// import { DataTable } from 'react-native-paper';


const optionsPerPage = [2, 3, 4];

const MenuCreation = () => {

    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const scrollRef = useRef(); 

    const element = (data, index) => (
        <View style={styles.iconContainer}>
                <IconShow name="edit" onPress={() => tableAction(data,'Edit')} style={styles.iconButton} size={20} color="#4F8EF7" />
                <IconShow name="delete" onPress={() => tableAction(data,'Delete')} style={styles.iconButton} size={20} color="#ff0000" />
        </View>
      );
  
    useEffect(() => {
      setPage(0);
    }, [itemsPerPage]);


    const [data, setData] = useState({
        fields:[
            { title: 'Menu Code', key: "menuCode", error:false, errorMessage: "",loading:false,inputDisabled:false, status:"", mandatory:true, value: ""},
            { title: 'Menu Name', key: "menuName", error:false, mandatory:true, value: ""},
            { title: 'Description', key: "description", error:false, mandatory:true, value: ""}
        ],
        createdBy:'',
        tableHead: ['Menu Code', 'Menu Name', 'Menu Description', 'Action'],
        tableData: [],
        list_data: [],
        loading_Save:false,
        actionID:null,
    })

    useEffect(() => {
        getAllMenuList()
      },[]);

    const getAllMenuList = () => {
        ApiProvider.post(ApiList.API_URL_FOR_VIEW_OF_MENU,{}).then(res => {
            // console.log("Menu list here",res)
            if(res.DML_STATUS !== "E"){
                setData({...data,tableData:res})
            }else{
                // constFunction.showToast("error", res.DML_MESSAGE)
            }
        })
    }


    const tableAction = (rowData, type) => {
        if(type === "Edit"){
            var fields = data.fields
            fields[0].value = rowData.MENU_CODE
            fields[1].value = rowData.MENU_NAME
            fields[2].value = rowData.DESCRIPTION
            if(rowData.PRIVILAGE_MENU_ID !== ""||rowData.PRIVILAGE_MENU_ID !== null){
                fields[0].inputDisabled = true
            }
            setData({...data,fields:fields, actionID: rowData.PRIVILAGE_MENU_ID})
            scrollRef.current?.scrollTo({
                y: 0,
                animated: true,
            });
        }else if(type === "Delete"){
            var requestData = {
                "privilageMenuID":rowData.PRIVILAGE_MENU_ID,
                "lastUpdatedBy": data.createdBy,
                "lastUpdateLogin": data.createdBy,
                "action":"DeleteMenu"
            }
            // constFunction.showToast("info", "Deleting Menu, Please wait!")
            ApiProvider.post(ApiList.API_URL_FOR_TRANSACTIONS_OF_MENU, requestData).then(res => {
                // constFunction.showToast(res.DML_STATUS === "S" ? "success" : "error", res.DML_MESSAGE)
                if(res.DML_STATUS === "S"){
                    getAllMenuList()
                }
            })
        }
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

    const getFieldListInfo = (state, which, stateName, key) => {
        var stateNameValue = state[stateName]
        if(which === "label"){
            for(var i = 0; i < stateNameValue.length; i++){
                if(stateNameValue[i].key === key){
                    var mandatory =  stateNameValue[i].mandatory === true ? "*" : ""
                    return stateNameValue[i].title + mandatory
                }
            }
        }else if(which ==="errorFlag"){
            for(var i = 0; i < stateNameValue.length; i++){
                if(stateNameValue[i].key === key){
                    return stateNameValue[i].error
                }
            }
        }else if(which === "select"){
            for(var i = 0; i < stateNameValue.length; i++){
                if(stateNameValue[i].key === key){
                    return stateNameValue[i].select
                }
            }
        }
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





    const saveOrUpdate = () =>{
        var fieldErrorReport = getFieldValidateDirect(data, "fields")
        if(fieldErrorReport.errorFound){
            setData({...data,fields: fieldErrorReport.fieldList})
            return
        }
        var requestData = {
            "menuCode":data.fields[0].value,
            "menuName":data.fields[1].value,
            "description":data.fields[2].value,
            "createdBy": data.createdBy,
            "lastUpdatedBy": data.lastUpdatedBy,
            "lastUpdateLogin": data.lastUpdateLogin,
            "action":"InsertOrUpdateMenu"
        }
        if(data.actionID !== null)
            requestData.privilageMenuID = data.actionID
            
        setData({...data,loading_Save:true})
        ApiProvider.post(ApiList.API_URL_FOR_TRANSACTIONS_OF_MENU,requestData).then(res => {
            // constFunction.showToast(res.DML_STATUS === "S" ? "success" : "error", res.DML_MESSAGE)
            alert('Saved Successfully')
            if(res.DML_STATUS === "S"){
                setData({...data,loading_Save:false})
                clearAllFields()
                getAllMenuList()
            }
        })
    }


    
    const clearAllFields = () => {
        var fields = data.fields
        for(var i = 0; i < fields.length; i++){
            fields[i].value = ""
            fields[i].error = false
            fields[i].status = ""
            fields[i].inputDisabled = false
        }
        setData({...data,fields:fields, actionID: null})
    }



    return (
        <View>
        <TopNav/>
          <ScrollView style={{ padding: 3 }} ref={scrollRef}>
              <Card>
                  <Card.Title>Add New Menu</Card.Title>
                    <View style={{marginTop:'10%'}}>
                        <CustomInput
                            Label={ getFieldListInfo(data,"label", "fields", "menuCode") }
                            inputType="text"
                            inputDefaultValue={data.fields[0].value}
                            onChangeText={(e) => { setFieldListInfo(data.fields[0].key, e.toUpperCase()) }}
                            error={getFieldListInfo(data,"errorFlag", "fields", "menuCode")}
                            errorMessage={data.fields[0].errorMessage}
                            isLoading={data.fields[0].loading}
                        />
                        <CustomInput
                            Label={ getFieldListInfo(data,"label", "fields", "menuName") }
                            inputType="text"
                            inputDefaultValue={data.fields[1].value}
                            onChangeText={(e) => { setFieldListInfo(data.fields[1].key, e.toUpperCase()) }}
                            error={getFieldListInfo(data,"errorFlag", "fields", "menuName")}
                            // errorMessage={data.fields[1].errorMessage}
                            // isLoading={data.fields[1].loading} 
                        />
                        <CustomInput
                            Label={ getFieldListInfo(data,"label", "fields", "description") }
                            inputType="text"
                            inputDefaultValue={data.fields[2].value}
                            onChangeText={(e) => { setFieldListInfo(data.fields[2].key, e.toUpperCase()) }}
                            error={getFieldListInfo(data,"errorFlag", "fields", "description")}
                        />
                        {/* <TextInput
                            multiline={true}
                            numberOfLines={4}
                            // onChangeText={(text) => this.setState({text})}
                            // value={this.state.text}
                            /> */}
                    </View>
                    <View style={{marginTop:'45%'}}>
                        <CustomButton
                            buttonTitle="Submit"
                            buttonTheme="create"
                            style={styles.btn}
                            buttonLoading={data.loading_Save}
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
                                
                                const tempData=[rowData['MENU_CODE'],rowData['MENU_NAME'],rowData['DESCRIPTION'],rowData['PRIVILAGE_MENU_ID']]
                                console.log('tabledata',tempData)
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

const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   backgroundColor: '#f2f2f2',
    //   paddingTop: 20,
    // },
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

export default MenuCreation