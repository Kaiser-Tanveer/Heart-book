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
                isActive ? 'flex rounded-md text-gray-100 font-semibold bg-sky-400 md:bg-sky-600 items-center text-xl m-3 lg:text-base hover:shadow-lg hover:shadow-gray-700 hover:border hover:border-gray-100 hover:scale-110 duration-500' : undefined
            }
            to='/home'><HiOutlineHome /> Home</NavLink></li>
        {
            user ?
                <li>
                    <div
                        onClick={() => logOut()
                            .then(() => { })
                            .catch(err => {
                                toast.error(err.message);
                            })
                        }
                        className='bg-pink-400 m-3 text-xl hover:text-gray-100 font-semibold hover:scale-110 hover:shadow-lg hover:border hover:border-gray-100 hover:shadow-gray-700 duration-500'>
                        <HiLogout className='mr-1' />
                        LogOut
                    </div>
                </li>
                :
                <li>
                    <Link
                        className='bg-sky-400 md:bg-sky-600 m-3 text-xl hover:text-gray-100 font-semibold hover:scale-110 hover:shadow-lg hover:border hover:border-gray-100 hover:shadow-gray-700 duration-500'
                        to='/reg'><HiLogin className='mr-1' /> Register</Link>
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
                        <Link to='/profile'>
                            <img src={user?.photoURL} alt="user" className='w-12 h-12 rounded-full border-2 border-gray-700' />
                        </Link>
                        :
                        <FaUser className='text-4xl border-2 rounded-full border-gray-700 p-1' />
                }
            </div>
        </div>
    );
};

export default Header;