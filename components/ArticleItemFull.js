import { useState }    from 'react'
import { useRouter }   from 'next/router';
import Link            from 'next/link'
import ReactMarkDown   from 'react-markdown';
import { serverPath }  from '../config'
import { photoFolder } from '../config'
import Meta            from './Meta'
import EditOrCreateApi from './EditOrCreateApi' 
import NextImage       from './NextImage'
import articleFullStyles     from '../styles/ArticleFull.module.css'

export default function ArticleItemFull( { article = {}, images = [], loginStatus, webToken, mode }) {
  
  const [ editArticle, setEditArticle ] = useState( article )
  const imagePath = imageNumber => `${serverPath}/${photoFolder}/${imageNumber}b.jpg`
  const imageFromDB       =          images.find( img => img.id === editArticle.image )
  const imageParamsFromDB = image => images.find( img => img.id === image.src.slice(1) )
  const flexBoxForEdit = loginStatus ? ({ flexBasis: '100%' }) : ({})

  const components = {
    p: props     => props.children[0]?.type?.name === "img"
                              ? <div style={{ width: '100%' }} {...props} />
                              : <a {...props} />,
    img: markDownImage => <NextImage
                              src={ imagePath( markDownImage.src.slice( 1 ) ) }
                              imageParams={ imageParamsFromDB( markDownImage ) }
                              width={ '80%' }
                              maxWidth={ '800px' } />
  }

  const router = useRouter();
  return router.isFallback
        ? <div>Loading Blog...</div>
        : <section className={ articleFullStyles.blogContainer}>
              <Meta title={editArticle.title} description={editArticle.title} />
              <article style={ flexBoxForEdit }>
                  {  loginStatus
                        ? <EditOrCreateApi
                              mode = { mode }
                              webToken = { webToken }
                              editArticle = { editArticle }
                              setEditArticle = { setEditArticle }
                              submitButtonText = { `Uložit změny - ${ mode }` } />
                        : null }
              </article>
              <article style={ flexBoxForEdit }>
                  <small>{ editArticle.date } <b>&rarr;{ editArticle.category }</b></small>
                  <h1>{editArticle.title}</h1>
                  <div className={ articleFullStyles.intro}>{editArticle.intro}</div>
                  <NextImage
                      src={ imagePath( editArticle.image ) }
                      imageParams={ imageFromDB }
                      width={ '80%' }
                      maxWidth={ '800px' } />
                  <ReactMarkDown
                      children={editArticle.body}
                      components={components} />
                  <div className={ articleFullStyles.link}><Link href='/'>Zpět</Link></div>
              </article>
          </section>
}