import React from 'react'
import { Redirect} from 'react-router-dom'

export default function ProtectedRoute({component}) {
    const Component = component;
    const isAutenticatd = localStorage.get('token');
    return isAutenticatd ? (<Component />) : <Redirect to={{pathname: '/auth'}} />
}
