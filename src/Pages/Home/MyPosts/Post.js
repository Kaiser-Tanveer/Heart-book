import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { HiOutlineInbox, HiOutlineShare, HiOutlineThumbUp, HiThumbUp } from 'react-icons/hi';
import { AuthContext } from '../../../Contexts/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import { useForm } from 'react-hook-form';

const AllPosts = ({ post }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // States 
    const [like, setLike] = useState(false);
    const [likeCount, setLIkeCount] = useState(1);
    const [liked, setLiked] = useState(user?.displayName);
    const [show, setShow] = useState(false);

    const { register, formState: { errors }, handleSubmit } = useForm();
    const commentedDate = moment().format('Do MMMM, h:mm a');

    // Like Handler 
    const likeHandler = (id) => {
        console.log(id);
        setLike(!like);
        if (like === true) {
            setLIkeCount(1);
            setLiked(user?.displayName);
        }
        else {
            setLIkeCount(0);
            setLiked('');
        }
        const myLike = {
            like: likeCount,
            likedUsers: liked
        }
        console.log(myLike);
        fetch(`http://localhost:5000/likeUpdate?id=${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(myLike)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                toast.error(err.message);
            });
    }

    const commentHandler = data => {
        const id = post._id;
        const commentData = {
            comment: data.comment,
            commentedUser: user?.photoURL,
            commentDate: commentedDate,
            commentedUserName: user?.displayName
        }
        console.log(id, commentData);

        fetch(`http://localhost:5000/commentUpdate?id=${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(commentData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    console.log(data);
                    data = '';
                    navigate('/');
                }
            })
            .catch(err => {
                toast.error(err.message);
            })
    }

    return (
        <>
            <div
                key={post._id}
                className='w-full md:w-[80vw] mx-auto py-6 rounded-lg my-10 shadow-md bg-gray-50 border-2 border-gray-200 shadow-gray-500 cursor-pointer'>
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
                {
                    post?.like?.like > 0 &&
                    <p className='px-10'>Total Likes: {post?.like?.like}</p>
                }
                <div className='mx-5 md:mx-10 flex items-center justify-between mt-4 py-2 border-y-2 border-gray-300'>
                    <div
                        onClick={() => likeHandler(post._id)}
                        className='flex items-center md:text-xl'>
                        {
                            like === true || post?.like?.likedUsers === user.displayName ?
                                <HiThumbUp className='mr-1 text-emerald-500' />
                                :
                                <HiOutlineThumbUp className='mr-1' />
                        }
                        <span>Like</span>
                    </div>
                    <div
                        onClick={() => setShow(!show)}
                        className='flex items-center md:text-xl'>
                        <HiOutlineInbox className='mr-1' />
                        <span>Comment</span>
                    </div>
                    <div className='flex items-center md:text-xl'>
                        <HiOutlineShare className='mr-1' />
                        <span>Share</span>
                    </div>
                </div>
                {
                    show === true &&
                    <form
                        onSubmit={handleSubmit(commentHandler)}
                        className='flex mx-5 md:mx-10 gap-4 py-10 justify-center'>
                        <Link to='/profile' className='hover:scale-125 inline duration-500'>
                            <img src={user?.photoURL} alt="" className='w-12 h-8 md:h-10 rounded-full border-2 border-emerald-300 inline' />
                        </Link>
                        <input type="text"
                            placeholder='Write your comments here...'
                            {...register("comment", { required: "Post is required." })}
                            className='w-full inline p-2 border-2 border-emerald-300 rounded-md' />
                        {errors.post && <p className='text-error'>{errors.post.message}</p>}
                        <input type="submit" value='Send' className='btn btn-sm btn-success rounded-md mt-2' />
                    </form>
                }
                <div className='mx-5 md:mx-10 pt-4'>
                    <div className='flex items-start'>
                        <img src={post?.comments?.commentedUser} alt="" className='w-10 h-10 rounded-full border-2 border-emerald-300 inline' />
                        <div className='ml-2 bg-gray-200 p-2 rounded-lg w-full'>
                            <h4 className='font-bold'>{post?.comments?.commentedUserName}</h4>
                            <p>{post?.comments?.comment}</p>
                        </div>
                    </div>
                    <div className='ml-12 flex items-start justify-between'>
                        <p className='font-bold'>Reply</p>
                        <p className='text-gray-700 text-right'>{post?.comments?.commentDate}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllPosts;