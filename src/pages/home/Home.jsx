import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Courses from "./Courses";

const Home = () => {

    

    return (

        <>

            {/* Ttile */}
            <Helmet>
                <title>ScholarSync</title>
            </Helmet>

           <Banner />

            <Courses />
            
        </>

    );
};

export default Home;