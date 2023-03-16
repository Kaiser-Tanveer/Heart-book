import React from 'react';
import { HiOutlineLogin } from 'react-icons/hi';
import { Link, useNavigation } from 'react-router-dom';
import Spinner from '../../Shared/Spinner/Spinner';
import useTitle from '../../Components/MyHooks/useTitle';

const Banner = () => {
    const navigation = useNavigation();
    useTitle("Welcome")

    if (navigation.state === "loading") {
        return <Spinner />
    }
    return (
        <div className='mb-20 container shadow-lg bg-gradient-to-l from-sky-300 to-gray-100 bg-opacity-50 relative mx-auto'>
            <div>
                <h2 className='text-6xl font-bold text-transparent bg-gradient-to-r bg-clip-text from-sky-500 to-pink-400 text-center lg:text-left z-10 absolute md:left-1/3 lg:left-1/2 lg:top-1/4' style={{ WebkitTextStroke: '1px white' }}>Share Your Amazing <br /> Experiences in <br /> Heart Book</h2>
            </div>
            <div className='absolute left-1/4 md:left-1/2 -bottom-6 md:top-2/3 z-30'>
                <Link className='bg-gradient-to-r from-sky-300 hover:from-sky-400 hover:to-sky-400 to-pink-300 rounded-lg py-2 flex items-center text-xl hover:scale-110 px-4 font-semibold border hover:text-gray-50 hover:border-gray-50 border-gray-700 shadow-lg shadow-sky-500 hover:shadow-pink-500 uppercase duration-500' to='/reg'>Continue <HiOutlineLogin className='ml-2 text-2xl' /> </Link>
            </div>
            <div className='rounded-lg bg-transparent grid grid-cols-1 md:grid-cols-2 h-full'>
                <div className='w-full'>
                    <img src="https://i.ibb.co/nc7Z3KF/banner-Heart-Book.png" className="mt-14 w-[90%]" alt="bannerImg" />
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default Banner;