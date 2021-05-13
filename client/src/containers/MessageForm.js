import React, { useState } from 'react'
import {connect} from 'react-redux'
import {postNewMessage} from '../store/actions/messages'
import {useHistory} from 'react-router-dom'
const MessageForm = ({errors, postNewMessage}) => {
    const history = useHistory()
    const [message, setMessage] = useState('');

    const handleNewMessage = e => {
        e.preventDefault();
        postNewMessage(message);
        setMessage('');
        history.push('/')
    }

    return (
        <div>
            <form onSubmit={handleNewMessage}>
                {errors.message && (
                    <div className='alert alert-danger'>
                        {errors.message}
                    </div>
                ) }
                <input 
                    type='text' 
                    className='form-control'
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button type='submit' className='btn btn-success pull-right'>
                    Add my message!
                </button>
            </form>
            
        </div>
    )
}

const mapStateToProps = (state) => (
    {
        errors: state.ErrorReducer
    }
)

export default connect(mapStateToProps, {postNewMessage})(MessageForm)
