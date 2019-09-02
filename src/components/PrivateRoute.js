import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
function PrivateRoute({ component: Component, loginState, ...rest }) {
    // console.log('loginState = ', loginState)
    return (
        <Route
            {...rest}
            render={props => loginState? <Component {...props}/> :
                <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
            }
        >

        </Route>
    )
}

const mapStateToProps = (state) => {
    return {
        loginState: state.userModule.loginState
    }
}


export default connect(mapStateToProps)(withRouter(PrivateRoute))
