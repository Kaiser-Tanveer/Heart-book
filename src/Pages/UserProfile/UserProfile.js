import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import { Link } from 'react-router-dom';
import useTitle from '../../Components/MyHooks/useTitle';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../Shared/Spinner/Spinner';
import { HiOutlineInbox, HiOutlineShare, HiOutlineThumbUp } from 'react-icons/hi';

const UserProfile = () => {
    useTitle("Profile");
    const { user } = useContext(AuthContext);

    const {
        isLoading,
        refetch,
        data: posts = [],
    } = useQuery({
        queryKey: ["/userPosts", user?.email],
        queryFn: async () => {
            const res = await fetch(
                `https://fb-demo-server.vercel.app/userPosts?email=${user?.email}`
            );
            const data = await res.json();
            return data;
        },
    });
    console.log(posts);

    if (isLoading) {
        return <Spinner />
    }
    return (
        <div className='pt-[92px] lg:pt-24'>
            {
                user ?
                    <div className='min-h-screen container mx-auto'>
                        <div className='bg-gradient-to-r flex flex-col md:flex-row justify-between items-center from-sky-200 py-4 px-10 to-pink-300'>
                            <div className='md:flex items-center justify-center'>
                                <img src={user?.photoURL} alt="userImg" className='w-32 h-32 rounded-full mr-2' />
                                <div className='flex flex-col text-center md:text-left'>
                                    <span className='text-2xl font-bold'>{user?.displayName}</span>
                                    <span className='text-xl'>{posts?.length ? posts.length : 0} posts</span>
                                </div>
                            </div>
                            <div>
                                <p>{user?.email}</p>
                            </div>
                        </div>
                        <article>
                            {
                                posts.length > 0 ?
                                    <>
                                        <h2 className='text-gray-700 pt-6 text-2xl font-bold text-center'>Posts</h2>
                                        {
                                            posts.reverse().map(post => <div
                                                key={post._id}
                                                className='w-full md:w-[80vw] mx-auto py-6 rounded-lg my-10 shadow-md bg-gray-50 border-2 border-gray-200 shadow-gray-500'>
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
                                                    <img src={post?.postedImg} alt="" className='w-full max-h-screen rounded-md' />
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
                                    :
                                    <h2 className='min-h-screen container mx-auto mt-24 text-4xl text-center text-pink-500 font-bold'>You have no Posts</h2>
                            }
                        </article>
                    </div>
                    :
                    <h2 className='min-h-screen container mx-auto mt-24 text-2xl text-center text-sky-500 font-bold'>Please <Link className='text-pink-500 link-hover' to="/logIn"> Login</Link> to access your profile</h2>
            }
        </div>
    );
};

export default UserProfile;