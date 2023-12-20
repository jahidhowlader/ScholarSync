import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {

    // useNAVIGATE USE FOR REDIRECT USER AFTER LOGIN AND useLOCATION USE FOR TRACK URL PATH
    const navigate = useNavigate();

    // IMPORT AUTHCONTEXT
    const { googleSignin } = useAuth()

    // handler Google signin
    const handlerGoogleSignin = async () => {

        // SIGNUP OR SIGNIN WITH GOOGLE
        googleSignin()
            .then(result => {

                const logedinUser = result.user

                const savedUser = {
                    username: logedinUser?.displayName,
                    email: logedinUser?.email,
                }

                fetch('https://scholarsync-server-production.up.railway.app/api/auth/googleSignin', {
                    method: "POST",
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify(savedUser)
                })
                    .then(res => res.json())
                    .then(() => {

                        navigate('/')
                    })
            })
    }

    return (
        <>
            <div className='flex items-center w-1/2 lg:w-3/4 lg:px-5'>
                <hr className='border border-opacity-30 border-primary-color my-20 w-full' />
                <p className='px-3'>OR</p>
                <hr className='border border-opacity-30 border-primary-color my-20 w-full' />
            </div>

            <div
                onClick={handlerGoogleSignin}
                className='flex justify-center w-full lg:w-3/4 cursor-pointer lg:mr-5 lg:px-5'
            >
                <div className='flex items-center gap-3 border border-primary-color px-5 py-2 rounded-full'>
                    <img src="/Google__G__logo.svg.png" alt="google image" className='w-5 h-5 object-cover' />
                    <p className='text-sm'>Continue with Google</p>
                </div>
            </div>
        </>
    );
};

export default SocialLogin;