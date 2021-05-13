import React from 'react'
import MessageList from '../containers/MessageList'
import UserAside from './UserAside'

const MessageTimeLine = ({profileImageUrl,username}) => {
    return (
        <div className='row'>
            <UserAside profileImageUrl={profileImageUrl} username={username}/>
            <MessageList/>
        </div>
    )
}

export default MessageTimeLine
