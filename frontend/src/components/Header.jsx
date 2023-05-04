import { Routes, Route, Link } from 'react-router-dom';
import headerLogo from '../images/logo-Vector.png';

export default function Header( {userEmail, onSignOut } ) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="логотип приложения Место" />
      <Routes>
        <Route path='/sign-in' element={
          <Link to={'/sign-up'} className="header__navLink header__navLink_active">Регистрация</Link> }
        />
        <Route path='/sign-up' element={
          <Link to={'/sign-in'} className="header__navLink header__navLink_active">Войти</Link> }
        />
        <Route path='/' element={
          <>
            <div className='header__container'>
              <p className='header__email'>{userEmail}</p>
              <button className='header__signOut' onClick={onSignOut}>Выйти</button>
            </div>
          </>}
        />
      </Routes>
    </header>
  );
}

/* навигация и ссылки  <NavLink to="/about-us" className={({isActive}) => `menu__link ${isActive ? "menu__link_active" : ""}`}>О нас</NavLink>*/