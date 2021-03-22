import headerStyles from '../styles/Header.module.css'

const Header = () => {
  return (
    <div>
      <h1 className={headerStyles.title}>
        <span>Olča</span>.cz
      </h1>
      <p className={headerStyles.description}>
      Vše o kosmetice a vaření :-)
      </p>
      <style jsx>
        {`
            h1 {
              color: ${ false ? 'green' : 'red' };
            }
        `}
      </style>
    </div>
  )
}

export default Header
