import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './routes';


// <!--============================== Google Fonts ============================== -->
// <link rel="preconnect" href="https://fonts.googleapis.com/">
// <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
// <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&amp;family=Outfit:wght@100..900&amp;display=swap" rel="stylesheet">


// <!--============================== All CSS File ============================== -->
// <!-- Swiper Js -->
// <link rel="stylesheet" href="assets/css/swiper-bundle.min.css">

import "aos/dist/aos.css";
// <!-- Bootstrap -->
import './styles/css/bootstrap.min.css';
// <!-- Fontawesome Icon -->
import './styles/css/fontawesome.min.css';
// <!-- Magnific Popup -->
import './styles/css/magnific-popup.min.css';
// <!-- Theme Custom CSS -->
import './styles/css/style.css';

// Set RTL direction globally on the HTML tag
// document.documentElement.setAttribute("dir", "rtl");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
     <App />
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
