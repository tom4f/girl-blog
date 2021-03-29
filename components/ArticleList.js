import ArticleItem from './ArticleItem'
import articleStyles from '../styles/Article.module.css'

const ArticleList = ({ articles, loginStatus }) => {
  return (
    <div className={articleStyles.grid}>
      {articles.map((article) => (
        article.id > 1
            ? <ArticleItem key={ article.id } article={article} loginStatus={ loginStatus } />
            : null
      ))}
    </div>
  )
}

export default ArticleList
