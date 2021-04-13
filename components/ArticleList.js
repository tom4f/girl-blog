import ArticleItem from './ArticleItem'
import articleStyles from '../styles/Article.module.css'

const ArticleList = ({ articles, images, loginStatus }) => {
  return (
    <article className={articleStyles.grid}>
      {articles.map((article) => (
        article.id > 1
            ? <ArticleItem key={ article.id } article={article} images={images} loginStatus={ loginStatus } />
            : null
      ))}
    </article>
  )
}

export default ArticleList
