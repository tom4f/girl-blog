import { server } from '../config'
import Link from 'next/link'
import articleStyles from '../styles/Article.module.css'
import Image from 'next/image'
import parse from 'html-react-parser'

const ArticleItem = ({ article, loginStatus }) => {

  const imagePath = `${server}/fotogalerie_lucka/${article.image}.jpg`

  return (
    <Link href={`/article/${article.title_url.toLowerCase()}`}>
  {/* or nested Link : <Link href="/article/[id]" as={`/article/${article.id}`} */}
      <a className={articleStyles.card}>
        {
         loginStatus ? <i>Uprav</i> : null
        }
        <h3>{article.title} &rarr;</h3>
        <Image
          src={ imagePath }
          alt="Picture of the author"
          width={500}
          height={500}
        />
        <>{ parse( article.body.slice(0, 200) ) }...</>
        <p><small>{ article.date }</small></p>
      </a>
    </Link>
  )
}

export default ArticleItem
