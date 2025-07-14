import Link from 'next/link'

export function Header({ navBlocks }) {
  return (
    <header>
      <div className='header'>
        <img className = "cloud" src="/images/cloud.png" alt="cloud"/>
        <Link href='/'><h1 className='site-title'>Учимся читать!</h1></Link>
      </div>
      <nav>
        <img className='nav-frog' src="/images/frog.png" alt="frog"/>
        <ul>
          {navBlocks.map((navBlock, index) => (
            <li key={index + 1}>
              <div className="nav-element">
                <img src="/images/home.png" alt="" />
                <span className="nav-element__link">
                  <Link href={navBlock.link}>{navBlock.name}</Link>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}