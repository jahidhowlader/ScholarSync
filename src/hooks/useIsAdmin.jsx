import { useEffect, useState } from 'react';
import useAuth from './useAuth';

const useIsAdmin = () => {

    // ALL STATE ARE HERE
    const [isAdmin, setIsAdmin] = useState(null)
    const [loading, setLoading] = useState(true)

    // IMPORT AUTHCONTEXT
    const { user } = useAuth()

    // GET TOKEN FROM LOCAL STORAGE
    const token = localStorage.getItem('access-token')

    useEffect(() => {

        if (user) {

            fetch(`https://scholarsync-server-production.up.railway.app/api/users/${user?.email}`, {
                method: "GET",
                headers: {
                    authorization: token
                }
            })
                .then(res => res.json())
                .then(data => {
                    setIsAdmin(data.isAdmin)
                    setLoading(false)
                })
        }

    }, [token, user, loading, setLoading])

    return { isAdmin, loading }
};

export default useIsAdmin;