import React, { useEffect, useState } from 'react';
import Auth from '../../utils/auth';
import { QUERY_LESSONS, QUERY_ME } from '../../utils/queries';
import { useMutation } from '@apollo/client';
import { REMOVE_LESSON } from '../../utils/mutations';
import { useQuery } from '@apollo/client';


const RemoveBtn = ({ info, closeModal }) => {
    if (!info || !info.event) {
        return null;
    }
    const { event } = info;

    const [removeLesson] = useMutation(REMOVE_LESSON);



    const handleRemoveLesson = async () => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
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
            Remove Lesson
        </button>
    );
};


export default RemoveBtn;