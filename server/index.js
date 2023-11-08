// Импортирование необходимых модулей:
const express = require('express'); // Express.js фреймворк для построения веб-приложения
const http = require('http'); // Node.js встроенный модуль для создания http сервера
const { Server } = require('socket.io'); // Модуль для работы с WebSocket'ами
const cors = require('cors'); // Middleware для решения проблем с CORS
const app = express(); // Создание экземпляра приложения Express.js

const route = require('./route'); // Импорт определенного маршрута/роутера
const { addUser, findUser, getRoomUsers, removeUser } = require('./users'); // Импорт функций пользователей

app.use(cors({ origin: "*" })); // Разрешение взаимодействия с любыми доменами
app.use(route); // Использование роутера

// Создание нового http сервера, используя express приложение в качестве обработчика запросов
const server = http.createServer(app);

// Создание нового Socket.io сервера, присоединенного к http серверу
const io = new Server(server, {
    cors: {
        origin: "*", // Разрешение взаимодействия с любыми доменами
        methods: ["GET", "POST"], // Разрешенные методы запросов
    },
});

// Обработка события 'connection' (подключение нового клиента)
io.on('connection', (socket) => {

    // Обработка события 'join' (подключение к чату)
    socket.on('join', ({ name, room }) => {

        // Присоединение сокета к комнате
        socket.join(room);

        // Добавление пользователя в список активных пользователей
        const { user, isExist } = addUser({ name, room });

        const userMessage = isExist
            ? `${user.name}, here you go again` // Сообщение для возвращающегося пользователя
            : `Hey ${user.name}`; // Приветственное сообщение нового пользователя

        // Отправка приветственного сообщения пользователя
        socket.emit('message', {
            data: { user: { name: "Admin" }, message: userMessage },
        });

        // Оповещение всех пользователей в комнате о подключении нового участника
        socket.broadcast.to(user.room).emit('message', {
            data: { user: { name: "Admin" }, message: `${user.name} has joined the chat` },
        });

        // Обновление списка пользователей в комнате
        io.to(user.room).emit('joinRoom', {
            data: { users: getRoomUsers(user.room) },
        });
    });

    // Обработка события 'sendMessage' (отправка сообщения)
    socket.on('sendMessage', ({ message, params }) => {
        const user = findUser(params); // Поиск отправителя сообщения

        // Рассылка сообщения всем пользователям в комнате
        if (user) {
            io.to(user.room).emit('message', { data: { user, message } });
        }
    });

    // Обработка события 'leftRoom' (выход из чата)
    socket.on('leftRoom', ({ params }) => {
        const user = removeUser(params); // Удаление пользователя из списка активных пользователей

        if (user) {

            const { room, name } = user;

            // Оповещение всех пользователей в комнате о выходе участника
            io.to(room).emit('message', {
                data: { user: { name: "Admin" }, message: `${name} left chat` },
            });

            // Обновление списка пользователей в комнате
            io.to(room).emit('joinRoom', {
                data: { users: getRoomUsers(room) },
            });
        }
    });

    // Обработка события 'disconnect' (отключение клиента)
    io.on('disconnect', () => {
        console.log("Disconnect"); // Вывод сообщения об отключении клиента в консоль
    });
});

// Слушаем HTTP-сервер на порту 5000
server.listen(5000, () => {
    console.log("Server is running"); // Вывод сообщения о успешном запуске сервера
});