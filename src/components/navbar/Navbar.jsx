const Navbar = () => {
    return (
        <nav className="bg-black text-white py-4 shadow-sm shadow-primary-color">

            <div className="my-container flex justify-between">
                <h1 className="text-[#5f01f2] font-bold italic text-3xl uppercase">ScholarSync</h1>

                <ul className="flex gap-4 uppercase">
                    <li>Home</li>
                    <li>Login</li>
                    <li>Register</li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;