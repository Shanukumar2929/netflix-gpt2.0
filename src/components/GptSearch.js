import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";
import { BKG_IMAGE } from "../utils/constants";

const GptSearch = () => {

    return (
        <>
            <div className="fixed -z-10">
                <img className="h-screen object-cover md:h-screen md:w-screen" src={BKG_IMAGE} alt="bkg_image" />
            </div>
            <div >

                <GptSearchBar />
                <GptMovieSuggestion />
            </div>
        </>
    );


};

export default GptSearch;