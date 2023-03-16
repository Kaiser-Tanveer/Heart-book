import moment from 'moment/moment';
import React, { useContext, useState } from 'react';
import { HiOutlineEmojiHappy, HiOutlinePhotograph, HiOutlineVideoCamera } from 'react-icons/hi';
import { AuthContext } from '../../../Contexts/AuthProvider';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PostModal = ({ setOpen }) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [post, setPost] = useState('');
    const imageHostKey = process.env.REACT_APP_ImgBB;

    const postSubmitHandler = (e) => {
        setPost(e.target.value);
    }

    const submitHandler = data => {
        const postedDate = moment().format('MMMM Do YYYY, h:mm:ss a');

        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const image = imgData.data.url;
                    const postedData = {
                        userProfile: user?.photoURL,
                        userName: user?.displayName,
                        post: data.post,
                        postedImg: image,
                        date: postedDate,
                        email: user?.email
                    }
                    console.log(postedData);

                    fetch('https://fb-demo-server.vercel.app/posts', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(postedData)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            toast.success('Posted Successfully!');
                            navigate('/');
                        })
                        .catch(error => {
                            toast.error(error.message);
                            navigate('/');
                        })
                }
            });
        setOpen(0);
    }
    return (
        <div className='container'>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(submitHandler)} className='mx-auto py-10 rounded-lg my-10'>
                        <div className='md:flex items-center gap-6'>
                            <textarea
                                required
                                {...register("post", { required: "Post is required." })}
                                onChange={postSubmitHandler}
                                type="text"
                                placeholder="What's on your mind..."
                                name='post'
                                className="w-full rounded focus:outline-none focus:ring-2 text-gray-700 focus:border-emerald-600 focus:ring-emerald-300 border-b border-emerald-300 p-2 text-xl shadow-lg focus:shadow-sky-500"
                            />
                            {errors.post && <p className='text-error'>{errors.post.message}</p>}
                        </div>
                        <div className='md:flex items-center gap-6 my-6'>
                            <div className='mt-4 md:mt-0 w-full flex items-center justify-center text-center mx-auto bg-emerald-400 font-semibold py-2 rounded-lg'>
                                <HiOutlineVideoCamera className='text-xl mr-2' />
                                <button>Live Video</button>
                            </div>
                            <div
                                onClick={() => document.querySelector(".my-img").click()}
                                className='mt-4 md:mt-0 w-full flex items-center justify-center text-center mx-auto bg-emerald-400 font-semibold py-2 rounded-lg'>
                                <HiOutlinePhotograph className='text-xl mr-2' />
                                <label
                                >Photo</label>
                                <input
                                    {...register("img", { required: "Photo is required." })}
                                    type="file" accept='image/*' className="w-full my-img hidden"
                                    required />
                                {errors.img && <p className='text-error'>{errors.img.message}</p>}
                            </div>
                            <div className='mt-4 md:mt-0 w-full flex items-center justify-center text-center mx-auto bg-emerald-400 font-semibold py-2 rounded-lg'>
                                <HiOutlineEmojiHappy className='text-xl mr-2' />
                                <button>Feeling/Activity</button>
                            </div>
                        </div>
                        {
                            post &&
                            <input type="submit" value='Post' className='w-full mt-4 md:mt-0 flex items-center justify-center text-center mx-auto bg-emerald-400 font-semibold py-2 rounded-lg duration-700' />
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostModal;