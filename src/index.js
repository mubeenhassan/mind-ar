import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';


//import {Controller} from 'mind-ar/dist/mindar-image.prod.js';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(  <I18nextProvider i18n={i18n}>
    <App tab="home" /></I18nextProvider>);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
