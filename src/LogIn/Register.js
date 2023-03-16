import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Zoom } from 'react-reveal';
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../Contexts/AuthProvider';
import useTitle from '../Components/MyHooks/useTitle';

const Register = () => {
    const navigate = useNavigate();
    useTitle("Register");
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [err, setErr] = useState('');
    const [disable, setDisable] = useState(false);
    const imageHostKey = process.env.REACT_APP_ImgBB;

    // Registration Handler 
    const submitHandler = data => {
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
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
                            const userImg = imgData.data.url;
                            updateUser(data.name, userImg)
                                .then(() => console.log("Updated"))
                                .catch(err => console.error(err.message));
                            console.log(updateUser());
                        }
                    });
                if (result) {
                    toast.success('Registered Successfully!');
                    navigate('/');
                }
            })
            .catch(error => {
                setErr(error.message);
                toast.error(err);
            });
    }

    const termsHandler = (e) => {
        const check = e.target.checked;
        setDisable(check);
    }
    return (
        <div className='lg:w-5/6 my-20 lg:my-32 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
            <Zoom>
                <div className='w-3/4 mx-auto py-20'>
                    <h2 className="text-5xl text-primary text-center font-bold">Register</h2>
                    <p className='py-6 text-center text-xl text-gray-600'>to get amazing features from T-Task. We are the one of the online marketplace providing accessories at a cheap price.</p>
                    <hr className=' border text-gray-800 border-primary' />
                </div>
            </Zoom>
            <Zoom>
                <div className="bg-gray-50 border border-primary lg:w-3/4 mx-auto flex items-center relative justify-center text-center text-gray-800 rounded-lg shadow-lg shadow-gray-700">
                    <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col w-full max-w-lg p-12 shadow-lg shadow-gray-700 text-gray-800 ng-untouched ng-pristine ng-valid rounded-lg">
                        <FaUserCircle className='absolute -top-12 left-32 md:left-28 lg:left-36 bg-primary text-gray-50 rounded-full text-8xl' />
                        <label className="self-start text-xs font-semibold">Your Name</label>
                        <input
                            {...register("name", { required: "Name is required." })}
                            type="text" placeholder='Mr. XYZ' className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 text-gray-900 focus:border-primary focus:ring-primary" required />
                        {errors.name && <p className='text-error'>{errors.name.message}</p>}
                        <label className="self-start text-xs font-semibold">Your Photo</label>
                        <input
                            {...register("img", { required: "Photo is required." })}
                            type="file" className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-gray-200 rounded-lg file:text-gray-700
                            hover:file:bg-violet-100" required />
                        {errors.img && <p className='text-error'>{errors.img.message}</p>}
                        <label className="self-start text-xs mt-2 font-semibold">Your Email</label>
                        <input
                            {...register("email", { required: "Email is required." })}
                            type="email" placeholder='xyz@gmail.com' className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 text-gray-900 focus:border-primary focus:ring-primary" required />
                        {errors.email && <p className='text-error'>{errors.email.message}</p>}
                        <label className="self-start mt-3 text-xs font-semibold">Password</label>
                        <input
                            {...register("password", { required: "Password is required.", pattern: { value: '/(?=.*[a-z])(?=.*[A-Z])/', message: 'Password must contain uppercase and lowercase' } })}
                            type="password" placeholder='password' className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 text-gray-900 focus:border-primary focus:ring-primary" required />
                        {errors.password && <p className='text-error'>{errors.password.message}</p>}
                        <div className='mt-6'>
                            <p className='text-pink-700'>{err}</p>
                            <div className='flex items-center py-2'>
                                <input onClick={termsHandler} type="checkbox" className='mr-2' />
                                <span className='text-gray-600 text-xs'>Accept <Link className='link-hover'>terms and conditions</Link></span>
                            </div>
                            <button type="submit" className={
                                !disable ?
                                    "flex w-full items-center justify-center h-12 px-6 text-sm font-semibold rounded text-gray-800 btn-disabled"
                                    :
                                    "flex w-full items-center justify-center h-12 px-6 text-sm font-bold rounded bg-primary text-gray-800 uppercase hover:scale-110 hover:text-gray-100 duration-500"
                            } >Register</button>
                        </div>
                        <div className="flex justify-center mt-6 space-x-2 text-xs">
                            <p className="text-gray-600">Already have an account? Please <Link className='link-hover' to='/logIn'>Login</Link></p>
                        </div>
                    </form>
                </div>
            </Zoom>
        </div>
    );
};

export default Register;