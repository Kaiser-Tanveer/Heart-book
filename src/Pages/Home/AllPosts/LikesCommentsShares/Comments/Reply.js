import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../../Contexts/AuthProvider';
import { useForm } from 'react-hook-form';
import moment from 'moment/moment';
import { toast } from 'react-hot-toast';

const Reply = ({ comment }) => {
    const [reply, setReply] = useState(false);
    const [singleReply, setSingleReply] = useState([]);
    console.log(singleReply);
    console.log(comment._id);

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const repliedDate = moment().format('Do MMMM, h:mm a');
    const id = comment._id;

    const ReplyHandler = (data) => {
        const replyData = {
            commentId: id,
            reply: data.reply,
            repliedUserProfile: user?.photoURL,
            repliedDate: repliedDate,
            repliedUserName: user?.displayName
        }
        console.log(replyData);
        fetch('https://fb-demo-server.vercel.app/replies', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(replyData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    console.log(data);
                    navigate('/');
                }
            })
            .catch(err => {
                toast.error(err.message);
            })
    }

    useEffect(() => {
        fetch(`https://fb-demo-server.vercel.app/replies?id=${comment._id}`)
            .then(res => res.json())
            .then(data => setSingleReply(data))
    }, [comment._id]);
    return (
        <div>
            <div className='ml-12 flex items-start justify-between'>
                <p
                    onClick={() => setReply(!reply)}
                    className='font-bold'>Reply</p>
                <p className='text-gray-700 text-right'>{comment?.commentedDate}</p>
            </div>
            {
                reply === true &&
                <form
                    onSubmit={handleSubmit(ReplyHandler)}
                    className='flex mx-5 md:mx-10 gap-4 py-10 justify-center'>
                    <Link to='/profile' className='hover:scale-125 inline duration-500'>
                        <img src={user?.photoURL} alt="userImg" className='w-12 h-8 md:h-10 rounded-full border-2 border-emerald-300 inline' />
                    </Link>
                    <input type="text"
                        placeholder='Reply here...'
                        {...register("reply", { required: "Write something." })}
                        className='w-full inline p-2 border-2 border-emerald-300 rounded-md' />
                    {errors.reply && <p className='text-error'>{errors.reply.message}</p>}
                    <input type="submit" value='Reply' className='btn btn-sm btn-success rounded-md mt-2' />
                </form>
            }
            <div className='ml-10 mt-4'>
                {
                    singleReply.map(reply => <div
                        key={reply._id}>
                        <div
                            className="flex items-start"
                        >
                            <img src={reply?.repliedUserProfile} alt="userImg" className='w-10 h-10 rounded-full border-2 border-emerald-300 inline shadow-md shadow-gray-700' />
                            <div className='ml-2 bg-gray-200 p-2 rounded-lg w-full shadow-inner shadow-gray-700 hover:shadow-md hover:shadow-gray-500 duration-700'>
                                <h4 className='font-bold'>{reply?.repliedUserName}</h4>
                                <p>{reply?.reply}</p>
                            </div>
                        </div>
                        <p className='text-gray-700 text-right'>{comment?.commentedDate}</p>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Reply;