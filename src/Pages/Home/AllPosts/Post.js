import React, { useEffect, useState } from 'react';
import { HiThumbUp } from 'react-icons/hi';
import { Zoom } from 'react-reveal';
import { FaComments } from 'react-icons/fa';
import LikesCommentsShares from './LikesCommentsShares/LikesCommentsShares';
import Comments from './LikesCommentsShares/Comments/Comments';

const AllPosts = ({ post }) => {

    const [show, setShow] = useState(false);
    const [comments, setComments] = useState(false);
    const [likes, setLikes] = useState([]);

    // Fetching Likes Data 
    useEffect(() => {
        fetch(`https://fb-demo-server.vercel.app/likes?id=${post._id}`)
            .then(res => res.json())
            .then(data => setLikes(data))
    }, [post._id]);


    // Fetching Commented Data 
    useEffect(() => {
        fetch(`https://fb-demo-server.vercel.app/comments?id=${post._id}`)
            .then(res => res.json())
            .then(data => setComments(data))
    }, [post._id]);
    return (
        <>
            <Zoom>
                <div
                    key={post._id}
                    className='w-full container md:w-[750px] min-h-screen mx-auto pt-6 pb-10 rounded-lg my-10 shadow-inner hover:shadow-lg hover:shadow-gray-700 shadow-gray-700 bg-gray-50 border-2 border-gray-200 cursor-pointer duration-500 group'>
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
                    <div className='w-full border-t-2 my-4 border-gray-300 md:border-0'>
                        <p className='px-5 py-4 md:px-10'>
                            {post?.post}
                        </p>
                        <img src={post?.postedImg} alt="postedImg" className='w-full mx-auto px-5 group-hover:px-0 group-hover:shadow-lg group-hover:drop-shadow-sm group-hover:shadow-gray-700 h-96 md:h-[580px] rounded-sm duration-500' />
                    </div>
                    <div className='mx-10 flex justify-between items-center'>
                        {
                            likes?.length > 0 &&
                            <p className='flex items-center font-semibold mr-auto'><HiThumbUp className='text-gray-100 bg-emerald-300 rounded-full p-[2px] mr-2' /> {likes.length}</p>
                        }
                        {
                            comments?.length > 0 &&
                            <p className='flex items-center font-semibold ml-auto'><FaComments className='text-gray-100 bg-emerald-300 rounded-full p-[2px] mr-2' />{comments.length}</p>
                        }
                    </div>
                    <LikesCommentsShares
                        post={post}
                        show={show}
                        setShow={setShow}
                        likes={likes}
                    />
                    <Comments
                        post={post}
                        show={show}
                        comments={comments}
                    />
                </div>
            </Zoom>
        </>
    );
};

export default AllPosts;