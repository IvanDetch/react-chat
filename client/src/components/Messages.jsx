// Импорт React из 'react'
import React from "react";

// Импорт CSS модуля стиля для страницы
import styles from "../styles/Messages.module.css";

// Декларация функционального компонента Messages с пропсами messages и name
const Messages = ({ messages, name }) => {
  // Возвращаемый JSX
  return (
    <div className={styles.messages}>
      {
        // Используем метод map() для преобразования массива messages в массив React-элементов
        messages.map(({ user, message }, i) => {
          // Проверяем, что userName в сообщении идентичен текущему пользователю
          const itsMe = user.name.trim().toLowerCase() === name.trim().toLowerCase();
          // В зависимости от того, отправил текущий пользователь сообщение или нет, мы задаем соответствующий CSS-класс
          const className = itsMe ? styles.me : styles.user;

          return (
            // Для каждого сообщения возвращаем div-элемент, уникальный ключ задаем по индексу i, 
            // также применяем классы styles.message и className (styles.me или styles.user)
            <div key={i} className={`${styles.message} ${className}`}>
              {/* Визуализируем имя пользователя, отправившего сообщение */}
              <span className={styles.user}>{user.name}</span>
              {/* Визуализируем текст сообщения */}
              <div className={styles.text}>{message}</div>
            </div>
          );
        })
      }
    </div>
  );
};

// Экспорт компонента Messages по умолчанию
export default Messages;

// Данный код представляет собой компонент Messages, который отображает список сообщений.
// Этот компонент принимает два пропса: messages (массив сообщений) и name (имя текущего пользователя). 
// Каждое сообщение представляет собой объект с двумя свойствами: user (объект с данными пользователя) и message (строка с текстом сообщения). 
// Затем компонент Messages рендерит сообщения таким образом, что сообщения от текущего пользователя получает отличительный CSS-класс от сообщений других пользователей.