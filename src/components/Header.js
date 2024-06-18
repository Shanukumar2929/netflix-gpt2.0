
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES, USER_ICON } from "../utils/constants";
import { useSelector } from "react-redux";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);


    const handleSignout = () => {
        signOut(auth).then(() => {
            // navigate("/");
        }).catch((error) => {
            // An error happened.
            navigate("/error");
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                //sign in
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({
                    uid: uid, email: email, displayName: displayName, photoURL: photoURL

                })
                );
                navigate("/browse");

            } else {
                // User is signed out
                dispatch(removeUser());
                navigate("/");
            }
        });
        // Unsubscribe when component unmounts
        return () => unsubscribe
    }, []);

    const handleGptSearchClick = () => {
        // Toggle GPT Search
        dispatch(toggleGptSearchView());
    }

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));

    }


    return (
        <div className=" absolute px-8  py-2 bg-gradient-to-b from-black-100 z-20 w-screen flex  flex-col md:flex-row  md:justify-between">
            <img alt="logo" className="w-44 mx-auto md:mx-0" src={LOGO} />
            {user && (<div className="flex p-2 md:justify-between justify-start">
                {showGptSearch && (<select className="p-2  m-2 bg-gray-900 text-white bg-opacity-80 " onChange={handleLanguageChange}>
                    {SUPPORTED_LANGUAGES.map((lang) => (
                        <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
                    ))}
                </select>)}

                <button className="  py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg bg-opacity-90" onClick={handleGptSearchClick} >
                    {showGptSearch ? "Homepage" : "GPT Search"}

                </button>
            </div>)}


            {user && <div className="mx-20 my-0 md:mx-0 md:my-0">
                <img className="hidden sm:inline-block md:inline-block w-12 h-12" src={USER_ICON} alt="usericon" />
                <button onClick={handleSignout} className=" font-bold text-white">Sign Out</button>
            </div>
            }
        </div>


    );
};

export default Header;

