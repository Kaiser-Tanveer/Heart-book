import React, { useContext } from 'react';
import Posts from './Posts/Posts';
import MyPosts from './MyPosts/MyPosts';
import { AuthContext } from '../../Contexts/AuthProvider';
import Banner from './Banner';
import { useNavigation } from 'react-router-dom';
import Spinner from '../../Shared/Spinner/Spinner';
import useTitle from '../../Components/MyHooks/useTitle';

const Home = () => {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    useTitle("Home");

    if (navigation.state === "loading") {
        return <Spinner />
    }
    return (
        <div>
            {
                !user ?
                    <>
                        <Banner />
                    </>
                    :
                    <>
                        <Posts />
                        <MyPosts />
                    </>
            }
        </div>
    );
};

export default Home;