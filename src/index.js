import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxN52DTAhhFtt072k-jQCPoBcpCOguItI",
  authDomain: "tnmy-chat-app.firebaseapp.com",
  databaseURL: "https://tnmy-chat-app-default-rtdb.firebaseio.com",
  projectId: "tnmy-chat-app",
  storageBucket: "tnmy-chat-app.appspot.com",
  messagingSenderId: "504583099855",
  appId: "1:504583099855:web:4ba2e75a51329b73a8aeba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
