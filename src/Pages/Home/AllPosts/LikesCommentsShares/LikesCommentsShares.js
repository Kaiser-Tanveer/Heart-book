import React, { useContext } from 'react';
import { HiOutlineShare } from 'react-icons/hi';
import { Zoom } from 'react-reveal';
import { AuthContext } from '../../../../Contexts/AuthProvider';
import Likes from './Likes/Likes';
import CommentBox from './Comments/CommentBox';

const LikesCommentsShares = ({ post, show, setShow, likes }) => {
    const { user } = useContext(AuthContext);
    return (
        <Zoom>
            <div className='mx-5 md:mx-10 flex items-center justify-between mt-4 py-2 border-y-2 border-gray-300'>
                <Likes
                    post={post}
                    likes={likes}
                />
                <CommentBox
                    post={post}
                    show={show}
                    setShow={setShow}
                />
                <div className='flex items-center md:text-xl hover:scale-125 hover:text-emerald-400 duration-500'>
                    <HiOutlineShare className='mr-1' />
                    <span>Share</span>
                </div>
            </div>
        </Zoom>
    );
};

export default LikesCommentsShares;