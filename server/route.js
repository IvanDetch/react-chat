// Импортируем Express.JS, основной веб-фреймворк.
const express = require('express');
// Инициализируем новый маршрутизатор Express.JS.
const router = express.Router();

// Эта функция указывает на то, что при получении GET-запроса на путь "/"
// следующая функция обратного вызова будет выполнена.
router.get("/", (req, res) => {
    // В хедер ответа добавляется Access-Control-Allow-Origin со значением '*'.
    // Это позволяет браузеру делать кроссдоменные запросы к этому серверу.
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Устанавливаем заголовок разрешающий все основные методы HTTP.
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Заголовок "Access-Control-Allow-Headers" устанавливается для разрешения заголовков 
    // "X-Requested-With" и "content-type" в предварительной проверке запроса.
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );

    // Отправляем ответ "Welcome" браузеру.
    res.send("Welcome");
});

// Экспортируем router, чтобы он мог быть использован в других файлах.
module.exports = router;