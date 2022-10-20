import React, { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Log = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.singnup);
  const [signInModal, setSignInModal] = useState(props.signin);

  const handleModals = (e) => {
    if (e.target.id === 'register') {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === 'login') {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="register"
            className={signUpModal ? 'active-btn' : null}
          >
            S'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={signInModal ? 'active-btn' : null}
          >
            Se connecter
          </li>
        </ul>
        {signUpModal && <SignUp />}
        {signInModal && <SignIn />}
      </div>
    </div>
  );
};

export default Log;
