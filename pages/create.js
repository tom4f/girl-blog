import { useState } from 'react'
import Link from 'next/link'
import EditOrCreateApi from '../components/EditOrCreateApi'


const CreateBlog = ( { webToken, loginStatus } ) => {

    const emptyBlog = {
        date: '',
        category: '',
        title: '',
        title_url: '',
        intro: '',
        image: '',
        body: '',
    }

    const [ editArticle, setEditArticle ] = useState( emptyBlog )

    const apiFile = 'pdo_create_blog.php'

    console.log( apiFile )

    return (

        <>
        <div>Nový článek</div>
        {
        loginStatus
            ? <EditOrCreateApi
                    apiFile = { apiFile }
                    webToken = { webToken }
                    editArticle = { editArticle }
                    setEditArticle = { setEditArticle } />
            : <Link href='/login'>
                <a>Login...</a>
              </Link>
        }
        </>
    )
}

export default CreateBlog