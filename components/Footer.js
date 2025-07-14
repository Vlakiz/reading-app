import Link from 'next/link'

export function Footer() {
  return (
    <footer >
      <div className='pre-footer' />
      <div className='footer'>
        <span className = 'footer-copyright'>© 2021. Читалочка Co. All rights reserved</span>
        <ul>
          <li>🏠 <Link href="/about">О сайте</Link></li>
          <li>🙂 <Link href="mailto:vladkizyuk@mail.ru">Обратная связь</Link></li>
        </ul>
      </div>
    </footer>
  )
}