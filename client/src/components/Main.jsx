// Импорт React и хука useState из 'react'
import React, { useState } from 'react';
// Импорт Link из 'react-router-dom' для создания ссылок
import { Link } from 'react-router-dom';
// Импорт CSS модуля стиля для страницы
import styles from '../styles/Main.module.css';

// Установка полей которые будут использоваться в состоянии формы
const FIELDS = {
  NAME: "name",
  ROOM: "room",
};

// Создание компонента Main
const Main = () => {

  // Деструктуризация полей из FIELDS
  const { NAME, ROOM } = FIELDS;

  // Инициализация состояния формы с помощью хука useState
  const [values, setValues] = useState({ [NAME]: "", [ROOM]: "" });

  // Обработчик изменения в полях формы.
  // Когда пользователь вводит текст в поле формы, это обновляет состояние фактических значений ввода
  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value })
  };

  // Обработчик клика на кнопку. При клике проверяет, все ли поля прошли валидацию
  // Если нет - отменяет действие по умолчанию (переход по ссылке)
  const handleClick = (e) => {
    const isDisabled = Object.values(values).some((val) => !val);

    if (isDisabled) e.preventDefault();

  };

  // Возврат JSX компонента: форма для ввода имени пользователя и названия комнаты
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Join chat</h1>

        <form className={styles.form}>
          <div className={styles.group}>
            <input type="text"
              name="name"
              value={values[NAME]}
              placeholder="Username"
              className={styles.input}
              autoComplete="off"
              required
              onChange={handleChange}
            />
          </div>
          <div className={styles.group}>
            <input type="text"
              name="room"
              value={values[ROOM]}
              placeholder="Room"
              className={styles.input}
              autoComplete="off"
              required
              onChange={handleChange}
            />
          </div>
          <Link
            className={styles.group}
            onClick={handleClick}
            to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
          >
            <button type="submit" className={styles.button}>
              Sign In
            </button>
          </Link>
        </form>
      </div>
    </div>
  )
}

// Экспортирование компонента Main для которого будет доступен за его пределами
export default Main

// Каждым компонентом управляются входные значения формы и они отслеживаются в состоянии компонента. 
// Когда поля формы изменяются, состояние обновляется. 
// Если какое-то из полей формы пустое, то форма является недействительной и переход по ссылке будет отменен.