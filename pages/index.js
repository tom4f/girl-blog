import { server } from '../config'
import ArticleList from '../components/ArticleList'

export default function Home( { articles } ) {
  return (
    <div>
      Vercel Test
      <ArticleList articles={articles} />
    </div>
  )
}

// getStaticProps = NextJS function: (Static Generation): Fetch data at build time.
export const getStaticProps = async () => {

  //console.log( { server } )

  const res = await fetch(`${server}/api/pdo_read_blog.php`)
  const articles = await res.json()
  return {
    props: {
      articles,
    },
  }
}