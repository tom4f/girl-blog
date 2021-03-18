import Link from 'next/link'
import articleStyles from '../styles/Article.module.css'
import Image from 'next/image'

const ArticleItem = ({ article }) => {

  const imagePath = article.image

  return (
    <Link href={`/article/${article.title_url.toLowerCase()}`}>
  {/* or nested Link : <Link href="/article/[id]" as={`/article/${article.id}`} */}

      <a className={articleStyles.card}>
        <h3>{article.title} &rarr;</h3>
        <Image
          src={ imagePath }
          alt="Picture of the author"
          width={500}
          height={500}
        />
        <p>{article.body.slice(0, 200)}...</p>
      </a>
    </Link>
  )
}

export default ArticleItem
