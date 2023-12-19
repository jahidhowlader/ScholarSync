import { useState } from "react";
import { motion } from "framer-motion"
import { HiBars3CenterLeft } from "react-icons/hi2";
import { Link, NavLink, useNavigate } from "react-router-dom";
import './sidebar.css'
import { TfiClose } from "react-icons/tfi";
import useAuth from "../../../hooks/useAuth";
import useIsAdmin from "../../../hooks/useIsAdmin";

const isMobile = window.innerWidth < 500;

const variants = {

    initial: {
        x: isMobile ? 768 : 1200
    },
    animate: {
        x: 0,
        transition: {
            duration: isMobile ? 1.5 : 2
        }
    }
}

const mainVariants = {

    initial: {
        x: isMobile ? 768 : 1200
    },
    animate: {
        x: 0,
        transition: {
            duration: 1
        }
    }
}


const Sidebar = () => {

    const [click, setClick] = useState(false)

    const { user, logOut } = useAuth()

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

    // TODO: SCROLL OFF
    return (
        <div>
            <div>

                <HiBars3CenterLeft onClick={() => setClick(true)} className={`text-4xl z-50  2xl:right-8 cursor-pointer ${click && '-z-10'}`} />
            </div>

            {
                click && (
                    <>
                        <motion.div variants={variants} initial="initial" animate="animate" className="fixed top-0 right-0 h-full z-30 w-full bg-black bg-opacity-90">

                        </motion.div>
                        <motion.div variants={mainVariants} initial="initial" animate="animate" className="fixed top-0 right-0 h-full z-40 w-3/4 sm:w-1/2 bg-primary-color">

                            <TfiClose onClick={() => setClick(false)} className="text-2xl sm:text-3xl lg:text-4xl z-50 absolute top-10 left-10 cursor-pointer" />

                            <ul onClick={() => setClick(false)} className="pt-32 pl-11 space-y-5 ">

                                {/* Home */}
                                <li className="flex gap-3">
                                    <NavLink
                                        to="/"
                                        className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "opacity-100 font-medium mt-2" : "opacity-70 mt-2"}
                                    >
                                        <span className="pr-3">01</span>
                                        HOME
                                    </NavLink>
                                </li>

                                {
                                    user && !isAdmin ? (
                                        <>
                                            <li className="flex gap-3">
                                                <NavLink
                                                    to="/appliedListClient"
                                                    className={({ isActive }) => isActive ? "opacity-100 font-medium" : "opacity-70"}
                                                >
                                                    <span className="pr-3">02</span>

                                                    APPLIED LIST
                                                </NavLink>
                                            </li>

                                            <li onClick={handlerLogout}>
                                                <span className="pr-3 opacity-70">03</span>

                                                <Link to="/" className="opacity-70">
                                                    LOGOUT
                                                </Link>
                                            </li>
                                        </>
                                    ) : user && isAdmin ? (
                                        <>
                                            <li className="flex gap-3">
                                                <NavLink
                                                    to="/addCourse"
                                                    className={({ isActive }) => isActive ? "opacity-100 font-medium mt-2" : "opacity-70 mt-2"}
                                                >
                                                    <span className="pr-3">02</span>
                                                    ADD COURSE
                                                </NavLink>
                                            </li>

                                            <li className="flex gap-3">

                                                <NavLink
                                                    to="/appliedListAdmin"
                                                    className={({ isActive }) => isActive ? "opacity-100 font-medium mt-2" : "opacity-70 mt-2"}
                                                >
                                                    <span className="pr-3">03</span>
                                                    APPLIED LIST
                                                </NavLink>
                                            </li>

                                            <li onClick={handlerLogout}>
                                                <Link to="/" className="opacity-70">
                                                    <span className="pr-3">04</span>
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
                                                    <span className="pr-3">02</span>

                                                    LOGIN
                                                </NavLink>
                                            </li>

                                            <li>
                                                <NavLink
                                                    to="/register"
                                                    className={({ isActive }) => isActive ? "opacity-100 font-medium" : "opacity-70"}
                                                >
                                                    <span className="pr-3">03</span>
                                                    REGISTER
                                                </NavLink>
                                            </li>

                                        </>
                                    )
                                }

                            </ul>


                        </motion.div>
                    </>
                )
            }
        </div>
    );
};

export default Sidebar;