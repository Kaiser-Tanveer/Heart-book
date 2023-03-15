import React, { useContext } from 'react';
import { FaHeartBroken } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const Header = () => {
    const { user } = useContext(AuthContext);
    const menuItems = <>
        <li><NavLink to='/home'>Home</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <HiMenu className='text-2xl' />
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-2xl text-emerald-600 font-bold">
                    <FaHeartBroken className='mr-1' />
                    <span>Heart Book</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end">
                <Link>
                    <img src={user?.photoURL} alt="user" className='w-12 h-12 rounded-full border-2 border-primary' />
                </Link>
            </div>
        </div>
    );
};

export default Header;