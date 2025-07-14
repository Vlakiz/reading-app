import Link from 'next/link'
import {MainLayout} from '../components/MainLayout.js'

export default function Home() {
  return (
    <MainLayout title = 'Test'>
      <h2>Приветствуем на сайте обучения чтению! 👋</h2>
      <p>
        <img src="/images/reading-frog.png" alt="frog"/>
        Данный веб-ресурс предназначен для обучения чтению дошкольников и учащихся первых классов.
        <br />
        Для работы с сайтом и сохранения прогресса необходимо пройти процесс <Link href='/auth'>авторизации</Link>
      </p>
    </MainLayout>
  )
}

// D vlakiz
// mongodb+srv://vlakiz:YEaxBd5WLGppbNM1@cluster0.zvbgg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority