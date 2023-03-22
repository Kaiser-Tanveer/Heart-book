import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../../Contexts/AuthProvider';
import { useForm } from 'react-hook-form';
import moment from 'moment/moment';
import Reply from './Reply';

const Comments = ({ post, show, comments }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const commentedDate = moment().format('Do MMMM, h:mm a');


    const commentHandler = data => {
        const id = post._id;
        const commentData = {
            postId: id,
            comment: data.comment,
            commentedUserProfile: user?.photoURL,
            commentedDate: commentedDate,
            commentedUserName: user?.displayName
        }
        console.log(commentData);
        fetch(`https://fb-demo-server.vercel.app/comments`, {
            method: "POST",
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
                        {...register("comment", { required: "Write something." })}
                        className='w-full inline p-2 border-2 border-emerald-300 rounded-md' />
                    {errors.comment && <p className='text-error'>{errors.comment.message}</p>}
                    <input type="submit" value='Send' className='btn btn-sm btn-success rounded-md mt-2' />
                </form>
            }
            {
                comments.length > 0 &&
                comments.map(comment =>
                    <div
                        key={comment._id}
                        className='mx-5 md:mx-10 pt-4'>
                        <div className="flex items-start">
                            <img src={comment?.commentedUserProfile} alt="userImg" className='w-10 h-10 rounded-full border-2 border-emerald-300 inline shadow-md shadow-gray-700' />
                            <div className='ml-2 bg-gray-200 p-2 rounded-lg w-full shadow-inner shadow-gray-700 hover:shadow-md hover:shadow-gray-500 duration-700'>
                                <h4 className='font-bold'>{comment?.commentedUserName}</h4>
                                <p>{comment?.comment}</p>
                            </div>
                        </div>
                        <Reply
                            comment={comment}
                        />
                    </div>)
            }
        </>
    );
};

export default Comments;