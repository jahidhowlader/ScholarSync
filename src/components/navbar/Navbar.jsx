import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Sidebar from "./sidebar/Sidebar";
import useIsAdmin from "../../hooks/useIsAdmin";

const Navbar = () => {

    // IMPORT AUTHCONTEXT
    const { user, logOut, loading } = useAuth()

    // Check isAdmin
    const { isAdmin } = useIsAdmin()

    const navigation = useNavigate()
    // handlerLogout
    const handlerLogout = async () => {

        try {

            await logOut()
            navigation('/login')

        } catch (e) {
            console.log(e);
        }
    }


    return (
        <>
            <nav className="bg-black text-white py-4 shadow-sm shadow-primary-color">

                <div className="my-container flex justify-between items-center px-5 sm:px-10 ">

                    <Link to='/'><h1 className="text-[#5f01f2] font-bold italic text-2xl uppercase">Scholar<span className="text-white">Sync</span></h1></Link>

                    {
                        loading ? '' : (
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

                                            <li onClick={handlerLogout}>
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

                                            <li onClick={handlerLogout}>
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