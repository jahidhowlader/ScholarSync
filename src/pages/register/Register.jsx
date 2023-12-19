import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import SocialLogin from '../../components/socialLogin/SocialLogin';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';


const Register = () => {

    // All State are here
    const [seePassword, setSeePassword] = useState(false)
    const [seeConfirmPassword, setSeeConfirmPassword] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [existEmailError, setExistEmailError] = useState(false)

    // useNAVIGATE USE FOR REDIRECT USER AFTER LOGIN AND useLOCATION USE FOR TRACK URL PATH
    const navigate = useNavigate();

    // IMPORT AUTHCONTEXT
    // const { signUp, updateUser } = useAuth()

    // REACT HOOK FORM
    const { register, handleSubmit, reset, watch, formState: { errors }, } = useForm()

    // IMPORT AUTHCONTEXT
    const { signUp, updateUser } = useAuth()

    // SUBMIT Or CREATE ACCOUNT
    const onSubmit = async (data) => {

        setSubmitLoading(true)
        setExistEmailError(false)

        const { username, email, password } = data

        try {

            // SIGNUP WITH MONGODB
            await axios.post('https://scholarsync-server-production.up.railway.app/api/auth/register', {
                username,
                email,
                password
            })

            try {

                // SIGNUP ON FIREBASE
                await signUp(email, password)

                try {

                    // UPDATE USERNAME AFTER SIGNUP ON FIREBASE
                    await updateUser(username)

                    // Rest Form
                    reset()

                    // Navigate Home Page
                    navigate('/')

                } catch (e) {
                    toast.error(e.code);
                    console.log(e.code);
                    setSubmitLoading(false)
                }


            } catch (e) {
                if (e.code === 'auth/email-already-in-use') {
                    setExistEmailError(true)
                }

                toast.error(e.code);
                console.log(e.code);
                setSubmitLoading(false)
            }

        } catch (e) {

            console.log(e);
            toast.error(e.response.data.message);
            setSubmitLoading(false)

        }
    }

    return (
        <>
            {/* Ttile */}
            <Helmet>
                <title>Register | ScholarSync</title>
            </Helmet>

            <div className="my-container text-white min-h-[calc(100vh-90px)] grid lg:grid-cols-2 items-center relative">

                <div className='flex flex-col justify-center items-center'>
    
                    {/* Main Content */}
                    <div className="">

                        {/* SIGNIN FORM */}
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 w-full sm:w-[400px] md:w-[450px] max-w-[768px] px-5'>

                            {/* Name Input*/}
                            <div className='flex flex-col gap-2'>
                                <input
                                    type="text"
                                    placeholder='Username '
                                    className={`bg-opacity-0 bg-black border-b py-2 pl-1 pr-5 w-full outline-none focus:border-primary-color ${errors.username ? 'border-error' : 'border-white border-opacity-30'}`}
                                    {...register("username",
                                        { required: 'Name is required', maxLength: { value: 20, message: 'Name length should be less than 20 characters' } }
                                    )} />

                                {/* Show Error on UI */}
                                {
                                    errors?.username?.type === 'required' ? <span className='text-error font-medium'>{errors?.username?.message}</span> :
                                        errors?.username?.type === 'maxLength' ? <span className='text-error font-medium'>{errors?.username?.message}</span> : ''
                                }
                            </div>

                            {/* Email Input */}
                            <div className='flex flex-col gap-2'>
                                <input
                                    type="email"
                                    placeholder='Email'
                                    className={`bg-opacity-0 bg-black border-b  py-2 pl-1 pr-5 w-full outline-none focus:border-primary-color ${(errors.email || existEmailError) ? 'border-error' : 'border-white  border-opacity-30'}`}
                                    {...register("email",
                                        {
                                            required: 'Email is required', pattern: {
                                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: 'Invalid email address'
                                            }
                                        }
                                    )} />

                                {/* Show Error on UI */}
                                {
                                    errors?.email?.type === 'required' ? <span className='text-error font-medium'>{errors?.email?.message}</span> :
                                        errors?.email?.type === 'pattern' ? <span className='text-error font-medium'>{errors?.email?.message}</span> :
                                            existEmailError ? <span className='text-error font-medium'>Email-already-in-use</span> : ''
                                }
                            </div>

                            {/* Password */}
                            <div className='flex flex-col gap-2'>
                                <div className='relative'>
                                    <input
                                        type={seePassword ? 'text' : 'password'}
                                        placeholder='Password'
                                        className={`bg-opacity-0 bg-black border-b py-2 pl-1 pr-12 w-full outline-none focus:border-primary-color ${errors.password ? 'border-error' : 'border-white border-opacity-30'}`}
                                        {...register("password",
                                            {
                                                required: 'Password is required', pattern: {
                                                    value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8}/,
                                                    message: 'Password will be 1 number, 1 Capital and 1 special character and 8 character'
                                                }
                                            }
                                        )} />
                                    {/* LOOK PASSWORD */}
                                    <div className='absolute right-2 top-1/2 -translate-y-1/2 text-lg cursor-pointer'>
                                        {
                                            !seePassword ? <HiEye onClick={() => setSeePassword(true)} /> : <HiEyeSlash onClick={() => setSeePassword(false)} />
                                        }
                                    </div>
                                </div>

                                {/* Show Error on UI */}
                                {
                                    errors?.password?.type === 'required' ? <span className='text-error font-medium'>{errors?.password?.message}</span> :
                                        errors?.password?.type === 'pattern' ? <span className='text-error font-medium'>{errors?.password?.message}</span> : ''
                                }
                            </div>

                            {/* Confirm Password */}
                            <div className='flex flex-col gap-2 pb-5'>
                                <div className='relative'>
                                    <input
                                        type={seeConfirmPassword ? 'text' : 'password'}
                                        placeholder='Confirm Password'
                                        className={`bg-opacity-0 bg-black border-b py-2 pl-1 pr-12 w-full outline-none focus:border-primary-color ${errors.confirmPassword ? 'border-error' : 'border-white border-opacity-30'}`}
                                        {...register("confirmPassword",
                                            {
                                                required: 'Confirm Password is required', validate: (value) => value === watch('password')
                                            }
                                        )} />
                                    {/* LOOK CONFIRM PASSWORD */}
                                    <div className='absolute right-2 top-1/2 -translate-y-1/2 text-lg cursor-pointer'>
                                        {
                                            !seeConfirmPassword ? <HiEye onClick={() => setSeeConfirmPassword(true)} /> : <HiEyeSlash onClick={() => setSeeConfirmPassword(false)} />
                                        }
                                    </div>
                                </div>

                                {/* Show Error on UI */}
                                {
                                    errors?.confirmPassword?.type === 'required' ? <span className='text-error font-medium'>{errors?.confirmPassword?.message}</span> :
                                        errors?.confirmPassword?.type === 'validate' ? <span className='text-error font-medium'>Password do not match </span> : ''
                                }
                            </div>

                            {/* Submit */}
                            <input type="submit" value={submitLoading ? 'PROCESSING...' : 'REGISTER'} className={`bg-primary-color font-semibold text-white py-2 rounded-full w-full ${submitLoading ? 'cursor-progress' : 'cursor-pointer'}`} disabled={submitLoading ? true : false} />
                        </form>


                    </div>

                    {/* Social Login */}
                    <SocialLogin />
                </div>

                <div className='space-y-3 ml-20 -mt-40 hidden lg:block'>

                    <h3 className='text-2xl font-semibold'>Welcome to SCHOLARSYNC</h3>
                    <h1 className='text-4xl font-semibold'>Registration</h1>

                    <p className='text-xs opacity-50'>"Gear up, gamers! Welcome to our login screen. <br />Get ready to conquer the gaming world."</p>
                    <h5 className='text-xl font-semibold pb-3'>Are you ready to play with us? <br />Join our <span className='text-primary-color'>Community</span></h5>

                    <Link to='https://www.linkedin.com/in/jahidhowlader/' target='_blank'>
                        <button className='bg-primary-color py-2.5 px-14 rounded font-bold'>JOIN</button>
                    </Link>
                </div>

                {/* Image Section */}
                <div className='absolute right-0 -z-10'>
                    <img src="/register_bg.png" alt="background" className='h-full object-cover opacity-10' />
                </div>
            </div>


        </>

    );
}


export default Register;