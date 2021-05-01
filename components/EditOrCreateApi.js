// Link similar like React Router Dom
import { useState } from 'react'
import axios from 'axios'

import NextImage from './NextImage'
import { serverPath, apiPath, photoFolder, blogApiScriptExt } from '../config'
import loginStyles from '../styles/Login.module.css'
import { AlertBox } from './AlertBox';
import { Delay }    from './AlertBox';


const EditOrCreateApi = ( { webToken, editArticle, setEditArticle, submitButtonText, mode } ) => {

    const axiosData = {
        ...editArticle,
        fotoGalleryOwner: '_lucka',
        webToken
      }

    const axiosDeleteData = {
        id: editArticle.id,
        fotoGalleryOwner: '_lucka',
        webToken
    }

    const [ alert, setAlert ] = useState( { header: '', text: '' } );
    Delay( alert, setAlert );

    const sendData = async (mode, axiosData) => {  

        // path for create or update php API based on mode
        const phpApiPath = `${serverPath}/api/pdo_${mode}_blog${blogApiScriptExt}.php`
        // test if new url already exists for create blog
        if ( mode === 'create' ) {
            const { title_url } = axiosData
            const resp = await fetch( `${apiPath}/api/articles/${title_url}` )
                                .catch( ( err ) => console.log( err ) )
            const respJson =  await resp.json()
                                .catch( ( err ) => console.log( err ) )
            // Optional chaining (?.), obj?.['prop' + 'Name'];
            if ( !!respJson?.article?.title_url ) {
                setAlert( { header: 'Adresa existuje', text: 'zkuste jinou...' } )
                return null
            }
        }



        axios
            .post(
                phpApiPath,
                axiosData,
                { timeout: 5000 }
            )
            .then(res => {
    
                  // allForum = JSON.parse(res.data); --> for native xhr.onload 
                  const resp = res.data
        
                  // if no user data
                  if ( resp.message === 'Blog updated :-)') {
                      // convert string from mySQL to number
                      setAlert( { header: 'OK !', text: 'změny byly uloženy', color: 'lime' } );
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
                  console.log(err);
                }
            }); 
    
      }

      const imagePath = `${serverPath}/${photoFolder}/${editArticle.image}b.jpg`
      const missingStyle = ( input ) => ( { background: `${ input ? 'green' : 'red' }` } )

  return (
    <>
            <form onSubmit={(event) => {
                    event.preventDefault();
                    if ( editArticle.title_url ) {
                        sendData( mode , axiosData)
                    } else null
                    //setLoginParams({ username: '', password: '' });
                }} name="formular" encType="multipart/form-data">

                <section className={loginStyles.input_section} style={{ display: 'flex' }} >
                    <label>https://olca.cz/</label>
                    <input style={ missingStyle( editArticle.title_url ) }
                        type="text"
                        placeholder={editArticle.title_url}
                        onChange={ e => setEditArticle( prev => ( { ...prev, title_url: e.target.value } ) ) }
                        value={editArticle.title_url}
                    />
                </section>

                <section className={loginStyles.input_section}>
                    <label>Zadejte datum</label>
                    <input style={ missingStyle( editArticle.date ) }
                        type="date"
                        placeholder={editArticle.date}
                        onChange={ e => setEditArticle( prev => ( { ...prev, date: e.target.value } ) ) }
                        value={editArticle.date}
                    />
                </section>

                <section className={loginStyles.input_section}>
                    <label>Zadejte kategorii</label>
                    <input style={ missingStyle( editArticle.category ) }
                        type="text"
                        placeholder={editArticle.category}
                        onChange={ e => setEditArticle( prev => ( { ...prev, category: e.target.value } ) ) }
                        value={editArticle.category}
                    />
                </section>

                <section className={loginStyles.input_section}>
                    <label>Zadejte nadpis</label>
                    <input style={ missingStyle( editArticle.title ) }
                        type="text"
                        placeholder={editArticle.title}
                        onChange={ e => setEditArticle( prev => ( { ...prev, title: e.target.value } ) ) }
                        value={editArticle.title}
                    />
                </section>

                <section className={loginStyles.input_section}>
                    <label>Zadejte úvod</label>
                    <textarea style={ missingStyle( editArticle.intro ) }
                        type="text"
                        placeholder={editArticle.intro}
                        onChange={ e => setEditArticle( prev => ( { ...prev, intro: e.target.value } ) ) }
                        value={editArticle.intro}
                        rows="3" cols="55" wrap="Yes"
                    />
                </section>

                <section className={loginStyles.input_section}>
                    <label>Zadejte číslo fotky</label>
                    <input style={ missingStyle( editArticle.image ) }
                        type="text"
                        placeholder={editArticle.image}
                        onChange={ e => setEditArticle( prev => ( { ...prev, image: e.target.value } ) ) }
                        value={editArticle.image}
                    />
                    
                    {
                        editArticle.image
                            ? <>
                                <small><sup>{ imagePath }</sup></small>
                                <NextImage src={ imagePath } />
                              </>                           
                            : <>zadejte číslo hlavní fotky</>
                    }
                </section>

                <section className={loginStyles.input_section}>
                    <label>Zadejte text</label>
                    <textarea style={ missingStyle( editArticle.body ) }
                        type="text"
                        placeholder={editArticle.body}
                        onChange={ e => setEditArticle( prev => ( { ...prev, body: e.target.value } ) ) }
                        value={editArticle.body}
                        rows="40" cols="55" wrap="Yes"
                    />
                </section>

                { alert.header ? <AlertBox alert={ alert } /> : null }
                
                <section className={loginStyles.submit_section}>
                    <input type="submit" name="odesli" value={ submitButtonText } />
                </section>
            </form>
            {
         editArticle.id
            ? <section className={loginStyles.submit_section}>
                <button onClick={ () => sendData( 'delete', axiosDeleteData) } >Smazat článek</button>
              </section>
            : null
        }
      </>
  )
}

export default EditOrCreateApi