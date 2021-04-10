// https://gingervitis.net/posts/wrangling-with-the-new-nextjs-image
// https://www.theviewport.io/post/using-nextjs-and-nextimage-with-mdx-markdown-processing
import { useState }  from 'react'
import { useRouter } from 'next/router';
import Link          from 'next/link'

import { server }      from '../../config'
import Meta            from '../../components/Meta'
import EditOrCreateApi from '../../components/EditOrCreateApi' 
import NextImage       from '../../components/NextImage'

// npm install react-markdown
import ReactMarkDown from 'react-markdown';


const article = ( { article = {}, images = [], loginStatus, webToken }) => {
  
  // why before router article&images are not defined?
  // without router default values must be defined? article = {}, images = []
  const router = useRouter();
  console.log( 'router.isFallback= ' + router.isFallback )
  if ( router.isFallback ) {
   return <div>Loading...</div>;
 }

  // const router = useRouter()
  // const { id } = router.query
  const [ editArticle, setEditArticle ] = useState( article )
  
  // get image path from image number
  const imagePath = imageNumber => `${server}/fotogalerie_lucka/${imageNumber}b.jpg`
  // 
  const imageFromDB       =          images.find( img => img.id === editArticle.image )
  const imageParamsFromDB = image => images.find( img => img.id === image.src.slice(1) )

  const renderers = {

    paragraph: props =>
    {
        //console.log( props.children[0].type.name )
        return props.children[0].type.name === "image"
            ? <div style={{ width: '100%' }} {...props} />
            : <p {...props} />
    },
      
    image: markDownImage => 
        <NextImage
            src={ imagePath( markDownImage.src.slice( 1 ) ) }
            imageParams={ imageParamsFromDB( markDownImage ) }
            maxWidth={ '800px' } />

  }

  return (
    <>
      <Meta title={editArticle.title} description={editArticle.title} />
      {
        loginStatus
            ? <EditOrCreateApi
                  apiFile = 'pdo_update_blog.php'
                  webToken = { webToken }
                  editArticle = { editArticle }
                  setEditArticle = { setEditArticle } />
            : null
      }

      <small>{ editArticle.date } <b>&rarr;{ editArticle.category }</b></small>
      <h3>{editArticle.title}</h3>
      <div>{editArticle.intro}</div>
      <br/>
      <NextImage src={ imagePath( editArticle.image ) } imageParams={ imageFromDB } maxWidth={ '800px' } />

      <ReactMarkDown
        source={editArticle.body}
        renderers={renderers}
      />

      <br />
      <Link href='/'>Zpět</Link>
    </>
  )
}


// or NextJS function : getServerSideProps (Server-side Rendering): Fetch data on each request.
export const getStaticProps = async (context) => {


  const urlList = [
    `/api/pdo_read_blog.php?title_url=${context.params.id}`,
    '/api/pdo_read_foto_lucka.php'
  ]

  const fetchList = urlList.map( url => 
      fetch( `${server}${url}` )
        .then( response => response.json() )
  )
  
  const [ articles, images ] = await Promise.all( fetchList )
      .catch( () => [
          [{
              id: '99999',
              title: 'Chyba :-)',
              title_url: 'error',
              intro: '',
              body: ``,      
              category: 'Error',
              image: '5',
              date: `${new Date()}`
          }],
          []
      ])

  return {
    props: {
      article: articles[0],
      images: images
    },
    revalidate: 10,
  }
}


// This function gets called at build time
export const getStaticPaths = async ( ) => {

  const res = await fetch( `${server}/api/pdo_read_blog.php` )
  const articles = await res.json()
  const paths = articles.map( article => ({ params: { id: article.title_url.toLowerCase() } }) )

  return {
    paths,
    // to show 404 This page could not be found.
    fallback: true,
  }
}


export default article