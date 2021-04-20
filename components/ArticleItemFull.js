import { useState }  from 'react'
import { useRouter } from 'next/router';
import Link          from 'next/link'


import { serverPath }  from '../config'
import Meta            from './Meta'
import EditOrCreateApi from './EditOrCreateApi' 
import NextImage       from './NextImage'

// npm install react-markdown
import ReactMarkDown from 'react-markdown';


const ArticleItemFull = ( { article = {}, images = [], loginStatus, webToken, mode }) => {
  
  // why before router cmd - article&images are not defined?
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
  const imagePath = imageNumber => `${serverPath}/fotogalerie_lucka/${imageNumber}b.jpg`
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
            width={ '80%' }
            maxWidth={ '800px' } />

  }

  const flexForEdit = loginStatus ? ({ flexBasis: '100%' }) : ({})

  return (
    <>
        <Meta title={editArticle.title} description={editArticle.title} />
        <section className="blog-container">
            <article style={ flexForEdit }>
                {
                  loginStatus
                      ? <EditOrCreateApi
                            mode = { mode }
                            webToken = { webToken }
                            editArticle = { editArticle }
                            setEditArticle = { setEditArticle }
                            submitButtonText = { `Uložit změny - ${ mode }` } />
                      : null
                }
            </article>
            <article style={ flexForEdit }>
                <small>{ editArticle.date } <b>&rarr;{ editArticle.category }</b></small>
                <h1>{editArticle.title}</h1>
                <div>{editArticle.intro}</div>
                <br/>
                <NextImage
                    src={ imagePath( editArticle.image ) }
                    imageParams={ imageFromDB }
                    width={ '80%' }
                    maxWidth={ '800px' } />

                <ReactMarkDown
                  source={editArticle.body}
                  renderers={renderers}
                />

                <br />
                <Link href='/'>Zpět</Link>
            </article>
        </section>
    </>
  )
}

export default ArticleItemFull