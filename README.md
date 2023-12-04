[![Tests](https://github.com/yandex-praktikum/react-mesto-api-full-gha/actions/workflows/tests.yml/badge.svg)](https://github.com/yandex-praktikum/react-mesto-api-full-gha/actions/workflows/tests.yml)
# react-mesto-api-full

## Описание проекта

Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, редактированием данных и добавлением фотокарточек в общую галерею. Бэкенд расположите в директории `backend/`, а фронтенд - в `frontend/`. 

<a href="https://github.com/AlenaNikitiina/mesto">Изначально</a> проект был написан на нативных технологиях: JavaScript, CSS и HTML5. <a href="https://github.com/AlenaNikitiina/react-mesto-auth">Затем</a> проект был перенесен на "React" с добавлением функционала регистрации и авторизации пользователей, отдельно написана логика серверной части с фреймворком "Express" и в завершение обе части объединены и сохранены на виртуальной машине, размещенной на Яндекс Облаке.

Адрес репозитория: https://github.com/AlenaNikitiina/react-mesto-api-full-gha.git

## Ссылки на проект

IP address 158.160.101.167

Frontend https://nikitina.nomoredomains.monster

Backend https://api.nikitina.nomoredomains.monster

Ссылка на макет в Figma [Посмотреть](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?type=design&node-id=0-1)
Ссылка на макет регистрации и авторизации [Посмотреть](https://www.figma.com/file/5H3gsn5lIGPwzBPby9jAOo/JavaScript.-Sprint-12?type=design&node-id=0-1)

## Функциональность

* Сайт является адаптивно-отзывчивым. Адаптирован под экраны с шириной 320 и 1280 пикселей (медиазапросы и резиновая верстка)
* БЭМ-подход. Организация файловой структуры Nested
* Используется Flexbox и Grid верстка
* Регистрация, авторизация и аутентификация пользователя
* Возможность загружать данные на сервер (при обновлении страницы, данные сохраняются)
* ReactRoutes
* Сервер (Node.js)
* База данных (MongoDB)

## Запуск

* npm i - установить зависимости (отдельно - в папке frontend и backend)
* npm run dev - запустить приложение в режиме разработчика в папке backend
* npm run start - запустить приложение в режиме разработчика в папке frontend

Проект прошел код ревью и завершен.
