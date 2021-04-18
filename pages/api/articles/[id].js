import { serverPath }    from '../../../config'

export const fetchLogicOne = async ( id ) => {
    const urlList = [
            `/api/pdo_read_blog.php?title_url=${id}`,
            '/api/pdo_read_foto_lucka.php'
          ]
        
          const fetchList = urlList.map( url => 
              fetch( `${serverPath}${url}` )
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
        
        return (
            {
                article: articles[0],
                images,
            }
        )
}

  const handler = async ({ query: { id } }, res) => {
              // console.log( req.query.id )
    const fetchResult = await fetchLogicOne( id )
    res.status(200).json( fetchResult )
}

export default handler