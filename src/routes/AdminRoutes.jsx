import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import Loader from '../components/loader/Loader';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useIsAdmin from '../hooks/useIsAdmin';

const AdminRoutes = ({ children }) => {

    const [loader, setLoader] = useState(true)


    const { user, logOut } = useAuth()

    const { isAdmin } = useIsAdmin()

    console.log(17, isAdmin);


    useEffect(() => {

        if (user && (isAdmin || !isAdmin)) {
            setLoader(false)
        }
    }, [user, isAdmin])

    if (loader) {
        return <Loader />
    }

    if (isAdmin) {
        return children
    }

    if (isAdmin === false) {

        logOut()
        return <Navigate to={'/login'} />
    }

}

AdminRoutes.propTypes = {
    children: PropTypes.node.isRequired,
}


export default AdminRoutes;