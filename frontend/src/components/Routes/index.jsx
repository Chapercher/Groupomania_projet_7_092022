import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Navbar from '../Navbar';

const routes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Profil />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default routes;
