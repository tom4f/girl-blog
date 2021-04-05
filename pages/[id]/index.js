// https://gingervitis.net/posts/wrangling-with-the-new-nextjs-image
// https://www.theviewport.io/post/using-nextjs-and-nextimage-with-mdx-markdown-processing
import { useState } from 'react'
import Link  from 'next/link'

import { server } from '../../config'
import Meta     from '../../components/Meta'
import EditBlog from '../../components/EditBlog' 
import NextImage from '../../components/NextImage'

// npm install react-markdown
import ReactMarkDown from 'react-markdown/with-html';
// npm install --save remark-shortcodes

import { useRouter } from 'next/router';

const article = ( { article, image: imageFromDB, images, loginStatus, webToken }) => {

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
      <Meta title={article.title} description={article.title} />
      {
        loginStatus
            ? <EditBlog
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
        escapeHtml={false}
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

  const res = await fetch( `${server}/api/pdo_read_blog.php` )
  const articles = await res.json()
  const article = articles.find( one => one.title_url.toLowerCase() === context.params.id  )

  // get image data
  const resImages = await fetch(
    `${server}/api/pdo_read.php`,
    {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            fotoGalleryOwner: "_lucka",
            searchCriteria: "WHERE typ < 10"
          }
        )
    }
)
const images = await resImages.json()
const image = images.find( img => img.id === article.image )

  return {
    props: {
      article,
      articles,
      image,
      images
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