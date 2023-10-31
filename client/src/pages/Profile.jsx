import React, { useEffect, useState } from 'react';
import Auth from '../utils/auth';
import { QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';




//QUERY_ME 
//USE LESSONS FROM ARRAY TO CREATE LESSON DIVS
//CANCEL LESSON 



const Profile = () => {

    const { loading, data } = useQuery(QUERY_ME);
    const userData = data?.me || {};
    const userLessons = userData.lessons;

    console.log(userLessons)

    userLessons.forEach(lesson => {

    });

    return (
        <main>
            <div className="home-titles">
                <h2 className="title">Book with LBR Equestrian!</h2>
                <img className="divider" src="../../../images/divider.png"></img>
            </div>
            <div className="lesson-card">
                {userLessons.map((lesson, index) => (
                    <div key={index} className="lesson-card">
                        <p>{lesson.title}</p>
                        <p>Date: {lesson.date}</p>
                        <p>Start Time: {lesson.startTime}</p>
                        <p>End Time: {lesson.endTime}</p>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Profile;
