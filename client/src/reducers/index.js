import { combineReducers } from 'redux'
import authReducer from './authReducer'
import formReducer from './formReducer'
import  { reducer as reduxForm } from 'redux-form'
export default combineReducers({
    auth: authReducer,
    form: reduxForm
    //form: formReducer,
})