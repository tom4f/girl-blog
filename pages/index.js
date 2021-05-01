import { useRouter } from 'next/router';
import { fetchAllArticles } from './api/articles'
import ArticleList   from '../components/ArticleList'

export default function Home( { articles, images, webToken, loginStatus } ) {
    const router = useRouter()

    return router.isFallback
        ? <div>
            Loading Blog...
          </div>
        : <ArticleList
            articles = { articles }
            images = { images} 
            loginStatus = { loginStatus }
            webToken = { webToken }
          />
}

export const getStaticProps = async () => { 
    const allArticles = await fetchAllArticles()
    return {
        props: allArticles,
        revalidate: 10,
    }
}