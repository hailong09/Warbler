import {combineReducers} from 'redux'
import {userReducer} from './currentUser'
import {ErrorReducer} from './errors'
import {messageReducer} from './messages'

export const rootReducer = combineReducers({
    userReducer,
    ErrorReducer,
    messageReducer
})

