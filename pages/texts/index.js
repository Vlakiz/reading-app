import { MainLayout } from '../../components/MainLayout.js'
import { withRouter } from 'next/router'
import React from "react"

class TextWindow extends React.Component {
  constructor(props) {
    super(props);

    this.text = props.router.query.text;
    this.syllables = this.divideIntoSyllables(this.text);
  }

  
  // Валидация правильности введенной строки
  validateString(s) {
    return s;
  } // function validateString (s)
  


  // Собственно функция разбиения слова на слоги
  getSeparatedString(text) {
    const voiced = new String('бвгджзлмнрхцчшщ'); // Звонкие и шипящие согласные
    const deaf = new String('кпстф'); // Глухие согласные
    const brief = new String('й'); // Й
    const other = new String('ьъ'); // Другие
    const cons = new String('бвгджзйклмнпрстфхцчшщ'); // Все согласные
    const vowel = new String('аеёиоуыэюя'); // Гласные буквы

    // Добавляем слог в массив и начинаем новый слог
    function addSep() {
      sepArr.push(tmpS);
      tmpS = '';
    } // function addSep ()

    function isNotLastSep(remainStr) { 
      const vowel = new String('аеёиоуыэюя'); // Гласные буквы
      let is = false;
      
      for (var i = 0; i < remainStr.length; i++) {
        if (vowel.indexOf(remainStr.substr(i, 1)) != -1) {
          is = true;
          break;
        }
      } // for (var i = 0; i < remainStr - 1; i++)
      
      return is;
    } // function isLastSep (remainStr)

    let tmpL = new String(); // Текущий символ
    let tmpS = new String(); // Текущий слог
    let sepArr = new Array(); // Массив слогов

    return text.split(' ').map(function(s) {
      for (var i = 0; i < s.length; i++) {
        tmpL = s.substr(i, 1);
        tmpS += tmpL;
        // Проверка на признаки конца слогов
        // если буква равна 'й' и она не первая и не последняя и это не последний слог
        if (
          (i != 0) &&
          (i != s.length - 1) &&
          (brief.indexOf(tmpL) != -1) &&
          (isNotLastSep(s.substr(i + 1, s.length - i + 1)))
        ) {
          addSep();
          continue;
        }
        // если текущая гласная и следующая тоже гласная
        if (
          (i < s.length - 1) &&
          (vowel.indexOf(tmpL) != -1) &&
          (vowel.indexOf(s.substr(i + 1, 1)) != -1)
        ) {
          addSep();
          continue;
        }
        // если текущая гласная, следующая согласная, а после неё гласная
        if (
          (i < s.length - 2) &&
          (vowel.indexOf(tmpL) != -1) &&
          (cons.indexOf(s.substr(i + 1, 1)) != -1) &&
          (vowel.indexOf(s.substr(i + 2, 1)) != -1)
        ) {
          addSep();
          continue;
        }
        // если текущая гласная, следующая глухая согласная, а после согласная и это не последний слог
        if (
          (i < s.length - 2) &&
          (vowel.indexOf(tmpL) != -1) &&
          (deaf.indexOf(s.substr(i + 1, 1)) != -1) &&
          (cons.indexOf(s.substr(i + 2, 1)) != -1) &&
          (isNotLastSep(s.substr(i + 1, s.length - i + 1)))
        ) {
          addSep();
          continue;
        }
        // если текущая звонкая или шипящая согласная, перед ней гласная, следующая не гласная и не другая, и это не последний слог
        if (
          (i > 0) &&
          (i < s.length - 1) &&
          (voiced.indexOf(tmpL) != -1) &&
          (vowel.indexOf(s.substr(i - 1, 1)) != -1) &&
          (vowel.indexOf(s.substr(i + 1, 1)) == -1) &&
          (other.indexOf(s.substr(i + 1, 1)) == -1) &&
          (isNotLastSep(s.substr(i + 1, s.length - i + 1)))
        ) {
          addSep();
          continue;
        }
        // если текущая другая, а следующая не гласная если это первый слог
        if (
          (i < s.length - 1) &&
          (other.indexOf(tmpL) != -1) &&
          ((vowel.indexOf(s.substr(i + 1, 1)) == -1) ||
            (isNotLastSep(s.substr(0, i))))
        ) {
          addSep();
          continue;
        }
      } // for (var i = 0; i < s.length; i++)
      sepArr.push(tmpS);
      return sepArr;
    });
  } // function getSeparatedString (s)

  divideIntoSyllables(input) {
    const syllableRegex = /[^уеаоэяиюёы]*[уеаоэяиюёы]+(?:[^уеаоэяиюёы]*$|[^уеаоэяиюёы](?=[^уеаоэяиюёы]))?/gi;

    return input.split(' ').map((word) => word.match(syllableRegex))
  }
  
  async sound(e) {
    const text = e.target.textContent

    const api_url = `https://unitools.tech/dev-api/tts?email=vl.kizyuk@gmail.com&password=griffer&token=4So5dR&name=Lev&round=True&text=${text}`

    const responseRaw = await fetch(api_url);
    const response = await responseRaw.json();
    const src = response.url;
/*
    this.setState({
      audioUrl: music 
    })
*/
    let audio = new Audio(src);
    audio.play();
  }

  render() {
    return (
      <MainLayout title = 'Страница текста' class='texts'>
        <h2 id='alphabet-title'>Текст</h2>
        <div className='text-board'>
          <div className='text-wrapper'>
            {this.syllables.map(word => word.map(
              (syllable, index) => (
              <span key={index + 1} className='syllable' onClick={this.sound}>{syllable}</span>
            )).reduce((prev, curr) => [prev, '-', curr])).reduce((prev, curr) => [prev, ' ', curr])}
          </div>
        </div>
      </MainLayout>
    )
  }
}

export default withRouter(TextWindow)