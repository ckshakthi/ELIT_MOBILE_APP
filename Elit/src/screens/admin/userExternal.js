import React,{ useState,useEffect,useRef } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity,TextInput } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import IconShow from 'react-native-vector-icons/MaterialIcons';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import DocumentPicker from 'react-native-document-picker';

import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import constVariable from '../../utils/const.variables'
import ApiList from '../../utils/const.apis';
import ApiProvider from '../../services/ApiProvider';
import TopNav from '../../components/Header';
import * as constFunction from '../../utils/const.functions';


const renderView = () => {

  const scrollRef = useRef(); 
  const [ data, setData ] = useState({
   API_URL_FOR_VIEW : ApiList.API_URL_FOR_VIEW_OF_USER,
   API_URL_FOR_INSERT_UPDATE_DELETR : ApiList.API_URL_FOR_TRANSACTIONS_USERS,
   API_URL_FOR_VIEW_ROLES : ApiList.API_URL_FOR_VIEW_OF_PRIVILAGE_ROLE,
   API_URL_FOR_VIEW_SEARCH_EMPLOYEE : ApiList.API_URL_FOR_VIEW_EMPLOYEE_SEARCH,
   list_data: [],
   fields:[
       {
           title: "Title", key: "title", error: false, mandatory: true, value: "", select: [
               { label: "Select", value: "" },
               { label: "Mr.", value: "Mr." },
               { label: "Mrs.", value: "Mrs." },
               { label: "Ms.", value: "Ms." },
           ], disable:false
       }, // 0
       { title: "First Name", key: "firtName", error: false, mandatory: true, value: "", disable:false }, // 1
       { title: "Middle Name", key: "middleName", error: false, mandatory: false, value: "", disable:false }, // 2
       { title: "Last Name", key: "lastName", error: false, mandatory: true, value: "", disable:false }, // 3
       { title: "Position", key: "position", error: false, mandatory: false, value: "", disable:false }, // 4
       { title: "Email Address", key: "emailAddress", error: false, mandatory: true, value: "", disable:false, errorMessage: "",loading:false, status:"", type:"email" }, // 5
       { title: "Phone Number", key: "phoneNumber", error: false, mandatory: true, value: "",type:"phoneNumber", disable:false, country: constVariable.CONFIGURATION.DEFAULT_COUNTRY_NAME }, // 6
       { title: "Alternate Number", key: "alternateNumber", error: false, mandatory: false, value: "",type:"phoneNumber", disable:false, country: constVariable.CONFIGURATION.DEFAULT_COUNTRY_NAME }, // 7
       { title: "Role Name", key: "roleName", error: false, mandatory: true, value: "", disable:false }, // 8
       { title: "Role ID", key: "roleID", error: false, mandatory: false, value: "", disable:false }, // 9
       { title: "Username", key: "username", error: false, mandatory: true, value: "", disable:false, errorMessage: "",loading:false, status:"" }, // 10
       { title: "ERP Employee ID", key: "ERPEmployeeId", error: false, mandatory: false, value: "", disable:false }, // 11
       { title: "Image", key: "fileName", error: false, mandatory: false, value: "", disable:false }, // 12
       { title: "File Data", key: "fileData", error: false, mandatory: false, value: "", disable:false }, // 13
       { title: "User ID", key: "userId", error: false, mandatory: false, value: "", disable:false }, // 14
       { title: "ERP User ID", key: "ERPuserId", error: false, mandatory: false, value: "", disable:false }, // 15
   ],
   loading_save:false,
   actionID:null,
   roleAll:[],
   searchEmployeeUser:[],
   loading_employee:false,
   uploadedFile: '',
  })

  const setFieldListInfoIndex = (stateName, key, value) => {
   var stateFields = data[stateName]
   stateFields[key].value = value
   setData({ ...data,[stateName]: stateFields })
   // constFunction.getFieldErrorNormalIndex(data, stateName, key)
  }

  const selectOneFile = async () => {
   try {
     const res =  await DocumentPicker.pick({
       type: [DocumentPicker.types.allFiles],
     });
     console.log('res : ' + JSON.stringify(res));
     console.log('URI : ' + res.uri);
     console.log('Type : ' + res.type);
     console.log('File Name : ' + res.name);
     console.log('File Size : ' + res.size);
     setData({uploadedFile: res});
   } catch (err) {
     if (DocumentPicker.isCancel(err)) {
       alert('Canceled file upload');
     } else {
       alert('Unknown Error: ' + JSON.stringify(err));
       throw err;
     }
   }
 };

   const renderView = () => {
          return (<>
           <ScrollView style={{ padding: 3 }} ref={scrollRef}>
             <Card>
                 <Card.Title>Add New External User</Card.Title>
                   <View style={{marginTop:'10%'}}>
                       {/* <CustomInput
                           Label={constFunction.getFieldListInfoIndex(data, "label", "fields", 0)}
                           inputType="droupDown"
                           value={data.fields[0].value}
                           inputItems={data.fields[0].select}
                           onValueChange={(e) => { setFieldListInfoIndex("fields", 0, e.replace(/\s/g, "")) }}
                           // error={constFunction.getFieldListInfo(data,"errorFlag", "fields", data.fields[10].key)}
                           // errorMessage={data.fields[0].errorMessage}
                           // isLoading={data.fields[0].loading}
                       /> */}
                       <CustomInput
                           inputType="text"
                           Label={constFunction.getFieldListInfoIndex(data, "label", "fields", 1)}
                           inputDefaultValue={data.fields[1].value}
                           onChangeText={(e) => { setFieldListInfoIndex("fields", 1, e) }}
                           error={constFunction.getFieldListInfoIndex(data, "errorFlag", "fields", 1)}
                       />
                       <CustomInput
                           inputType="text"
                           Label={constFunction.getFieldListInfoIndex(data, "label", "fields", 2)}
                           inputDefaultValue={data.fields[2].value}
                           onChangeText={(e) => { setFieldListInfoIndex("fields", 2, e) }}
                           error={constFunction.getFieldListInfoIndex(data, "errorFlag", "fields", 2)}
                       />
                       <CustomInput
                           inputType="text"
                           Label={constFunction.getFieldListInfoIndex(data, "label", "fields", 3)}
                           inputDefaultValue={data.fields[3].value}
                           onChangeText={(e) => { setFieldListInfoIndex("fields", 3, e) }}
                           error={constFunction.getFieldListInfoIndex(data, "errorFlag", "fields", 3)}
                       />
                       <CustomInput
                           inputType="text"
                           Label={constFunction.getFieldListInfoIndex(data, "label", "fields", 4)}
                           inputDefaultValue={data.fields[4].value}
                           onChangeText={(e) => { setFieldListInfoIndex("fields", 4, e) }}
                           error={constFunction.getFieldListInfoIndex(data, "errorFlag", "fields", 4)}
                       />
                       <CustomInput
                           inputType="email"
                           Label={constFunction.getFieldListInfoIndex(data, "label", "fields", 5)}
                           inputDefaultValue={data.fields[5].value}
                           onChangeText={(e) => { setFieldListInfoIndex("fields", 5, e) }}
                           error={constFunction.getFieldListInfoIndex(data, "errorFlag", "fields", 5)}
                       />
                        <CustomInput
                           inputType="phoneNumber"
                           Label={constFunction.getFieldListInfoIndex(data, "label", "fields", 6)}
                           inputDefaultValue={data.fields[6].value}
                           onChangeText={(e) => { setFieldListInfoIndex("fields", 6, e) }}
                           error={constFunction.getFieldListInfoIndex(data, "errorFlag", "fields", 6)}
                       />
                        <CustomInput
                           inputType="phoneNumber"
                           Label={constFunction.getFieldListInfoIndex(data, "label", "fields", 7)}
                           inputDefaultValue={data.fields[7].value}
                           onChangeText={(e) => { setFieldListInfoIndex("fields", 7, e) }}
                           error={constFunction.getFieldListInfoIndex(data, "errorFlag", "fields", 7)}
                       />
                        <CustomInput
                           inputType="text"
                           Label={constFunction.getFieldListInfoIndex(data, "label", "fields", 10)}
                           inputDefaultValue={data.fields[10].value}
                           onChangeText={(e) => { setFieldListInfoIndex("fields", 10, e) }}
                           error={constFunction.getFieldListInfoIndex(data, "errorFlag", "fields", 10)}
                       />
                       <Text style={styles.labelTextStyle}>Image</Text>
                       <TouchableOpacity activeOpacity={0.5} onPress={selectOneFile}>
                         <View style={styles.fileUpload}>
                           <Icon name="upload-file" size={30} color="#4F8EF7" />
                           <Text style={styles.uploadFileText}>
                             {data.uploadedFile
                               ? data.uploadedFile.name
                               : 'Click me to upload'}
                           </Text>
                         </View>
                       </TouchableOpacity>
                   </View>
                   <View style={{marginTop:'45%'}}>
                       <CustomButton
                           buttonTitle="ADD"
                           buttonTheme="create"
                           style={styles.btn}
                           buttonLoading={data.loading_Save}
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
             <Card>
             {/* <Table borderStyle={{borderColor: 'transparent'}}>
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
               </Table> */}
             </Card>
         </ScrollView>
          </>)
   }
   return (
     <View>
         <TopNav/>
         {renderView()}
     </View>
   );

}

const UserExternal = () =>  {
  return (
    <View>
        <TopNav/>
        {renderView()}
    </View>
  );
}


const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#f2f2f2',
  //   paddingTop: 20,
  // },
  // buttonStyle: {
  //   margin: 10,
  //   paddingLeft: 5,
  //   paddingRight: 140,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between'
  // },
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
  // actionbtn: {
  //   marginTop: 10,
  //   marginBottom: 10,
  //   width: 70,
  //   height: 30,
  //   backgroundColor: '#01ab9b',
  //   padding:5,
  //   alignItems: 'center',
  //   borderRadius: 5,
  // },
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
    },
    labelTextStyle: {
      color: '#05375a',
      padding: 5,
      fontSize: 14,
      fontWeight: 'bold',
      marginLeft: 10,
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
      color: '#1a1a1a',
    },
})

export default UserExternal