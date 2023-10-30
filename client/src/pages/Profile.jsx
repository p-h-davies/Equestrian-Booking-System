import { useQuery } from '@apollo/client';
import BigCalendar from '../components/calendar/calendar.jsx';
import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Calendar } from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid'



//QUERY_ME 
//USE LESSONS FROM ARRAY TO CREATE LESSON DIVS
//CANCEL LESSON 



const Profile = () => {

    return (
        <main>
            <div className="home-titles">
                <h2 className="title">Book with LBR Equestrian!</h2>
                <img className="divider" src="../../../images/divider.png"></img>
            </div>
            <div className="calender-div">
                <div className="book-info">
                    <h3>How to book:</h3>
                    <p>Click on the event which you wish to attend, and confirm you'd like to book the event in the pop up box. This will book you in for the lesson or event. You can view your booked lessons in your profile.</p>
                </div>
            </div>
            <div className="home-titles">
                <img className="divider" src="../../../images/divider.png"></img>
            </div>
        </main>
    );
};

export default Profile;
