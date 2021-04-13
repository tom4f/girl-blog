import Nav from './Nav'
import Meta from './Meta'
import Header from './Header'
import styles from '../styles/Layout.module.css'
import React from 'react'

const Layout = ({ children, loginStatus, setLoginStatus, user, setUser, webToken, setWebToken }) => {
  return (
    <>
      <Meta />
      <Nav loginStatus={ loginStatus } user={ user } />
        <main className={styles.container}>
          <Header />
          {/* {children} */}
          {
              React.cloneElement(children, {
                loginStatus, setLoginStatus,
                webToken, setWebToken,
                user, setUser

              })
          }
        </main>
    </>
  )
}

export default Layout
