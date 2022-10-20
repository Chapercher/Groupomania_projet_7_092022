import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';
import Logout from './Log/Logout';

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <div className="logo">
            <img src="./img/logo-black-resize.png" alt="icon" />
          </div>
        </div>
        {uid ? (
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink to="/" />
              <h4>Bienvenue {userData.pseudo}</h4>
            </li>
            <li>
              <NavLink to="/home" activeclassname="active-left-nav">
                <img src="./img/icons/home.svg" alt="home" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/" activeclassname="active-left-nav">
                <img src="./img/icons/user.svg" alt="Profil" />
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink to="/">
                <img src="./img/icons/login.svg" alt="Logout" />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
