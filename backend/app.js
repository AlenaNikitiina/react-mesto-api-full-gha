// импортируем
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { errors } = require('celebrate'); // будет обрабатывать ток ошибки, которые сгенерировал celebrate
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleErrors = require('./middlewares/handleErrors');

const { PORT, SERVER_ADDRESS } = require('./config');
const router = require('./routes/index'); // тут все роуты

// создаем приложение
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger); // подключаем логгер запросов

app.use(router); // Здесь роутинг всех

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate
app.use(handleErrors); // централизованный обработчик ошибок

// подключаемся к серверу mongo
mongoose.connect(SERVER_ADDRESS)
  .then(() => console.log('Успешное подключение к MongoDB'))
  .catch((error) => console.error('Ошибка подключения:', error));

//
app.listen(PORT, () => {
  console.log(`app listening on port: ${PORT}`);
});
