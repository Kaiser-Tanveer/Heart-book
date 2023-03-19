import React from 'react';
import { HiOutlineInbox } from 'react-icons/hi';

const CommentBox = ({ show, setShow }) => {
    return (
        <div
            onClick={() => setShow(!show)}
            className='flex items-center md:text-xl hover:scale-125 hover:text-emerald-400 duration-500'>
            <HiOutlineInbox className='mr-1' />
            <span>Comment</span>
        </div>
    );
};

export default CommentBox;