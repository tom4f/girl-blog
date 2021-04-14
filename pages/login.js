import loginStyles from '../styles/Login.module.css'
import { server } from '../config'
import axios from 'axios';
import React, { useState } from 'react';
import { AlertBox } from '../components/AlertBox';
import { Delay }    from '../components/AlertBox';
import Meta from '../components/Meta'
import Router from 'next/router'

const login = ( { setLoginStatus, setUser, setWebToken } ) => {


    const [ loginParams, setLoginParams ]   = useState( { user: '', password: '', fotoGalleryOwner: '_lucka' } );
    const [ showPassword, setShowPassword ] = useState( false );
    const [ alert, setAlert ] = useState( { header: '', text: '' } );
    // if 'alert' changed - wait 5s and clear 'alert'
    Delay( alert, setAlert );


    const getData = () => {

        if (!loginParams.user || !loginParams.password) {
            setAlert( { header: 'Uživatelské jméno / heslo', text: 'vyplňte údaje' } );
            return null
        }

        if (!/^[a-zA-Z0-9\-_]{3,12}$/.test(loginParams.user)) {
            setAlert( { header: 'Špatné jméno', text: 'zadejte 3 až 10 znaků (0-9 a..z A..Z - _ )' } );
            return null;
        } 

        if (!/^[a-zA-Z0-9.\-_]{3,12}$/.test(loginParams.password)) {
            setAlert( { header: 'Špatné heslo!', text: 'zadejte 3 až 10 znaků (0-9 a..z A..Z - . _ )' } );
            return null;
        } 

    
          axios
              .post(
                  `${server}/api/foto_login.php`,
                  //`https://www.frymburk.com/rekreace/api/pdo_read_sms.php`,
                  loginParams,
                  { timeout: 5000 }
              )
              .then(res => {
    
                    // allForum = JSON.parse(res.data); --> for native xhr.onload 
                    const resp = res.data
                    console.log( resp[0].webToken );
                    // if error in response

                    if( resp[0].webToken === 'error' ) {
                        setAlert( { header: 'Přihlášení se nepovedlo !', text: 'zkuste později...' } );
                        return null
                    }

                    if ( typeof resp[0].webToken === 'string' ) {
                        console.log(  `Uzivatel ${resp[2].webUser} je prihlasen` );
                        // convert string from mySQL to number
                        setUser( resp[2].webUser )
                        setLoginStatus(true);
                        setWebToken( resp[0].webToken );
                        console.log( resp[0].webToken );
                        Router.push('/')
                        return null
                    }  
   
                    setAlert( { header: 'Neznámá chyba !', text: 'zkuste později...' } );
      
              })
              .catch(err => {
                  if (err.response) {
                    // client received an error response (5xx, 4xx)
                    setAlert( { header: 'Neznámá chyba !', text: 'error response (5xx, 4xx)' } );
                    console.log(err.response);
                  } else if (err.request) {
                    // client never received a response, or request never left
                    setAlert( { header: 'Neznámá chyba !', text: 'never received a response, or request never left' } );
                    console.log(err.request);
                  } else {
                    // anything else
                    setAlert( { header: 'Neznámá chyba !', text: 'Error: anything else' } );
                    //console.log(err);
                  }
              });   
      }



  return (
    <div>
      <Meta title='Login' />
      <article className={loginStyles.container_login}>
            <header className={loginStyles.header_label}>Přihlášení uživatele</header>
            <form onSubmit={(event) => {
                event.preventDefault();
                getData();
                //setLoginParams({ username: '', password: '' });
            }} name="formular" encType="multipart/form-data">
                
                <section className={loginStyles.input_section}>
                    <label>Zadejte uživatelské jméno</label>
                    <input
                        type="text"
                        placeholder="Username or Email..."
                        onChange={ (e) => setLoginParams( current => ({ ...current,  user: e.target.value, fotoGalleryOwner: '_lucka' }) )     }
                        value={loginParams.user}
                    />
                </section>
                <section className={loginStyles.input_section}>
                    <label>Zadejte heslo</label><br/>
                    <input
                        type={ showPassword ? "text" : "password" }
                        placeholder="Password..."
                        onChange={ (e) => setLoginParams( current => ({ ...current,  password: e.target.value, fotoGalleryOwner: '_lucka' }) )     }
                        value={loginParams.password}
                        autoComplete="on"
                    />
                    <span onMouseOver={ () => setShowPassword( true ) }
                          onMouseOut ={ () => setShowPassword( false ) } >
                        Show
                    </span>
                </section>
                { alert.header ? <AlertBox alert={ alert } /> : null }
                <section className={loginStyles.submit_section}>
                    <input type="submit" name="odesli" value="Přihlásit" />
                </section>
            </form>
        </article>


    </div>
  )
}

export default login
