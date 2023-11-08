// Импортируем функцию trimStr из модуля './utils'. 
// Эта функция удаляет пробелы в начале и в конце строки и приводит ее к нижнему регистру.
const { trimStr } = require("./utils");

// Инициализируем пустой массив "users" для хранения информации о пользователях
let users = [];

// Объявляем функцию "findUser", которая принимает объект пользователя и 
// ищет его по имени и номеру комнаты.
const findUser = (user) => {

    const userName = trimStr(user.name);
    const userRoom = trimStr(user.room);

    return users.find(
        (u) => trimStr(u.name) === userName && trimStr(u.room) === userRoom
    );
};

// Объявлем функцию "addUser", которая проверяет, существует ли пользователь уже в системе,
// и если нет, то добавляет его.
const addUser = (user) => {
    const isExist = findUser(user);

    // Если пользователя нет, добавляем его в список пользователей
    !isExist && users.push(user);

    const currentUser = isExist || user;

    // Возвращаем объект, который указывает, существУет ли пользователь, и кто сейчас пользователь
    return { isExist: !!isExist, user: currentUser };
};

// Объявляем функцию "getRoomUsers", которая возвращает всех пользователей в указанной комнате
const getRoomUsers = (room) => users.filter((u) => u.room === room);

// Объявляем функцию "removeUser", которая удаляет пользователя из списка пользователей, если он там есть
const removeUser = (user) => {
    const found = findUser(user);

    // Если пользователь найден, удаляем его из списка пользователей
    if (found) {
        users = users.filter(
            ({ room, name }) => room === found.room && name !== found.name
        );
    }

    // Возвращаем найденного пользователя
    return found;
};

// Экспортируем функции addUser, findUser, getRoomUsers, removeUser для использования в других файлов
module.exports = { addUser, findUser, getRoomUsers, removeUser };