import { serverPath }    from '../../../config'
import { blogApiScript }    from '../../../config'
import { photoApiScript }    from '../../../config'

export const fetchOneArticle = async ( id ) => {
    const urlList = [
        `/api/${blogApiScript}?title_url=${id}`,
        `/api/${photoApiScript}`
    ]
    
    const fetchList = urlList.map( url => 
        fetch( `${serverPath}${url}` )
            .then( response => response.json() )
    )
        
    const [ articles, images ] = await Promise.all( fetchList )
        .catch( () => console.log( 'Error' ))
    
    return (
        {
            article: articles[0],
            images,
        }
    )
}


export default async ({ query: { id } }, res) => {
    // console.log( req.query.id )
    const fetchResult = await fetchOneArticle( id )
    res.status(200).json( fetchResult )
}