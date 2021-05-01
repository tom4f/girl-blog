import { serverPath }    from '../../../config'
import { blogApiScript }    from '../../../config'
import { photoApiScript }    from '../../../config'

export const fetchAllArticles = async () => {
    const urlList = [
        `/api/${blogApiScript}`,
        `/api/${photoApiScript}`
      ]
  
      const fetchList = urlList.map( url => 
          fetch( `${serverPath}${url}` )
            .then( response => response.json() )
      )
      
      const [ articles, images ] = await Promise.all( fetchList )
        .catch( () => console.log( 'Error' ) )
  
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