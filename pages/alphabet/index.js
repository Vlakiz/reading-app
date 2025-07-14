import { MainLayout } from '../../components/MainLayout.js'


async function sound(e) {
  const text = e.target.textContent

  const api_url = `https://unitools.tech/dev-api/tts?email=vl.kizyuk@gmail.com&password=griffer&token=4So5dR&name=Lev&round=True&text=${text}`

  const responseRaw = await fetch(api_url);
  const response = await responseRaw.json();
  const src = response.url;

  let audio = new Audio(src);
  audio.play();
}

export default function AlphabetWindow() {

    return (
      <MainLayout title = 'Азбука' class='alphabet'>
        <h2 id='alphabet-title'>АЛФАВИТ</h2>
        <div class='letters-wrapper'>
          <img src="images/aquarium.png" alt="aquarium" id='aquarium' />
          <div class='fish-wrapper'>
            <img src="images/fish.png" alt="fish" id='fish' />
          </div>
          <div class="letters">
            <ul class='letters__row'>
              <li onClick={sound}>А</li>
              <li onClick={sound}>Б</li>
              <li onClick={sound}>В</li>
              <li onClick={sound}>Г</li>
              <li onClick={sound}>Д</li>
              <li onClick={sound}>Е</li>
              <li onClick={sound}>Ё</li>
            </ul>
            <ul class='letters__row'>
              <li onClick={sound}>Ж</li>
              <li onClick={sound}>З</li>
              <li onClick={sound}>И</li>
              <li onClick={sound}>Й</li>
              <li onClick={sound}>К</li>
              <li onClick={sound}>Л</li>
              <li onClick={sound}>М</li>
              <li onClick={sound}>Н</li>
              <li onClick={sound}>О</li>
              <li onClick={sound}>П</li>
            </ul>
            <ul class='letters__row'>
              <li onClick={sound}>Р</li>
              <li onClick={sound}>С</li>
              <li onClick={sound}>Т</li>
              <li onClick={sound}>У</li>
              <li onClick={sound}>Ф</li>
              <li onClick={sound}>Х</li>
              <li onClick={sound}>Ц</li>
              <li onClick={sound}>Ч</li>
              <li onClick={sound}>Ш</li>
              <li onClick={sound}>Щ</li>
            </ul>
            <ul class='letters__row'>
              <li onClick={sound}>Ъ</li>
              <li onClick={sound}>Ы</li>
              <li onClick={sound}>Ь</li>
              <li onClick={sound}>Э</li>
              <li onClick={sound}>Ю</li>
              <li onClick={sound}>Я</li>
            </ul>
          </div>
        </div>
      </MainLayout>
    )
}