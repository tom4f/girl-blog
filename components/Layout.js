import Nav from './Nav'
import Meta from './Meta'
import Header from './Header'
import styles from '../styles/Layout.module.css'
import React from 'react'

const Layout = ({ children, loginStatus, user }) => {
  return (
    <>
      <Meta />
      <Nav loginStatus={ loginStatus } user={ user } />
      <div className={styles.container}>
        <main className={styles.main}>
          <Header />
              {/* {children} */}

          {
              React.cloneElement(children, {
                loginStatus: loginStatus,
              })
          }

        </main>
      </div>
    </>
  )
}

export default Layout
