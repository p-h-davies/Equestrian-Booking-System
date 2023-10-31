import React, { useEffect, useState } from 'react';
import Auth from '../../utils/auth';
import { QUERY_LESSONS, QUERY_ME } from '../../utils/queries';
import { useMutation } from '@apollo/client';
import { BOOK_LESSON } from '../../utils/mutations';
import { useQuery } from '@apollo/client';
import RemoveBtn from './removeLesson';




const EventModal = ({ info, closeModal }) => {
    if (!info || !info.event) {
        return null;
    }
    const { event } = info;

    const [bookLesson] = useMutation(BOOK_LESSON);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if user is logged in
    const [isAdmin, setIsAdmin] = useState(false); //Track is user is admin


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

    //Gets data to see if user has already booked this lesson
    const { loading, data } = useQuery(QUERY_ME);
    const userData = data?.me || {};
    const { username, email, lessons } = userData;
    //check if user has a lesson in their lessons array whose lessonId matches the eventId, returns a boolean
    const isBooked = lessons && lessons.some((lesson) => lesson._id === event.id);
    const userRole = userData.role;

    console.log(userRole)

    useEffect(() => {
        // Sets value of logged in/not logged in
        setIsLoggedIn(Auth.loggedIn());
        setIsAdmin(userRole === "admin");
    }, [userRole]);

    // Logs the value of isLoggedIn, userRole, and isAdmin
    console.log('isLoggedIn:', isLoggedIn);
    console.log('userRole:', userRole);
    console.log('isAdmin:', isAdmin);

    useEffect(() => {
        $('#modal').modal('show');
        // Fade and exit controls for Bootstrap Modal
        return () => {
            $('#modal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        };
    }, []);



    return (
        <div className="modal show" id="modal" tabIndex="-1" role="dialog" aria-hidden="true" onClick={closeModal}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <button type="button" className="close" onClick={closeModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <img className="book-logo" src="../../../images/white-logo.png"></img>
                        <h5 className="modal-title" id="modalLabel">{event.title}</h5>
                    </div>
                    <div className="modal-body">
                        <p className="card-text">
                            <b>Start Time:</b> {event.start ? event.start.toLocaleString() : ''}
                        </p>
                        <p className="card-text">
                            <b>End Time:</b> {event.end ? event.end.toLocaleString() : ''}
                        </p>
                        {!isLoggedIn && (
                            <div className="alert alert-danger" role="alert">
                                You need to be logged in to book a lesson!
                            </div>
                        )}
                        {isBooked && (
                            <div className="alert alert-danger" role="alert">
                                You've already booked this lesson!
                            </div>
                        )}
                        {!isAdmin && (
                            <button className="btn btn-primary" onClick={handleBookLesson}>
                                Book Lesson
                            </button>
                        )}
                        {isAdmin && (
                            <RemoveBtn info={info} closeModal={closeModal} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default EventModal;


//if number of Users in the lesson is longer than the limit, booking is greyed out
//when click book, adds lesson to user, and adds user to the lesson





