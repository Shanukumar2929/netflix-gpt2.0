import Header from "./Header";
import { useState, useRef } from "react";
import { checkValidateData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BKG_IMAGE } from "../utils/constants";

const Login = () => {
    const [isSignInForm, setIsSignForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);


    const handleButtonClick = () => {
        // Validate the form data




        const message = checkValidateData(email.current.value, password.current.value);
        setErrorMessage(message);
        if (message) return;

        //Sign In Sign Up Logic
        if (!isSignInForm) {
            // Sign up Logic

            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: "https://media.licdn.com/dms/image/D4D03AQFrBgOscXmkkA/profile-displayphoto-shrink_400_400/0/1681230451145?e=1723680000&v=beta&t=E3yfZjKfVX64q7Om1dWjuyBpIGiaG6YmDWeR96rz3Uc"
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL })
                    );
                       
                    }).catch((error) => {
                        setErrorMessage(error.message);
                    });

                   
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);

                });


        } else {
            // Sign in Logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });




        }


    };

    const toggleSignInForm = () => {
        setIsSignForm(!isSignInForm);
    };




    return (
        <div>
            <Header />
            <div className="absolute 
            ">
                <img className="h-screen object-cover w-screen" src={BKG_IMAGE} alt="bkg_image"/>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className=" w-full md:w-3/12 absolute p-12 bg-black my-36  mx-auto  right-0 left-0 text-white rounded-lg bg-opacity-80" >
                <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && (<input type="text" placeholder="Dummy_name" className="p-2 my-2  w-full bg-gray-700 " />)}

                <input ref={email} type="text" placeholder="dummy123@gmail.com" className="p-2 my-2  w-full bg-gray-700 " />

                <input ref={password} type="password" placeholder="Dummy@123" className="p-2 my-2  w-full bg-gray-700 " />

                <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>


                <button className="p-4 my-6 bg-red-700 w-full rounded lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now..."}</p>

            </form>
        </div>
    )
};

export default Login;