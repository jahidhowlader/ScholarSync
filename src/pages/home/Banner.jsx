const Banner = () => {
    return (
        <div className="my-container mt-5 relative px-5 sm:px-10">
            <img src="/bg.jpg" alt="thumnail" className="w-full object-none object-right-top opacity-50 md:opacity-100 h-[450px]" />

            <div className="absolute bottom-10 md:bottom-0 md:top-1/2 md:-translate-y-1/2 left-14 sm:left-20 md:w-1/2 text-white md:text-black">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mr-10">Seamless Learning, Anytime, <span className="text-primary-color">Anywhere</span>.</h1>
                <p className="mt-5 mr-5 lg:text-lg">Navigate Your Academic Journey with Ease, Unlocking Your Full Potential!</p>

                <button className="mt-5 bg-primary-color text-white px-5 py-2 font-medium uppercase">Explore</button>
            </div>
        </div>
    );
};

export default Banner;