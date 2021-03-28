import { useState } from 'react'
import Link  from 'next/link'
import Image from 'next/image'
import parse from 'html-react-parser'

import { server } from '../../config'
import Meta     from '../../components/Meta'
import EditBlog from '../../components/EditBlog' 

const article = ( { article, loginStatus, webToken }) => {
  // const router = useRouter()
  // const { id } = router.query
  const [ editArticle, setEditArticle ] = useState( article )

  const imagePath = `${server}/fotogalerie_lucka/${editArticle.image}b.jpg`

  return (
    <>
      <Meta title={article.title} description={article.title} />
      {
        loginStatus
            ? <EditBlog
                  webToken = { webToken }
                  editArticle = { editArticle }
                  setEditArticle = { setEditArticle } />
            : null
      }
      <h1>{editArticle.title}</h1>
      <div style={{ height: '300px', width: '300px', }} > 
          <div style={{ position: 'relative', maxWidth: '100%', height: '100%' }}  >
              <Image
                  src={ imagePath }
                  alt="Picture of the author"
                  layout="fill"
                  objectFit="contain"
                  quality={100}
                />
          </div>
      </div>
      <>{ parse( editArticle.body ) }</>
      <br />
      <Link href='/'>Zpět</Link>
    </>
  )
}

// or NextJS function : getServerSideProps (Server-side Rendering): Fetch data on each request.
export const getServerSideProps = async (context) => {

  const res = await fetch( `${server}/api/pdo_read_blog.php` )
  const articles = await res.json()
  const article = articles.find( one => one.title_url.toLowerCase() === context.params.id  )

  return {
    props: {
      article,
    },
  }
}


export default article