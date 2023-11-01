import React, { useEffect, useState } from 'react';
import { QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { CANCEL_LESSON } from '../utils/mutations'
import divider from "../../images/divider.png"
import icon from "../../images/rider.png"


const Profile = () => {

    //Get user's lessons via QUERY_ME
    const { loading, data } = useQuery(QUERY_ME);
    const userData = data?.me || {};
    const userLessons = userData.lessons;

    const [cancelLesson] = useMutation(CANCEL_LESSON);

    //Request to cancel lesson, with lesson id placeholder
    const handleCancelLesson = (id) => {
        cancelLesson({
            variables: { lessonId: id },
            refetchQueries: [{ query: QUERY_ME }],
        });
    };

    return (
        <main>
            <div className="home-titles">
                <h2 className="title">Your Lessons!</h2>
                <img className="divider" src={divider}></img>
                <p>To see the changes you've made be displayed on the homepage, make sure you refresh!</p>
            </div>
            <div className="lesson-cards">
                {/* return data for each lesson */}
                {userLessons ? (
                    userLessons.map((lesson, index) => (
                        <div key={index} className="lesson-card">
                            <img className="mini-img" src={icon}></img>
                            <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white profile-title">{lesson.title}</h3>
                            <p><b>Date:</b> {lesson.date}</p>
                            <p><b>Start Time:</b> {lesson.start}</p>
                            <p><b>End Time:</b> {lesson.end}</p>
                            <button className="btn btn-primary" onClick={() => handleCancelLesson(lesson._id)}>
                                Cancel Lesson
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No lessons found.</p>
                )}
            </div>

        </main>
    );
};

export default Profile;
