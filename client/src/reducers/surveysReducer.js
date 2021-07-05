import { FETCH_SURVEYS } from '../actions/types'
function fetchSurveysReducer(state = [], action){
    switch (action.type){
        case FETCH_SURVEYS:
            console.log('list of surveys', action.payload)
            return action.payload || false
        default:
            return state
    }
}
export default fetchSurveysReducer