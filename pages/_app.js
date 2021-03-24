// wraps all pages components
// To override the default App, create the file ./pages/_app.js as shown below:
import { useState } from 'react'
import Layout from '../components/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

const [ loginStatus, setLoginStatus ] = useState( false )
const [ user, setUser ] = useState( '' )

  return (
    <Layout loginStatus={ loginStatus } user={ user } >
      <Component
          loginStatus={ loginStatus } setLoginStatus={ setLoginStatus }
          user={ user } setUser={ setUser }
          {...pageProps} />
    </Layout>
  )
}

export default MyApp
