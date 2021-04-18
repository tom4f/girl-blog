import { useRouter } from 'next/router';
import Link from 'next/link'

import ArticleList   from '../components/ArticleList'
import { fetchAllArticles } from './api/articles'

export default function Home( { articles, images, loginStatus } ) {

    const router = useRouter();
    console.log( 'router.isFallback= ' + router.isFallback )

    if ( router.isFallback ) {
        return <div>Loading...</div>
    } else {
        return (
          <>
              {
              loginStatus
                  ? <div style={{ textAlign: 'center', background: 'green' }}>
                      <Link href="/create">
                        <a>+ nový článek</a>
                      </Link>
                    </div>
                  : null
              }
              <ArticleList articles={articles} images={images} loginStatus={ loginStatus } />
          </>
    )}
}

// getStaticProps = NextJS function: (Static Generation): Fetch data at build time.
export const getStaticProps = async () => { 
    const allArticles = await fetchAllArticles()
    return {
        props: allArticles,
        revalidate: 10,
    }
}