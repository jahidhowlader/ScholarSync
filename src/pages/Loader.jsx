import React from 'react';
import useAuth from '../hooks/useAuth';

const Loader = ({children}) => {

    const { loading } = useAuth()

    if(loading){
        return 'loading'
    }


    return children
};

export default Loader;