import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store/store'
import { Provider } from 'react-redux'
// 引入全局样式
import './style/index.css'
// 处理点击移动端事件
import FastClick from 'fastclick';
FastClick.attach(document.body);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

