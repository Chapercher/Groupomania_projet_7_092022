import React, { useState, useEffect, useContext } from 'react';
import { UidContext } from '../AppContext';
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../actions/post.actions';

const Like = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, uid));
    setLiked(true);
  };
  const unlike = () => {
    dispatch(unlikePost(post._id, uid));
    setLiked(false);
  };

  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, post.likers, liked]);

  return (
    <div className="like-container">
      {/* user like  */}
      {uid && liked === false && (
        <img src="./img/icons/heart.svg" onClick={like} alt="like" />
      )}
      {/* user dislike  */}
      {uid && liked && (
        <img src="./img/icons/heart-filled.svg" onClick={unlike} alt="like" />
      )}
      {/* combien de personne ont liker  */}
      <span>{post.likers.length}</span>
    </div>
  );
};

export default Like;
