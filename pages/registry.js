import Link from 'next/link'
import { useState } from 'react';
import { MainLayout } from '../components/MainLayout.js'
import { useRouter } from 'next/router'

export default function Registry() {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [password2, setPassword2] = useState(null)
  const [name, setName] = useState(null)
  const [age, setAge] = useState(4)
  const router = useRouter()

  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

  const handleAge = (e) => {
    let value = e.target.value;

    if (!/^\d+$/.test(value)) {
      value === '' ? setAge('') : setAge(4)
    } else {
      let num = Number.parseInt(value)

      num < 4 ? setAge(4) : num > 7 ? setAge(7) : setAge(num)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isInvalideValues = e.target.outerHTML.includes('input-error') || [email, password, password2, name, age].includes(null) || [email, password, password2, name, age].includes('')

    if (isInvalideValues) {
      alert('Введите корректные значения');
    } else {
      const responseRaw = await fetch(
        '/api/register',
        {
          body: JSON.stringify({
            email: email,
            password: password,
            name: name,
            age: age
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }
      );
      
      //const response = await responseRaw.json();
      //console.log(response)
      localStorage.setItem('login', email);
      localStorage.setItem('password', password);
      localStorage.setItem('name', name);
      alert('Регистрация прошла успешно!');
      router.push('/');
    }

  }

  return (
    <MainLayout title = 'Test' height="1070px">
      <h2 id='registry-title'>Регистрация</h2>
      <p className='registry-text'>Для использования сайта необходимо пройти регистрацию.</p>
      <p className='registry-text'>После регистрации вы получите доступ ко всем разделам, сможете проходить тесты и сохранять свой прогресс</p>
      <form onSubmit={handleSubmit} className='registry-form'>
        <label>
          <div className='registry-input-label'>
            <span className='registry-input-text'>Введите свой e-mail</span>
            <br />
            <input 
              type="email"
              name="email"
              onBlur={(e) => setEmail(e.target.value)}
              className={email === null || email.match(emailRegex) ? '' : 'input-error' }
            />
            <span className='registry-input-label__error'>
              {email === null || email.match(emailRegex) ? '' : 'Неправильный формат E-mail'}
            </span>
          </div>
        </label>
        <label>
          <div className='registry-input-label'>
            <span className='registry-input-text'>Введите пароль</span>
            <br />
            <input 
              type="password"
              name="password"
              onBlur={(e) => setPassword(e.target.value)}
              className={password === null || password.length > 5 ? '' : 'input-error' }
            />
            <span className='registry-input-label__error'>
              {password === null || password.length > 5 ? '' : 'Пароль должен содержать более 5-и символов'}
            </span>
          </div>
        </label>
        <label>
          <div className='registry-input-label'>
            <span className='registry-input-text'>Подтвердите свой пароль</span>
            <br />
            <input 
              type="password"
              name="password2"
              onBlur={(e) => setPassword2(e.target.value)}
              className={password2 === null || password === null || password2 === password ? '' : 'input-error' }
            />
            <span className='registry-input-label__error'>
              {password2 === null || password === null || password2 === password ? '' : 'Пароли не совпадают'}
            </span>
          </div>
        </label>
        <br />
        <label>
          <div className='registry-input-label'>
            <span className='registry-input-text'>Введите имя</span>
            <br />
            <input 
              type="text"
              name="name"
              onBlur={(e) => setName(e.target.value)}
              className={name === null || /^[А-я\s]+$/.test(name)  ? '' : 'input-error'}
            />
            <span className='registry-input-label__error'>
              {name === null ? '' : name.length < 3 ? 'Слишком короткое имя' : /^[А-я\s]+$/.test(name)  ? '' : 'Имя может содержать только кириллицу'}
            </span>
          </div>
        </label>
        <label>
          <div className='registry-input-label age-input-label'>
            <span className='registry-input-text'>Введите возраст ребенка (от 4 до 7):</span>
            <br />
            <input 
              type="number"
              name="age"
              onBlur={(e) => setAge(e.target.value)}
              value={age}
              onChange={handleAge}
              className={age === null || age !== ''  ? '' : 'input-error'}
            />
            <span className='registry-input-label__error'>
              {age === null || age !== ''  ? '' : 'Поле не может быть пустым'}
            </span>
          </div>
        </label>
        <br />
        <div className='registry-input-label'>
          <input 
            type='submit'
            value="ОТПРАВИТЬ"
            id='registry-submit'
            className={[email, password, password2, name, age].includes(null) || [email, password, password2, name, age].includes('') ? 'disabled' : ''}
          />
        </div>
      </form>
    </MainLayout>
  )
}

// D vlakiz
// mongodb+srv://vlakiz:YEaxBd5WLGppbNM1@cluster0.zvbgg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority