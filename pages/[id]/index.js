import { useRouter } from 'next/router';
import { fetchAllArticles } from '../api/articles'
import { fetchOneArticle } from '../api/articles/[id]'
import ArticleItemFull from '../../components/ArticleItemFull'

export default function article( { article = {}, images = [], loginStatus, webToken }) {
  const router = useRouter();
  return router.isFallback
        ? <div>Loading Blog...</div>
        : <ArticleItemFull
            mode="update"
            article={ article }
            images={ images }
            loginStatus={ loginStatus }
            webToken={ webToken } />
}

export const getStaticProps = async context => {
    const articleAndImages = await fetchOneArticle( context.params.id )
    return {
        props: articleAndImages,
        revalidate: 10,
    }
}

export const getStaticPaths = async () => {
    const { articles } = await fetchAllArticles()
    const paths = articles.map( article => ({
            params: {
                id: article.title_url.toLowerCase()
            }}
    ))
    return {
        paths,
        fallback: true,
    }
}