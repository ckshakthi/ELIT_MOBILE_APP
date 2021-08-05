
import React,{ useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity,TextInput } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import constVariables from '../../utils/const.variables'
import * as constFunction from '../../utils/const.functions';
import TopNav from '../../components/Header';
import ApiList from '../../utils/const.apis';
import ApiProvider from '../../services/ApiProvider';
import DropDownPicker from 'react-native-dropdown-picker'


import Autocomplete from 'react-native-autocomplete-input';



const MenuAssignment = () => {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);

// // Used to set Main JSON Data.
// const [MainJSON, setMainJSON] = useState([]);
 
// // Used to set Filter JSON Data.
// const [FilterData, setFilterData] = useState([]);

// // Used to set Selected Item in State.
// const [selectedItem, setselectedItem] = useState({});




    const [data, setData] = useState({
            API_URL_FOR_INSERT_UPDATE_DELETE : ApiList.API_URL_FOR_TRANSACTIONS_MENU_ASSIGNMENT,
            API_URL_FOR_VIEW : ApiList.API_URL_FOR_VIEW_OF_MENU_ASSIGNMENT,
            API_URL_FOR_VIEW_OF_PRIVILAGE_MODULE : ApiList.API_URL_FOR_VIEW_ROLES_AND_PRIVILAGES,
            API_URL_FOR_VIEW_OF_MENU : ApiList.API_URL_FOR_VIEW_OF_MENU,  
            // createdBy: userInfo.userId,
            createdBy: '',
            fields:[
                { title: 'Module Name', key: "moduleName", error:false, mandatory:true, value: ""}, // 0
                { title: "Module ID", key: "privilageModuleID", error:false, mandatory:false, value: ""}, // 1
                { title: 'Menu Name', key: "menuName", error:false, mandatory:true, value: ""}, // 2
                { title: "Menu ID", key: "parentMenuID", error:false, mandatory:false, value: ""}, // 3
                { title: "Sub Menu Name", key: "subMenuName", error:false, mandatory:false, value: ""}, // 4
                { title: "Sub Menu ID", key: "subMenuID", error:false, mandatory:false, value: ""}, // 5
                { title: "Description", key: "description", error:false, mandatory:true, value: ""}, // 6
                { title: "Menu Code", key: "menuCode", error:false, mandatory:false, value: ""}, // 7
            ],
            // list_columns: [
            //     { title: constFunction.getWebText("MODULE_NAME_TEXT"), field: 'MODULE_NAME', width:100 },
            //     { title: constFunction.getWebText("PARENT_MENU_NAME_TEXT"), field: 'PARENT_MENU_NAME', width:100 },
            //     { title: constFunction.getWebText("SUB_MENU_NAME_TEXT"), field: 'SUB_MENU_NAME', width:100 },
            //     { title: constFunction.getWebText("DESCRIPTION_TABLE"), field: 'DESCRIPTION', width:100 },
            //     {
            //         field: '',
            //         title: constFunction.getWebText("ACTION_TEXT"),
            //         width:100,
            //         render: rowData => <>
            //             { constFunction.checkAccordionAction(this.userAccordingAccess, "MENU_ASSIGNMENT_ACCORDION", "UPDATE") && (
            //                 <EditIcon className="editIconTable" onClick={()=> {this.clearAllFields();this.tableAction(rowData, "Edit") }}/>
            //             )}
            //             { constFunction.checkAccordionAction(this.userAccordingAccess, "MENU_ASSIGNMENT_ACCORDION", "DELETE") && (
            //                 <DeleteForeverIcon className="deleteIconTable" onClick={()=> { if (window.confirm('Are you sure you wish to delete this item?')) this.tableAction(rowData, "Delete"); this.clearAllFields() }}/>
            //             )} 
            //             <AddCircleOutlineIcon className="editIconTable" onClick={()=> { this.tableAction(rowData, "Add") }}/>
            //         </>
            //     }
            //   ],
            list_data: [],
            moduleListAll:[],
            parentMenuAll:[],
            loading_Save:false,
            actionID:null,
            query:''
    })

    
    useEffect(() => {
        // getAllMenuList()
        getAutoCompleteData("moduleListAll")
      //   fetch('https://jsonplaceholder.typicode.com/todos/')
      // .then((res) => res.json())
      // .then((json) => {
      //   setMainJSON(json);
      // })
      // .catch((e) => {
      //   alert(e);
      // });

        // getAutoCompleteData("parentMenuAll")
      }, []);



      // const SearchDataFromJSON = (query) => {
      //     debugger
      //   if (query) {
      //     //Making the Search as Case Insensitive.
      //     const regex = new RegExp(`${query.trim()}`, 'i');
      //     setFilterData(
      //       MainJSON.filter((data) => data.title.search(regex) >= 0)
      //     );
      //   } else {
      //     setFilterData([]);
      //   }
      // };



    
    const  getAutoCompleteData = (keyName) => {
        var Url = ""
        var value = {}
        if(keyName === "moduleListAll"){
            Url = data.API_URL_FOR_VIEW_OF_PRIVILAGE_MODULE
        }else if(keyName === "parentMenuAll"){
            Url = ApiList.API_URL_FOR_VIEW_OF_MENU
        }
        ApiProvider.post(Url,value).then(res => {
            // console.log('result',res)
            setData({...data,[keyName]:res})
        })
    }


    const setFieldListInfo = (key, value) => {
        var stateFields = data.fields
        for(var i = 0; i < stateFields.length; i++){
            if(stateFields[i].key === key){
                stateFields[i].value = value
            }
        }
        setData({...data,fields:stateFields})
        
        if(value.length < 2)
            constFunction.getFieldError(data, "fields", key)  
        
    }

    const getAllMenuList = () => {
        ApiProvider.post(ApiList.API_URL_FOR_VIEW_OF_MENU_ASSIGNMENT,{}).then(res => {
            if(res.DML_STATUS !== "E"){
                setData({...data,list_data: res})
            }else{
                // constFunction.showToast("error", res.DML_MESSAGE)
            }
        })
    }


    return (
        <View>
        <TopNav/>
          <ScrollView style={{ padding: 3 }}>
              <Card>
                  <Card.Title>Assign Menu</Card.Title>
                    <View style={{marginTop:'10%'}}>
                        <CustomInput
                            Label={ constFunction.getFieldListInfo(data,"label", "fields", "moduleName") }
                            open={open}
                            inputType={'droupDown'}
                            // searchable={true}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            // onChangeValue={(e)=>setValue(e)}
                        />
                        <CustomInput
                            Label={ constFunction.getFieldListInfo(data,"label", "fields", "menuName") }
                            open={open}
                            inputType={'droupDown'}
                            // searchable={true}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            // onChangeValue={(e)=>setValue(e)}
                        />
                         <CustomInput
                            Label={ constFunction.getFieldListInfo(data,"label", "fields", "subMenuName") }
                            open={open}
                            inputType={'droupDown'}
                            // searchable={true}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            // onChangeValue={(e)=>setValue(e)}
                        />
                        <CustomInput
                            Label={ constFunction.getFieldListInfo(data,"label", "fields", "description") }
                            // open={open}
                            inputType={'text'}
                            // searchable={true}
                            
                        />
                    </View>
                    <View style={{marginTop:'20%'}}>
                        <CustomButton
                            buttonTitle="Submit"
                            buttonTheme="create"
                            style={styles.btn}
                            buttonLoading={false}
                            // onPress={() => saveOrUpdate()}
                        />
                        <CustomButton
                            buttonTitle="CLEAR"
                            buttonTheme="create"
                            style={styles.btn}
                            buttonLoading={false}
                            // onPress={() => clearAllFields()}
                        />
                    </View>
              </Card>
          </ScrollView>
        </View>
      );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f2f2',
      paddingTop: 20,
    },
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


    MainContainer: {
      backgroundColor: '#FAFAFA',
      flex: 1,
      padding: 12,
    },
    AutocompleteStyle: {
      flex: 1,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 1,
     borderWidth:1
    },
    SearchBoxTextItem: {
      margin: 5,
      fontSize: 16,
      paddingTop: 4,
    },
    selectedTextContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    selectedTextStyle: {
      textAlign: 'center',
      fontSize: 18,
    },
    MainContainer: {
      backgroundColor: '#FAFAFA',
      flex: 1,
      padding: 12,
    },
    AutocompleteStyle: {
      flex: 1,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 1,
     borderWidth:1
    },
    SearchBoxTextItem: {
      margin: 5,
      fontSize: 16,
      paddingTop: 4,
    },
    selectedTextContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    selectedTextStyle: {
      textAlign: 'center',
      fontSize: 18,
    }
  })

export default MenuAssignment