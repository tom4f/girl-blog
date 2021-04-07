import { server } from '../config'
import Link from 'next/link'
import articleStyles from '../styles/Article.module.css'

import NextImage from './NextImage'

const ArticleItem = ({ article, images, loginStatus }) => {

    const imagePath = `${server}/fotogalerie_lucka/${article.image}.jpg`
    // get image text
    const imageParamsFromDB = images.find( img => img.id === article.image )

    return (
    <Link href={`/${article.title_url.toLowerCase()}`}>
        {/* or nested Link : <Link href="/article/[id]" as={`/article/${article.id}`} */}
        <a className={articleStyles.card}>
            <NextImage src={ imagePath } imageParams={ imageParamsFromDB }  width='200px' text={false} />
            <div>
                { loginStatus ? <i>Uprav</i> : null }
                <h3>{article.title}</h3>
                <b>{ article.category }</b> <small>{ article.date } </small>

                <div>{article.intro}</div>
                <br/>
            </div>
        </a>
    </Link>
    )
}

export default ArticleItem
