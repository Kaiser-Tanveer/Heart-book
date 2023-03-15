import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { HiOutlineInbox, HiOutlineShare, HiOutlineThumbUp } from 'react-icons/hi';

const MyPosts = () => {
    const navigation = useNavigation();
    const posts = useLoaderData([]);
    console.log(posts);

    if (navigation.state === "loading") {
        return "";
    }
    return (
        <>
            {
                posts.map(post => <div
                    key={post._id}
                    className='w-[80vw] mx-auto py-6 rounded-lg my-10 shadow-md bg-gray-50 border-2 border-gray-200 shadow-gray-500'>
                    <div className='md:flex justify-between items-center px-5 md:px-10'>
                        <div className='flex justify-start items-center'>
                            <img src={post?.userProfile} alt="userImage" className='w-10 h-10 rounded-full' />
                            <span className='ml-2 text-gray-700 font-bold'>{post?.userName}</span>
                        </div>
                        <div>
                            <h2 className='text-gray-500'>
                                {post?.date}
                            </h2>
                        </div>
                    </div>
                    <div className='md:px-10 w-full border-t-2 my-4 border-gray-300 md:border-0'>
                        <p className='px-5 py-4 md:px-0'>
                            {post?.post}
                        </p>
                        <img src={post?.postedImg} alt="" className='w-full max-h-screen' />
                    </div>
                    <div className='mx-5 md:mx-10 flex items-center justify-between mt-4 py-2 border-y-2 border-gray-300'>
                        <div className='flex items-center md:text-xl'>
                            <HiOutlineThumbUp className='mr-1' />
                            <span>Like</span>
                        </div>
                        <div className='flex items-center md:text-xl'>
                            <HiOutlineInbox className='mr-1' />
                            <span>Comment</span>
                        </div>
                        <div className='flex items-center md:text-xl'>
                            <HiOutlineShare className='mr-1' />
                            <span>Share</span>
                        </div>
                    </div>
                </div>)
            }
        </>
    );
};

export default MyPosts;