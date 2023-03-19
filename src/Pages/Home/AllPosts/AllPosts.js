import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Spinner from '../../../Shared/Spinner/Spinner';
import Post from './Post';

const AllPosts = () => {
    const navigation = useNavigation();
    const posts = useLoaderData([]);

    if (navigation.state === "loading") {
        return <Spinner />;
    }
    return (
        <>
            {
                posts.reverse().map(post => <Post
                    key={post._id}
                    post={post}
                />)
            }
        </>
    );
};

export default AllPosts;