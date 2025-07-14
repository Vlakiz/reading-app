import Link from 'next/link'
import { useState } from 'react';
import { MainLayout } from '../../components/MainLayout.js'
import { useRouter } from 'next/router'

export default function createTextWindow() {
  const [text, setText] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();

    router.push({
      pathname: '/texts',
      query: { text: text }
    });
  }

  return (
    <MainLayout title = 'Создать текст' height="1070px">
      <h2 id='create-text__title'>Создание своего текста</h2>
      <p className='create-text'>Вставьте текст в соответствующие поля и выберите сложность</p>
      <form className='create-text-form' onSubmit={handleSubmit}>
        <label>
          <div className='create-text__input-label'>
            <span className='create-text__input-text'>Вставьте или введите текст</span>
            <br />
            <textarea 
              type="text"
              name="text"
              onBlur={(e) => setText(e.target.value)}
              onChange={(e) => setText(e.target.value)}
              value={text}
              id='create-text__input-field'
            />
          </div>
        </label>
        <label>
          <div className='create-text__input-label'>
            <span className='create-text__input-text'>Выберите сложность (от 1 до 3):</span>
            <br />
            <input 
              type="number"
              name="difficulty"
              onBlur={(e) => setDifficulty(e.target.value)}
              onChange={(e) => setDifficulty(e.target.value)}
              value={difficulty}
            />
          </div>
        </label>
        <br />
        <div className='create-text__input-label'>
          <input 
            type='submit'
            value="СОЗДАТЬ ТЕКСТ"
            id='create-text__submit'
          />
        </div>
      </form>
    </MainLayout>
  )
}