import {apiCall, setTokenHeader} from '../../services/api'
import {SET_CURRENT_USER} from '../actionTypes'
import {addError, removeError} from './error'


export const setCurrenUser = (user) => ({
    type: SET_CURRENT_USER,
    user
})

export const setAuthorizationToken= (token) =>{
    setTokenHeader(token);
}

export const logout = () => {
    return dispatch => {
        localStorage.clear();
        setAuthorizationToken(false);
        dispatch(setCurrenUser({}))
    }
} 
export const authUser =  (type, userData) => {
   return async dispatch =>  {
        try {
            const data = await apiCall('post', `/api/auth/${type}`, userData);
            const {token, ...user} = data; 
            if(token && user){
               
                localStorage.setItem('jwtToken', token);
                setAuthorizationToken(token)
                dispatch(setCurrenUser(user));
                dispatch(removeError())
                return data;
            }else{
                dispatch(addError(data.message))
            }
           
            
              
           
        }catch(error){
           
        }
   }
}