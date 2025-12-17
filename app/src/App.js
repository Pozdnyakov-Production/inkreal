import React from 'react';
import { useState } from 'react';
import './App.css';

const App = () => {

  const [isButtonPressed, setIsButtonPressed] = useState (false);
  const [isMenuSlide, setMenuSlide] = useState (false);
  const [inputValue, setInputValue] = useState (false);

  const Pressed = () => {
    setIsButtonPressed(prevState => !prevState);
  };

  const MenuSlide = () => {
    setMenuSlide (prevState => !prevState);
  }

  const SendToBot = async () => {
    try {
      const botToken = '8226368419:AAE12JgvGBBZeoTCAi8r9wGvRI8yN9KVx8w';
      const chatID = '5122781064';
      const message = inputValue || ''

      await fetch('https://api.telegram.org/bot' + botToken + '/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          chat_id: chatID,
          text: message
        })
        });
        
        alert('Вы отправили заявку');
      }
        catch (err) {
        console.error(err.message);
        alert('Ошибка отправки заявки');
      }
  };

  return (
    <div>
      <div>
        <h1>Меню</h1>
        <button onClick={MenuSlide}>Показать меню</button>
        {isMenuSlide &&
          <ul>
          <li>Регистрация</li>
          <li>Запись в студию</li>
        </ul>
        }
      </div>
      <div>
        <h1>Main page</h1>
        <button onClick={Pressed}>Нажми</button>
        {isButtonPressed ? <h3>Ты нажал на меня</h3> : <h3>Кажется, что ты нажал второй раз</h3>}
      </div>
      <div>
      <label>
        Ваше имя:
        <textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)}></textarea>
      </label>
      <label>
        Выберите время:
        <textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)}></textarea>
      </label>
      <br/>
      <button type="button" onClick={SendToBot}>Записаться</button>
    </div>
    </div>
  );
};

export default App;
