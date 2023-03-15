import React from 'react';
import Posts from './Posts/Posts';
import MyPosts from './MyPosts/MyPosts';

const Home = () => {
    return (
        <div>
            <Posts />
            <MyPosts />
        </div>
    );
};

export default Home;