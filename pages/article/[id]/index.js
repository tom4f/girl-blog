import { server } from '../../../config'
import Link from 'next/link'
import Meta from '../../../components/Meta'
import Image from 'next/image'
import parse from 'html-react-parser'
import loginStyles from '../../../styles/Login.module.css'
import { useState } from 'react'
import axios from 'axios'
import { AlertBox } from '../../../components/AlertBox';
import { Delay }    from '../../../components/AlertBox';

const article = ({ article, loginStatus, webToken }) => {
  // const router = useRouter()
  // const { id } = router.query
  const [ editArticle, setEditArticle ] = useState( article )

  const [ alert, setAlert ] = useState( { header: '', text: '' } );
  // if 'alert' changed - wait 5s and clear 'alert'
  Delay( alert, setAlert );

  const imagePath = `${server}/fotogalerie_lucka/${editArticle.image}b.jpg`

  const sendData = () => {
    console.log( webToken )


    axios
        .post(
            `${server}/api/pdo_update_blog.php`,
            //`https://www.frymburk.com/rekreace/api/pdo_read_sms.php`,
            {
              ...editArticle,
              fotoGalleryOwner: '_lucka',
              webToken
            },
            { timeout: 5000 }
        )
        .then(res => {

              // allForum = JSON.parse(res.data); --> for native xhr.onload 
              const resp = res.data
    
              // if no user data
              if ( resp.message === 'Blog updated :-)') {
                  // convert string from mySQL to number
                  console.log(resp);
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
              //console.log(err);
            }
        }); 

  }


  return (
    <>
      <Meta title={article.title} description={article.title} />
      {
        loginStatus ? 
         
      ( <form onSubmit={(event) => {
              event.preventDefault();
              sendData();
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
              <label>https://www.olca.cz/article/</label>
              <input
                  type="text"
                  placeholder={editArticle.title_url}
                  onChange={ e => setEditArticle( prev => ( { ...prev, title_url: e.target.value } ) ) }
                  value={editArticle.title_url}
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
              <label>Zadejte číslo fotky</label>
              <input
                  type="text"
                  placeholder={editArticle.image}
                  onChange={ e => setEditArticle( prev => ( { ...prev, image: +e.target.value } ) ) }
                  value={editArticle.image}
              />
              <div style={{ height: '300px', width: '300px', }} > 
                  <div style={{ position: 'relative', maxWidth: '100%', height: '100%' }}  >
                      <Image
                          src={ imagePath }
                          alt="Picture of the author"
                          layout="fill"
                          objectFit="contain"
                          quality={100}
                        />
                  </div>
              </div>
              { imagePath }
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

      </form>) : null

      }
      <h1>{editArticle.title}</h1>
      <div style={{ height: '300px', width: '300px', }} > 
          <div style={{ position: 'relative', maxWidth: '100%', height: '100%' }}  >
              <Image
                  src={ imagePath }
                  alt="Picture of the author"
                  layout="fill"
                  objectFit="contain"
                  quality={100}
                />
          </div>
      </div>
      <>{ parse( editArticle.body ) }</>
      <br />
      <Link href='/'>Zpět</Link>
    </>
  )
}

// or NextJS function : getServerSideProps (Server-side Rendering): Fetch data on each request.
export const getServerSideProps = async (context) => {

  console.log( { server } )

  const res = await fetch(`${server}/api/pdo_read_blog.php`)
  const articles = await res.json()
  const article = articles.find( one => one.title_url.toLowerCase() == context.params.id  )

  return {
    props: {
      article,
    },
  }
}



/*
// getStaticProps should return an object with 'props' 
export const getStaticProps = async (context) => {

  // const res = await fetch(`http://localhost/lipnonet/blog.json`)
  // const res = await fetch(`http://localhost/lipnonet/rekreace/api/pdo_read_blog.php`)
  const res = await fetch(`https://www.frymburk.com/rekreace/api/pdo_read_blog.php`)
  const articles = await res.json()
  const article = articles.find( one => one.id == context.params.id  )

  return {
    props: {
      article,
    },
  }
}


// getStaticPaths = NextJS function : (Static Generation): Specify dynamic routes to pre-render pages based on data.
// it means not only during build time
//   paths: [
//      { params: { id: '1' } },
//      { params: { id: '2' } }
//   ],
export const getStaticPaths = async () => {
  //const res = await fetch(`http://localhost/lipnonet/blog.json`)
  //const res = await fetch(`http://localhost/lipnonet/rekreace/api/pdo_read_blog.php`)
  const res = await fetch(`https://www.frymburk.com/rekreace/api/pdo_read_blog.php`)
  const articles = await res.json()

  const ids = articles.map((article) => article.id)
  const paths = ids.map((id) => ({ params: { id: id.toString() } }))

  return {
    paths,
    // if try to show page which does not exists - show 404 error
    fallback: false,
  }
}

*/


export default article
