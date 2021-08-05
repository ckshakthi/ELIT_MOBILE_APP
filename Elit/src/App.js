import React, { useState } from 'react'
import Router from './navigations'
import { Provider } from 'react-redux'
import { store } from './redux/stores/store'
import * as constFunction from './utils/const.functions'
import ApiProvider from './services/ApiProvider'
import ApiList from './utils/const.apis'
import constVariable from './utils/const.variables'
import { ToastAndroid } from 'react-native'
import * as eva from '@eva-design/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'

const App = (props) => {
  const [data, setData] = useState({
    showSignout: false,
  })
  setInterval(() => {
    timer()
  }, 5000);

  //Timer function is used for session management of auto logout if user is inactive for 5 minutes.
  const timer = async () => {
    if (constFunction.isLogin()) {
      constFunction.loginTimeDiff().then(logTimeDiff => {
        if (logTimeDiff.minutes >= constVariable.LOGIN_REFRESH_TIME_MINUTES) {
          constFunction.getDataFromAsyncStorage('userinfo').then(userInfo => {
            var request = {
              refreshToken: userInfo.refreshToken,
            }
            ApiProvider.auth(ApiList.API_URL_FOR_REFRESH_TOKEN, request).then(res => {
              if (res.DML_STATUS === "S") {
                var userinfo = userInfo
                userinfo.token = res.TOKEN
                userinfo.loggedInTime = Date()
                constFunction.storeDataToAsyncStorage('userinfo', userinfo)
              } else {
                setData({ showSignout: true })
              }
            })
          })
        }
      })
    }
  }

  const logoutNow = () => {
    constFunction.storeDataToAsyncStorage('userinfo', null)
    props.navigation.navigate("Login")
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Provider store={store}>
          <Router />
        </Provider>
      </ApplicationProvider>
      {data.showSignout && (
        ToastAndroid.show(
          "Your session has expired",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        ),
        props.navigation.navigate("Login")
      )}
    </>
  )
}
export default App