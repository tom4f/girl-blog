import { serverPath } from '../config'
import Link from 'next/link'
import articleStyles from '../styles/Article.module.css'

import NextImage from './NextImage'

const ArticleItem = ({ article, images, loginStatus }) => {

    const imagePath = `${serverPath}/fotogalerie_lucka/${article.image}.jpg`
    // get image text
    const imageParamsFromDB = images.find( img => img.id === article.image )

    return (
    <Link href={`/${article.title_url.toLowerCase()}`}>
        {/* or nested Link : <Link href="/article/[id]" as={`/article/${article.id}`} */}
        <a className={articleStyles.card}>
            <aside>
                <NextImage src={ imagePath } imageParams={ imageParamsFromDB }  width='200px' text={false} />
            </aside>
            <div>
                { loginStatus ? <span style={{ color: 'green' }}>Uprav :-)&nbsp;</span> : null }
                <small>{ article.date } </small>&nbsp;&nbsp;<i>{ article.category }</i>
                <h3>{article.title}</h3>
                {article.intro}
            </div>
        </a>
    </Link>
    )
}

export default ArticleItem
