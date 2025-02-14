import './styles/index.css';
import 'react-loading-skeleton/dist/skeleton.css';

import axios from 'axios';
// import axiosConfig from './libs/axios';

import App from './App.jsx';
// import React from 'react';
import ReactDOM from 'react-dom/client';
// axios.create(axiosConfig);
// axios.defaults.baseURL = 'https://menubar-api.mrtakrobot.ir/api/v1';
axios.defaults.baseURL = 'http://localhost:6001/api';
// axios.defaults.headers.common['restaurantName'] = 'menubar';
axios.defaults.headers.common['project'] = 'menubar';
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
