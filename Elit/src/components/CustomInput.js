import React, { useState, useRef } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
//import { Select, SelectItem, Autocomplete, AutocompleteItem, Datepicker, Icon } from '@ui-kitten/components'
import { Datepicker, Icon, Layout } from '@ui-kitten/components'
//import { DatePickerModal } from 'react-native-paper-dates'
import { windowHeight, windowWidth } from '../utils/Dimensions'
import { Input, CheckBox } from 'react-native-elements'
import Feather from 'react-native-vector-icons/Feather'
import PhoneInput from 'react-native-intl-phone-input'
import DateTimePicker from "react-native-modal-datetime-picker"
import DropDown from 'react-native-picker-select'
import DropDownPicker from 'react-native-dropdown-picker'
import Autocomplete from 'react-native-autocomplete-input'


const CustomInput = (props) => {

  const [data, setData] = useState({
    isOpenIcon: false,
    passwordType: props.inputType === "password" ? "password" : "text",
    secureTextEntry: true,
    isDatePickerVisible: false,
  })

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }

  const CalendarIcon = (props) => (
    <Icon {...props} name='calendar' />
  )

  const onChangeText = (ev) => {
    let onChangeTextFn = props.onChangeText
    onChangeTextFn && onChangeTextFn(ev)
  }

  const onBlur = (ev) => {
    let onBlurFn = props.onBlur
    onBlurFn && onBlurFn(ev)
  }

  const checked = (ev) => {
    let checkedFn = props.checked
    checkedFn && checkedFn(ev)
  }

  const onChangeFormattedText = (ev) => {
    let onChangeFormattedTextFn = props.onChangeFormattedText
    onChangeFormattedTextFn && onChangeFormattedTextFn(ev)
  }

  const OnSelect = (ev) => {
    let onSelectFn = props.onSelect
    onSelectFn && onSelectFn(ev)
  }
  const handleConfirm = (date) => {
    let handleConfirmFn = props.handleConfirm
    handleConfirmFn && handleConfirmFn(date)
  }

  const hideDatePicker = (ev) => {
    let hideDatePickerFn = props.hideDatePicker
    hideDatePickerFn && hideDatePickerFn(ev)
  }

  const onValueChange = (ev) => {
    let onValueChangeFn = props.onValueChange
    onValueChangeFn && onValueChangeFn(ev)
  }

  const onChangeValue = ev => {
    let onChangeValueFn = props.onChangeValue;
    onChangeValueFn && onChangeValueFn(ev);
  }

  const rightIcon = () => {
    return (
      <>
        {props.inputType === "password" &&
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ?
              <Feather name="eye" color="grey" size={23} />
              : <Feather name="eye-off" color="grey" size={23} />
            }
          </TouchableOpacity>
        }
      </>
    )
  }
  return (
    <View >
      {props.inputType === "loginText" || props.inputType === "password" ?
        <Input
          label={props.Label}
          onBlur={onBlur.bind(this)}
          labelStyle={styles.labelStyle}
          style={styles.input}
          value={props.inputDefaultValue}
          disabled={props.inputDisabled}
          errorMessage={props.errorMessage}
          autoCapitalize={props.inputAutoCapitalize}
          placeholder={props.placeholderText}
          leftIcon={{ type: 'font-awesome', name: props.inputIcon, color: "grey" }}
          rightIcon={rightIcon}
          keyboardType={props.inputKeyboardType}
          numberOfLines={props.inputNumberOfLines}
          secureTextEntry={props.inputType === "password" && data.secureTextEntry}
          onChangeText={onChangeText.bind(this)}
        />
        : null}
      {props.inputType === "text" || props.inputType === "url" || props.inputType === "email" || props.inputType === "number" ?
        <Input
          label={props.Label}
          onBlur={onBlur.bind(this)}
          labelStyle={styles.lableTextStyle}
          inputContainerStyle={styles.inputContainer}
          value={props.inputDefaultValue}
          disabled={props.inputDisabled}
          errorMessage={props.errorMessage}
          autoCapitalize={props.inputAutoCapitalize}
          placeholder={props.placeholderText}
          keyboardType={props.inputKeyboardType}
          numberOfLines={props.inputNumberOfLines}
          onChangeText={onChangeText.bind(this)}
        />
        : null}

      {props.inputType === "disabledtext" ?
        <Input
          label={props.Label}
          onBlur={onBlur.bind(this)}
          labelStyle={styles.lableTextStyle}
          inputContainerStyle={styles.disabledinputContainer}
          value={props.inputDefaultValue}
          disabled={props.inputDisabled}
          errorMessage={props.errorMessage}
          autoCapitalize={props.inputAutoCapitalize}
          placeholder={props.placeholderText}
          keyboardType={props.inputKeyboardType}
          numberOfLines={props.inputNumberOfLines}
          onChangeText={onChangeText.bind(this)}
        />
        : null}

      {props.inputType === "checkbox" ?
        <>
          <Text style={styles.customLabelTextStyle}>{props.Label}</Text>
          <CheckBox
            center={props.inputPosition}
            title={props.inputTitle}
            checkedIcon={props.inputIconType}
            checked={checked.bind(this)}
          />
        </>
        : null}

      {props.inputType === "phoneNumber" ?
        <>
          <Text style={styles.customLabelTextStyle}>{props.Label}</Text>
          <PhoneInput
            containerStyle={styles.phoneContainer}
            placeholder="Phonenumber"
            defaultCountry={props.countryName}
            defaultValue={props.inputDefaultValue}
            disableCountryChange={props.inputDisabled}
            flagStyle={styles.flagStyle}
            dialCodeTextStyle={styles.dialCodeStyle}
            phoneInputStyle={styles.phoneInput}
            onChangeText={onChangeText.bind(this)}
          />
        </>
        : null}

      {props.inputType === "DataPicker" ?
        <Datepicker
          label={props.Label}
          lableTextStyle={styles.lableTextStyle}
          caption=''
          style={styles.datePicker}
          placeholder={props.inputPlaceholder}
          date={new Date()}
          accessoryRight={CalendarIcon}
          onSelect={OnSelect.bind(this)}
        />
        : null}
      {props.inputType === "DataTimePicker" ?
        <>
          <Text style={styles.customLabelTextStyle}>{props.Label}</Text>
          <DateTimePicker
            isVisible={data.isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirm.bind(this)}
            onCancel={hideDatePicker.bind(this)}
          />
        </>
        : null}

      {props.inputType === "select" ?
        <>
          <Text style={styles.customLabelTextStyle}>{props.Label}</Text>
          <DropDown
            style={styles.select}
            placeholder={props.inputPlaceholder}
            value={props.inputDefaultValue}
            items={props.inputItems}
            style={styles.inputField}
            onValueChange={onValueChange.bind(this)}
          />
        </>
        : null}
      {props.inputType === 'dropDown' ? (
        <>
          <Text style={styles.customLabelTextStyle}>{props.Label}</Text>
          <DropDownPicker
            open={props.open}
            searchable={props.searchable}
            value={props.value}
            disabled={props.inputDisabled}
            items={props.items}
            setOpen={props.setOpen}
            setValue={props.setValue}
            setItems={props.setItems}
            style={styles.dropDownContainer}
            disabledStyle={{width:'92%'}}
            //containerStyle={{ width: '92%'}}
          //onChangeValue={onChangeValue.bind(this)}
          />
        </>
      ) : null}
      {props.inputType === "Autocomplete" ?
        <>
          <Text style={styles.customLabelTextStyle}>{props.Label}</Text>
          <Autocomplete
            placeholder={props.placeholderText}
            autoCapitalize={props.inputAutoCapitalize}
            autoCorrect={props.inputAutoCorrect}
            data={props.inputData}
            defaultValue={props.inputDefaultValue}
            value={props.inputQuery}
            onChangeText={onChangeText.bind(this)}
            containerStyle={styles.autocompleteContainer}
          // flatListProps={{
          //   keyExtractor: (_, idx) => idx,
          //   renderItem: ({ item }) => <Text>{item}</Text>,
          // }}
          />
        </>

        : null}

      {props.Label !== "" && props.Label !== null && (
        props.error || props.invalid ? (<>
          {props.errorMessage !== undefined && props.errorMessage !== "" ?
            (
              <Text style={styles.errorMessageText}>{props.Label.replace("*", "") + props.errorMessage}</Text>
            ) : (
              props.invalid ?
                <Text style={styles.errorMessageText}>{props.Label.replace("*", "") + " is Invalid"}</Text>
                :
                props.inputType === "select" ? (
                  <Text style={styles.errorMessageText}>{"Please select " + props.Label.replace("*", "")}</Text>
                ) : (
                  <Text style={styles.errorMessageText}>{"Please provide " + props.Label.replace("*", "")}</Text>
                )
            )}
        </>) : (
          props.inputType !== "checkbox" && (
            <Text style={styles.errorMessageText}></Text>
          )
        )
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: -20,
    width: '97%',
    height: 40,
    borderColor: '#ccc',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  disabledinputContainer: {
    marginTop: 5,
    marginBottom: -20,
    width: '97%',
    height: 40,
    borderColor: '#ccc',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#faf9f7',
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  select: {
    flex: 1,
    margin: 2,
  },
  labelStyle: {
    color: '#05375a',
    marginTop: 16,
    marginBottom: 10,
    fontSize: 18,
  },
  lableTextStyle: {
    color: '#05375a',
    fontSize: 14
  },
  customLabelTextStyle: {
    color: '#05375a',
    padding: 5,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10
  },
  leftIcon: {
    color: 'grey'
  },
  phoneContainer: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 40,
    width: '92%',
    marginBottom: 6,
  },
  dropDownContainer: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 43,
    width: '92%',
    marginBottom: 6,
  },
  flagStyle: {
    height: 40,
    fontSize: 28
  },
  dialCodeStyle: {
    height: 30,
    fontSize: 18
  },
  phoneInput: {
    height: 40,
    fontSize: 18
  },
  datePicker: {
    //borderWidth:1,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 40,
    width: '92%',
    marginLeft: 10,
    marginBottom: 30
  },
  select: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  // autocompleteContainer: {
  //   flex: 1,
  //   position: 'absolute',
  //   zIndex: 1,
  //   borderWidth:1,
  //   borderRadius:8
  // },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    width: windowWidth / 1.2,
    height: windowHeight / 15,
  },
  errorMessageText: {
    color: '#ff0000',
    fontSize: 10,
    marginLeft: 14
  }
});