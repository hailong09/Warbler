import {ADD_ERROR, REMOVE_ERROR} from '../actionTypes'


export const ErrorReducer = (state = {message: null}, action) =>  {
    const {type, error} = action
    switch(type){
        case ADD_ERROR:
            return{
                ...state,
                message: error
            }

        case REMOVE_ERROR:{
            return {
                ...state,
                message: null
            }
        }
        default:
            return state
    }
}
