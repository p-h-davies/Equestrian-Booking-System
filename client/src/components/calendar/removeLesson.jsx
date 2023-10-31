import React, { useEffect, useState } from 'react';
import { QUERY_LESSONS, QUERY_ME } from '../../utils/queries';
import { useMutation } from '@apollo/client';
import { REMOVE_LESSON } from '../../utils/mutations';



const RemoveBtn = ({ info, closeModal }) => {
    //Sets event as info for use in modal - this component is sent to the booking modal
    if (!info || !info.event) {
        return null;
    }
    const { event } = info;

    const [removeLesson] = useMutation(REMOVE_LESSON);

    //Function to send request to remove the lesson from the calendar 
    const handleRemoveLesson = async () => {
        try {
            const lessonId = event.id;
            console.log(lessonId)

            await removeLesson({
                variables: { lessonId },
                refetchQueries: [{ query: QUERY_LESSONS }],
            });

            closeModal();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <button className="btn btn-primary" onClick={handleRemoveLesson}>
            Cancel Lesson
        </button>
    );
};


export default RemoveBtn;