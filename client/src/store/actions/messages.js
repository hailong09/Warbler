import {apiCall} from '../../services/api'
import {LOAD_MESSAGES, REMOVE_MESSAGES} from '../actionTypes'
import {addError} from './error'


export const loadMessages = messages => ({
    type : LOAD_MESSAGES,
    messages

})

export const remove = id => (
    {
        type: REMOVE_MESSAGES,
        id
    }
)

export const fetchMessages =  () => {
    return async dispatch => {
        const data = await apiCall('get', '/api/messages')
        if(data){
            dispatch(loadMessages(data))
        }
        else{
            addError(data.message);
        }
    }
}

export const postNewMessage = text => async (dispatch, getState) => {
    const { userReducer} = getState();
   
    const id =  userReducer.user.id;
    const response = await apiCall('post', `api/users/${id}/messages`, {text})
    if(response.message){
        dispatch(addError(response.message))
    }
        
    
}

export const removeMessage = (user_id, message_id) => {
    return async dispatch => {
        const response = await apiCall('delete', `api/users/${user_id}/messages/${message_id}`)
        if(response.message){
            dispatch(addError(response.message))
        }

        dispatch(remove(message_id));
    }
}