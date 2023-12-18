import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';

const PrivateRoutes = ({children}) => {

    const {user, loading} = useAuth()



    return (
        <div>
            
        </div>
    );
};

PrivateRoutes.propTypes = {
    children: PropTypes.node.isRequired,
}


export default PrivateRoutes;