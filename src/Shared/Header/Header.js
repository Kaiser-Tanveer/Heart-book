import React, { useContext } from 'react';
import { HiLogin, HiLogout, HiOutlineHome } from 'react-icons/hi';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Header = () => {
    // Navbar positioning Variable 
    let preNavPosition = window.pageYOffset;
    window.onscroll = function () {
        const currNavPosition = window.pageYOffset;
        if (preNavPosition > currNavPosition) {
            document.getElementById('myNav').style.top = "0";
        }
        else {
            document.getElementById('myNav').style.top = "-180px";
        }
        preNavPosition = currNavPosition;
    }

    const { user, logOut } = useContext(AuthContext);
    console.log(user);
    const menuItems = <>
        <li><NavLink
            className={({ isActive }) =>
                isActive ? 'flex rounded-md shadow-gray-700 border-2 border-gray-100 text-white font-semibold bg-sky-400 md:bg-sky-600 items-center text-2xl p-2 lg:text-xl m-3 shadow-lg hover:scale-110 duration-500'
                    :
                    "flex rounded-md shadow-inner shadow-gray-700 border-2 border-gray-100 text-gray-700 hover:text-white hover:gray-100 font-semibold bg-gray-100 hover:bg-sky-400 hover:md:bg-sky-600 items-center text-2xl p-2 lg:text-xl m-3 hover:shadow-lg hover:shadow-gray-700 hover:scale-110 duration-500"
            }
            to='/home'><HiOutlineHome /> <span className='hidden lg:inline'>Home</span></NavLink></li>
        {
            user ?
                <li>
                    <NavLink
                        onClick={() => logOut()
                            .then(() => { })
                            .catch(err => {
                                toast.error(err.message);
                            })
                        }
                        className='flex rounded-md shadow-gray-700 border-2 border-gray-100 text-gray-700 hover:text-white font-semibold bg-pink-200 hover:bg-pink-400 hover:md:bg-pink-600 items-center text-2xl p-2 lg:text-xl m-3 shadow-inner hover:shadow-lg hover:shadow-gray-700 hover:scale-110 duration-500'>
                        <HiLogout className='mr-1' />
                        <span className='hidden lg:inline'>LogOut</span>
                    </NavLink>
                </li>
                :
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ?
                                'flex rounded-md shadow-gray-700 border-2 border-gray-100 text-white font-semibold bg-emerald-400 md:bg-emerald-600 items-center text-2xl p-2 lg:text-xl m-3 shadow-lg hover:scale-110 duration-500'
                                :
                                'flex rounded-md shadow-gray-700 border-2 border-gray-100 text-gray-700 hover:text-white font-semibold bg-emerald-200 hover:bg-emerald-400 hover:md:bg-emerald-600 items-center text-2xl p-2 lg:text-xl m-3 shadow-inner hover:shadow-lg hover:shadow-gray-700 hover:scale-110 duration-500'}
                        to='/reg'><HiLogin className='mr-1' /> <span className='hidden lg:inline'>Register</span></NavLink>
                </li>
        }
    </>
    return (
        <div id='myNav' className="navbar flex pb-8 lg:pb-0 items-center bg-gray-100 drop-shadow-lg shadow-md mr-4 lg:mr-0 bg-opacity-90 top-0 mx-auto fixed w-full z-40 text-white duration-500">
            <div className="navbar-start">
                <div className="">

                    <ul className="flex absolute justify-between pr-4 py-6 items-center rounded-box lg:hidden w-full">
                        {menuItems}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-2xl text-emerald-600 font-bold flex items-center">
                    <img src="https://i.ibb.co/qp379k9/heart-Icon.png" alt="logo" className='w-8 mr-2' />
                    <span>Heart Book</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 items-center">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? 'flex rounded-full shadow-gray-700 border-2 border-gray-100 text-white font-semibold items-center text-xl lg:m-3 lg:text-base shadow-lg hover:scale-110 duration-500'
                                    :
                                    "flex rounded-full shadow-inner shadow-gray-700 border-2 border-gray-100 text-gray-700 hover:text-white hover:gray-100 font-semibold bg-gray-100 items-center text-xl lg:m-3 lg:text-base hover:shadow-lg hover:shadow-gray-700 hover:scale-110 duration-500"
                            }
                            to='/profile'>
                            <img src={user?.photoURL} alt="user" className='w-12 lg:w-16 h-12 lg:h-16 rounded-full p-1 drop-shadow-lg shadow-gray-700' />
                        </NavLink>
                        :
                        <FaUser className='text-4xl border-2 rounded-full border-gray-700 p-1' />
                }
            </div>
        </div>
    );
};

export default Header;