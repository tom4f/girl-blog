import { serverPath }    from '../../../config'

export const fetchLogic = async () => {
    const urlList = [
        '/api/pdo_read_blog.php',
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
            articles,
            images,
          }
      )
}

const handler = async (req, res) => {
    // console.log( req.query.id )
    const fetchResult = await fetchLogic()
    res.status(200).json( fetchResult )
}

export default handler