import { useRouter } from 'next/router';
import { fetchAllArticles } from '../api/articles'
import { fetchOneArticle } from '../api/articles/[id]'

import ArticleItemFull from '../../components/ArticleItemFull'

const article = ( { article = {}, images = [], loginStatus, webToken }) => {
  

    //const localStorageUser = JSON.parse(localStorage.getItem('user'));
    //console.log( user )

  // why before router cmd - article&images are not defined?
  // without router default values must be defined? article = {}, images = []
  const router = useRouter();
  console.log( 'router.isFallback= ' + router.isFallback )
  if ( router.isFallback ) {
    return <div>Loading...</div>;
 }

  return (
    <>
        <ArticleItemFull
            mode="update"
            article={ article }
            images={ images }
            loginStatus={ loginStatus }
            webToken={ webToken }
        />
    </>
  )
}


// or NextJS function : getServerSideProps (Server-side Rendering): Fetch data on each request.
export const getStaticProps = async ( context ) => {
    const articleAndImages = await fetchOneArticle( context.params.id )
    return {
        props: articleAndImages,
        revalidate: 10,
    }
}

// This function gets called at build time
export const getStaticPaths = async () => {
    const { articles } = await fetchAllArticles()
    const paths = articles.map( article => ({
            params: {
                id: article.title_url.toLowerCase()
            }}
    ))
    return {
        paths,
        // to show 404 This page could not be found.
        fallback: true,
    }
}

export default article