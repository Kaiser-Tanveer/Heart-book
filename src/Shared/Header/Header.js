import React, { useContext } from 'react';
import { HiLogin, HiLogout, HiMenu, HiOutlineHome } from 'react-icons/hi';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    console.log(user);
    const menuItems = <>
        <li><NavLink
            className={({ isActive }) =>
                isActive ? 'flex rounded-md shadow-gray-700 border-2 border-gray-100 text-white font-semibold bg-sky-400 md:bg-sky-600 items-center text-xl m-3 lg:text-base shadow-lg hover:scale-110 duration-500'
                    :
                    "flex rounded-md shadow-inner shadow-gray-700 border-2 border-gray-100 text-gray-700 hover:text-white hover:gray-100 font-semibold bg-gray-100 hover:bg-sky-400 hover:md:bg-sky-600 items-center text-xl m-3 lg:text-base hover:shadow-lg hover:shadow-gray-700 hover:scale-110 duration-500"
            }
            to='/home'><HiOutlineHome /> Home</NavLink></li>
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
                        className='flex rounded-md shadow-gray-700 border-2 border-gray-100 text-gray-700 hover:text-white font-semibold bg-pink-200 hover:bg-pink-400 hover:md:bg-pink-600 items-center text-xl m-3 lg:text-base shadow-inner hover:shadow-lg hover:shadow-gray-700 hover:scale-110 duration-500'>
                        <HiLogout className='mr-1' />
                        LogOut
                    </NavLink>
                </li>
                :
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ?
                                'flex rounded-md shadow-gray-700 border-2 border-gray-100 text-white font-semibold bg-emerald-400 md:bg-emerald-600 items-center text-xl m-3 lg:text-base shadow-lg hover:scale-110 duration-500'
                                :
                                'flex rounded-md shadow-gray-700 border-2 border-gray-100 text-gray-700 hover:text-white font-semibold bg-emerald-200 hover:bg-emerald-400 hover:md:bg-emerald-600 items-center text-xl m-3 lg:text-base shadow-inner hover:shadow-lg hover:shadow-gray-700 hover:scale-110 duration-500'}
                        to='/reg'><HiLogin className='mr-1' /> Register</NavLink>
                </li>
        }
    </>
    return (
        <div className="navbar bg-sky-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <HiMenu className='text-2xl' />
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-2xl text-emerald-600 font-bold flex items-center">
                    <img src="https://i.ibb.co/qp379k9/heart-Icon.png" alt="" className='w-8 mr-2' />
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
                                isActive ? 'flex rounded-full shadow-gray-700 border-2 border-gray-100 text-white font-semibold items-center text-xl m-3 lg:text-base shadow-lg hover:scale-110 duration-500'
                                    :
                                    "flex rounded-full shadow-inner shadow-gray-700 border-2 border-gray-100 text-gray-700 hover:text-white hover:gray-100 font-semibold bg-gray-100 items-center text-xl m-3 lg:text-base hover:shadow-lg hover:shadow-gray-700 hover:scale-110 duration-500"
                            }
                            to='/profile'>
                            <img src={user?.photoURL} alt="user" className='w-16 h-16 rounded-full p-1 drop-shadow-lg shadow-gray-700' />
                        </NavLink>
                        :
                        <FaUser className='text-4xl border-2 rounded-full border-gray-700 p-1' />
                }
            </div>
        </div>
    );
};

export default Header;