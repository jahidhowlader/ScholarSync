import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar/Sidebar";

const Navbar = () => {

    // ALL STATE ARE HERE
    const [isAdmin, setIsAdmin] = useState(null)

    // IMPORT AUTHCONTEXT
    const { user, logOut, loading, setLoading } = useAuth()

    // GET TOKEN FROM LOCAL STORAGE
    const token = localStorage.getItem('access-token')

    useEffect(() => {

        if (user) {

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
        }

    }, [token, user, loading, setLoading])

    return (
        <>
            <nav className="bg-black text-white py-4 shadow-sm shadow-primary-color">

                <div className="my-container flex justify-between items-center px-5 sm:px-10 ">

                    <Link to='/'><h1 className="text-[#5f01f2] font-bold italic text-2xl uppercase">Scholar<span className="text-white">Sync</span></h1></Link>

                    {
                        loading ? 'loading' : (
                            <ul className="lg:flex gap-10 uppercase hidden">
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) => isActive ? "opacity-100 font-medium" : "opacity-70"}
                                    >
                                        HOME
                                    </NavLink>
                                </li>

                                {
                                    user && !isAdmin ? (
                                        <>
                                            <li>
                                                <NavLink
                                                    to="/appliedListClient"
                                                    className={({ isActive }) => isActive ? "opacity-100 font-medium" : "opacity-70"}
                                                >
                                                    APPLIED LIST
                                                </NavLink>
                                            </li>

                                            <li onClick={async () => await logOut()}>
                                                <Link to="/" className="opacity-70">
                                                    LOGOUT
                                                </Link>
                                            </li>
                                        </>
                                    ) : user && isAdmin ? (
                                        <>
                                            <li>
                                                <NavLink
                                                    to="/addCourse"
                                                    className={({ isActive }) => isActive ? "opacity-100 font-medium" : "opacity-70"}
                                                >
                                                    ADD COURSE
                                                </NavLink>
                                            </li>

                                            <li>
                                                <NavLink
                                                    to="/appliedListAdmin"
                                                    className={({ isActive }) => isActive ? "opacity-100 font-medium" : "opacity-70"}
                                                >
                                                    APPLIED LIST
                                                </NavLink>
                                            </li>

                                            <li onClick={async () => await logOut()}>
                                                <Link to="/" className="opacity-70">
                                                    LOGOUT
                                                </Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <NavLink
                                                    to="/login"
                                                    className={({ isActive }) => isActive ? "opacity-100 font-medium" : "opacity-70"}
                                                >
                                                    LOGIN
                                                </NavLink>
                                            </li>

                                            <li>
                                                <NavLink
                                                    to="/register"
                                                    className={({ isActive }) => isActive ? "opacity-100 font-medium" : "opacity-70"}
                                                >
                                                    REGISTER
                                                </NavLink>
                                            </li>

                                        </>
                                    )
                                }

                                {
                                    user && <li className="opacity-70">{user?.displayName?.split(' ')[0]}</li>
                                }
                            </ul>
                        )
                    }

                    {/* SideBar Navigation */}
                    <div className="relative lg:hidden">
                        <Sidebar />
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;