import React from 'react'
import './styles/index.css'

import App from './App.jsx'

import ReactDOM from 'react-dom/client'

// import axios from 'axios'
// axios.defaults.headers.common['restaurantName'] = 'menubar';
// axios.defaults.baseURL = 'https://menubar-api.mrtakrobot.ir/api/v1';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)