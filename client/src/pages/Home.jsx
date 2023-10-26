import { useQuery } from '@apollo/client';
import BigCalendar from '../components/calendar/calendar.jsx';
import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Calendar } from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid'


const Home = () => {

    return (
        <main>

            <div className="flex-row justify-center">
                <BigCalendar />
            </div>
        </main>
    );
};

export default Home;
