const VideoTitle = ({title, overview}) => {
    return (
        <div className=" w-screen aspect-video pt-[10%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
          <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
        
          <div classname="my-2 md:m-0">
                <button className="bg-white text-black py-2 md:py-4  px-3 md:px-12 text-xl rounded-lg hover:bg-opacity-80"> ▷Play</button>
                <button className=" hidden md:inline-block mx-2 bg-gray-300 text-white-100 py-1 md:py-4 px-3 md:px-12 text-xl bg-opacity-50 rounded-lg">ⓘMore Info</button>
          </div>
        </div>
    );
};

export default VideoTitle;