import { useRouter } from 'next/router';
import { server }    from '../config'
import ArticleList   from '../components/ArticleList'

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

    const urlList = [
      '/api/pdo_read_blog.php',
      '/api/pdo_read_foto_lucka.php'
    ]

    const fetchList = urlList.map( url => 
        fetch( `${server}${url}` )
          .then( response => response.json() )
    )
    
    const [ articles, images ] = await Promise.all( fetchList )
        .catch( () => [
            [{
                id: '99999',
                title: 'Chyba :-)',
                title_url: 'error',
                intro: '',
                body: ``,      
                category: 'Error',
                image: '5',
                date: `${new Date()}`
            }],
            []
        ])

    return {
      props: {
        articles,
        images,
      },
      revalidate: 10,
    }

}