import React from 'react';
import { deleteUser } from '../../actions/user.actions';
import { useDispatch, useSelector } from 'react-redux';

const DeleteUser = () => {
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const deleteU = () => dispatch(deleteUser(userData._id));

  return (
    <div
      onClick={() => {
        if (window.confirm('Voulez-vous vraiment supprimer votre profil ?')) {
          deleteU();
          window.location.reload();
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="trash" />
    </div>
  );
};

export default DeleteUser;
