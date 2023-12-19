import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoTrashBinSharp } from "react-icons/io5";
import './addCourse.css'
import Loader from "../../../components/loader/Loader";
import { Helmet } from "react-helmet-async";
import useIsAdmin from "../../../hooks/useIsAdmin";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {

    // ALL STATE ARE HERE
    const [submitLoading, setSubmitLoading] = useState(false)
    const [imgUrl, setImgUrl] = useState(null)
    const [imgLoading, setImageLoading] = useState(false)

    // REACT HOOK FORM
    const { register, handleSubmit, reset, setValue, formState: { errors }, } = useForm()

    // Add Course Photo
    const handlerAddPhoto = async (event) => {

        const formData = new FormData();
        if (!event.target.files[0]) return;
        formData.append("image", event.target.files[0]);

        try {
            setImageLoading(true)
            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_STOREIMG}`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            if (!res.ok) throw new Error("Failed to upload image");

            const data = await res.json();

            console.log(data);

            setValue("photo", data.data.url);
            setImgUrl(data.data.url);
            setImageLoading(false)

        } catch (error) {
            console.log(error);
            setImageLoading(false)
        }
    }

    // GET TOKEN FROM LOCAL STORAGE
    const token = localStorage.getItem('access-token')

    // SUBMIT Or CREATE ACCOUNT
    const onSubmit = async (data) => {

        setSubmitLoading(true)

        const { title, description } = data

        try {

            await fetch('https://scholarsync-server-production.up.railway.app/api/courses', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token
                },
                body: JSON.stringify({ title, description, image: imgUrl })
            })
                .then(res => res.json())
                .then(data => {

                    toast.success(data.message)
                    reset()
                    setImgUrl(null)
                    setSubmitLoading(false)

                })

        } catch (e) {

            console.log(e);
            setSubmitLoading(false)

        }
    }

    const { isAdmin } = useIsAdmin()

    const navigation = useNavigate()
    if (isAdmin === false) {

        navigation('/')
    }

    // console.log(93, isAdmin === false);

    return (
        <>

            {/* Ttile */}
            <Helmet>
                <title>Add Course | Snap Academy</title>
            </Helmet>


            <div className="text-white my-container my-20 px-5 sm:px-10">

                {/* ADD COURSE FORM */}
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 w-full mt-10'>

                    {/* ADD IMAGE */}
                    <div className={`h-[300px] w-full relative cursor-pointer rounded ${!imgUrl ? 'border' : ''}`}>
                        {
                            imgLoading ? <Loader /> : (
                                <>
                                    {
                                        imgUrl ? (
                                            <>
                                                <img src={imgUrl} className="absolute top-0 h-[300px] w-full object-cover rounded" />
                                                <div onClick={() => setImgUrl(null)} className="absolute top-5 right-5">
                                                    <IoTrashBinSharp className="w-7 h-7" />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <input
                                                    type="file"
                                                    onChange={handlerAddPhoto}
                                                    className='h-full w-full border cursor-pointer file-type'
                                                    required
                                                />

                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
                                                    <IoIosAddCircleOutline className="w-20 h-20" />
                                                </div>
                                            </>
                                        )
                                    }
                                </>
                            )
                        }
                    </div>

                    {/* Title Input*/}
                    <div className=''>
                        <input
                            type="text"
                            placeholder='Title'
                            className={`bg-opacity-0 bg-black border-b py-2 pl-1 pr-5 w-full outline-none focus:border-primary-color ${errors.title ? 'border-error' : 'border-white border-opacity-30'}`}
                            {...register("title",
                                { required: 'Title is required', maxLength: { value: 50, message: 'Title length should be less than 50 characters' } }
                            )} />

                        {/* Show Error on UI */}
                        {
                            errors?.title?.type === 'required' ? <span className='text-error font-medium'>{errors?.title?.message}</span> :
                                errors?.title?.type === 'maxLength' ? <span className='text-error font-medium'>{errors?.title?.message}</span> : ''
                        }
                    </div>

                    {/* Description Input */}
                    <div className=''>
                        <textarea
                            type="text"
                            placeholder='Description'
                            className={`bg-opacity-0 bg-black border-b py-2 pl-1 pr-5 w-full outline-none focus:border-primary-color ${errors.description ? 'border-error' : 'border-white border-opacity-30'}`}
                            {...register("description",
                                { required: 'description is required', maxLength: { value: 500, message: 'Description length should be less than 500 characters' } }
                            )} />

                        {/* Show Error on UI */}
                        {
                            errors?.description?.type === 'required' ? <span className='text-error font-medium'>{errors?.description?.message}</span> :
                                errors?.description?.type === 'maxLength' ? <span className='text-error font-medium'>{errors?.description?.message}</span> : ''
                        }
                    </div>

                    {/* Submit */}
                    <input type="submit" value={submitLoading ? 'PROCESSING...' : 'ADD COURSE'} className={`bg-primary-color font-semibold text-white py-2 rounded-full w-full ${submitLoading ? 'cursor-progress' : 'cursor-pointer'}`} disabled={submitLoading ? true : false} />
                </form>
            </div>
        </>
    );
};

export default AddCourse;