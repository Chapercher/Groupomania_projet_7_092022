import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture } from '../../actions/user.actions';

const UploadImg = () => {
  // stocker l'img
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  //transmettre l'img
  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', userData.pseudo); //nom du fichier
    data.append('userId', userData._id); //found user
    data.append('file', file); //fichier

    dispatch(uploadPicture(data, userData._id));
  };
  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file">Nouvelle photo</label>
      <input
        type="file"
        name="file"
        id="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default UploadImg;
