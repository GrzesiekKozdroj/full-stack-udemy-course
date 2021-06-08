import 'materialize-css/dist/css/materialize.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'


import reducers from './reducers/index'
import App from './components/App'
//code for testing instead of postman
import axios from 'axios' 
window.axios = axios

const store = createStore( reducers, {}, applyMiddleware(reduxThunk) )

ReactDOM.render(
    <Provider store={store} >
        <   App  />
    </Provider>,
    document.querySelector('#root')
)