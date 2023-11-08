// Импорт функциональных API React для реактивного состояния и работы с жизненным циклом компонентов
import React, { useState, useEffect } from 'react';

// Импортирование библиотеки socket.io для реализации реактивности в реальном времени
import io from 'socket.io-client';

// Используйте API маршрутизатора React для работы с маршрутизацией
import { useLocation, useNavigate } from 'react-router-dom';

// Импорт компонента для кнопки эмоций
import EmojiPicker from 'emoji-picker-react';

// Импорт внешних ресурсов и стилей
import icon from '../images/emoji.svg';
import styles from '../styles/Chat.module.css';

// Импорт пользовательского компонента ./Messages
import Messages from './Messages';

// Инициализация подключения к WebSocket с сервером
const socket = io.connect('http://localhost:5000');

// Создание компонента чата
const Chat = () => {

  // Использование местоположения и навигации из реактивного маршрутизатора
  const { search } = useLocation();
  const navigate = useNavigate();

  // Инициализация состояния компонента с помощью хуков состояния
  const [params, setParams] = useState({ room: "", user: "" }); // Параметры чата из URL
  const [state, setState] = useState([]); // Состояние сообщений чата
  const [message, setMessage] = useState(""); // Состояние текущего сообщения
  const [isOpen, setOpen] = useState(false); // Состояние открытия/закрытия выбора эмодзи
  const [users, setUsers] = useState(0); // Количество пользователей в комнате чата

  // useEffect запускает функцию при первом рендеринге компонента, а также после каждого обновления
  // здесь он используется для обработки URL-параметров, подключения к чату и слушания сокетов
  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams); // установка параметров чата из URL
    socket.emit("join", searchParams); // Присоединение к комнате чата
  }, [search]);

  useEffect(() => {
    // Обработка полученных сообщений
    socket.on('message', ({ data }) => {
      setState((_state) => [..._state, data]); // Добавление нового сообщения в состояние
    });
  }, []);

  useEffect(() => {
    // Обновление количества пользователей в комнате чата
    socket.on('joinRoom', ({ data: { users } }) => {
      setUsers(users.length);
    });
  }, []);

  console.log(state);

  // Обработчик события покидания комнаты чата
  const leftRoom = () => {
    socket.emit("leftRoom", { params }); // Отправка события покидания комнаты
    navigate("/"); // Перенаправление на главную страницу
  };

  // Обработчик изменения сообщения
  const handleChange = ({ target: { value } }) => setMessage(value);

  // Обработчик отправки сообщения
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message) return;

    socket.emit("sendMessage", { message, params }); // Отправка сообщения

    setMessage(""); // Сброс текущего сообщения
  };

  // Обработчик клика на эмодзи
  const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`);

  // Возвращаем JSX компонент
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.title}>{params.room}</div>
        <div className={styles.users}>{users} users in this room</div>
        <button className={styles.left} onClick={leftRoom}>
          Left the room
        </button>
      </div>
      <div className={styles.messages}>
        <Messages messages={state} name={params.name} />
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input}>
          <input type="text"
            name="message"
            placeholder="What do you want to say?"
            value={message}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className={styles.emoji}>
          <img src={icon} alt="emoji" onClick={() => setOpen(!isOpen)} />
          {isOpen && (
            <div className={styles.emojies}>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>

        <div className={styles.button}>
          <input type="submit" onSubmit={handleSubmit} value="Send a message" />
        </div>
      </form>
    </div>
  );
};

export default Chat