import { useEffect, useState } from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import EditProfilePopup from "./EditProfilePopup";
import PopupWithSubmmitDelete from "./PopupWithSubmmitDelete";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
// регистрация и авторизация
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";


export default function App () {
  // стейты(переменные) (привязан к одной ф и не выходит за пределы, выше)
  // ф-ия юз возвр массив в кот 2 элемента; текущие значение и ф-ия сеттер для его изм

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState (false); // форма поменять имя работу
  const [isEditAddPlacePopupOpen, setIsEditAddPlacePopupOpen] = useState (false); // форма доб фотку
  const [isEiditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState (false); // форма смена аватара
  const [isWithSubmmitDeletePopupOpen, setIsWithSubmmitDeletePopupOpen] = useState (false); // форма подтверждения удаления карточки
  const [selectedCard, setSelectedCard] = useState (null);  // zoom при клике на фото (то что будет false)
  const [deletingCard, setDeletingCard] = useState(null) // = false

  const [cards, setCards]                 = useState([]); // для апи
  const [currentUser, setCurrentUser]     = useState({}) // переменную состояния currentUser
  const [renderLoading, setRenderLoading] = useState(false) // идет сохранение/ загрузка

  // регистрация, авторизация
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(""); // email in header
  const [isEditInfoTooltip, setIsEditInfoTooltip] = useState(false); // popup
  const [registrationForm, setRegistrationForm] = useState({ status: false, text: "" });
  const navigate = useNavigate();

  // ф состоит из колбэка(в кот находится запрос) и массива
  //(он не обязан-й, но без будет на любое нажатие вызываться useEffect. А с пустым массивом [] ток один раз при загрузке отработает)
  // а если положить конкретный is... будет следить за ним [isEditProfilePopupOpe] и перерис


  // авторизация, в компоненте логин
  function handelLogin( {email, password} ) {
    auth.authorize(email, password)
      .then((data) => {
        console.log('handelLogin: ', data)

        localStorage.setItem("jwt", data.token); // если ок то добавь в localStorage
        api.setAuthToken(data.token);
        setLoggedIn(true); 
        setUserEmail(email);
        navigate("/", {replace : true} )
      })
      .catch(() => {
        setIsEditInfoTooltip(true)
        setRegistrationForm({
          status: false,
          text: 'Что-то пошло не так!',
        })
      })
  };

  // регистрация, в компоненте регистр / как прошла ?
  function handelRegistration( {email, password} ) {
    auth.register(email, password)
      .then((res) => {
        if (res) {
          setRegistrationForm({
            status: true,
            text: 'Вы успешно зарегистрировались!',
          })
          navigate('/sign-in', { replace: true })
        }
      })
      .catch(() => {
        setRegistrationForm({
          status: false,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
        })
      })
      .finally(() => setIsEditInfoTooltip(true))
  };

  // проверка токена. если есть токен в localStorage,то проверим валидность токена
  const checkToken = () => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      auth.checkToken(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true); // авторизуем пользователя
          setUserEmail(res.email) //получаем данные пользователя для хэдера
          navigate("/", {replace: true}) // перенаправьте
        }
      })
      .catch((err) => {
        console.log('Неверный токен.', err);
      })
    }
  }; 

  //
  useEffect(() => {
    checkToken();
  }, [] ); // ток один раз при первом рендеринге
  // или написать loggedIn
  
  // кнопка выйти / разлогиниться
  function signOut() {
    localStorage.removeItem('jwt'); // удалить
    setLoggedIn(false); // разлогинить
    navigate('/sign-in');
  };

  /////from 11pr////
  // от сервера получили данные о юзере и карточки, если он залогрован
  useEffect(() => {
    if (loggedIn) {
    Promise.all([ api.getUserInfo(), api.getInitialCards() ])
      .then(( [data, cards] ) => {
        setCurrentUser (data);
        setCards (cards);
      })
      .catch((err) => {
        console.log(`Ошибка в процессе загрузки данных пользователя и галереи: ${err}`);
      })
  }}, [loggedIn] )

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen (true) // при этом перерисуется
  }

  function handleAddPlaceClick () {
    setIsEditAddPlacePopupOpen (true)
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen (true)
  }

 // удалить карточку
  function handleConfimDeleteCard (card) {
    setIsWithSubmmitDeletePopupOpen (true);
    setDeletingCard(card);
  }
 
  // для zoom
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  //клик на оверлэй, вне формы
  function handleOverlayClick (evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }
  /* if (evt.target.classList.contains('popup_opened')) // (evt.target === evt.currentTarget)*/

  function closeAllPopups () {
    setIsEditProfilePopupOpen (false);
    setIsEditAddPlacePopupOpen (false);
    setIsEditAvatarPopupOpen (false);
    setIsWithSubmmitDeletePopupOpen (false);
    setSelectedCard (null);
    setDeletingCard(null);
    setIsEditInfoTooltip(false);
  }

  // обработчик изменения данных пользователя. имя работа. from EditProfilePopup
  function handleUpdateUser(name, about) {
    setRenderLoading(true);

    api.editingProfile(name, about)
      .then ((newUserData) => {
        setCurrentUser(newUserData); // обновили
        closeAllPopups();
      })
      .catch(err => {
        console.log("Не получилось изменить данные: ", err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  }

  // меняем аватар
  function handleUpdateAvatar (data) {
    setRenderLoading(true);

    api.updateAvatar(data)
      .then((newavatar) => {
        setCurrentUser(newavatar);
        closeAllPopups();
      })
      .catch(err => {
        console.log("Не получилось обновить аватар: ", err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  }

  // добавить новую карточку
  function handleAddPlaceSubmit (name, link) {
    setRenderLoading(true);

    api.uploadNewCard (name, link) // метод из апи - добавить нов карточку с именем и ссылкой
    .then((newCard) => {
      setCards( [newCard, ...cards] );
      closeAllPopups();
    })
    .catch(err => {
      console.log("Не получилось добавить новую карточку: ", err);
    })
    .finally(() => {
      setRenderLoading(false);
    })
  };

  // удалить карточку 
  function handleCardDelete(card) {
    setRenderLoading(true); 

    api.removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка при удалении карточки: ", err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
  }

  // поставить и снять лайк
  function handlePutLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id); // Снова проверяем, есть ли уже лайк на этой карточке

    if (!isLiked) {
      api.addLike(card._id, !isLiked) // Отправляем запрос в API и получаем обновлённые данные карточки
        .then((newCard) => {
          console.log('1111111', card._id);
          setCards((state) => 
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log("Не получилось поставить jjj like: ", err);
        });
    } else {
      api.deleteLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => 
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log("Не получилось снять like: ", err);
        });
    }
  }

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="App page">
      <Header
        userEmail={userEmail}
        onSignOut={signOut}
      />
      <Routes>
        <Route path="/" element={
          <ProtectedRoute
            component={Main}
            loggedIn={loggedIn}
            handleEditAvatarClick = {handleEditAvatarClick}   // передаем через пропс ф-ии, лучше одинаковые
            handleEditProfileClick = {handleEditProfileClick} // поппап редактирования
            handleAddPlaceClick = {handleAddPlaceClick}       // попап доб нов карточку
            onCardClick={handleCardClick} // zoom f
          
            cards = {cards}
            onClickDeleteCard={handleConfimDeleteCard} // удалить карточку
            onCardLike={handlePutLike} // лайк
          /> }>
        </Route>
        <Route path="/sign-up" element={<Register handelRegistration={handelRegistration} />}></Route>
        <Route path="/sign-in" element={<Login handleLogin={handelLogin} />}></Route>
      </Routes>
      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        onOverlayClick={handleOverlayClick}
        renderLoading={renderLoading}
      />

      <AddPlacePopup
        isOpen={isEditAddPlacePopupOpen}
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick}
        onAddPlace={handleAddPlaceSubmit}
        renderLoading={renderLoading}
      />

      <EditAvatarPopup
        isOpen={isEiditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        onOverlayClick={handleOverlayClick}
        renderLoading={renderLoading}
      />

     <PopupWithSubmmitDelete
        isOpen ={isWithSubmmitDeletePopupOpen}
        onClose={closeAllPopups}
        onConfirmDelete={handleCardDelete}
        currentCard={deletingCard}
        onOverlayClick={handleOverlayClick}
        renderLoading={renderLoading}
      />

      <ImagePopup
        card={selectedCard}
        isOpen={setSelectedCard}
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick}
        registrationForm={registrationForm}
      />

      <InfoTooltip
        isOpen={isEditInfoTooltip}
        onClose={closeAllPopups}
        registrationForm={registrationForm}
      />
    </div>
  </CurrentUserContext.Provider>
  )

}
