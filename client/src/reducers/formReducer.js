import { FORM_ACTIONS } from '../actions/types'

function formReducer(state = {}, action){
    switch (action.type){
        case FORM_ACTIONS:
            console.log('redux updated', action.payload)
            return action.payload || false
        default:
            return state
    }
}
export default formReducer