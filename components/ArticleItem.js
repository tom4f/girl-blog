import { server } from '../config'
import Link from 'next/link'
import articleStyles from '../styles/Article.module.css'

import NextImage from './NextImage'

const ArticleItem = ({ article, images, loginStatus }) => {

  const imagePath = `${server}/fotogalerie_lucka/${article.image}b.jpg`
  // get image text
  const imageParamsFromDB = images.find( img => img.id === article.image )

  return (
      <Link href={`/${article.title_url.toLowerCase()}`}>
          {/* or nested Link : <Link href="/article/[id]" as={`/article/${article.id}`} */}
          <a className={articleStyles.card}>
              { loginStatus ? <i>Uprav</i> : null }
              <small>{ article.date } <b>&rarr;{ article.category }</b></small>
              <h3>{article.title}</h3>
              <div>{article.intro}</div>
              <br/>
              <NextImage src={ imagePath } imageParams={ imageParamsFromDB } />
          </a>
      </Link>
  )
}

export default ArticleItem
