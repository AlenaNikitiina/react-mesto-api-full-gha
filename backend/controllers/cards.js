const mongoose = require('mongoose');
const Card = require('../models/card'); // модель

const NotFoundError = require('../errors/NotFoundError'); // 404
const BadRequestError = require('../errors/BadRequestError'); // 400
const OwnerError = require('../errors/OwnerError'); // 403

// создаёт карточку.  POST /cards
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
      // if (error.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(error);
      }
    });
};

// возвращает все карточки.  GET /cards
const getCards = (req, res, next) => {
  Card.find({})
    .populate(['likes', 'owner'])
    .then((cards) => res.send(cards))
    .catch((error) => {
      next(error);
    });
};

// поставить лайк карточке.  PUT /cards/:cardId/likes
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .populate(['likes', 'owner'])
    .orFail(() => {
      throw new NotFoundError('Пользователь с некорректным id');
    })
    .then((card) => {
      res.send(card); // send({ data: card })
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
      // if (error.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
      } else {
        next(error);
      }
    });
};

// убрать лайк с карточки.  DELETE /cards/:cardId/likes
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .populate(['likes', 'owner'])
    .orFail(() => {
      throw new NotFoundError('Пользователь с некорректным id');
    })
    .then((like) => res.send(like))
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
      // if (error.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при снятии лайка.'));
      } else {
        next(error);
      }
    });
};

// удаляет карточку по идентификатору.  DELETE /cards/:cardId
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }

      const ownerId = req.user._id;
      if (card.owner.toString() === ownerId) {
        Card.deleteOne(card)
          .then(() => {
            res.status(200).send({ data: card });
          })
          .catch(next);
      } else {
        throw new OwnerError('Удаление чужой карточки невозможно');
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
      // if (error.name === 'CastError') {
        next(new BadRequestError('Карточка с указанным _id не найдена.'));
      } else {
        next(error);
      }
    });
};

module.exports = {
  getCards, createCard, likeCard, dislikeCard, deleteCard,
};
