import Link from 'next/link'
import footerStyles from '../styles/Footer.module.css'

const Footer = () => {
  return (
    <footer  className={footerStyles.footer_container}>
        <h1 className={footerStyles.logo}>
          <span>Olča</span>.cz
        </h1>
    </footer>
  )
}

export default Footer