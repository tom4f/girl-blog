// Link similar like React Router Dom
import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href='/'>Start</Link>
        </li>
        <li>
          <Link href='/about'>O mě</Link>
        </li>
        <li>
          <Link href='https://www.frymburk.com/rekreace/fotogalerie_lucka.html'>Fotogalerie</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
