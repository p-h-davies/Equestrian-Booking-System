import BigCalendar from '../components/calendar/calendar.jsx';
import Admin from './Admin.jsx';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries.js';

const Home = () => {

    const [isAdmin, setIsAdmin] = useState(false); //Track is user is admin
    const { loading, data } = useQuery(QUERY_ME);
    const userData = data?.me || {};

    const userRole = userData.role;

    console.log(userRole)

    useEffect(() => {
        // Sets value of logged in/not logged in
        setIsAdmin(userRole === "admin");
    }, [userRole]);


    return (
        <main>
            <div className="home-titles">
                <h2 className="title">Book with LBR Equestrian!</h2>
                <img className="divider" src="../../../images/divider.png"></img>
            </div>
            <div className="calender-div">
                {!isAdmin && (
                    <div className="book-info">
                        <h3><b>How to book:</b></h3>
                        <p>Click on the event which you wish to attend, and confirm you'd like to book the event in the pop up box. This will book you in for the lesson or event. You can view your booked lessons in your profile.</p>
                    </div>
                )}
                {isAdmin && (
                    <div className="book-info">
                        <h3>Admin Actions:</h3>
                        <p><b>To delete a lesson,</b> click on the lesson and press 'Remove Lesson'.</p>
                        <p><b>To add a lesson,</b> click the button below.</p>
                        < Admin />
                    </div>
                )}
                <BigCalendar />
            </div>
            <div className="home-titles">
                <img className="divider" src="../../../images/divider.png"></img>
            </div>
        </main>
    );
};

export default Home;
