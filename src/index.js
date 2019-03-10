import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/index';
import middleware from './middleware/index';
import './index.css';
import App from './components/App';

const store = createStore(reducer, middleware);

console.log(store.getState());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));