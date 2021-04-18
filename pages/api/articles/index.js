import { serverPath }    from '../../../config'

export const fetchAllArticles = async () => {
    const urlList = [
        '/api/pdo_read_blog.php',
        '/api/pdo_read_foto_lucka.php'
      ]
  
      const fetchList = urlList.map( url => 
          fetch( `${serverPath}${url}` )
            .then( response => response.json() )
      )
      
      const [ articles, images ] = await Promise.all( fetchList )
        .catch( () => console.log( 'Error' ))
  
      return (
          {
            articles,
            images,
          }
      )
}

export default async (req, res) => {
    // console.log( req.query.id )
    const fetchResult = await fetchAllArticles()
    res.status(200).json( fetchResult )
}