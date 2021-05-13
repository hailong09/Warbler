import React from 'react'
import Moment from 'react-moment'
import {Link} from 'react-router-dom'
import DefaultProfileImg from '../images/default-profile-image.jpg'
import Button from 'react-bootstrap/Button'
const MessageItem = ({date, text, username,profileImageUrl,removeMessage,isUser}) => {
    // console.log(text)
    return (
        <>
            <li className='list-group-item'>
                <img 
                    src={profileImageUrl || DefaultProfileImg} 
                    alt={username}
                    className='timeline-image'
                    height='100'
                    width='100'
                />
                <div className='message-area'>
                    <Link to='/'>@{username} &nbsp;</Link>
                    <span className='text-muted'>
                        <Moment className='text-muted' format="Do MMM YYYY">
                            {date}
                        </Moment>
                    </span>
                    <p>{text}</p>
                   { isUser && <Button variant="danger" onClick={removeMessage} className='delete_btn'>Delete</Button>}
                </div>

            </li>
            
        </>
    )
}

export default MessageItem
