import { server } from '../../../config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Meta from '../../../components/Meta'
import Image from 'next/image'

const article = ({ article }) => {
  // const router = useRouter()
  // const { id } = router.query
  console.log( article )
  const imagePath = article.image
  return (
    <>
      <Meta title={article.title} description={article.excerpt} />
      <h1>{article.title}</h1>
      <Image
          src={ imagePath }
          alt="Picture of the author"
          width={500}
          height={500}
        />
      <p>{article.body}</p>
      <br />
      <Link href='/'>Go Back</Link>
    </>
  )
}



// or NextJS function : getServerSideProps (Server-side Rendering): Fetch data on each request.
export const getServerSideProps = async (context) => {
  const res = await fetch(`https://www.frymburk.com/rekreace/api/pdo_read_blog.php`)

  const articles = await res.json()
  const article = articles.find( one => one.id == context.params.id  )

  return {
    props: {
      article,
    },
  }
}



/*
// getStaticProps should return an object with 'props' 
export const getStaticProps = async (context) => {

  // const res = await fetch(`http://localhost/lipnonet/blog.json`)
  // const res = await fetch(`http://localhost/lipnonet/rekreace/api/pdo_read_blog.php`)
  const res = await fetch(`https://www.frymburk.com/rekreace/api/pdo_read_blog.php`)
  const articles = await res.json()
  const article = articles.find( one => one.id == context.params.id  )

  return {
    props: {
      article,
    },
  }
}


// getStaticPaths = NextJS function : (Static Generation): Specify dynamic routes to pre-render pages based on data.
// it means not only during build time
//   paths: [
//      { params: { id: '1' } },
//      { params: { id: '2' } }
//   ],
export const getStaticPaths = async () => {
  //const res = await fetch(`http://localhost/lipnonet/blog.json`)
  //const res = await fetch(`http://localhost/lipnonet/rekreace/api/pdo_read_blog.php`)
  const res = await fetch(`https://www.frymburk.com/rekreace/api/pdo_read_blog.php`)
  const articles = await res.json()

  const ids = articles.map((article) => article.id)
  const paths = ids.map((id) => ({ params: { id: id.toString() } }))

  return {
    paths,
    // if try to show page which does not exists - show 404 error
    fallback: false,
  }
}

*/


export default article
