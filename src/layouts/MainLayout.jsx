import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <h1>Footer</h1>
        </>
    );
};

export default MainLayout;