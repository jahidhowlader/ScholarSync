import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

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
            <div className="my-container mt-5 relative">
                <img src="/bg.jpg" alt="thumnail" className="w-full object-cover h-[450px] roun" />

                <div className="absolute top-1/2 -translate-y-1/2 left-10 w-1/2">
                    <h1 className="text-5xl font-bold">Seamless Learning, Anytime, <span className="text-primary-color">Anywhere</span>.</h1>
                    <p className="mt-5 text-lg">Navigate Your Academic Journey with Ease, Unlocking Your Full Potential!</p>

                    <button className="mt-5 bg-primary-color text-white px-5 py-2">Explore</button>
                </div>
            </div>

            <section className="my-container my-20">

                <h3 className="text-white text-2xl mb-5 border-b inline">Explore Courses:</h3>

                <div className="grid grid-cols-3 gap-10 mt-5">
                    {
                        courses && courses.map(course => <div
                            key={course._id}
                            className="border border-primary-color text-white flex flex-col justify-between"
                        >
                            <div>
                                <img src={course.image} alt="Course Image" className="h-[200px] w-full object-cover" />

                                <div className="p-5">
                                    <h4 className="text-xl">{course.title}</h4>
                                    <p className="text-sm my-2 opacity-70">{course.description.slice(0, 100)}...</p>
                                    <p>Total Student: {course.totalStudents}</p>
                                </div>
                            </div>

                            <div className="flex justify-end items-center">
                                <button onClick={() => handlerApply(course._id)} className="bg-primary-color px-3 py-1 rounded-ss rounded-se-none">Apply</button>
                            </div>
                        </div>)
                    }
                </div>
            </section>
        </>

    );
};

export default Home;