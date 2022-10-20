import React from 'react';
import { useSelector } from 'react-redux';
import UploadImg from './UploadImg';

const UpdateProfil = (props) => {
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.userError);

  return (
    <div className="profil-container">
      
      <div className="update-container">
        <div className="info-part">
        <h1> Profil de {userData.pseudo}</h1>
          <h2>Photo de profil</h2>
          <img src={userData.picture} alt="user-pic" />
          <UploadImg />
          <p>{error.maxSize}</p>
          <p>{error.format}</p>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
