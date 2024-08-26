import { Link, Navigate } from "react-router-dom";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import AnimationWrapper from "../common/page-animation";
import { useContext, useRef } from "react";
import { toast, Toaster } from "react-hot-toast"
import axios from "axios";
import { storeInSession } from "../common/session";
import { UserContext, UserContextType } from "../App";
import { authWithGoogle } from "../common/firebase";

const UserAuthForm = ({ type }) => {

    const authForm = useRef();

    const { userAuth: { access_token }, setUserAuth } = useContext<UserContextType>(UserContext)

    console.log(access_token);

    //function to handle user authentication through server
    const userAuthThroughServer = (serverRoute, formData) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
            .then(({ data }) => {
                storeInSession("user", JSON.stringify(data))
                setUserAuth(data);
            })
            .catch((response) => {
                console.log(response);
                if (response && response.data) {
                    toast.error(response.data.error)
                } else {
                    toast.error('An error occurred');
                }
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const serverRoute = type == "sign-in" ? "/signin" : "/signup";
        const form = new FormData(formElement);
        const formData = {};

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;    // regex for e-mail
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;   // regex for password


        for (const [key, value] of form.entries()) {
            formData[key] = value;
        }

        //form validation 

        const { fullname, email, password } = formData;
        if (fullname) {
            if (fullname.length < 3) {
                return toast.error("Full Name must be at least 3 characters long")
            }
        }
        if (!email.length) {
            return toast.error("Email is required")
        }
        if (!emailRegex.test(email)) {
            return toast.error("Invalid email")
        }
        if (password.length < 8) {
            return toast.error("Password must be at least 8 characters long")
        }
        if (!passwordRegex.test(password)) {
            return toast.error("Password must contain at least one uppercase letter, one lowercase letter, one number and one special character")
        }

        //send data to the server

        userAuthThroughServer(serverRoute, formData)
    }

    const handleGoogleAuth = (e) => {
        e.preventDefault();
        authWithGoogle().then(user => {
            const serverRoute = "/google-auth";
            const formData = {
                access_token: user.accessToken
            }
            userAuthThroughServer(serverRoute, formData)
        })
        .catch(err => {
            toast.error("Problem Logging in with Google. Please Try Again Later");
            return console.log(err);
        })
    }

    return (
        access_token ? (
            <Navigate to="/" />
        ) : (
            <>
                <AnimationWrapper keyValue={type}>
                    <section className="h-cover flex items-center justify-center">
                        <Toaster />
                        <form id="formElement" className="w-[80%] max-w-[400px]">
                            <h1 className="text-4xl capitalize text-center mb-24">
                                {type === "sign-in" ? "Welcome Back" : "Join Us Today"}
                            </h1>
                            {type !== "sign-in" ? (
                                <InputBox
                                    name="fullname"
                                    type="text"
                                    placeholder="Enter your Full Name"
                                    icon="fi-rr-user"
                                />
                            ) : null}

                            <InputBox
                                name="email"
                                type="email"
                                placeholder="Enter your Email Address"
                                icon="fi-rr-envelope"
                            />

                            <InputBox
                                name="password"
                                type="password"
                                placeholder="Enter your Password"
                                icon="fi-rr-key"
                            />

                            <button className="btn-dark center mt-14"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                {type === "sign-in" ? "Sign In" : "Sign Up"}
                            </button>

                            <div className="relative flex w-full items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
                                <hr className="w-1/2 border-black" />
                                <p>or</p>
                                <hr className="w-1/2 border-black" />
                            </div>

                            <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center" onClick={handleGoogleAuth}>
                                <img src={googleIcon} className="w-5 h-5" />
                                Continue With Google
                            </button>

                            {type === "sign-in" ? (
                                <p className="text-center text-black text-xl mt-4">
                                    Don't have an account? <Link to="/signup" className="underline text-blue ml-1">Sign Up</Link>
                                </p>
                            ) : (
                                <p className="text-center text-black text-xl mt-4">
                                    Already have an account? <Link to="/signin" className="underline text-blue ml-1">Sign In</Link>
                                </p>
                            )}
                        </form>
                    </section>
                </AnimationWrapper>
            </>
        )
    );
}

export default UserAuthForm;