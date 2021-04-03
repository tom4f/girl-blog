import { server } from '../config'
import ArticleList from '../components/ArticleList'

export default function Home( { articles, images, loginStatus } ) {
  console.log( images )
  return (
    <div>
      <ArticleList articles={articles} images={images} loginStatus={ loginStatus } />
    </div>
  )
}

// getStaticProps = NextJS function: (Static Generation): Fetch data at build time.
export const getServerSideProps = async () => {

  //console.log( { server } )

  // get blog data
  const res = await fetch(`${server}/api/pdo_read_blog.php`)
  const articles = await res.json()

  // get image data
  const resImages = await fetch(
      `${server}/api/pdo_read.php`,
      {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              fotoGalleryOwner: "_lucka",
              searchCriteria: "WHERE typ < 10"
            }
          )
      }
  )
  const images = await resImages.json()


  return {
    props: {
      articles,
      images
    },
  }
}