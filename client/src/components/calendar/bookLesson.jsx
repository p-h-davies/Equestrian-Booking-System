import React from 'react';
import Auth from '../../utils/auth';
import { QUERY_LESSONS } from '../../utils/queries';
import { useMutation } from '@apollo/client';
import { BOOK_LESSON } from '../../utils/mutations';


const EventModal = ({ info, closeModal }) => {
    if (!info || !info.event) {
        return null;
    }
    const { event } = info;

    const [bookLesson] = useMutation(BOOK_LESSON);

    const handleBookLesson = async () => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        try {
            const lessonId = event.id;

            await bookLesson({
                variables: { lessonId },
                refetchQueries: [{ query: QUERY_LESSONS }],
            });

            closeModal();
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="modal open">
            <span className="close" onClick={closeModal}>
                &times;
            </span>
            <h5 className="card-title">Lesson Type: {event.title}</h5>
            <div>
                <p className="card-text">
                    Date: {event.date ? event.date.toLocaleString() : ''}
                </p>
                <p className="card-text">
                    Start Time: {event.start ? event.start.toLocaleString() : ''}
                </p>
                <p className="card-text">
                    End Time: {event.end ? event.end.toLocaleString() : ''}
                    id: {event.id}
                </p>
            </div>
            <button onClick={handleBookLesson}>Book Lesson</button>
        </div>
    );
};

export default EventModal;

//if number of Users in the lesson is longer than the limit, booking is greyed out
//when click book, adds lesson to user, and adds user to the lesson





