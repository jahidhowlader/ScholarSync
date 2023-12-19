import { RiForbid2Line } from 'react-icons/ri';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import useFetchWithHeader from '../../../hooks/useFetchWithHeader';

const AppliedListAdmin = () => {

    // GET TOKEN FROM LOCAL STORAGE
    const token = localStorage.getItem('access-token')

    // FETCH ALL APPLY LIST FROM SERVER
    const { data: appliedList, loading, setLoading, reFetch } = useFetchWithHeader('/appliedList')

    // handlerApllyReject
    const handlerApllyReject = (id) => {

        fetch(`https://scholarsync-server-production.up.railway.app/api/appliedList/${id}`, {
            method: "DELETE",
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {

                toast.success(data.message)
                reFetch()

                setLoading(false)
            })
    }

    // handlerApllyAccept
    const handlerApllyAccept = (id) => {

        fetch(`https://scholarsync-server-production.up.railway.app/api/appliedList/${id}`, {
            method: "PATCH",
            headers: {
                authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {

                toast.success(data.message)
                reFetch()

                setLoading(false)
            })
    }


    return (
        <>
            {/* Ttile */}
            <Helmet>
                <title>Applied List | ScholarSync</title>
            </Helmet>

            {
                loading ? 'loading' : (
                    <section className="my-20 my-container text-white px-5 sm:px-10">

                        {
                            !appliedList?.length ? (<>
                                <div className="flex flex-col justify-center items-center ">
                                    <h1 className="text-2xl sm:text-3xl font-bold text-center ">
                                        Applied List
                                    </h1>
                                    <div className='flex items-center gap-1 mt-5'>
                                        <RiForbid2Line className='w-5 h-5' />
                                        <h3 className="sm:text-xl ">Nobody applied yet!</h3>
                                    </div>
                                </div>

                            </>) : (
                                <>
                                    <div className={`w-full min-h-[600px]`}>

                                        <h1 className="text-2xl sm:text-3xl primary-font font-bold text-center mb-10">
                                            Applied List
                                        </h1>

                                        <p className='pb-3'>Total Apply: <span className='text-secondary-color'>{appliedList?.length}</span></p>

                                        <div className="overflow-x-auto bg-opacity-5">

                                            <table className="w-full" id="cart">
                                                {/* head */}
                                                <thead className="text-left bg-primary-color text-white" id='cardHead'>
                                                    <tr className="primary-font font-semibold text-left">
                                                        <th style={{ paddingLeft: '10px' }}>No</th>
                                                        <th>Image</th>
                                                        <th>Title</th>
                                                        <th>Username</th>
                                                        <th>Email</th>
                                                        <th className='text-center'>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="primary-fot  text-left">
                                                    {/* row 1 */}
                                                    {
                                                        appliedList && appliedList.map((list, idx) => <tr
                                                            key={list._id}
                                                            className="">
                                                            <td style={{ paddingLeft: '10px' }}>{idx + 1}</td>
                                                            <td>
                                                                <img src={list.image} alt="course thumbnail" className='w-20 h-10 object-cover' />
                                                            </td>
                                                            <td className='font-semibold'>
                                                                {list.title}
                                                            </td>
                                                            <td>
                                                                {list.username}
                                                            </td>
                                                            <td>
                                                                {list.email}
                                                            </td>
                                                            <td className='text-center space-x-1'>
                                                                {
                                                                    list.status === 'pending' ? (
                                                                        <>
                                                                            <button onClick={() => handlerApllyReject(list._id)} className='bg-error text-xs font-semibold rounded px-2 py-0.5'>reject</button>
                                                                            <button onClick={() => handlerApllyAccept(list._id)} className='bg-secondary-color text-black font-semibold text-xs rounded px-2 py-0.5'>Accept</button>
                                                                        </>
                                                                    ) : <span className='bg-secondary-color text-black font-semibold text-xs rounded px-2 py-0.5'>Approved</span>
                                                                }
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

export default AppliedListAdmin;

// mongodb+srv://jahid:Jahid01625405959@cluster0.h88b4w7.mongodb.net/ScholarSync?retryWrites=true&w=majority
// mongodb+srv://jahid:Jahid01625405959@cluster0.h88b4w7.mongodb.net/TravelNestDB?retryWrites=true&w=majority