import React, { useContext } from 'react';
import Log from '../../components/Log';
import { UidContext } from '../../components/AppContext';
import UpdateProfil from '../../components/Profil/UpdateProfil';
import DeleteUser from '../../components/Profil/DeleteUser';

const Profil = () => {
  const uid = useContext(UidContext);

  return (
    <div className="profil-page">
      {uid ? (
        <UpdateProfil />
      ) : (
        <div className="log-container">
          <Log signin={false} singnup={true} />
        </div>
      )}
      {uid ? <DeleteUser /> : null}
    </div>
  );
};

export default Profil;
