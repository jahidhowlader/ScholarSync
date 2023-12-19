import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom"
import Loader from "../components/loader/Loader"
import useAuth from "../hooks/useAuth"

const UserExistRoute = ({ children }) => {

    const { user, loading } = useAuth()

    if (loading) {
        return <Loader />
    }

    if (user) {
        return <Navigate to={'/'} />
    }

    return children
}

UserExistRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default UserExistRoute;