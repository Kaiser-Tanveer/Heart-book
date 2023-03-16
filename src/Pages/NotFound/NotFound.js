import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='min-h-screen'
            style={{ backgroundImage: "linear-gradient(to top, rgba(135, 206, 235, 0.45), rgba(0, 0, 0, 0.25)), url(https://i.ibb.co/hLj5NFP/error-Heart.jpg)", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }}
        >
            <div className='mx-auto pt-[10%]'>
                <h1 className='text-gray-50 text-8xl scale-150 text-center font-bold animate-ping duration-500'>404</h1>
                <h2 className='text-center text-6xl font-semibold text-sky-500 py-6'>page not found</h2>
                <button className='flex mx-auto'>
                    <Link to="/" className='border-2 border-sky-500 text-sky-500 rounded-md py-2 px-4 flex justify-center bg-gray-100 shadow-lg shadow-gray-200 text-xl font-bold uppercase hover:border-gray-100 hover:text-gray-100 hover:bg-sky-500 hover:shadow-sky-400 duration-500'>Back to Home</Link>
                </button>
            </div>
        </div>
    );
};

export default NotFound;