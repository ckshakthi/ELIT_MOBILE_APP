import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native'
import {Button} from 'react-native-elements'
import * as constFunction from '../../utils/const.functions';
import { Cards } from '../../components/Dashboard.charts'

import { Linechart, Barchart, Harizontalbarchart, Progreschart } from '../../components/Dashboard.charts'
import { totalSourcingCount, quoteShipmentNotice, userchartData, carouselItemses } from '../../data/TempData'


const Dashboard = ({ navigation }) => {
  const [data, setData] = useState({
    roleName: 'ADMIN',
    cards: false,
    chartList: [],
  });
  const [chartList, setChartList] = useState([]);

  useEffect(() => {
    checkUserInfo()
  }, []);

  const logoutNow = () => {
    constFunction.storeDataToAsyncStorage('userinfo', null)
    navigation.navigate("Login")
  }
  const checkUserInfo = () => {
    constFunction.getDataFromAsyncStorage('userinfo').then(res => {
      if (res.roleName === "ADMIN" || res.roleName === "DEMO_ADMIN") {
        setData({ roleName: res.roleName, cards: res.roleName === "BUYER" ? true : false })
        setChartList(["TOTAL_QUOTATION_CHART", "PURCHASE_ORDER_CHART", "QUOTE_SHIPMENT_NOTICE", "TOTAL_EX_CR_INVOICE", "INTERNAL_EXTERNAL_USER_CHART"])
      } else if (res.roleName === "BUYER" || res.roleName === "SRC_TMEMBER") {
        setData({ roleName: res.roleName, cards: res.roleName === "BUYER" ? true : false })
        setChartList(["PURCHASE_ORDER_CHART", "TOTAL_QUOTATION_CHART", "QUOTE_SHIPMENT_NOTICE", "TOTAL_EX_CR_INVOICE", "INTERNAL_EXTERNAL_USER_CHART"])
      } else if (res.roleName === "SUP_USER" || res.roleName === "SUP_ADMIN") {
        setData({ roleName: res.roleName, cards: res.roleName === "BUYER" ? true : false })
        setChartList(["INTERNAL_EXTERNAL_USER_CHART", "PURCHASE_ORDER_CHART", "TOTAL_QUOTATION_CHART", "QUOTE_SHIPMENT_NOTICE", "TOTAL_EX_CR_INVOICE"])
      }
    }
    )

  }

  const renderCardInsideCarousal = () => {
    return <><ScrollView style={{ flexDirection: 'row', marginTop: 20 }}
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      <Cards
        title="ACTIVE"
        percent={20}
        bg="#FFF"
        number="113"
      />
      <Cards
        title="INACTIVE"
        percent={20}
        bg="#FFF"
        number="113"
      />
      <Cards
        title="CLOSED"
        percent={20}
        bg="#FFF"
        number="113"
      />
      <Cards
        title="OPEN"
        percent={20}
        bg="#FFF"
        number="113"
      />
      <Cards
        title="Awarded"
        percent={20}
        bg="#FFF"
        number="113"
      />
    </ScrollView></>
  }

  return (
    <>
      <ScrollView style={styles.scrollView}>
        {data.cards === true ? renderCardInsideCarousal() : null}
        <View>
          {chartList.map((value, index) => {
            if (value === "TOTAL_QUOTATION_CHART") {
              return <Linechart key={index} data={totalSourcingCount} Title={'Total Sourcing Count'} width={340} height={300} />
            }
            if (value === "PURCHASE_ORDER_CHART") {
              return <Harizontalbarchart key={index} Title={'Purchase Order Summary'} />
            }
            if (value === "INTERNAL_EXTERNAL_USER_CHART") {
              return <Progreschart key={index} data={userchartData} width={340} height={300} Title={'Users'} />
            }
            if (value === "QUOTE_SHIPMENT_NOTICE") {
              return <Barchart key={index} data={quoteShipmentNotice} Title={'Quote Shipment Notice'} width={340} height={300} />
            }
          })}
        </View>
        <View>
          <Button
            title="Logout"
            titleStyle={{ color:'#fff'}}
            type="Clear"
            containerStyle={styles.btn}
            onPress={logoutNow}
          />
        </View>
      </ScrollView>
    </>
  );
}
export default Dashboard
const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 0,
  },
  btn:{
    backgroundColor:'#668cff',
    height:40,
    width:80,
    marginTop:10,
    marginBottom:10,
    marginLeft:150
  },
});