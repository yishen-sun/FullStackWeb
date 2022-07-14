import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import reduxThunk from "redux-thunk";

import App from './components/App';
import reducers from './reducers';

import axios from 'axios';
window.axios = axios;


const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
<Provider store={store}><App /></Provider>, // 每当store里储存的state有变，provider会通知App做出响应
document.querySelector('#root')); // getElementById 差不多 #针对id

//console.log('STRIPE PUB KEY is ', process.env.REACT_APP_STRIPE_PUB_KEY);
//console.log('environment is ', process.env.NODE_ENV);


