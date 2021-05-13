import {SET_CURRENT_USER} from '../actionTypes'

export const USER_DEFALUT_STATE = {
    isAuthenticated: false,
    user: {}
}

export const userReducer = (state = USER_DEFALUT_STATE, action) => {
    const {type, user} = action
    switch(type){
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !!Object.keys(user).length,
                user

            }
        default:
            return state 
    }
}
