import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useIsAdmin from '../../hooks/useIsAdmin';
import useFetch from '../../hooks/useFetch';

const Courses = () => {

    const { user } = useAuth()
    const navigation = useNavigate()

    // FETCH COURSES FROM SERVER
    const { data: courses } = useFetch('/courses')

    // Handler Apply
    const handlerApply = async (courseId, title, image) => {

        if (!user) {
            return navigation('/login')
        }

        try {

            fetch(`https://scholarsync-server-production.up.railway.app/api/appliedList`, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    courseId,
                    username: user?.displayName,
                    email: user?.email,
                    title,
                    image
                })
            })
                .then(res => res.json())
                .then(data => {

                    toast.success(data.message)
                    navigation('/appliedListClient')
                })

        } catch (e) {

            console.log(e);
        }

    }

    // Check isAdmin
    const { isAdmin } = useIsAdmin()

    return (
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
                            </div>
                        </div>

                        <div className="flex justify-end items-center">
                            <button
                                onClick={() => handlerApply(course._id, course.title, course.image)}
                                className={`bg-primary-color px-3 py-1 rounded-ss rounded-se-none ${!isAdmin ? 'hover:bg-white hover:text-primary-color' : ''}  font-medium`}
                                disabled={isAdmin}
                            >
                                {isAdmin ? 'Admin' : 'Apply'}
                            </button>
                        </div>
                    </div>)
                }
            </div>
        </section>
    );
};

export default Courses;