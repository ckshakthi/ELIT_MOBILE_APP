import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import Accordion from '../../../components/Accordion'
import CheckBox from '@react-native-community/checkbox'
import CustomInput from '../../../components/CustomInput'
import CustomButton from '../../../components/CustomButton'
import constVariables from '../../../utils/const.variables'
import { getFieldError, getFieldValidateDirect } from '../../../utils/const.functions'
import ApiList from '../../../utils/const.apis'

const completeProfileScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: '', value: '' },
    { label: '', value: '' }
  ]);
  const { container } = styles
  const [data, setData] = useState({
    isPrimarySelected: false,
    isAuthorizeSelected: false,
    lastUpdatedBy: 0,
    lastUpdateLogin: 0,
    createdBy: 0,
    supplierID: null,
    API_URL_FOR_VIEW_OF_COUNTRY: ApiList.API_URL_FOR_VIEW_OF_COUNTRY,
    API_URL_FOR_VIEW_OF_REFERENCES: ApiList.API_URL_FOR_VIEW_OF_REFERENCES,
    API_URL_FOR_VIEW_OF_LOOKUP: ApiList.API_URL_FOR_VIEW_ALL_LOOKUP,
    API_URL_FOR_VIEW_OF_CONTACTS: ApiList.API_URL_FOR_VIEW_OF_CONTACTS,
    API_URL_FOR_VIEW_OF_STATE: ApiList.API_URL_FOR_VIEW_OF_STATE,
    API_URL_FOR_VIEW_OF_CITY: ApiList.API_URL_FOR_VIEW_OF_CITY,
    API_URL_FOR_VIEW_OF_ADDRESS: ApiList.API_URL_FOR_VIEW_ALL_SUPPLIER_SITE,
    API_URL_FOR_VIEW_OF_CERTIFICATES: ApiList.API_URL_FOR_VIEW_OF_CERTIFICATES,
    API_URL_FOR_VIEW_OF_SUPPLIER_DETAILS: ApiList.API_URL_FOR_VIEW_OF_SUPPLIER_DETAILS,
    API_URL_FOR_VIEW_OF_ATTACHMENTS_ALL: ApiList.API_URL_FOR_VIEW_ATTACHMENTS,
    API_URL_FOR_VIEW_OF_PRODUCT_SERVICES: ApiList.API_URL_FOR_VIEW_OF_PRODUCT_SERVICES,
    API_URL_FOR_VIEW_OF_PRODUCT_CATEGORY: ApiList.API_URL_FOR_VIEW_OF_PRODUCT_CATEGORY,
    API_URL_FOR_VIEW_OF_PRODUCT_SUB_CATEGORY: ApiList.API_URL_FOR_VIEW_OF_PRODUCT_SUB_CATEGORY,
    API_URL_FOR_VIEW_OF_PRODUCT_QUESTIONNARIES: ApiList.API_URL_FOR_VIEW_OF_QUESTIONNARIES,
    API_URL_FOR_VIEW_OF_ALL_BANKS: ApiList.API_URL_FOR_VIEW_OF_ALL_BANKS,
    API_URL_FOR_VIEW_OF_ALL_BRANCHES: ApiList.API_URL_FOR_VIEW_OF_ALL_BRANCHES,
    API_URL_FOR_VIEW_OF_ALL_CURRENCY: ApiList.API_URL_FOR_VIEW_OF_CURRENCY,
    API_URL_FOR_VIEW_OF_ALL_BANK_ACCOUNT: ApiList.API_URL_FOR_VIEW_ALL_SUPPLIER_ACCOUNT_V,
    API_URL_FOR_VIEW_OF_ALL_CONTACT_ASSIGNMENT: "supplierView/ATS_SUP_CONTACT_ASSIGNMENTS_V",
    API_URL_FOR_VIEW_OF_ALL_FINANCIAL_DETAILS: ApiList.API_URL_FOR_VIEW_OF_ALL_FINANCIAL_DETAILS,
    API_URL_FOR_VIEW_ALL_SUPPLIER_APPROVAL_HISTORY_V: ApiList.API_URL_FOR_VIEW_ALL_SUPPLIER_APPROVAL_HISTORY_V,

    API_URL_FOR_VIEW_OF_CONTACTS_ASSIGNMENT: "supplierContactAssignment/transactions",
    API_URL_FOR_INSERT_UPDATE_REFERENCE_DELETE: ApiList.API_URL_FOR_INSERT_UPDATE_DELETE_REFERENCE,
    API_URL_FOR_INSERT_UPDATE_DELETE_CONTACTS: ApiList.API_URL_FOR_INSERT_UPDATE_DELETE_CONTACT,
    API_URL_FOR_INSERT_UPDATE_DELETE_FINANCIAL_DETAILS: ApiList.API_URL_FOR_INSERT_UPDATE_DELETE_FINANCIAL_DETAILS,
    API_URL_FOR_INSERT_UPDATE_DELETE_ADDRESS_BOOK: ApiList.API_URL_FOR_INSERT_UPDATE_DELETE_SITES,
    API_URL_FOR_INSERT_UPDATE_DELETE_CERTIFICATE: ApiList.API_URL_FOR_INSERT_UPDATE_DELETE_CERTIFICATE,
    API_URL_FOR_INSERT_UPDATE_SUPPLIER_DETAILS: ApiList.API_URL_FOR_INSERT_UPDATE_DELETE_SUPPLIER_DETAILS,
    API_URL_FOR_INSERT_UPDATE_QUESTIONNARIES: ApiList.API_URL_FOR_INSERT_UPDATE_DELETE_QUESTIONNARIES,
    API_URL_FOR_INSERT_UPDATE_PRODUCT_SERVICES: ApiList.API_URL_FOR_INSERT_UPDATE_DELETE_PRODUCT_SERVICES,
    API_URL_FOR_INSERT_ATTACHMENT: ApiList.API_URL_FOR_INSERT_OF_ATTACHMENT,
    API_URL_FOR_INSERT_UPDATE_DELETE_BANK: ApiList.API_URL_FOR_INSERT_UPDATE_DELETE_BANKS,
    API_URL_FOR_INSERT_UPDATE_DELETE_BRANCH: ApiList.API_URL_FOR_INSERT_UPDATE_DELETE_BRANCHES,
    API_URL_FOR_INSERT_UPDATE_DELETE_ACCOUNT: ApiList.API_URL_FOR_INSERT_UPDATE_DELETE_BANK_ACCOUNT,
    API_URL_FOR_INSERT_UPDATE_DELETE_FOR_APPROVAL: "general/profileApprovalSubmit/profileApproval",

    //Company Information
    Company_Information_fields: [
      { title: "COMPANY_NAME_TEXT", key: "companyName", error: false, mandatory: false, value: "", loading: false, errorMessage: "", inputDisabled: false, status: "" }, //0
      { title: "ALTERNATE_NAME_TEXT", key: "alternateName", error: false, mandatory: false, value: "", loading: false, errorMessage: "", inputDisabled: false, status: "" }, //1
      { title: "PARENT_COMPANY_NAME_TEXT", key: "parentCompanyName", error: false, mandatory: false, value: "", loading: false, errorMessage: "", inputDisabled: false, status: "" }, //2
      { title: "SUPPLIER_URL_TEXT", key: "url", error: false, mandatory: false, value: "", loading: false, errorMessage: "", inputDisabled: false, status: "" }, //3
      { title: "COMPANY_NUMBER_TEXT", key: "companyNumber", error: false, mandatory: false, value: "", inputDisabled: false, errorMessage: "", loading: false, status: "", max: 16 }, //4
      { title: "STANDARD_INDUSTRY_CLASS_TEXT", key: "standardIndustryClass", error: false, mandatory: false, value: "", inputDisabled: false, errorMessage: "", loading: false, status: "", max: 16 }, //5
      { title: "TAX_PAYER_ID_TEXT", key: "taxPayerId", error: false, mandatory: true, value: "", inputDisabled: false, errorMessage: "", loading: false, status: "", max: 16 }, //6
      { title: "REGISTRATION_TYPE_TEXT", key: "registrationType", error: false, mandatory: true, value: "", inputDisabled: false, errorMessage: "", loading: false, status: "" }, //7
      { title: "LICENSE_NUMBER_TEXT", key: "licenseNumber", error: false, mandatory: false, value: "", inputDisabled: false, errorMessage: "", loading: false, status: "", max: 16 }, //8
      { title: "ESTABLISH_YEAR_TEXT", key: "establishmentYear", error: false, mandatory: false, value: null, inputDisabled: false }, //9
      { title: "ISSUE_DATE_TEXT", key: "issueDate", error: false, mandatory: false, value: null, inputDisabled: false }, //10
      { title: "EXPIRY_DATE_TEXT", key: "expiryDate", error: false, mandatory: false, value: null, inputDisabled: false },//11
      { title: "TAX_REGISTRATION_COUNTRY_TEXT", key: "taxRegistrationCountry", error: false, mandatory: true, value: "", loading: false, errorMessage: "", inputDisabled: false, status: "" }, //12
      { title: "TAX_REGISTRATION_NUMBER_TEXT", key: "taxRegistrationNumber", error: false, mandatory: true, value: "", inputDisabled: false, errorMessage: "", loading: false, status: "", max: 16 }, //13
      { title: "NOTE_TO_BUYER_TEXT", key: "noteToBuyer", error: false, mandatory: true, value: "", loading: false, errorMessage: "", inputDisabled: false, status: "" }//14
    ],

    //Financial Details
    financial_details_fields: [
      { title: "CEO_NAME_TEXT", key: "ceoName", error: false, mandatory: false, value: "", loading: false, errorMessage: "", inputDisabled: false, status: "" }, //0
      { title: "CONTROL_YEAR_TEXT", key: "controlYear", error: false, mandatory: true, value: null, inputDisabled: false }, //1
      { title: "CEO_TITLE_TEXT", key: "ceoTitle", error: false, mandatory: false, value: "", loading: false, errorMessage: "", inputDisabled: false, status: "" }, //2
      { title: "TOTAL_EMPLOYEES_TEXT", key: "totalEmployees", error: false, mandatory: true, value: "", loading: false, errorMessage: "", inputDisabled: false, status: "" }, //3
      { title: "LINE_OF_BUSINESS_TEXT", key: "lineOfBusiness", error: false, mandatory: true, value: "", loading: false, errorMessage: "", inputDisabled: false, status: "" }, //4
      { title: "FINANCIAL_ANALYSIS_YEAR_TEXT", key: "financialAnalysisYear", error: false, mandatory: true, value: null, inputDisabled: false }, //5
      { title: "FISCAL_YEAR_END_TEXT", key: "fiscalYearEnd", error: false, mandatory: true, value: null, inputDisabled: false }, //6
      { title: "CURRENT_YEAR_REVENUE_TEXT", key: "currentYearRevenue", error: false, mandatory: true, value: "", loading: false, errorMessage: "", inputDisabled: false, status: "" }, //7
      { title: "POTENTIAL_REVENUE_TEXT", key: "potentialRevenue", error: false, mandatory: true, value: "", loading: false, errorMessage: "", inputDisabled: false, status: "" }, //8
      { title: "ESTABLISH_YEAR_TEXT", key: "establishmentYear", error: false, mandatory: false, value: null, inputDisabled: false }, //9
      { title: "MISSION_STATEMENT_TEXT", key: "missionStatement", error: false, mandatory: false, value: "", loading: false, errorMessage: "", inputDisabled: false, status: "" }//10
    ],

    //Contact Information
    contact_information_fields: [
      { title: "TITLE_TEXT", key: "Title", error: false, mandatory: true, value: "", loading: false, errorMessage: "", inputDisabled: false, status: "" }, //0
      { title: "FIRST_NAME_TEXT", key: "firstName", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //1
      { title: "MIDDLE_NAME_TEXT", key: "middleName", error: false, mandatory: false, value: "", inputDisabled: false }, //2
      { title: "LAST_NAME_TEXT", key: "lastName", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //3
      { title: "EMAIL_ADDRESS_TEXT", key: "ciEmail", error: false, errorMessage: "", mandatory: true, value: "", errorMessage: "", loading: false, inputDisabled: false, status: "", type: "email" }, //4
      { title: "PHONE_NUMBER_TEXT", key: "ciPhoneNumber", error: false, errorMessage: "", mandatory: true, value: "", errorMessage: "", type: "phoneNumber", inputDisabled: false, country: constVariables.CONFIGURATION.DEFAULT_COUNTRY_NAME }, //5
      { title: "ALT_PHONE_NUMBER_TEXT", key: "ciAlternativeNumber", error: false, mandatory: false, value: "", errorMessage: "", type: "phoneNumber", inputDisabled: false, country: constVariables.CONFIGURATION.DEFAULT_COUNTRY_NAME },//6
      { title: "FAX_NUMBER_TEXT", key: "ciFaxNumber", error: false, errorMessage: "", mandatory: false, value: "", inputDisabled: false }, //7
      { title: "POSITION_TEXT", key: "position", error: false, errorMessage: "", mandatory: false, value: "", inputDisabled: false }//8
    ],

    //Address Book
    address_book_fields: [
      { title: "NAME_TEXT", key: "Name", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //0
      { title: "ALTERNATE_NAME_TEXT", key: "alternateName", error: false, errorMessage: "", mandatory: false, value: "", inputDisabled: false }, //1
      { title: "COUNTRY_TEXT", key: "Country", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //2
      { title: "ADDRESS_LINE_1_TEXT", key: "addressLine1", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //3
      { title: "ADDRESS_LINE_2_TEXT", key: "addressLine2", error: false, errorMessage: "", mandatory: false, value: "", inputDisabled: false }, //4
      { title: "ADDRESS_LINE_3_TEXT", key: "addressLine3", error: false, errorMessage: "", mandatory: false, value: "", inputDisabled: false }, //5
      { title: "ADDRESS_LINE_4_TEXT", key: "addressLine4", error: false, errorMessage: "", mandatory: false, value: "", inputDisabled: false }, //6
      { title: "CITY_TEXT", key: "City", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //7
      { title: "STATE_TEXT", key: "State", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //8
      { title: "P.O._BOX_TEXT", key: "poBox", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //9
      { title: "EMAIL_ADDRESS_TEXT", key: "abemail", error: false, errorMessage: "", mandatory: true, value: "", errorMessage: "", loading: false, inputDisabled: false, status: "", type: "email" }, //10
      { title: "PHONE_NUMBER_TEXT", key: "abphoneNumber", error: false, errorMessage: "", mandatory: true, value: "", errorMessage: "", type: "phoneNumber", inputDisabled: false, country: constVariables.CONFIGURATION.DEFAULT_COUNTRY_NAME }, //11
      { title: "ALT_PHONE_NUMBER_TEXT", key: "abalternativeNumber", error: false, mandatory: false, value: "", errorMessage: "", type: "phoneNumber", inputDisabled: false, country: constVariables.CONFIGURATION.DEFAULT_COUNTRY_NAME }//12
    ],

    //Products & Services
    products_services_fields: [
      { title: "CATEGORY_NAME_TEXT", key: "categoryName", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //0
      { title: "SUB_CATEGORY_NAME_TEXT", key: "subCategoryName", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }//1
    ],

    //Certificates
    cerificates_fields: [
      { title: "CERTIFICATE_NAME_TEXT", key: "certificateName", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //0
      { title: "CERTIFICATE_NUMBER_TEXT", key: "certificateNumber", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: true }, //1
      { title: "AGENCY_TEXT", key: "Agency", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: true }, //2
      { title: "ESTABLISHMENT_YEAR_TEXT", key: "csEstablishmentYear", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: true }, //3
      { title: "ISSUE_DATE_TEXT", key: "csIssueDate", error: false, mandatory: false, value: null, inputDisabled: false }, //4
      { title: "EXPIRY_DATE_TEXT", key: "csExpiryDate", error: false, mandatory: false, value: null, inputDisabled: false }//5
    ],

    //Bank Details
    bank_details: [
      { title: "COUNTRY_TEXT", key: "bdCountry", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //0
      { title: "BANK_NAME_TEXT", key: "bankNamey", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //1
      { title: "BRANCH_NAME_TEXT", key: "branchName", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //2
      { title: "BRANCH_TYPE_TEXT", key: "branchType", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //3
      { title: "TYPE_VALUE_TEXT", key: "typeValue", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //4
      { title: "RFC_IDENTIFIER_TEXT", key: "rfcIdentidier", error: false, errorMessage: "", mandatory: false, value: "", inputDisabled: false }, //5
      { title: "COMPANY_NAME_TEXT", key: "comapnyName", error: false, errorMessage: "", mandatory: false, value: "", inputDisabled: true }, //6
      { title: "ACCOUNT_ALTERNATE_NAME_TEXT", key: "accountAlternateName", error: false, errorMessage: "", mandatory: false, value: "", inputDisabled: false }, //7
      { title: "SHORT_NAME_TEXT", key: "shortName", error: false, errorMessage: "", mandatory: false, value: "", inputDisabled: false }, //8
      { title: "ACCOUNT_NUMBER_TEXT", key: "accountNumber", error: false, errorMessage: "", mandatory: false, value: "", inputDisabled: false }, //9
      { title: "IBAN_NUMBER_TEXT", key: "ibanNumber", error: false, errorMessage: "", mandatory: false, value: "", inputDisabled: false }, //10
      { title: "CURRENCY_TEXT", key: "Currency", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //11
      { title: "CHECK_DIGITS_TEXT", key: "checkDigits", error: false, errorMessage: "", mandatory: false, value: "", inputDisabled: false }, //12
      { title: "ACCOUNT_SUFFIX_TEXT", key: "accountSuffix", error: false, errorMessage: "", mandatory: false, value: "", inputDisabled: false }, //13
      { title: "ACCOUNT_TYPE_TEXT", key: "accountType", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //14
      { title: "DESCRIPTION_TEXT", key: "Description", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //15
      { title: "START_DATE_TEXT", key: "bdStartDate", error: false, mandatory: false, value: null, inputDisabled: false }, //16
      { title: "END_DATE_TEXT", key: "bdEndDate", error: false, mandatory: false, value: null, inputDisabled: false },//17
      { title: "CONTACT_NAME_TEXT", key: "contactName", error: false, errorMessage: "", mandatory: false, value: "", inputDisabled: false }, //18
      { title: "PHONE_NUMBER_TEXT", key: "bdPhoneNumber", error: false, errorMessage: "", mandatory: false, value: "", inputDisabled: false }, //19
      { title: "FAX_NUMBER_TEXT", key: "bdFaxNumber", error: false, errorMessage: "", mandatory: false, value: "", inputDisabled: false }, //20
      { title: "EMAIL_ADDRESS_TEXT", key: "bdEmailNumber", error: false, errorMessage: "", mandatory: false, value: "", inputDisabled: false }//21
    ],

    //Questionnaires
    questionnaires_fields: [
      { title: "QUESTION1_TEXT", key: "Question1", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //0
      { title: "QUESTION2_TEXT", key: "Question2", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }//1
    ],

    //References
    references_fields: [
      { title: "COMPANY_NAME_TEXT", key: "refCompanyName", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //0
      { title: "COUNTRY_TEXT", key: "refCountry", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //1
      { title: "CONTACT_NAME_TEXT", key: "refContactName", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //2
      { title: "EMAIL_ADDRESS_TEXT", key: "refEmailAddress", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //3
      { title: "PHONE_NUMBER_TEXT", key: "refPhoneNumber", error: false, errorMessage: "", mandatory: true, value: "", inputDisabled: false }, //4
      { title: "ALTERNATIVE_PHONE_NUMBER_TEXT", key: "refAlternativePhoneNumber", error: false, errorMessage: "", mandatory: false, value: "", inputDisabled: false }, //5
      { title: "POSITION_TEXT", key: "refPosition", error: false, errorMessage: "", mandatory: false, value: "", inputDisabled: false }, //6
    ]
  })
  const updatePrimaryCheckboxClick = () => {
    setData({
      ...data,
      isPrimarySelected: !data.isPrimarySelected
    })
  }
  const updateAuthorizeCheckboxClick = () => {
    setData({
      ...data,
      isAuthorizeSelected: !data.isAuthorizeSelected
    })
  }
  const setFieldListInfo = (stateName, key, value) => {
    var stateFields = stateName
    for (var i = 0; i < stateFields.length; i++) {
      if (stateFields[i].key === key) {
        //Company_Details
        if (stateFields[i].key === "taxPayerId" && value.length > 10) {
          continue;
        }
        if (stateFields[i].key === "registrationType" && value.length !== 0) {
          continue;
        }
        if (stateFields[i].key === "taxRegistrationCountry" && value.length !== 0) {
          continue;
        }
        if (stateFields[i].key === "taxRegistrationNumber" && value.length > 16) {
          continue;
        }
        if (stateFields[i].key === "noteToBuyer" && value.length > 4000) {
          continue;
        }
        //Financial_Details
        if (stateFields[i].key === "totalEmployees" && value.length > 6) {
          continue;
        }
        if (stateFields[i].key === "lineOfBusiness" && value.length > 40) {
          continue;
        }
        if (stateFields[i].key === "currentYearRevenue" && value.length > 15) {
          continue;
        }
        if (stateFields[i].key === "potentialRevenue" && value.length > 15) {
          continue;
        }
        //Contact_Information
        if (stateFields[i].key === "Title" && value.length !== 'Select') {
          continue;
        }
        if (stateFields[i].key === "ciPhoneNumber" && value.length > 10) {
          continue;
        }
        //Address_Book
        if (stateFields[i].key === "poBox" && value.length > 5) {
          continue;
        }
        if (stateFields[i].key === "abphoneNumber" && value.length > 10) {
          continue;
        }
        //Certificates
        if (stateFields[i].key === "certificateNumber" && value.length > 15) {
          continue;
        }
        //Bank_Details
        if (stateFields[i].key === "typeValue" && value.length > 15) {
          continue;
        }
        //Refernces
        if (stateFields[i].key === "refPhoneNumber" && value.length > 10) {
          continue;
        }
        stateFields[i].value = value
      }
    }
    setData({ fields: stateFields })
    getFieldError("fields", key)
  }
  getViewDataServerPromise = (keyName) => {
    return new Promise((resolve, reject) => {
      var Url = ""
      var data = {}
      if (keyName === "registrationTypeListAll") {
        if (state.fields_company_information[17].value !== "DRAFT") {
          resolve()
          return
        }
        Url = state.API_URL_FOR_VIEW_OF_LOOKUP
        data = {
          "colRefCode": "REGISTRATION_TYPE",
        }
      } else if (keyName === "companyTypeListAll") {
        Url = state.API_URL_FOR_VIEW_OF_LOOKUP
        data = {
          "colRefCode": "SUPPLIER_TYPE",
        }
      } else if (keyName === "countryListAll") {
        Url = state.API_URL_FOR_VIEW_OF_COUNTRY

        if (state.fields_company_information[17].value === "IN_PROGRESS") {
          resolve()
          return
        }
      } else if (keyName === "certificateListAll") {
        Url = state.API_URL_FOR_VIEW_OF_LOOKUP
        data = {
          "colRefCode": "CERTIFICATES",
        }
      } else if (keyName === "attachment_list_data") {
        Url = state.API_URL_FOR_VIEW_OF_ATTACHMENTS_ALL
        data = {
          "parentRefTableID": supplierID,
        }
      } else if (keyName === "financial_details_list_data") {
        Url = state.API_URL_FOR_VIEW_OF_ALL_FINANCIAL_DETAILS
        data = {
          "supplierID": supplierID,
        }
      } else if (keyName === "contacts_list_data") {
        Url = state.API_URL_FOR_VIEW_OF_CONTACTS
        data = {
          "supplierID": supplierID,
        }
      } else if (keyName === "address_list_data") {
        Url = state.API_URL_FOR_VIEW_OF_ADDRESS
        data = {
          "supplierID": supplierID,
        }
      } else if (keyName === "account_list_data") {
        Url = state.API_URL_FOR_VIEW_OF_ALL_BANK_ACCOUNT
        data = {
          "supplierID": supplierID,
        }
      } else if (keyName === "products_list_data") {
        Url = state.API_URL_FOR_VIEW_OF_PRODUCT_SERVICES
        data = {
          "supplierID": supplierID,
        }
      } else if (keyName === "certificate_list_data") {
        Url = state.API_URL_FOR_VIEW_OF_CERTIFICATES
        data = {
          "supplierID": supplierID,
        }
      } else if (keyName === "references_list_data") {
        Url = state.API_URL_FOR_VIEW_OF_REFERENCES
        data = {
          "supplierID": supplierID,
        }
      } else if (keyName === "questionnaires_v") {
        Url = state.API_URL_FOR_VIEW_OF_PRODUCT_QUESTIONNARIES
        data = {
          "supplierID": supplierID,
        }
      } else if (keyName === "questionnaires_list_data") {
        Url = state.API_URL_FOR_VIEW_OF_LOOKUP
        data = {
          "colRefCode": "QUESTIONNAIRES",
        }
        if (state.fields_company_information[17].value !== "DRAFT") {
          resolve()
          return
        }
      }

      ApiProvider.post(Url, data).then(res => {
        setState({ [keyName]: res })
        if (keyName === "financial_details_list_data") {
          actionFinancial("view")
        }
        if (keyName === "questionnaires_v") {
          actionQuestionaries("init")
        }
        if (keyName === "companyTypeListAll") {
          var company_information = state.fields_company_information
          company_information[7].value = res[3].COLUMN_NAME
          company_information[22].value = res[3].COLUMN_CODE
          setState({ fields_company_information: company_information })
        }
        resolve()
      })
    })
  }
  const getViewDataServer = (keyName, extra) => {
    var Url = ""
    var data = {}
    if (keyName === "references_list_data") {
      Url = state.API_URL_FOR_VIEW_OF_REFERENCES
      data = {
        "supplierID": supplierID,
      }
      setState({ loading_reference_data: true })
    } else if (keyName === "contacts_list_data") {
      Url = state.API_URL_FOR_VIEW_OF_CONTACTS
      data = {
        "supplierID": supplierID,
      }
    } else if (keyName === "positionListAll") {
      Url = state.API_URL_FOR_VIEW_OF_LOOKUP
      data = {
        "colRefCode": "POSITION",
      }
    } else if (keyName === "stateListAll") {
      Url = state.API_URL_FOR_VIEW_OF_STATE
      if (extra === "Address") {
        data = {
          countryCode: state.fields_address_book[21].value
        }
      }
    } else if (keyName === "cityListAll") {
      Url = state.API_URL_FOR_VIEW_OF_CITY
    } else if (keyName === "address_list_data") {
      Url = state.API_URL_FOR_VIEW_OF_ADDRESS
      data = {
        "supplierID": supplierID,
      }
    } else if (keyName === "certificateListAll") {
      Url = state.API_URL_FOR_VIEW_OF_LOOKUP
      data = {
        "colRefCode": "CERTIFICATES",
      }
    } else if (keyName === "certificate_list_data") {
      Url = state.API_URL_FOR_VIEW_OF_CERTIFICATES
      data = {
        "supplierID": supplierID,
      }
      setState({ loading_certificate_data: true })
    } else if (keyName === "attachment_certificate_list_data") {
      Url = state.API_URL_FOR_VIEW_OF_ATTACHMENTS_ALL
      data = {
        "valID": "Y",
        "active": "Y",
        "enabledFlag": "Y",
        "refTableName": "ATS_SUP_CERTIFICATES",
        "refTableID": state.fields_attachment[8].value,
        "parentRefTableID": supplierID,
      }
      setState({ loading_attachment_apply_view: true })
    } else if (keyName === "attachment_list_data") {
      Url = state.API_URL_FOR_VIEW_OF_ATTACHMENTS_ALL
      data = {
        "parentRefTableID": supplierID,
      }
      setState({ loading_attachment_data: true })
    } else if (keyName === "questionnaires_list_data") {
      Url = state.API_URL_FOR_VIEW_OF_LOOKUP
      data = {
        "colRefCode": "QUESTIONNAIRES",
      }
    } else if (keyName === "productCategoryListAll") {
      Url = state.API_URL_FOR_VIEW_OF_PRODUCT_CATEGORY
    } else if (keyName === "productSubCategoryListAll") {
      Url = state.API_URL_FOR_VIEW_OF_PRODUCT_SUB_CATEGORY
      data = {
        "categoryCode": state.fields_product_service[1].value
      }
    } else if (keyName === "questionnaires_v") {
      Url = state.API_URL_FOR_VIEW_OF_PRODUCT_QUESTIONNARIES
      data = {
        "supplierID": supplierID,
      }
    } else if (keyName === "bankListAll") {
      Url = state.API_URL_FOR_VIEW_OF_ALL_BANKS
      data = {
        "countryCode": state.fields_bank_account_add[1].value
      }
    } else if (keyName === "branchListAll") {
      Url = state.API_URL_FOR_VIEW_OF_ALL_BRANCHES
      data = {
        "bankID": state.fields_bank_account_add[3].value,
      }
    } else if (keyName === "branchTypeListAll") {
      Url = state.API_URL_FOR_VIEW_OF_LOOKUP
      data = {
        "colRefCode": "BRANCH_TYPE",
      }
    } else if (keyName === "currencyListAll") {
      Url = state.API_URL_FOR_VIEW_OF_ALL_CURRENCY
    } else if (keyName === "accountTypeListAll") {
      Url = state.API_URL_FOR_VIEW_OF_LOOKUP
      data = {
        "colRefCode": "ACCOUNT_TYPE",
      }
    } else if (keyName === "products_list_data") {
      Url = state.API_URL_FOR_VIEW_OF_PRODUCT_SERVICES
      data = {
        "supplierID": supplierID,
      }
    } else if (keyName === "account_list_data") {
      Url = state.API_URL_FOR_VIEW_OF_ALL_BANK_ACCOUNT
      data = {
        "supplierID": supplierID,
      }
    } else if (keyName === "contacts_assignment_list_data") {
      Url = state.API_URL_FOR_VIEW_OF_ALL_CONTACT_ASSIGNMENT
      data = {
        "supplierID": supplierID,
      }
    }


    ApiProvider.post(Url, data).then(res => {
      if (keyName === "contacts_assignment_list_data") {
        if (res.assignments !== undefined) {
          setState({ [keyName]: res.assignments })
        }
      } else if (keyName === "bankListAll") {
        res.push({
          BANK_NAME: "+ Add New Bank"
        })
        setState({ [keyName]: res })
      } else if (keyName === "branchListAll") {
        res.push({
          BRANCH_NAME: "+ Add New Branch"
        })
        setState({ [keyName]: res })
      } else {
        setState({ [keyName]: res })
      }

      if (keyName === "questionnaires_list_data") {
        getViewDataServer("questionnaires_v")
      }
      if (keyName === "questionnaires_v") {
        actionQuestionaries("init")
      }
      if (keyName === "certificate_list_data") {
        if (state.fields_company_information[17].value === "DRAFT") {
          setUpCertificate()
        }
      }
      if (keyName === "attachment_certificate_list_data") {
        setState({ loading_attachment_apply_view: false })
      }
      if (keyName === "attachment_list_data") {
        setState({ loading_attachment_data: false })
      }
      if (keyName === "references_list_data") {
        setState({ loading_reference_data: false })
      }
      if (keyName === "certificate_list_data") {
        setState({ loading_certificate_data: false })
      }
    })
  }
  return (
    <View style={container}>
      <TouchableOpacity style={{ alignItems: 'flex-end' }}>
        <Text style={styles.actionbtn}>ACTION</Text>
      </TouchableOpacity>
        <ScrollView style={{ padding: 3 }} nestedScrollEnabled>
          <Accordion title='Company Information'>
            <CustomInput
              Label='Company Name'
              inputType="text"
              inputDefaultValue={data.Company_Information_fields[0].value}
              inputDisabled={data.Company_Information_fields[0].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.Company_Information_fields, data.Company_Information_fields[0].key, val.toUpperCase()) }}
              error={data.Company_Information_fields[0].error}
              errorMessage={data.Company_Information_fields[0].errorMessage}
              isLoading={data.Company_Information_fields[0].loading}
            />
            <CustomInput
              Label='Alternate Name'
              inputType="text"
              inputDefaultValue={data.Company_Information_fields[1].value}
              inputDisabled={data.Company_Information_fields[1].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.Company_Information_fields, data.Company_Information_fields[1].key, val.toUpperCase()) }}
              error={data.Company_Information_fields[1].error}
              errorMessage={data.Company_Information_fields[1].errorMessage}
              isLoading={data.Company_Information_fields[1].loading}
            />
            <CustomInput
              Label='Parent Company Name'
              inputType="text"
              inputDefaultValue={data.Company_Information_fields[2].value}
              inputDisabled={data.Company_Information_fields[2].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.Company_Information_fields, data.Company_Information_fields[2].key, val.toUpperCase()) }}
              error={data.Company_Information_fields[2].error}
              errorMessage={data.Company_Information_fields[2].errorMessage}
              isLoading={data.Company_Information_fields[2].loading}
            />
            <CustomInput
              Label='Supplier URL'
              inputType="url"
              inputDefaultValue={data.Company_Information_fields[3].value}
              inputDisabled={data.Company_Information_fields[3].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.Company_Information_fields, data.Company_Information_fields[3].key, val) }}
              error={data.Company_Information_fields[3].error}
              errorMessage={data.Company_Information_fields[3].errorMessage}
              isLoading={data.Company_Information_fields[3].loading}
            />
            <CustomInput
              Label='Company Number'
              inputType="text"
              inputDefaultValue={data.Company_Information_fields[4].value}
              inputDisabled={data.Company_Information_fields[4].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.Company_Information_fields, data.Company_Information_fields[4].key, val) }}
              error={data.Company_Information_fields[4].error}
              errorMessage={data.Company_Information_fields[4].errorMessage}
              isLoading={data.Company_Information_fields[4].loading}
            />
            <CustomInput
              Label='Standard Industry Class'
              inputType="text"
              inputDefaultValue={data.Company_Information_fields[5].value}
              inputDisabled={data.Company_Information_fields[5].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.Company_Information_fields, data.Company_Information_fields[5].key, val) }}
              error={data.Company_Information_fields[5].error}
              errorMessage={data.Company_Information_fields[5].errorMessage}
              isLoading={data.Company_Information_fields[5].loading}
            />
            <CustomInput
              Label='Tax Payer ID*'
              inputType="text"
              inputDefaultValue={data.Company_Information_fields[6].value}
              inputDisabled={data.Company_Information_fields[6].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.Company_Information_fields, data.Company_Information_fields[6].key, val) }}
              error={data.Company_Information_fields[6].error}
              errorMessage={data.Company_Information_fields[6].errorMessage}
              isLoading={data.Company_Information_fields[6].loading}
            />
            <CustomInput
              Label='Registration Type*'
              inputType="text"
              inputDefaultValue={data.Company_Information_fields[7].value}
              inputDisabled={data.Company_Information_fields[7].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.Company_Information_fields, data.Company_Information_fields[7].key, val) }}
              error={data.Company_Information_fields[7].error}
              errorMessage={data.Company_Information_fields[7].errorMessage}
              isLoading={data.Company_Information_fields[7].loading}
            />
            <CustomInput
              Label='License Number'
              inputType="text"
              inputDefaultValue={data.Company_Information_fields[8].value}
              inputDisabled={data.Company_Information_fields[8].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.Company_Information_fields, data.Company_Information_fields[8].key, val) }}
              error={data.Company_Information_fields[8].error}
              errorMessage={data.Company_Information_fields[8].errorMessage}
              isLoading={data.Company_Information_fields[8].loading}
            />
            <CustomInput
              Label='Establishment Year'
              inputType="text"
              inputDefaultValue={data.Company_Information_fields[9].value}
              inputDisabled={data.Company_Information_fields[9].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.Company_Information_fields, data.Company_Information_fields[9].key, val) }}
              error={data.Company_Information_fields[9].error}
              errorMessage={data.Company_Information_fields[9].errorMessage}
              isLoading={data.Company_Information_fields[9].loading}
            />
            <CustomInput
              Label='Issue Date'
              inputType="DataPicker"
              inputDefaultValue={data.Company_Information_fields[10].value}
              inputDisabled={data.Company_Information_fields[10].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.Company_Information_fields, data.Company_Information_fields[10].key, val) }}
              error={data.Company_Information_fields[10].error}
              errorMessage={data.Company_Information_fields[10].errorMessage}
              isLoading={data.Company_Information_fields[10].loading}
            />
            <CustomInput
              Label='Expiry Date'
              inputType="DataPicker"
              inputDefaultValue={data.Company_Information_fields[11].value}
              inputDisabled={data.Company_Information_fields[11].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.Company_Information_fields, data.Company_Information_fields[11].key, val) }}
              error={data.Company_Information_fields[11].error}
              errorMessage={data.Company_Information_fields[11].errorMessage}
              isLoading={data.Company_Information_fields[11].loading}
            />
            <CustomInput
              Label='Tax Registration Country*'
              inputType="text"
              inputDefaultValue={data.Company_Information_fields[12].value}
              inputDisabled={data.Company_Information_fields[12].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.Company_Information_fields, data.Company_Information_fields[12].key, val) }}
              error={data.Company_Information_fields[12].error}
              errorMessage={data.Company_Information_fields[12].errorMessage}
              isLoading={data.Company_Information_fields[12].loading}
            />
            <CustomInput
              Label='Tax Registration Number*'
              inputType="text"
              inputDefaultValue={data.Company_Information_fields[13].value}
              inputDisabled={data.Company_Information_fields[13].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.Company_Information_fields, data.Company_Information_fields[13].key, val) }}
              error={data.Company_Information_fields[13].error}
              errorMessage={data.Company_Information_fields[13].errorMessage}
              isLoading={data.Company_Information_fields[13].loading}
            />
            <CustomInput
              Label='Note to Buyer*'
              inputType="text"
              inputLines={4}
              inputDefaultValue={data.Company_Information_fields[14].value}
              inputDisabled={data.Company_Information_fields[14].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.Company_Information_fields, data.Company_Information_fields[14].key, val) }}
              error={data.Company_Information_fields[14].error}
              errorMessage={data.Company_Information_fields[14].errorMessage}
              isLoading={data.Company_Information_fields[14].loading}
            />
          </Accordion>
          <View style={{ padding: 5 }} />
          <Accordion title='Financial Details'>
            <CustomInput
              Label='CEO Name'
              inputType="text"
              inputLines={1}
              inputDefaultValue={data.financial_details_fields[0].value}
              inputDisabled={data.financial_details_fields[0].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.financial_details_fields, data.financial_details_fields[0].key, val.toUpperCase()) }}
              error={data.financial_details_fields[0].error}
              errorMessage={data.financial_details_fields[0].errorMessage}
              isLoading={data.financial_details_fields[0].loading}
            />
            <CustomInput
              Label='Control Year*'
              inputType="text"
              inputLines={1}
              inputDefaultValue={data.financial_details_fields[1].value}
              inputDisabled={data.financial_details_fields[1].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.financial_details_fields, data.financial_details_fields[1].key, val) }}
              error={data.financial_details_fields[1].error}
              errorMessage={data.financial_details_fields[1].errorMessage}
              isLoading={data.financial_details_fields[1].loading}
            />
            <CustomInput
              Label='CEO Title'
              inputType="text"
              inputLines={1}
              inputDefaultValue={data.financial_details_fields[2].value}
              inputDisabled={data.financial_details_fields[2].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.financial_details_fields, data.financial_details_fields[2].key, val.toUpperCase()) }}
              error={data.financial_details_fields[2].error}
              errorMessage={data.financial_details_fields[2].errorMessage}
              isLoading={data.financial_details_fields[2].loading}
            />
            <CustomInput
              Label='Total Employees*'
              inputType="text"
              inputLines={1}
              inputDefaultValue={data.financial_details_fields[3].value}
              inputDisabled={data.financial_details_fields[3].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.financial_details_fields, data.financial_details_fields[3].key, val) }}
              error={data.financial_details_fields[3].error}
              errorMessage={data.financial_details_fields[3].errorMessage}
              isLoading={data.financial_details_fields[3].loading}
            />
            <CustomInput
              Label='Line Of Business*'
              inputType="text"
              inputLines={1}
              inputDefaultValue={data.financial_details_fields[4].value}
              inputDisabled={data.financial_details_fields[4].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.financial_details_fields, data.financial_details_fields[4].key, val.toUpperCase()) }}
              error={data.financial_details_fields[4].error}
              errorMessage={data.financial_details_fields[4].errorMessage}
              isLoading={data.financial_details_fields[4].loading}
            />
            <CustomInput
              Label='Financial Analysis Year*'
              inputType="text"
              inputLines={1}
              inputDefaultValue={data.financial_details_fields[5].value}
              inputDisabled={data.financial_details_fields[5].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.financial_details_fields, data.financial_details_fields[5].key, val) }}
              error={data.financial_details_fields[5].error}
              errorMessage={data.financial_details_fields[5].errorMessage}
              isLoading={data.financial_details_fields[5].loading}
            />
            <CustomInput
              Label='Fiscal Year End*'
              inputType="text"
              inputLines={1}
              inputDefaultValue={data.financial_details_fields[6].value}
              inputDisabled={data.financial_details_fields[6].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.financial_details_fields, data.financial_details_fields[6].key, val) }}
              error={data.financial_details_fields[6].error}
              errorMessage={data.financial_details_fields[6].errorMessage}
              isLoading={data.financial_details_fields[6].loading}
            />
            <CustomInput
              Label='Current Year Revenue*'
              inputType="text"
              inputLines={1}
              inputDefaultValue={data.financial_details_fields[7].value}
              inputDisabled={data.financial_details_fields[7].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.financial_details_fields, data.financial_details_fields[7].key, val) }}
              error={data.financial_details_fields[7].error}
              errorMessage={data.financial_details_fields[7].errorMessage}
              isLoading={data.financial_details_fields[7].loading}
            />
            <CustomInput
              Label='Potential Revenue*'
              inputType="text"
              inputLines={1}
              inputDefaultValue={data.financial_details_fields[8].value}
              inputDisabled={data.financial_details_fields[8].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.financial_details_fields, data.financial_details_fields[8].key, val) }}
              error={data.financial_details_fields[8].error}
              errorMessage={data.financial_details_fields[8].errorMessage}
              isLoading={data.financial_details_fields[8].loading}
            />
            <CustomInput
              Label='Establishment Year*'
              inputType="text"
              inputLines={1}
              inputDefaultValue={data.financial_details_fields[9].value}
              inputDisabled={data.financial_details_fields[9].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.financial_details_fields, data.financial_details_fields[9].key, val) }}
              error={data.financial_details_fields[9].error}
              errorMessage={data.financial_details_fields[9].errorMessage}
              isLoading={data.financial_details_fields[9].loading}
            />
            <CustomInput
              Label='Mission Statement'
              inputType="text"
              inputLines={4}
              inputDefaultValue={data.financial_details_fields[10].value}
              inputDisabled={data.financial_details_fields[10].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.financial_details_fields, data.financial_details_fields[10].key, val) }}
              error={data.financial_details_fields[10].error}
              errorMessage={data.financial_details_fields[10].errorMessage}
              isLoading={data.financial_details_fields[10].loading}
            />
          </Accordion>
          <View style={{ padding: 5 }} />
          <Accordion title='Contact Information'>
            <CustomInput
              Label='Title*'
              inputType="dropDown"
              inputDefaultValue={data.contact_information_fields[0].value}
              inputDisabled={data.contact_information_fields[0].inputDisabled}
              // onChangeText={(val) => { setFieldListInfo(data.contact_information_fields,data.contact_information_fields[0].key, val) }}
              open={open}
              value={value}
              items={[{ label: 'Mr.', value: 'Mr.' },
              { label: 'Ms.', value: 'Ms.' },
              { label: 'Mrs.', value: 'Mrs.' }]}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              error={data.contact_information_fields[0].error}
              errorMessage={data.contact_information_fields[0].errorMessage}
              isLoading={data.contact_information_fields[0].loading}
            />
            <CustomInput
              Label='First Name*'
              inputType="text"
              inputDefaultValue={data.contact_information_fields[1].value}
              inputDisabled={data.contact_information_fields[1].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.contact_information_fields, data.contact_information_fields[1].key, val) }}
              error={data.contact_information_fields[1].error}
              errorMessage={data.contact_information_fields[1].errorMessage}
              isLoading={data.contact_information_fields[1].loading}
            />
            <CustomInput
              Label='Middle Name'
              inputType="text"
              inputDefaultValue={data.contact_information_fields[2].value}
              inputDisabled={data.contact_information_fields[2].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.contact_information_fields, data.contact_information_fields[2].key, val) }}
              error={data.contact_information_fields[2].error}
              errorMessage={data.contact_information_fields[2].errorMessage}
              isLoading={data.contact_information_fields[2].loading}
            />
            <CustomInput
              Label='Last Name*'
              inputType="text"
              inputDefaultValue={data.contact_information_fields[3].value}
              inputDisabled={data.contact_information_fields[3].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.contact_information_fields, data.contact_information_fields[3].key, val) }}
              error={data.contact_information_fields[3].error}
              errorMessage={data.contact_information_fields[3].errorMessage}
              isLoading={data.contact_information_fields[3].loading}
            />
            <CustomInput
              Label='Email Address*'
              inputType="text"
              inputDefaultValue={data.contact_information_fields[4].value}
              inputDisabled={data.contact_information_fields[4].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.contact_information_fields, data.contact_information_fields[4].key, val) }}
              error={data.contact_information_fields[4].error}
              errorMessage={data.contact_information_fields[4].errorMessage}
              isLoading={data.contact_information_fields[4].loading}
            />
            <CustomInput
              Label='Phone Number*'
              inputType="phoneNumber"
              countryName={constVariables.CONFIGURATION.DEFAULT_COUNTRY_NAME}
              inputDefaultValue={data.contact_information_fields[5].value}
              inputDisabled={data.contact_information_fields[5].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.contact_information_fields, data.contact_information_fields[5].key, val) }}
              error={data.contact_information_fields[5].error}
              errorMessage={data.contact_information_fields[5].errorMessage}
              isLoading={data.contact_information_fields[5].loading}
            />
            <CustomInput
              Label='Alternative Number'
              inputType="phoneNumber"
              countryName={constVariables.CONFIGURATION.DEFAULT_COUNTRY_NAME}
              inputDefaultValue={data.contact_information_fields[6].value}
              inputDisabled={data.contact_information_fields[6].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.contact_information_fields, data.contact_information_fields[6].key, val) }}
              error={data.contact_information_fields[6].error}
              errorMessage={data.contact_information_fields[6].errorMessage}
              isLoading={data.contact_information_fields[6].loading}
            />
            <CustomInput
              Label='Fax Number'
              inputType="text"
              inputDefaultValue={data.contact_information_fields[7].value}
              inputDisabled={data.contact_information_fields[7].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.contact_information_fields, data.contact_information_fields[7].key, val) }}
              error={data.contact_information_fields[7].error}
              errorMessage={data.contact_information_fields[7].errorMessage}
              isLoading={data.contact_information_fields[7].loading}
            />
            <CustomInput
              Label='Position'
              inputType="dropDown"
              inputDefaultValue={data.contact_information_fields[8].value}
              inputDisabled={data.contact_information_fields[8].inputDisabled}
              //onChangeText={(val) => { setFieldListInfo(data.contact_information_fields,data.contact_information_fields[8].key, val) }}
              open={open}
              value={value}
              items={[{ label: 'Sales Director', value: 'Sales Director' },
              { label: 'Sales Manager', value: 'Sales Manager' },
              { label: 'Sales Representative', value: 'Sales Represntative' },
              { label: 'Other', value: 'Other' }]}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              error={data.contact_information_fields[8].error}
              errorMessage={data.contact_information_fields[8].errorMessage}
              isLoading={data.contact_information_fields[8].loading}
            />
            <View style={styles.checkboxStyle}>
              <CheckBox
                value={data.isPrimarySelected}
                onValueChange={updatePrimaryCheckboxClick}
              />
              <Text style={styles.checkboxText}>Primary Contact</Text>
              <CheckBox
                value={data.isAuthorizeSelected}
                onValueChange={updateAuthorizeCheckboxClick}
              />
              <Text style={styles.checkboxText}>Authorized Signatory</Text>
            </View>
            <View style={styles.buttonStyle}>
              <CustomButton
                buttonTitle="ADD"
                buttonTheme="create"
                style={styles.btn}
                buttonLoading={false}
                onPress={() => registerNow()}
              />
              <CustomButton
                buttonTitle="CLEAR"
                buttonTheme="create"
                style={styles.btnclear}
                buttonLoading={false}
                onPress={() => clearAllFields()}
              />
            </View>
          </Accordion>
          <View style={{ padding: 5 }} />
          <Accordion title='Address Book'>
            <CustomInput
              Label='Name*'
              inputType="text"
              inputDefaultValue={data.address_book_fields[0].value}
              inputDisabled={data.address_book_fields[0].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.address_book_fields, data.address_book_fields[0].key, val) }}
              error={data.address_book_fields[0].error}
              errorMessage={data.address_book_fields[0].errorMessage}
              isLoading={data.address_book_fields[0].loading}
            />
            <CustomInput
              Label='Alternate Name*'
              inputType="text"
              inputDefaultValue={data.address_book_fields[1].value}
              inputDisabled={data.address_book_fields[1].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.address_book_fields, data.address_book_fields[1].key, val) }}
              error={data.address_book_fields[1].error}
              errorMessage={data.address_book_fields[1].errorMessage}
              isLoading={data.address_book_fields[1].loading}
            />
            <CustomInput
              Label='Country*'
              inputType="text"
              inputDefaultValue={data.address_book_fields[2].value}
              inputDisabled={data.address_book_fields[2].inputDisabled}
              onChangeText={(val) => { setFieldListInfodata.address_book_fields, (data.address_book_fields[2].key, val) }}
              error={data.address_book_fields[2].error}
              errorMessage={data.address_book_fields[2].errorMessage}
              isLoading={data.address_book_fields[2].loading}
            />
            <CustomInput
              Label='Address Line 1*'
              inputType="text"
              inputDefaultValue={data.address_book_fields[3].value}
              inputDisabled={data.address_book_fields[3].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.address_book_fields, data.address_book_fields[3].key, val) }}
              error={data.address_book_fields[3].error}
              errorMessage={data.address_book_fields[3].errorMessage}
              isLoading={data.address_book_fields[3].loading}
            />
            <CustomInput
              Label='Address Line 2'
              inputType="text"
              inputDefaultValue={data.address_book_fields[4].value}
              inputDisabled={data.address_book_fields[4].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.address_book_fields, data.address_book_fields[4].key, val) }}
              error={data.address_book_fields[4].error}
              errorMessage={data.address_book_fields[4].errorMessage}
              isLoading={data.address_book_fields[4].loading}
            />
            <CustomInput
              Label='Address Line 3'
              inputType="text"
              inputDefaultValue={data.address_book_fields[5].value}
              inputDisabled={data.address_book_fields[5].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.address_book_fields, data.address_book_fields[5].key, val) }}
              error={data.address_book_fields[5].error}
              errorMessage={data.address_book_fields[5].errorMessage}
              isLoading={data.address_book_fields[5].loading}
            />
            <CustomInput
              Label='Address line 4'
              inputType="text"
              inputDefaultValue={data.address_book_fields[6].value}
              inputDisabled={data.address_book_fields[6].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.address_book_fields, data.address_book_fields[6].key, val) }}
              error={data.address_book_fields[6].error}
              errorMessage={data.address_book_fields[6].errorMessage}
              isLoading={data.address_book_fields[6].loading}
            />
            <CustomInput
              Label='City*'
              inputType="text"
              inputDefaultValue={data.address_book_fields[7].value}
              inputDisabled={data.address_book_fields[7].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.address_book_fields, data.address_book_fields[7].key, val) }}
              error={data.address_book_fields[7].error}
              errorMessage={data.address_book_fields[7].errorMessage}
              isLoading={data.address_book_fields[7].loading}
            />
            <CustomInput
              Label='State*'
              inputType="text"
              inputDefaultValue={data.address_book_fields[8].value}
              inputDisabled={data.address_book_fields[8].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.address_book_fields, data.address_book_fields[8].key, val) }}
              error={data.address_book_fields[8].error}
              errorMessage={data.address_book_fields[8].errorMessage}
              isLoading={data.address_book_fields[8].loading}
            />
            <CustomInput
              Label='P.O.Box*'
              inputType="text"
              inputDefaultValue={data.address_book_fields[9].value}
              inputDisabled={data.address_book_fields[9].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.address_book_fields, data.address_book_fields[9].key, val) }}
              error={data.address_book_fields[9].error}
              errorMessage={data.address_book_fields[9].errorMessage}
              isLoading={data.address_book_fields[9].loading}
            />
            <CustomInput
              Label='Email Address*'
              inputType="text"
              inputDefaultValue={data.address_book_fields[10].value}
              inputDisabled={data.address_book_fields[10].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.address_book_fields, data.address_book_fields[10].key, val) }}
              error={data.address_book_fields[10].error}
              errorMessage={data.address_book_fields[10].errorMessage}
              isLoading={data.address_book_fields[10].loading}
            />
            <CustomInput
              Label='Phone Number*'
              inputType="phoneNumber"
              countryName={constVariables.CONFIGURATION.DEFAULT_COUNTRY_NAME}
              inputDefaultValue={data.address_book_fields[11].value}
              inputDisabled={data.address_book_fields[11].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.address_book_fields, data.address_book_fields[11].key, val) }}
              error={data.address_book_fields[11].error}
              errorMessage={data.address_book_fields[11].errorMessage}
              isLoading={data.address_book_fields[11].loading}
            />
            <CustomInput
              Label='Alternative Number'
              inputType="phoneNumber"
              countryName={constVariables.CONFIGURATION.DEFAULT_COUNTRY_NAME}
              inputDefaultValue={data.address_book_fields[12].value}
              inputDisabled={data.address_book_fields[12].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.address_book_fields, data.address_book_fields[12].key, val) }}
              error={data.address_book_fields[12].error}
              errorMessage={data.address_book_fields[12].errorMessage}
              isLoading={data.address_book_fields[12].loading}
            />
            <View style={styles.checkboxStyle}>
              <CheckBox
                value={data.isPrimarySelected}
                onValueChange={updatePrimaryCheckboxClick}
              />
              <Text style={styles.checkboxText}>Ordering</Text>
              <CheckBox
                value={data.isAuthorizeSelected}
                onValueChange={updateAuthorizeCheckboxClick}
              />
              <Text style={styles.checkboxText}>Negotiation</Text>
              <CheckBox
                value={data.isPrimarySelected}
                onValueChange={updatePrimaryCheckboxClick}
              />
              <Text style={styles.checkboxText}>Remit to</Text>
            </View>
            <View style={styles.buttonStyle}>
              <CustomButton
                buttonTitle="ADD"
                buttonTheme="create"
                style={styles.btn}
                buttonLoading={false}
                onPress={() => registerNow()}
              />
              <CustomButton
                buttonTitle="CLEAR"
                buttonTheme="create"
                style={styles.btnclear}
                buttonLoading={false}
                onPress={() => clearAllFields()}
              />
            </View>
          </Accordion>
          <View style={{ padding: 5 }} />
          <Accordion title='Products & Services'>
            <CustomInput
              Label='Category Name'
              inputType="dropDown"
              inputDefaultValue={data.products_services_fields[0].value}
              inputDisabled={data.products_services_fields[0].inputDisabled}
              //onChangeText={(val) => { setFieldListInfo(data.products_services_fields,data.products_services_fields[0].key, val) }}
              open={open}
              value={value}
              items={[{ label: 'Computer Software for Microcomputers', value: 'Computer Software for Microcomputers' },
              { label: 'Computer Accessories and Supplies', value: 'Computer Accessories and Supplies' },
              { label: 'Computer Hardware and Peripherals for Microcomputers', value: 'Computer Hardware and Peripherals for Microcomputers' }]}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              error={data.products_services_fields[0].error}
              errorMessage={data.products_services_fields[0].errorMessage}
              isLoading={data.products_services_fields[0].loading}
            />
            <CustomInput
              Label='Sub Category Name'
              inputType="text"
              inputDefaultValue={data.products_services_fields[1].value}
              inputDisabled={data.products_services_fields[1].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.products_services_fields, data.products_services_fields[1].key, val) }}
              error={data.products_services_fields[1].error}
              errorMessage={data.products_services_fields[1].errorMessage}
              isLoading={data.products_services_fields[1].loading}
            />
          </Accordion>
          <View style={{ padding: 5 }} />
          <Accordion title='Certificates'>
            <CustomInput
              Label='Certificate Name'
              inputType="dropDown"
              inputDefaultValue={data.cerificates_fields[0].value}
              inputDisabled={data.cerificates_fields[0].inputDisabled}
              //onChangeText={(val) => { setFieldListInfo(data.cerificates_fields, data.cerificates_fields[0].key, val) }}
              open={open}
              value={value}
              items={[{ label: 'ISO', value: 'ISO' },
              { label: 'OTHERS', value: 'OTHERS' }]}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              error={data.cerificates_fields[0].error}
              errorMessage={data.cerificates_fields[0].errorMessage}
              isLoading={data.cerificates_fields[0].loading}
            />
            <View style={styles.checkboxStyle}>
              <CheckBox
                value={data.isPrimarySelected}
                onValueChange={updatePrimaryCheckboxClick}
              />
              <Text style={styles.checkboxText1}>Applicable</Text>
            </View>
            <Text></Text>
            <CustomInput
              Label='Certificate Number'
              inputType="disabledtext"
              inputDefaultValue={data.cerificates_fields[1].value}
              inputDisabled={data.cerificates_fields[1].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.cerificates_fields, data.cerificates_fields[1].key, val) }}
              error={data.cerificates_fields[1].error}
              errorMessage={data.cerificates_fields[1].errorMessage}
              isLoading={data.cerificates_fields[1].loading}
            />
            <CustomInput
              Label='Agency'
              inputType="disabledtext"
              inputDefaultValue={data.cerificates_fields[2].value}
              inputDisabled={data.cerificates_fields[2].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.cerificates_fields, data.cerificates_fields[2].key, val) }}
              error={data.cerificates_fields[2].error}
              errorMessage={data.cerificates_fields[2].errorMessage}
              isLoading={data.cerificates_fields[2].loading}
            />
            <CustomInput
              Label='Establishment Year'
              inputType="disabledtext"
              inputDefaultValue={data.cerificates_fields[3].value}
              inputDisabled={data.cerificates_fields[3].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.cerificates_fields, data.cerificates_fields[3].key, val) }}
              error={data.cerificates_fields[3].error}
              errorMessage={data.cerificates_fields[3].errorMessage}
              isLoading={data.cerificates_fields[3].loading}
            />
            <CustomInput
              Label='Issue Date'
              inputType="DataPicker"
              inputDefaultValue={data.cerificates_fields[4].value}
              inputDisabled={data.cerificates_fields[4].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.cerificates_fields, data.cerificates_fields[4].key, val) }}
              error={data.cerificates_fields[4].error}
              errorMessage={data.cerificates_fields[4].errorMessage}
              isLoading={data.cerificates_fields[4].loading}
            />
            <CustomInput
              Label='Expiry Date'
              inputType="DataPicker"
              inputDefaultValue={data.cerificates_fields[5].value}
              inputDisabled={data.cerificates_fields[5].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.cerificates_fields, data.cerificates_fields[5].key, val) }}
              error={data.cerificates_fields[5].error}
              errorMessage={data.cerificates_fields[5].errorMessage}
              isLoading={data.cerificates_fields[5].loading}
            />
          </Accordion>
          <View style={{ padding: 5 }} />
          <Accordion title='Bank Details'>
            <CustomInput
              Label='Country*'
              inputType="text"
              inputDefaultValue={data.bank_details[0].value}
              inputDisabled={data.bank_details[0].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.bank_details, data.bank_details[0].key, val) }}
              error={data.bank_details[0].error}
              errorMessage={data.bank_details[0].errorMessage}
              isLoading={data.bank_details[0].loading}
            />
            <CustomInput
              Label='Bank Name*'
              inputType="text"
              inputDefaultValue={data.bank_details[1].value}
              inputDisabled={data.bank_details[1].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.bank_details, data.bank_details[1].key, val) }}
              error={data.bank_details[1].error}
              errorMessage={data.bank_details[1].errorMessage}
              isLoading={data.bank_details[1].loading}
            />
            <CustomInput
              Label='Branch Name*'
              inputType="text"
              inputDefaultValue={data.bank_details[2].value}
              inputDisabled={data.bank_details[2].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.bank_details, data.bank_details[2].key, val) }}
              error={data.bank_details[2].error}
              errorMessage={data.bank_details[2].errorMessage}
              isLoading={data.bank_details[2].loading}
            />
            <CustomInput
              Label='Branch Type*'
              inputType="dropDown"
              inputDefaultValue={data.bank_details[3].value}
              inputDisabled={data.bank_details[3].inputDisabled}
              //onChangeText={(val) => { setFieldListInfo(data.bank_details, data.bank_details[3].key, val) }}
              open={open}
              value={value}
              items={[{ label: 'OTHERS', value: 'OTHERS' },
              { label: 'ABA', value: 'ABA' },
              { label: 'PFC', value: 'PFC' },
              {label:'SWIFT', value:'SWIFT'}]}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              error={data.bank_details[3].error}
              errorMessage={data.bank_details[3].errorMessage}
              isLoading={data.bank_details[3].loading}
            />
            <CustomInput
              Label='Type values*'
              inputType="text"
              inputDefaultValue={data.bank_details[4].value}
              inputDisabled={data.bank_details[4].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.bank_details, data.bank_details[4].key, val) }}
              error={data.bank_details[4].error}
              errorMessage={data.bank_details[4].errorMessage}
              isLoading={data.bank_details[4].loading}
            />
            <CustomInput
              Label='RFC Identifier'
              inputType="text"
              inputDefaultValue={data.bank_details[5].value}
              inputDisabled={data.bank_details[5].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.bank_details, data.bank_details[5].key, val) }}
              error={data.bank_details[5].error}
              errorMessage={data.bank_details[5].errorMessage}
              isLoading={data.bank_details[5].loading}
            />
            <CustomInput
              Label='Account Name'
              inputType="disabledtext"
              inputDefaultValue={data.bank_details[6].value}
              inputDisabled={data.bank_details[6].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.bank_details, data.bank_details[6].key, val) }}
              error={data.bank_details[6].error}
              errorMessage={data.bank_details[6].errorMessage}
              isLoading={data.bank_details[6].loading}
            />
            <CustomInput
              Label='Account Alternate Name'
              inputType="text"
              inputDefaultValue={data.bank_details[7].value}
              inputDisabled={data.bank_details[7].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.bank_details, data.bank_details[7].key, val) }}
              error={data.bank_details[7].error}
              errorMessage={data.bank_details[7].errorMessage}
              isLoading={data.bank_details[7].loading}
            />
            <CustomInput
              Label='Short Name'
              inputType="text"
              inputDefaultValue={data.bank_details[8].value}
              inputDisabled={data.bank_details[8].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.bank_details, data.bank_details[8].key, val) }}
              error={data.bank_details[8].error}
              errorMessage={data.bank_details[8].errorMessage}
              isLoading={data.bank_details[8].loading}
            />
            <CustomInput
              Label='Account Number'
              inputType="text"
              inputDefaultValue={data.bank_details[9].value}
              inputDisabled={data.bank_details[9].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.bank_details, data.bank_details[9].key, val) }}
              error={data.bank_details[9].error}
              errorMessage={data.bank_details[9].errorMessage}
              isLoading={data.bank_details[9].loading}
            />
            <CustomInput
              Label='IBAN Number'
              inputType="text"
              inputDefaultValue={data.bank_details[10].value}
              inputDisabled={data.bank_details[10].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.bank_details, data.bank_details[10].key, val) }}
              error={data.bank_details[10].error}
              errorMessage={data.bank_details[10].errorMessage}
              isLoading={data.bank_details[10].loading}
            />
            <CustomInput
              Label='Currency*'
              inputType="text"
              inputDefaultValue={data.bank_details[11].value}
              inputDisabled={data.bank_details[11].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.bank_details, data.bank_details[11].key, val) }}
              error={data.bank_details[11].error}
              errorMessage={data.bank_details[11].errorMessage}
              isLoading={data.bank_details[11].loading}
            />
            <CustomInput
              Label='Check Digits'
              inputType="text"
              inputDefaultValue={data.bank_details[12].value}
              inputDisabled={data.bank_details[12].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.bank_details, data.bank_details[12].key, val) }}
              error={data.bank_details[12].error}
              errorMessage={data.bank_details[12].errorMessage}
              isLoading={data.bank_details[12].loading}
            />
            <CustomInput
              Label='Account Suffix'
              inputType="text"
              inputDefaultValue={data.bank_details[13].value}
              inputDisabled={data.bank_details[13].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.bank_details, data.bank_details[13].key, val) }}
              error={data.bank_details[13].error}
              errorMessage={data.bank_details[13].errorMessage}
              isLoading={data.bank_details[13].loading}
            />
            <CustomInput
              Label='Account Type*'
              inputType="text"
              inputDefaultValue={data.bank_details[14].value}
              inputDisabled={data.bank_details[14].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.bank_details, data.bank_details[14].key, val) }}
              error={data.bank_details[14].error}
              errorMessage={data.bank_details[14].errorMessage}
              isLoading={data.bank_details[14].loading}
            />
            <CustomInput
              Label='Description'
              inputType="text"
              inputDefaultValue={data.bank_details[15].value}
              inputDisabled={data.bank_details[15].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.bank_details, data.bank_details[15].key, val) }}
              error={data.bank_details[15].error}
              errorMessage={data.bank_details[15].errorMessage}
              isLoading={data.bank_details[15].loading}
            />
            <CustomInput
              Label='Start Date'
              inputType="DataPicker"
              inputDefaultValue={data.bank_details[16].value}
              inputDisabled={data.bank_details[16].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.bank_details, data.bank_details[16].key, val) }}
              error={data.bank_details[16].error}
              errorMessage={data.bank_details[16].errorMessage}
              isLoading={data.bank_details[16].loading}
            />
            <CustomInput
              Label='End Date'
              inputType="DataPicker"
              inputDefaultValue={data.bank_details[17].value}
              inputDisabled={data.bank_details[17].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.bank_details, data.bank_details[17].key, val) }}
              error={data.bank_details[17].error}
              errorMessage={data.bank_details[17].errorMessage}
              isLoading={data.bank_details[17].loading}
            />
            <CustomInput
              Label='Contact Name'
              inputType="text"
              inputDefaultValue={data.bank_details[18].value}
              inputDisabled={data.bank_details[18].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.bank_details, data.bank_details[18].key, val) }}
              error={data.bank_details[18].error}
              errorMessage={data.bank_details[18].errorMessage}
              isLoading={data.bank_details[18].loading}
            />
            <CustomInput
              Label='Phone Number'
              inputType="phoneNumber"
              countryName={constVariables.CONFIGURATION.DEFAULT_COUNTRY_NAME}
              inputDefaultValue={data.bank_details[19].value}
              inputDisabled={data.bank_details[19].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.bank_details, data.bank_details[19].key, val) }}
              error={data.bank_details[19].error}
              errorMessage={data.bank_details[19].errorMessage}
              isLoading={data.bank_details[19].loading}
            />
            <CustomInput
              Label='Fax Number'
              inputType="text"
              inputDefaultValue={data.bank_details[20].value}
              inputDisabled={data.bank_details[20].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.bank_details, data.bank_details[20].key, val) }}
              error={data.bank_details[20].error}
              errorMessage={data.bank_details[20].errorMessage}
              isLoading={data.bank_details[20].loading}
            />
            <CustomInput
              Label='Email Address'
              inputType="text"
              inputDefaultValue={data.bank_details[21].value}
              inputDisabled={data.bank_details[21].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.bank_details, data.bank_details[21].key, val) }}
              error={data.bank_details[21].error}
              errorMessage={data.bank_details[21].errorMessage}
              isLoading={data.bank_details[21].loading}
            />
            <View style={styles.buttonStyle}>
              <CustomButton
                buttonTitle="ADD"
                buttonTheme="create"
                style={styles.btn}
                buttonLoading={false}
                onPress={() => registerNow()}
              />
              <CustomButton
                buttonTitle="CLEAR"
                buttonTheme="create"
                style={styles.btnclear}
                buttonLoading={false}
                onPress={() => clearAllFields()}
              />
            </View>
          </Accordion>
          <View style={{ padding: 5 }} />
          <Accordion title='Questionnaires'>
            <Text styles={{ fontSize: 18 }}>Customer Solutions regularly advise you on the latest web technology tools available?</Text>
            <Text></Text>
            <CustomInput
              Label='Answer'
              inputType="dropDown"
              inputDefaultValue={data.questionnaires_fields[0].value}
              inputDisabled={data.questionnaires_fields[0].inputDisabled}
              //onChangeText={(val) => { setFieldListInfo(data.questionnaires_fields, data.questionnaires_fields[0].key, val) }}
              open={open}
              value={value}
              items={[{ label: 'Yes', value: 'Yes' },
              { label: 'No', value: 'No' },
              {label:'Other', value:'Other'}]}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              error={data.questionnaires_fields[0].error}
              errorMessage={data.questionnaires_fields[0].errorMessage}
              isLoading={data.questionnaires_fields[0].loading}
            />
            <Text styles={{ fontSize: 18 }}>Customer Solutions regularly advise you on the latest web technology tools available?</Text>
            <Text></Text>
            <CustomInput
              Label='Answer'
              inputType="dropDown"
              inputDefaultValue={data.questionnaires_fields[1].value}
              inputDisabled={data.questionnaires_fields[1].inputDisabled}
              //onChangeText={(val) => { setFieldListInfo(data.questionnaires_fields, data.questionnaires_fields[1].key, val) }}
              open={open}
              value={value}
              items={[{ label: 'Yes', value: 'Yes' },
              { label: 'No', value: 'No' },
              {label:'Other', value:'Other'}]}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              error={data.questionnaires_fields[1].error}
              errorMessage={data.questionnaires_fields[1].errorMessage}
              isLoading={data.questionnaires_fields[1].loading}
            />
          </Accordion>
          <View style={{ padding: 5 }} />
          <Accordion title='References'>
            <CustomInput
              Label='Company Name*'
              inputType="text"
              inputDefaultValue={data.references_fields[0].value}
              inputDisabled={data.references_fields[0].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.references_fields, data.references_fields[0].key, val) }}
              error={data.references_fields[0].error}
              errorMessage={data.references_fields[0].errorMessage}
              isLoading={data.references_fields[0].loading}
            />
            <CustomInput
              Label='Country*'
              inputType="text"
              inputDefaultValue={data.references_fields[1].value}
              inputDisabled={data.references_fields[1].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.references_fields, data.references_fields[1].key, val) }}
              error={data.references_fields[1].error}
              errorMessage={data.references_fields[1].errorMessage}
              isLoading={data.references_fields[1].loading}
            />
            <CustomInput
              Label='Contact Name*'
              inputType="text"
              inputDefaultValue={data.references_fields[2].value}
              inputDisabled={data.references_fields[2].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.references_fields, data.references_fields[2].key, val) }}
              error={data.references_fields[2].error}
              errorMessage={data.references_fields[2].errorMessage}
              isLoading={data.references_fields[2].loading}
            />
            <CustomInput
              Label='Email Address*'
              inputType="text"
              inputDefaultValue={data.references_fields[3].value}
              inputDisabled={data.references_fields[3].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.references_fields, data.references_fields[3].key, val) }}
              error={data.references_fields[3].error}
              errorMessage={data.references_fields[3].errorMessage}
              isLoading={data.references_fields[3].loading}
            />
            <CustomInput
              Label='Phone Number*'
              inputType="phoneNumber"
              countryName={constVariables.CONFIGURATION.DEFAULT_COUNTRY_NAME}
              inputDefaultValue={data.references_fields[4].value}
              inputDisabled={data.references_fields[4].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.references_fields, data.references_fields[4].key, val) }}
              error={data.references_fields[4].error}
              errorMessage={data.references_fields[4].errorMessage}
              isLoading={data.references_fields[4].loading}
            />
            <CustomInput
              Label='Alternative Number'
              inputType="phoneNumber"
              countryName={constVariables.CONFIGURATION.DEFAULT_COUNTRY_NAME}
              inputDefaultValue={data.references_fields[5].value}
              inputDisabled={data.references_fields[5].inputDisabled}
              onChangeText={(val) => { setFieldListInfo(data.references_fields, data.references_fields[5].key, val) }}
              error={data.references_fields[5].error}
              errorMessage={data.references_fields[5].errorMessage}
              isLoading={data.references_fields[5].loading}
            />
            <CustomInput
              Label='Position'
              inputType="dropDown"
              inputDefaultValue={data.references_fields[6].value}
              inputDisabled={data.references_fields[6].inputDisabled}
              //onChangeText={(val) => { setFieldListInfo(data.references_fields, data.references_fields[6].key, val) }}
              open={open}
              value={value}
              items={[{ label: 'Sales Director', value: 'Sales Director' },
              { label: 'Sales Manager', value: 'Sales Manager' },
              { label: 'Sales Representative', value: 'Sales Represntative' },
              { label: 'Other', value: 'Other' }]}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              error={data.references_fields[6].error}
              errorMessage={data.references_fields[6].errorMessage}
              isLoading={data.references_fields[6].loading}
            />
            <View style={styles.buttonStyle}>
              <CustomButton
                buttonTitle="ADD"
                buttonTheme="create"
                style={styles.btn}
                buttonLoading={false}
                onPress={() => registerNow()}
              />
              <CustomButton
                buttonTitle="CLEAR"
                buttonTheme="create"
                style={styles.btnclear}
                buttonLoading={false}
                onPress={() => clearAllFields()}
              />
            </View>
          </Accordion>
        </ScrollView>
    </View>
  );
}

export default completeProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 20,
  },
  actionbtn: {
    marginTop: 10,
    marginBottom: 10,
    width: 70,
    height: 30,
    backgroundColor: '#00a0e3',
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,
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
    width: 80,
    height: 30,
    backgroundColor: '#00a0e3',
    padding: 2,
    alignItems: 'center',
    borderRadius: 5,
  },
  btnclear: {
    marginTop: 10,
    marginBottom: 10,
    width: 80,
    height: 30,
    backgroundColor: '#b3b3b3',
    padding: 2,
    alignItems: 'center',
    borderRadius: 5,
  },
  checkboxText: {
    paddingTop: 5,
    fontSize: 15,
    marginRight: 23,
  },
  checkboxText1: {
    paddingTop: 5,
    fontSize: 15,
    marginRight: 260,
  },
  checkboxStyle: {
    marginLeft: 10,
    paddingLeft: -40,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
})