// Link similar like React Router Dom
import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'

const Nav = ( { loginStatus, user } ) => {
  return (
    <nav  className={navStyles.nav_container}>
      <h1 className={navStyles.title}>
        <span>Olča</span>.cz
      </h1>
      <nav className={navStyles.nav}>
        <ul>
          { loginStatus ? <li>
                            Uživatel: { user }
                          </li>
                        : null
          }
          <li>
            <Link href='/'>Start</Link>
          </li>
          <li>
            <Link href='/about'>O&nbsp;mě</Link>
          </li>
          <li>
            <Link href='https://www.frymburk.com/rekreace/fotogalerie_lucka.html'>Fotogalerie</Link>
          </li>
        </ul>
      </nav>
    </nav>
  )
}

export default Nav
