import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Home = () => {

    // ALL STATE ARE HERE
    const [courses, setCourses] = useState([])

    const { user } = useAuth()
    const navigation = useNavigate()

    useEffect(() => {

        fetch('http://localhost:3000/api/courses')
            .then(res => res.json())
            .then(data => setCourses(data))
    }, [])

    console.log(courses);

    // Handler Apply
    const handlerApply = (id) => {

        console.log(id);

        if (!user) {
            navigation('/login')
        }


    }

    return (

        <>

            {/* Ttile */}
            <Helmet>
                <title>Snap Academy</title>
            </Helmet>

            <div className="my-container mt-5 relative px-5 sm:px-10">
                <img src="/bg.jpg" alt="thumnail" className="w-full object-none object-right-top opacity-50 md:opacity-100 h-[450px]" />

                <div className="absolute bottom-10 md:bottom-0 md:top-1/2 md:-translate-y-1/2 left-14 sm:left-20 md:w-1/2 text-white md:text-black">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mr-10">Seamless Learning, Anytime, <span className="text-primary-color">Anywhere</span>.</h1>
                    <p className="mt-5 mr-5 lg:text-lg">Navigate Your Academic Journey with Ease, Unlocking Your Full Potential!</p>

                    <button className="mt-5 bg-primary-color text-white px-5 py-2 font-medium uppercase">Explore</button>
                </div>
            </div>

            <section className="my-container my-20 p-5 sm:px-10">

                <h3 className="text-white text-2xl mb-5 border-b inline font-semibold">Explore Courses:</h3>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-x-10 lg:gap-y-20 mt-5">
                    {
                        courses && courses.map(course => <div
                            key={course._id}
                            className="border border-primary-color text-white flex flex-col justify-between hover:-mt-2 duration-500 hover:bg-primary-color hover:bg-opacity-20 group"
                        >
                            <div>
                                <div className="overflow-hidden">
                                    <img src={course.image} alt="Course Image" className="h-[200px] w-full object-cover hover:scale-105 duration-1000" />
                                </div>

                                <div className="p-5">
                                    <h4 className="text-xl font-semibold">{course.title}</h4>
                                    <p className="text-sm my-2 opacity-70">{course.description.slice(0, 100)}...</p>
                                    <p>Total Student: <span className="text-secondary-color">{course.totalStudents}</span></p>
                                </div>
                            </div>

                            <div className="flex justify-end items-center">
                                <button onClick={() => handlerApply(course._id)} className="bg-primary-color px-3 py-1 rounded-ss rounded-se-none hover:bg-white hover:text-primary-color font-medium">Apply</button>
                            </div>
                        </div>)
                    }
                </div>
            </section>
        </>

    );
};

export default Home;