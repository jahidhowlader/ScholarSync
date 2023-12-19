import { Helmet } from 'react-helmet-async';
import useAuth from '../../../hooks/useAuth';
import './appliedListClient.css'
import { RiForbid2Line } from "react-icons/ri";
import useFetchWithHeader from '../../../hooks/useFetchWithHeader';
import Loader from '../../../components/loader/Loader';


const AppliedListClient = () => {

    const { user } = useAuth()

    // FETCH APPLY LIST FROM SERVER
    const { data: applyList, loading } = useFetchWithHeader(`/appliedList/${user?.email}`)

    return (
        <>
            {/* Ttile */}
            <Helmet>
                <title>Applied List | ScholarSync</title>
            </Helmet>

            {
                loading ? <Loader /> : (
                    <section className="my-20 my-container text-white px-5 sm:px-10">

                        {
                            !applyList?.length ? (<>
                                <div className="flex flex-col justify-center items-center ">
                                    <h1 className="text-2xl sm:text-3xl font-bold text-center ">
                                        Applied List
                                    </h1>
                                    <div className='flex items-center gap-1 mt-5'>
                                        <RiForbid2Line className='w-5 h-5' />
                                        <h3 className="sm:text-xl ">You have not applied yet!</h3>
                                    </div>
                                </div>

                            </>) : (
                                <>
                                    <div className={`w-full min-h-[600px]`}>

                                        <h1 className="text-2xl sm:text-3xl primary-font font-bold text-center mb-10 lg:mb-20">
                                            Applied List
                                        </h1>

                                        <div className="overflow-x-auto bg-opacity-5">

                                            <table className="w-full" id="cart">
                                                {/* head */}
                                                <thead className="text-left bg-primary-color text-white" id='cardHead'>
                                                    <tr className="primary-font font-semibold text-left">
                                                        <th style={{ paddingLeft: '10px' }}>No</th>
                                                        <th>Image</th>
                                                        <th>Title</th>
                                                        <th className='text-center'>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="primary-fot  text-left">
                                                    {/* row 1 */}
                                                    {
                                                        applyList && applyList.map((list, idx) => <tr
                                                            key={list._id}
                                                            className="">
                                                            <td style={{ paddingLeft: '10px' }}>{idx + 1}</td>
                                                            <td>
                                                                <img src={list.image} alt="course thumbnail" className='w-20 h-10 object-cover' />
                                                            </td>
                                                            <td className='font-semibold'>
                                                                {list.title}
                                                            </td>
                                                            <td className='text-center'>
                                                                <span className={`${list.status === 'pending' ? 'bg-error text-white' : 'bg-secondary-color text-black'} text-xs rounded px-2 py-0.5 font-semibold`}>{list.status}</span>
                                                            </td>
                                                        </tr>)
                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </>
                            )
                        }

                    </section>
                )
            }
        </>
    );
};

export default AppliedListClient;