import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addPost, getPosts } from '../../actions/post.actions';

const NewPost = () => {
  const [message, setMessage] = useState('');
  const [postPicture, setPostPicture] = useState(null); // afficher dans le front
  const [file, setFile] = useState(); // fichier de l'image dans la bdd
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handlePost = async () => {
    if (message || postPicture) {
      const data = new FormData();
      data.append('posterId', userData._id);
      data.append('message', message);
      if (file) data.append('file', file);

      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert('Veuillez entrer un message');
    }
  };

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  // permet d'annuler le post en cours (effacer)
  const cancelPost = () => {
    setMessage('');
    setPostPicture('');
    setFile('');
  };

  return (
    <div className="post-container">
      <NavLink to="/">
        <img src={userData.picture} alt="user-pic" className="user-pic_form" />
      </NavLink>
      <div className="post-form">
        <textarea
          name="message"
          id="message"
          placeholder="Quoi de neuf ?"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <div className="footer-form">
          <div className="icon">
            <>
              <img src="./img/icons/picture.svg" alt="img" />
              <input
                type="file"
                id="file-upload"
                name="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => handlePicture(e)}
              />
            </>
          </div>
          <div className="btn-send">
            {message || postPicture ? (
              <button className="cancel" onClick={cancelPost}>
                Annuler le post
              </button>
            ) : null}
            <button onClick={handlePost}>Poster</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
