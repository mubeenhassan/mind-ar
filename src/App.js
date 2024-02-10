import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MarkerSlider from './Components/Pages/MarkerSlider';
import HomePage from './Components/Pages/HomePage';
import './App.css';
import Layout from "./Components/Layout";
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const storedLanguage = sessionStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);
  return (
    <BrowserRouter>
      <Layout t={t}>
        <Routes>
          <Route index element={<HomePage t={t} />} />
          <Route path="/marker/:targetId" element={<MarkerSlider t={t} />} />
          {/* Add more routes here if needed */}
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
