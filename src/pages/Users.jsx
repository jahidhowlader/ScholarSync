import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const Users = () => {

    // const [allUsers, setAllUsers] = useState([])

    // GET TOKEN FROM LOCAL STORAGE
    const token = localStorage.getItem('access-token')

    const { user } = useAuth()

    useEffect(() => {

        fetch('http://localhost:3000/api/users', {
            method: "GET",
            headers: {
                authorization: token
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        
    }, [token])

    return (
        <div>

        </div>
    );
};

export default Users;