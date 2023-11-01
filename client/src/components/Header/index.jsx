import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';
import logo from "../../../images/LOGO-BLUE.png"

const Header = () => {

    const [isAdmin, setIsAdmin] = useState(false); //Track is user is admin

    const { loading, data } = useQuery(QUERY_ME);
    const userData = data?.me || {};

    //set user role from userData
    const userRole = userData.role;


    useEffect(() => {
        // Sets value of admin/not admin
        setIsAdmin(userRole === "admin");
    }, [userRole]);


    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <header className="header sticky-top">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.css" rel="stylesheet" />
            <div className="header-inner">
                <div>
                    <Link className="text-light" to="/">
                        <img className="logo" src={logo}></img>
                    </Link>
                </div>
                <div className="header-btns">
                    {Auth.loggedIn() ? (
                        <>
                            {!isAdmin && (<Link className=" log-btn hover:text-white border hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" to="/profile">
                                {Auth.getProfile().data.username}'s profile
                            </Link>)}
                            {isAdmin && (
                                <h2 className="admin-greet">Hi {Auth.getProfile().data.username}!</h2>
                            )}
                            <button className=" log-btn hover:text-white border hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" onClick={logout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link className=" log-btn hover:text-white border hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" to="/login">
                                Login
                            </Link>
                            <Link className="log-btn hover:text-white border hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" to="/signup">
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
