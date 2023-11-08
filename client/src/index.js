// Импорт библиотеки React
import React from 'react';

// Импорт функции createRoot из 'react-dom/client', которая используется для создания корневого контейнера
import { createRoot } from 'react-dom/client';

// Импорт компонента BrowserRouter из 'react-router-dom' и переименование его в Router для удобства
import { BrowserRouter as Router } from 'react-router-dom';

// Импорт главного приложения App из файла './components/App'
import App from './components/App';

// Импорт стилей CSS
import "./styles/main.css";

// Получение элемента с идентификатором 'root'. Это место, в которое будет загружено наше React-приложение.
const container = document.getElementById('root');
// С помощью функции createRoot создаем корневой контейнер (который является частью нового API React - Concurrent Mode)
const root = createRoot(container);

// Запускаем рендеринг корневого компонента (Router, который оборачивает App) в корневой контейнер. 
// Это аналогично ReactDOM.render(), но используется для Concurrent Mode.
root.render(
<Router>
    <App />
</Router>
);

// Данный код инициализирует и рендерит главный компонент приложения App. 
// Он также включает в себя маршрутизацию при помощи react-router-dom.
// Здесь BrowserRouter используется для предоставления возможности маршрутизации в приложении. 
// Это позволяет создавать навигацию по различным страницам в одностраничном приложении. 
// Компонент App обернут BrowserRouter, поэтому все дочерние компоненты App будут иметь доступ к функциональности маршрутизации.