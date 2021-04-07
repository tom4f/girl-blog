// wraps all pages components
// To override the default App, create the file ./pages/_app.js as shown below:
import { useState } from 'react'
import '../styles/globals.css'
import Layout from '../components/Layout'


function MyApp({ Component, pageProps }) {

const [ loginStatus, setLoginStatus ] = useState( false )
const [ user, setUser ] = useState( '' )
const [ webToken, setWebToken ] = useState( 'error' )

  return (
    <Layout
        loginStatus={ loginStatus } setLoginStatus={ setLoginStatus }
        user={ user } setUser={ setUser }
        webToken={ webToken } setWebToken={ setWebToken }>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
