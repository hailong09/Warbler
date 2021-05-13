import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import MessageItem from '../components/MessageItem'
import {fetchMessages, removeMessage} from '../store/actions/messages'

const MessageList = ({fetchMessages,messages, removeMessage,currentUser}) => {



   useEffect(()=> {
    fetchMessages();
   }, [])


    return (
        <div className='row col-sm-8'>
            <div className='offset-1 col-sm-10'>
                <ul className='list-group' id= 'messages'>
                    {messages.map(m => (
                        <MessageItem 
                            key={m._id} 
                            date={m.createdAt} 
                            text={m.text} 
                            username={m.user.username}
                            profileImageUrl={m.user.profileImageUrl}
                            removeMessage={removeMessage.bind(this, m.user._id, m._id)}
                            isUser={currentUser === m.user._id }
                        />
                    ))}

                </ul>
            </div>
           
        </div>
    )
}

const mapStateToProps = (state) => (
    {
        messages: state.messageReducer,
        currentUser: state.userReducer.user.id
    }
)

export default connect(mapStateToProps, {fetchMessages, removeMessage})( MessageList)
