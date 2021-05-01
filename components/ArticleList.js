import ArticleItem from './ArticleItem'
import ArticleItemFull from '../components/ArticleItemFull'
import articleStyles from '../styles/Article.module.css'
import { useState } from 'react'

export default function ArticleList({ articles, images, loginStatus, webToken }) {
  const [ isCreateBlog, setIsCreateBlog ] = useState( false )
  const now = new Date()
  const [ year, month, day ] = [ now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() ]
  const creationDate = `${year}-${`0${month}`.slice(-2)}-${`0${day}`.slice(-2)}`
  const emptyArticle = {
      date: creationDate,
      category: '',
      title: '',
      title_url: 'novy-clanek-jupi',
      intro: '',
      image: '1',
      body: '',
  }

  return (
    <>
      { loginStatus ? <div style={{ textAlign: 'center' }}>
                        <button onClick={ () => setIsCreateBlog( (prev) => !prev ) }  >
                          { isCreateBlog ? 'zavřít' : 'přidat nový článek' }
                        </button>
                          { isCreateBlog
                            ? <ArticleItemFull
                                  mode="create"
                                  article={ emptyArticle }
                                  images={ images }
                                  loginStatus={ loginStatus }
                                  webToken={ webToken }
                              />
                            : null }
                      </div>
                    : null
      }
      { isCreateBlog ? null
                     : <article className={articleStyles.grid}>
                          { articles.map( article => (
                              article.id > 1
                                ? <ArticleItem
                                    key = { article.id }
                                    article = { article }
                                    images = { images }
                                    loginStatus = { loginStatus }
                                  />
                                : null
                          )) }
                     </article>
      }
    </>
  )
}