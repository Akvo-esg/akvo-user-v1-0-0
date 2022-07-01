import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import Cookie from 'js-cookie'
import { PersistGate } from 'redux-persist/integration/react'

import '../styles/globals.scss'
import 'font-awesome/css/font-awesome.min.css'
if (typeof window !== "undefined") {
  window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js')
  require("../node_modules/popper.js/dist/umd/popper.min.js")
  require("jquery");
  require("@popperjs/core")
  require("bootstrap");
  require("bootstrap/dist/css/bootstrap.min.css")
  require("bootstrap/dist/js/bootstrap.bundle")
  require("bootstrap/dist/js/bootstrap.min.js")
}

import { store, persistedStore } from '../store/store'

import MainLayout from '../src/components/layouts/MainLayout'
import Login from '../src/components/login/Login'
import PasswordRecover from '../src/components/passwordRecovery/PasswordRecovery'
import SignUp from '../src/components/signUp/SignUp'
import PremiumAccount from '../src/components/premiumAccount/PremiumAccount'
import baseUrl from '../utils/baseUrl'

export default function MyApp({ Component, pageProps }) {

  const router = useRouter()
  const newRoute = router.asPath
  const signUpRoute = newRoute === '/signup'
  const premiumAccount = newRoute === "/premiumAccount"

  const [passwordRecoverRoute, setPasswordRecoverRoute] = useState(false)
  const [token, setToken] = useState(null)

  useEffect(() => {

    hrefVerify()


    if (window.innerWidth < 800) document.documentElement.style.setProperty('--aside-width', '0px')

  }, [])


  const hrefVerify = () => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const queryId = urlSearchParams.get('id')
    const queryToken = urlSearchParams.get('token')

    if (queryId && queryToken) {
      setPasswordRecoverRoute(true)
      var passwordRecoverRoute = true
    }

    if (Cookie.get('auth')) {
      localStorage.setItem('auth', Cookie.get('auth'))
      const localToken = localStorage.getItem('auth')
      setToken(localToken)
    }
    if (!Cookie.get('auth') &&
      window.location.href !== baseUrl() &&
      !passwordRecoverRoute &&
      window.location.href !== `${baseUrl()}/signup` &&
      window.location.href !== `${baseUrl()}/premiumAccount`
    ) {
      setTimeout(async () => {
        await Router.replace('/')
      }, 1000)
    }
  }


  const render = () => {

    if (!token && !passwordRecoverRoute && !signUpRoute && !premiumAccount) {
      return (
        <Provider store={store}>
          <PersistGate persistor={persistedStore}>
            <Login onChange={(token) => setToken(token)} />
          </PersistGate>
        </Provider>
      )
    }

    if (!token && passwordRecoverRoute) {
      return (
        <PasswordRecover />
      )
    }

    if (!token && signUpRoute) {
      return (
        <SignUp />
      )
    }

    if (!token && premiumAccount) {
      return (
        <PremiumAccount />
      )
    }

    if (token) {
      return (
        <div className='fadeItem2s customScroll'>
          <Provider store={store}>
            <PersistGate persistor={persistedStore}>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </PersistGate>
          </Provider>
        </div>
      )
    }
  }

  return (
    <div>
      {render()}
    </div>
  )
}
