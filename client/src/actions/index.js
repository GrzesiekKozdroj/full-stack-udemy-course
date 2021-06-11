import axios from 'axios'
import { FETCH_USER, FORM_ACTIONS } from './types'

const fetchUser = ()=> async dispatch => {
    const res = await axios.get('/api/current_user')
    dispatch({ type: FETCH_USER, payload: res.data })
}

const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token)
    dispatch({type: FETCH_USER, payload:res.data})
}

const newForm = payload => ({type: FORM_ACTIONS, payload})
export {
    newForm,
    fetchUser,
    handleToken
}