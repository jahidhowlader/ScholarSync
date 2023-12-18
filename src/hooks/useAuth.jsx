import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const useAuth = () => {
    // CONTEXT HOOK FOR GET AUTHENTICATION DATA
    const auth = useContext(AuthContext)
    return auth
};

export default useAuth;