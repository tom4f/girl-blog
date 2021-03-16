import { server } from '../config'
import ArticleList from '../components/ArticleList'

export default function Home( { articles } ) {
  return (
    <div>
      <ArticleList articles={articles} />
    </div>
  )
}

// getStaticProps = NextJS function: (Static Generation): Fetch data at build time.
export const getServerSideProps = async () => {
  // const res = await fetch(`http://localhost/lipnonet/rekreace/api/pdo_read_blog.php`)
  const res = await fetch(`https://www.frymburk.com/rekreace/api/pdo_read_blog.php`)
  const articles = await res.json()
  return {
    props: {
      articles,
    },
  }
}