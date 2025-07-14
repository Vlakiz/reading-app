import Head from 'next/head'
import { Footer } from './Footer'
import { Header } from './Header'
import navBlocks from '../structure/NavBlocks'
import { Modal } from './Modal'
import authFields from '../structure/AuthFields'
import { useState } from 'react'

export function MainLayout({ children, title = '', height = '1500px' }) {
  const [isModalOpen, setModalOpenValue] = useState(false)
  const [isAuth, setAuthValue] = useState(false)

  const authCallback = async (result, cbError) => {
    if (!result.password && !result.login) {
      cbError("Заполните поля логина и пароля")
    } else if (!result.password) {
      cbError("Заполните поле пароля")
    } else if (!result.login) {
      cbError("Заполните поле логина")
    } else if (result.login.size <= 3)
      cbError("Логин не может быть короче 4-х символов")
    else {
      cbError("")
      const responseRaw = await fetch(
        '/api/login',
        {
          body: JSON.stringify({
            login: result.login,
            password: result.password
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }
      );
      
      const response = await responseRaw.json();
      //localStorage.setItem("token", `here ${response.num}`)
      //cbError(localStorage.getItem("token"))
      localStorage.getItem('login');
      truePassword = localStorage.getItem('password');
      
      if (truePassword == password) {
        setAuthValue(true);
      } else {
        cbError("Неверный пароль");
      }
    }
  }
 
  return (
    <>
      <Head>
        <title>{title.empty ? '' : `${title} | `}Читалочка</title>
      </Head>
      <Header navBlocks={navBlocks}/>
      <div className='sign-in-button-wrapper'>
        <button className='sign-in-button' onClick={() => setModalOpenValue(true)}>Войти</button>
      </div>
      <main>
        <div className="main-content-wrapper">
          <div className="main-content">{children}</div>
        </div>
        {isModalOpen && 
          <Modal 
            title="Авторизация" 
            inputs={authFields}
            submit="Войти"
            link={{ text: "Зарегистрироваться", href: "/registry" }}
            cb={authCallback} 
            onClose={() => setModalOpenValue(false)} />
        }
      </main>
      <Footer />
      <style jsx>{`
        .main-content {
          height: ${height};
        }
      `}</style>
    </>  
  )
}