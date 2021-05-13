import React from 'react'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Homepage from '../components/Homepage'
import AuthForm from '../components/AuthForm'
import {authUser} from '../store/actions/auth'
import {removeError} from '../store/actions/error'
import WithAuth from '../hocs/WithAuth'
import MessageForm from '../containers/MessageForm'
const Main = (props) => {
    const {authUser, errors,removeError, currentUser} = props;
   
    return (
        <div className='container mt-4'>
            <Switch>
                <Route exact path='/' render={props => <Homepage currentUser={currentUser} {...props}/>}/>
                <Route exact path='/signin' render={props => {
                    return (
                        <AuthForm 
                            {...props} 
                            buttonText="Log in"
                            heading="Welcome Back."
                            onAuth = {authUser}
                            errors={errors}
                            removeError={removeError}
                            
                         />
                    )
                }}/>

                <Route exact path='/signup' render={props => {
                    return (
                        <AuthForm 
                            
                            {...props} 
                            buttonText="Sign me up!" 
                            heading="Join Warbler today."
                            signUp
                            onAuth = {authUser}
                            errors={errors}
                            removeError={removeError}
                            
                        />
                    )
                }}/>
                <WithAuth exact path='/users/:id/messages/new' component={MessageForm}/>
            </Switch>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    
    return {
        currentUser: state.userReducer,
        errors: state.ErrorReducer
        
    }

}

export default withRouter(connect(mapStateToProps,{authUser, removeError})(Main));
