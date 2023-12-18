import { createUserWithEmailAndPassword, deleteUser, FacebookAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { app } from "../config/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null)

const auth = getAuth(app)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Firebase Signup
    const signUp = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Firebase Signin
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Password Reset
    const resetPassword = (email) => {

        return sendPasswordResetEmail(auth, email)
    }

    // User Updated
    const updateUser = (name, photo) => {

        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    // Google Signin
    const googleProvider = new GoogleAuthProvider();
    const googleSignin = () => {

        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // Facebook Signin
    const facebookProvider = new FacebookAuthProvider();
    const facebookSignin = () => {

        setLoading(true)
        return signInWithPopup(auth, facebookProvider)
    }

    // Log Out Function
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    // Delete User
    const deleteUserData = (user) => {

        return deleteUser(user)
    }


    // user ovserbation
    useEffect(() => {

        const unsubscriber = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)

            if (currentUser) {
                axios.post('http://localhost:3000/api/jwt', { email: currentUser.email })
                    .then(data => {

                        localStorage.setItem('access-token', data.data.token)
                        setLoading(false)
                    })
            } else {
                localStorage.removeItem('access-token')
            }

            setLoading(false)
        })

        return () => {
            return unsubscriber
        }
    }, [user])


    const authInfo = {
        user,
        loading,
        setLoading,
        signUp,
        signIn,
        updateUser,
        googleSignin,
        facebookSignin,
        resetPassword,
        deleteUserData,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}


export default AuthProvider;