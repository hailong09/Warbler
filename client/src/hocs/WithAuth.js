import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import  {Route, useHistory} from 'react-router-dom'

const WithAuth = ({component: Component,...rest}) => {
    const history = useHistory()

    useEffect(()=>{
        if(rest.isAuthenticated === false){
            history.push('/signin')
        }
    },[])
    return (
        <Route {...rest}  render={props => <Component {...rest} {...props}/>}/>
    )
}

const mapStateToProps = (state) =>(
    {
        isAuthenticated: state.userReducer.isAuthenticated
    }
)
export default connect(mapStateToProps)(WithAuth)
