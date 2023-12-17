import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-black text-white py-4 shadow-sm shadow-primary-color">

            <div className="my-container flex justify-between items-center">
                
                <Link to='/'><h1 className="text-[#5f01f2] font-bold italic text-3xl uppercase">ScholarSync</h1></Link>

                <ul className="flex gap-10 uppercase">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? "text-[#5f01f2] " : ""}
                        >
                            HOME
                        </NavLink>
                    </li>

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
                    {/* <li>Home</li>
                    <li>Login</li>
                    <li>Register</li> */}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;