import Link from 'next/link'
import ArticleItemFull from '../components/ArticleItemFull'

const createBlog = ( { webToken, loginStatus } ) => {
    const emptyArticle = {
        date: '',
        category: '',
        title: '',
        title_url: 'novy-clanek-jupi',
        intro: '',
        image: '1',
        body: '',
    }

    return (
        <>
            <div>Nový článek</div>
            {
            loginStatus
                ? <ArticleItemFull
                        mode="create"
                        article={ emptyArticle }
                        images={ [] }
                        loginStatus={ loginStatus }
                        webToken={ webToken }
                  />
                : <Link href='/login'>
                    <a>Login...</a>
                </Link>
            }
        </>
    )
}

export default createBlog