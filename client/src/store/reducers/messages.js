import {LOAD_MESSAGES, REMOVE_MESSAGES} from '../actionTypes'

export const messageReducer = (state =[], action) => {
    const {type, messages, id} = action
    switch(type){
        case LOAD_MESSAGES:
            return [...messages]
        case REMOVE_MESSAGES:
            const Newmessages = state.filter(m => m._id !== id)
            return [...Newmessages]
        default:
            return state

    }
    
}
