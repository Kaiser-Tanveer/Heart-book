import React, { useContext, useEffect, useState } from 'react';
import { HiOutlineThumbUp, HiThumbUp } from 'react-icons/hi';
import { AuthContext } from '../../../../../Contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Likes = ({ post, likes }) => {
    console.log(likes);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    // States 
    const [like, setLike] = useState(false);
    const [singleLike, setSingleLike] = useState(false);
    console.log(user);


    // getting singleLike 
    useEffect(() => {
        likes.map(like => setSingleLike(like))
    }, [likes])


    // Like Handler 
    const likeHandler = (id) => {
        setLike(!like);
        console.log(id);
        const myLike = {
            postId: id,
            like: !like,
            likedUsers: user?.displayName,
            likedUserImg: user?.photoURL
        }

        // Adding likes to database 
        if (singleLike?.likedUsers !== user?.displayName) {
            fetch(`https://fb-demo-server.vercel.app/likes`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(myLike)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged === true) {
                        console.log(data);
                        toast.success("Liked");
                        navigate('/');
                    }
                })
                .catch(err => {
                    toast.error(err.message);
                });
        }
        if (singleLike?.likedUsers === user?.displayName) {
            fetch(`https://fb-demo-server.vercel.app/likes?id=${singleLike._id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged === true) {
                        console.log(data);
                        toast.success("Disliked");
                        navigate('/');
                    }
                })
                .catch(err => {
                    toast.error(err.message);
                });
        }
    };

    return (
        <>
            <div
                onClick={() => likeHandler(post._id)}
                className='flex items-center md:text-xl hover:scale-125 hover:text-emerald-400 duration-500'>
                {
                    singleLike.likedUsers === user.displayName ?
                        <HiThumbUp className='mr-1 text-emerald-500' />
                        :
                        <HiOutlineThumbUp className='mr-1' />
                }
                <span>Like</span>
            </div>
        </>
    );
};

export default Likes;