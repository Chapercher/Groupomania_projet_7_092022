import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../Utils';
import Liker from './Liker';
import { updatePost } from '../../actions/post.actions';
import DeleteCard from './DeleteCard';

const Card = ({ post }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };

  return (
    <li className="card-container" key={post._id}>
      <div className="card-left">
        <img
          src={
            !isEmpty(usersData[0]) &&
            usersData
              .map((user) => {
                if (user._id === post.posterId) return user.picture;
                else return null;
              })
              .join('')
          }
          alt="poster-pic"
        />
      </div>
      <div className="card-right">
        <div className="card-header">
          <div className="pseudo">
            <h3>
              {!isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.posterId) return user.pseudo;
                    else return null;
                  })
                  .join('')}
            </h3>
          </div>
          <span>{dateParser(post.createdAt)}</span>
        </div>
        {isUpdated === false && <p>{post.message}</p>}
        {isUpdated && (
          <div className="update-post">
            <textarea
              defaultValue={post.message}
              onChange={(e) => setTextUpdate(e.target.value)}
            />
            <div className="button-container">
              <button className="btn" onClick={updateItem}>
                Valider modification
              </button>
            </div>
          </div>
        )}
        {post.picture && (
          <img src={post.picture} alt="card-pic" className="card-pic" />
        )}
        {(userData._id === post.posterId || userData.role === 'admin') && (
          <div className="button-container">
            <div onClick={() => setIsUpdated(!isUpdated)}>
              <img src="./img/icons/edit.svg" alt="edit" />
            </div>
            <DeleteCard id={post._id} />
          </div>
        )}
        <div className="card-footer">
          <Liker post={post} />
        </div>
      </div>
    </li>
  );
};

export default Card;
