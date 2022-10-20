import React, { useContext } from 'react';
import { UidContext } from '../../components/AppContext';
import NewPost from '../../components/Post/NewPost';
import Thread from '../../components/Thread';

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <div className="home">
      <div className="main">
        <div className="home-header">{uid ? <NewPost /> : null}</div>
        <Thread />
      </div>
    </div>
  );
};

export default Home;
