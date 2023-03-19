import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import Banner from './Banner';
import { useNavigation } from 'react-router-dom';
import Spinner from '../../Shared/Spinner/Spinner';
import useTitle from '../../Components/MyHooks/useTitle';
import MyPost from './MyPosts/MyPost';
import AllPosts from './AllPosts/AllPosts';

const Home = () => {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    useTitle("Home");

    if (navigation.state === "loading") {
        return <Spinner />
    }
    return (
        <div className='pt-12 lg:pt-20'>
            {
                !user ?
                    <>
                        <Banner />
                    </>
                    :
                    <>
                        <MyPost />
                        <AllPosts />
                    </>
            }
        </div>
    );
};

export default Home;