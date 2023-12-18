import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";

const Navbar = () => {

    // ALL STATE ARE HERE
    const [isAdmin, setIsAdmin] = useState(null)

    // IMPORT AUTHCONTEXT
    const { user, logOut, loading, setLoading } = useAuth()

    // GET TOKEN FROM LOCAL STORAGE
    const token = localStorage.getItem('access-token')

    useEffect(() => {


        if (user) {

            // setLoading(true)

            fetch(`http://localhost:3000/api/users/${user?.email}`, {
                method: "GET",
                headers: {
                    authorization: token
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setIsAdmin(data)
                    setLoading(false)
                })
            // .finally(() => setLoading(false))
        }

        // setLoading(false)



    }, [token, user, loading, setLoading])

    return (
        <>
            {
                loading ? 'loading' : (
                    <nav className="bg-black text-white py-4 shadow-sm shadow-primary-color">

                        <div className="my-container flex justify-between items-center">

                            <Link to='/'><h1 className="text-[#5f01f2] font-bold italic text-2xl uppercase">ScholarSync</h1></Link>

                            <ul className="flex gap-10 uppercase">
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) => isActive ? "text-[#5f01f2] " : ""}
                                    >
                                        HOME
                                    </NavLink>
                                </li>

                                {
                                    user && !isAdmin ? (
                                        <>
                                            <li>
                                                <NavLink
                                                    to="/applyList"
                                                    className={({ isActive }) => isActive ? "text-[#5f01f2] " : ""}
                                                >
                                                    APPLIED LIST
                                                </NavLink>
                                            </li>

                                            <li onClick={async () => await logOut()}>
                                                <Link to="/">
                                                    LOGOUT
                                                </Link>
                                            </li>
                                        </>
                                    ) : user && isAdmin ? (
                                        <>
                                            <li>
                                                <NavLink
                                                    to="/addCourse"
                                                    className={({ isActive }) => isActive ? "text-[#5f01f2] " : ""}
                                                >
                                                    ADD COURSE
                                                </NavLink>
                                            </li>

                                            <li>
                                                <NavLink
                                                    to="/appliedList"
                                                    className={({ isActive }) => isActive ? "text-[#5f01f2] " : ""}
                                                >
                                                    APPLIED LIST
                                                </NavLink>
                                            </li>

                                            <li onClick={async () => await logOut()}>
                                                <Link to="/">
                                                    LOGOUT
                                                </Link>
                                            </li>   
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <NavLink
                                                    to="/login"
                                                    className={({ isActive }) => isActive ? "text-[#5f01f2] " : ""}
                                                >
                                                    LOGIN
                                                </NavLink>
                                            </li>

                                            <li>
                                                <NavLink
                                                    to="/register"
                                                    className={({ isActive }) => isActive ? "text-[#5f01f2] " : ""}
                                                >
                                                    REGISTER
                                                </NavLink>
                                            </li>

                                        </>
                                    )
                                }

                                {
                                    user && <li>{user?.displayName?.split(' ')[0]}</li>
                                }
                            </ul>
                        </div>
                    </nav>
                )
            }
        </>
    );
};

export default Navbar;