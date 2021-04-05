// Link similar like React Router Dom
import { useState } from 'react'
import axios from 'axios'
import NextImage from './NextImage'

import { server } from '../config'
import loginStyles from '../styles/Login.module.css'
import { AlertBox } from './AlertBox';
import { Delay }    from './AlertBox';


const EditOrCreateApi = ( { apiFile, webToken, editArticle, setEditArticle } ) => {

    // pdo_update_blog.php
    const editApiPath = `${server}/api/${apiFile}`
    const deleteApiPath = `${server}/api/pdo_delete_blog.php`
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

      // if 'alert' changed - wait 5s and clear 'alert'
    Delay( alert, setAlert );

    const imagePath = `${server}/fotogalerie_lucka/${editArticle.image}b.jpg`

    const sendData = (editApiPath, axiosData) => {   
        axios
            .post(
                editApiPath,
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


  return (
    <>
        {
         editArticle.id
            ? <section style={{ background: 'red' }}>
                <button onClick={ () => sendData(deleteApiPath, axiosDeleteData) } >Smazat článek</button>
              </section>
            : null
        }

            <form onSubmit={(event) => {
                    event.preventDefault();
                    sendData(editApiPath, axiosData);
                    //setLoginParams({ username: '', password: '' });
                }} name="formular" encType="multipart/form-data">

                <section className={loginStyles.input_section}>
                    <label>Zadejte datum</label>
                    <input
                        type="date"
                        placeholder={editArticle.date}
                        onChange={ e => setEditArticle( prev => ( { ...prev, date: e.target.value } ) ) }
                        value={editArticle.date}
                    />
                </section>

                <section className={loginStyles.input_section} style={{ display: 'flex' }} >
                    <label>https://olca.cz/</label>
                    <input
                        type="text"
                        placeholder={editArticle.title_url}
                        onChange={ e => setEditArticle( prev => ( { ...prev, title_url: e.target.value } ) ) }
                        value={editArticle.title_url}
                    />
                </section>

                <section className={loginStyles.input_section}>
                    <label>Zadejte kategorii</label>
                    <input
                        type="text"
                        placeholder={editArticle.category}
                        onChange={ e => setEditArticle( prev => ( { ...prev, category: e.target.value } ) ) }
                        value={editArticle.category}
                    />
                </section>

                <section className={loginStyles.input_section}>
                    <label>Zadejte nadpis</label>
                    <input
                        type="text"
                        placeholder={editArticle.title}
                        onChange={ e => setEditArticle( prev => ( { ...prev, title: e.target.value } ) ) }
                        value={editArticle.title}
                    />
                </section>

                <section className={loginStyles.input_section}>
                    <label>Zadejte úvod</label>
                    <input
                        type="text"
                        placeholder={editArticle.intro}
                        onChange={ e => setEditArticle( prev => ( { ...prev, intro: e.target.value } ) ) }
                        value={editArticle.intro}
                    />
                </section>

                <section className={loginStyles.input_section}>
                    <label>Zadejte číslo fotky</label>
                    <input
                        type="text"
                        placeholder={editArticle.image}
                        onChange={ e => setEditArticle( prev => ( { ...prev, image: +e.target.value } ) ) }
                        value={editArticle.image}
                    />
                    
                    {
                        editArticle.image
                            ? <>
                                { imagePath }
                                <NextImage src={ imagePath } />
                            </>
                            
                            : <>zadejte číslo hlavní fotky</>
                    }




                </section>



                <section className={loginStyles.input_section}>
                    <label>Zadejte text</label>
                    <textarea
                        type="text"
                        placeholder={editArticle.body}
                        onChange={ e => setEditArticle( prev => ( { ...prev, body: e.target.value } ) ) }
                        value={editArticle.body}
                        rows="30" cols="100"
                    />
                </section>
                { alert.header ? <AlertBox alert={ alert } /> : null }
                <section className={loginStyles.submit_section}>
                    <input type="submit" name="odesli" value="Odeslat" />
                </section>



            </form>
      </>
  )
}

export default EditOrCreateApi