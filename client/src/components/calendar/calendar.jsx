import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import { useQuery } from '@apollo/client';
import { QUERY_LESSONS } from "../../utils/queries"
import EventModal from './bookLesson';
import moment from 'moment';
import 'moment/locale/en-gb';



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
                    start: moment(`${lesson.date} ${lesson.start}`, 'YYYY-MM-DD HH:mm').toDate(),
                    end: moment(`${lesson.date} ${lesson.end}`, 'YYYY-MM-DD HH:mm').toDate(),
                    usersArrayLength: lesson.users.length,
                    limit: lesson.limit
                }));

            setEvents(mappedEvents);
        }
    }, [data, loading, error]);

    console.log(data)
    const handleEventClick = (info) => {
        setSelectedEvent(info.event);
    };

    const closeModal = () => {
        setSelectedEvent(null);
    };

    const renderEventContent = (eventInfo) => {
        const { event } = eventInfo;
        const { usersArrayLength, limit } = event.extendedProps
        console.log('user:', { usersArrayLength })
        console.log(limit)
        return (
            <div>
                {eventInfo.timeText && <p>{eventInfo.timeText}</p>}
                <p>{eventInfo.event.title}</p>
                <p>{usersArrayLength}/{limit} booked</p>
            </div>
        );
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
                slotMinTime="08:00:00" // Set the minimum time to 8am
                slotMaxTime="19:00:00" // Set the maximum time to 6pm
                eventContent={renderEventContent}
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