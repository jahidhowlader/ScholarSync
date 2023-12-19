import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import Loader from '../components/loader/Loader';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {

    const { user, loading } = useAuth()

    if (loading) {
        return <Loader />
    }

    if (user) {
        return children
    }

    return <Navigate to={'/login'} />
}

PrivateRoutes.propTypes = {
    children: PropTypes.node.isRequired,
}


export default PrivateRoutes;