import ArticleItem from './ArticleItem'
import articleStyles from '../styles/Article.module.css'

const ArticleList = ({ articles, loginStatus }) => {
  return (
    <div className={articleStyles.grid}>
      {articles.map((article) => (
        <ArticleItem key={ article.id } article={article} loginStatus={ loginStatus } />
      ))}
    </div>
  )
}

export default ArticleList
