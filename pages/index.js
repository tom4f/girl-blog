import { useRouter } from 'next/router';
import { apiPath }    from '../config'
import ArticleList   from '../components/ArticleList'
import { fetchLogic } from './api/articles'

import Link from 'next/link'

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
    //const res = await fetch( `${apiPath}/api/articles` )
    
    const props = await fetchLogic()

    console.log( props )
    
    //const props = await res.json()
    return {
      props,
      revalidate: 10,
    }
}