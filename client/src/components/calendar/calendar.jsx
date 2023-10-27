import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import Example from './addLesson'
import { useQuery } from '@apollo/client';
import { QUERY_LESSONS } from "../../utils/queries"
import { Calendar } from '@fullcalendar/core';



//universal function
// get lessons from database
//for each, create an object to go into the EventsArrays array
//push into EventsArrays
//reset calendar



function BigCalendar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [events, setEvents] = useState([]);


    const { loading, error, data } = useQuery(QUERY_LESSONS);

    useEffect(() => {
        console.log("loading:", loading);
        console.log("error:", error);

        if (!loading && !error && data) {
            console.log(data.lessons);
            const mappedEvents = data.lessons
                .filter(lesson => lesson.title && lesson.date && lesson.start && lesson.end)
                .map((lesson) => ({
                    title: lesson.title,
                    date: lesson.date,
                    start: `${lesson.date}T${lesson.start}:00`,
                    end: `${lesson.date}T${lesson.end}:00`,
                }));

            setEvents(mappedEvents);
            console.log(mappedEvents);
        }
    }, [data, loading, error]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button onClick={openModal}>Click Me</button>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay',
                }}
                events={events}
            />
            {isModalOpen && <Example closeModal={closeModal} />}
        </div>
    );
}

export default BigCalendar;

