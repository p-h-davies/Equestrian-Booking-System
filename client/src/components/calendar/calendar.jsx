import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import { useQuery } from '@apollo/client';
import { QUERY_LESSONS } from "../../utils/queries"
import EventModal from './bookLesson';

function BigCalendar() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const { loading, error, data } = useQuery(QUERY_LESSONS);

    useEffect(() => {
        if (!loading && !error && data) {
            const mappedEvents = data.lessons
                .filter(lesson => lesson.title && lesson.date && lesson.start && lesson.end)
                .map((lesson) => ({
                    id: lesson._id,
                    title: lesson.title,
                    date: lesson.date,
                    start: `${lesson.date}T${lesson.start}:00`,
                    end: `${lesson.date}T${lesson.end}:00`,
                }));

            setEvents(mappedEvents);
        }
    }, [data, loading, error]);

    const handleEventClick = (info) => {
        setSelectedEvent(info.event);
    };

    const closeModal = () => {
        setSelectedEvent(null);
    };

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                    left: "prev,next",
                    center: "title",
                    right: "timeGridWeek,timeGridDay",
                }}
                events={events}
                eventClick={handleEventClick}
            />
            {selectedEvent && (
                <EventModal
                    info={{ event: selectedEvent }}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
}

export default BigCalendar;