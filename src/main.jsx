import React from 'react';
import ReactDom from "react-dom/client";
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
// import { BibleDataProvider } from './context/BibleDataContext';

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <BibleDataProvider> */}
      <App />
      {/* </BibleDataProvider> */}
    </BrowserRouter>
  </React.StrictMode>
)

