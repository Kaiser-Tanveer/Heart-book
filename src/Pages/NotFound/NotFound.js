import React from 'react';
import { Hearts } from 'react-loader-spinner';

const NotFound = () => {
    return (
        <div className='h-[100vh]'>
            <div className='flex items-center justify-center mx-auto'>
                <Hearts
                    height="350"
                    width="350"
                    color="#059669"
                    ariaLabel="hearts-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
            <h1 className='mt-0 pt-0 text-6xl md:text-8xl text-center animate-pulse text-emerald-600 font-bold'>Heart Book</h1>
        </div>
    );
};

export default NotFound;