import React from 'react';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiMail, HiPhoneOutgoing } from 'react-icons/hi';

const Footer = () => {
    return (
        <footer className="p-4 bg-emerald-500 sm:p-6">
            <div className="md:flex md:justify-between">
                <div className="mb-6 md:mb-0">
                    <div className="flex items-center">
                        <img src="https://i.ibb.co/qp379k9/heart-Icon.png" alt="" className='w-8 mr-2' />
                        <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">Heart Book</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                    <div>
                        <h2 className="mb-6 text-sm font-semibold uppercase text-white">Resources</h2>
                        <ul className="text-gray-200">
                            <li className="mb-4">
                                <a href="https://github.com/Kaiser-Tanveer/Heart-book.git" target='_blank' className="hover:underline">Client Code</a>
                            </li>
                            <li>
                                <a href="https://github.com/Kaiser-Tanveer/Heart-Book-Server.git" target='_blank' className="hover:underline">Server Code</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold uppercase text-white">Follow us</h2>
                        <ul className="text-gray-200">
                            <li className="mb-4">
                                <a href="mailto:kaisertanveer0@gmail.com" className="hover:underline flex items-center overflow-y-auto"><HiMail className='mr-1' />kaisertanveer0@gmail.com</a>
                            </li>
                            <li>
                                <a href="tel: +8801851072581" className="hover:underline flex items-center"><HiPhoneOutgoing className='mr-1' />+8801851072581</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold uppercase text-white">Legal</h2>
                        <ul className="text-gray-200">
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="#" className="hover:underline">Heart Book</a>. All Rights Reserved.
                </span>
                <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                    <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <FaFacebook className='text-xl' />
                        <span className="sr-only">Facebook</span>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <FaGithub />
                        <span className="sr-only">GitHub</span>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <FaLinkedin />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                </div>
            </div>
        </footer>

    );
};

export default Footer;