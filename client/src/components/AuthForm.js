import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import {useHistory} from 'react-router-dom'

const AuthForm = ({heading, buttonText, signUp, onAuth,errors,removeError}) => {
    const history = useHistory()
    const [authState, setAuthState] = useState({
        email: '',
        username:'',
        password:'',
        profileImageUrl:''
    })

    const {email, username, password, profileImageUrl} = authState
    const onChangeAuth = e => setAuthState({...authState ,[e.target.name]: e.target.value})
    const handleSubmit = async e => {
        e.preventDefault();
        const authType = signUp ? 'signup' : 'signin';
        try {
            await onAuth(authType, authState);
            history.push('/')
        } catch (error) {
            
        }
      
        

    }
    history.listen(() => {
        removeError();
    })
    return (
        <div>
            <div className="row justify-content-md-center text-center">
                <div className='col-md-6'>
                    <form onSubmit={handleSubmit}>
                        <h2>{heading}</h2>
                        {errors.message && <div className='alert alert-danger'>{errors.message}</div>}
                        <label htmlFor='email'>Email:</label>
                        <input 
                            className='form-control' 
                            id='email' 
                            name='email'
                            value={email}
                            type='text'
                            onChange={onChangeAuth}
                        />

                        {signUp && (
                            <div>
                            <label htmlFor='username'>Username:</label>
                            <input 
                                className='form-control' 
                                id='username' 
                                name='username'
                                value={username}
                                type='text'
                                onChange={onChangeAuth}
                             />
                            <label htmlFor='profileImageUrl'>Image URL:</label>
                            <input 
                                className='form-control' 
                                id='profileImageUrl' 
                                name='profileImageUrl'
                                value={profileImageUrl}
                                type='text'
                                onChange={onChangeAuth}
                            />
                            </div>
                        )}
                         <label htmlFor='password'>Password:</label>
                        <input 
                            className='form-control' 
                            id='password' 
                            name='password'
                            value={password}
                            type='password'
                            onChange={onChangeAuth}
                        />
                       <Button type="submit" className='mt-2 w-100' variant="success" size="lg" >{buttonText}</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AuthForm
