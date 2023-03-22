import React, { useContext, useState } from 'react';
import { HiOutlineEmojiHappy, HiOutlinePhotograph, HiOutlineVideoCamera } from 'react-icons/hi';
import PostModal from './PostModal';
import { AuthContext } from '../../../Contexts/AuthProvider';
import { Link, useNavigation } from 'react-router-dom';
import Spinner from '../../../Shared/Spinner/Spinner';
import useTitle from '../../../Components/MyHooks/useTitle';

const MyPost = () => {
    const { user } = useContext(AuthContext);
    const [open, setOpen] = useState(2);
    const navigation = useNavigation();
    useTitle("Post");

    if (navigation.state === "loading") {
        return <Spinner />
    }
    return (
        <main>
            <form className='w-full md:w-[750px] mx-auto p-10 rounded-lg my-10 drop-shadow-lg shadow-lg hover:scale-110 bg-gray-50 border-2 border-gray-200 shadow-gray-700 duration-500'>
                <div className='flex flex-col md:flex-row items-center gap-6'>
                    <Link to="/profile">
                        <img src={user?.photoURL} alt="" className='w-14 h-14 mx-auto rounded-full border-2 border-emerald-300 p-1' />
                    </Link>
                    <label
                        htmlFor="my-modal"
                        type="text"
                        placeholder="What's on your mind..."
                        name='post'
                        className="w-full rounded text-gray-400 border-2 border-emerald-300 p-2 text-xl shadow-lg focus:shadow-sky-500"
                    >
                        What's on your mind...
                    </label>
                </div>
                <div className='md:flex items-center gap-6 my-6'>
                    <div className='hidden mt-4 md:mt-0 w-full md:flex items-center justify-center text-center mx-auto bg-emerald-400 font-semibold py-2 rounded-lg'>
                        <HiOutlineVideoCamera className='text-xl mr-2' />
                        <label htmlFor="my-modal">Live Video</label>
                    </div>
                    <div className='mt-4 md:mt-0 w-full flex items-center justify-center text-center mx-auto bg-emerald-400 font-semibold py-2 rounded-lg'>
                        <HiOutlinePhotograph className='text-xl mr-2' />
                        <label htmlFor="my-modal">Photo/Video</label>
                    </div>
                    <div className='hidden mt-4 md:mt-0 w-full md:flex items-center justify-center text-center mx-auto bg-emerald-400 font-semibold py-2 rounded-lg'>
                        <HiOutlineEmojiHappy className='text-xl mr-2' />
                        <label htmlFor="my-modal">Feeling/Activity</label>
                    </div>
                </div>
            </form>
            {
                open === 2 &&
                <PostModal
                    setOpen={setOpen}
                />
            }
        </main>
    );
};

export default MyPost;