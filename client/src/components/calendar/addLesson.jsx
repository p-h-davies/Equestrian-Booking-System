import React from 'react';
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from "@apollo/client";
import { ADD_LESSON } from "../../utils/mutations";
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { updateEventArray } from './eventArray'
import eventArrays from './eventArray'


export default function Example({ closeModal }) {
    const [userFormData, setUserFormData] = useState({ title: '', date: '', start: '', end: '' });

    const [addLesson, { error }] = useMutation(ADD_LESSON);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // check if form has everything
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await addLesson({
                variables: { ...userFormData },
            });
            console.log(data)
        } catch (err) {
            console.error(err);
        }

        const calendarStartTime = userFormData.date + "T" + userFormData.start + ":00"
        const calendarEndTime = userFormData.date + "T" + userFormData.end + ":00"

        console.log('Before update:', eventArrays);
        updateEventArray({
            title: userFormData.title,
            date: userFormData.date,
            start: calendarStartTime,
            end: calendarEndTime
        });
        console.log('After update:', eventArrays);

        setUserFormData({
            title: '', date: '', start: '', end: ''
        });

    };
    return (
        <div>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.css" rel="stylesheet" />
            <link
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap"
                rel="stylesheet" />
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/tw-elements/dist/css/tw-elements.min.css" />
            <script src="https://cdn.tailwindcss.com/3.3.0"></script>
            <div className="modal-overlay">
                <div className="modal">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <h2>Modal Title</h2>
                    <Form onSubmit={handleFormSubmit}>

                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='title'>Title</Form.Label>
                            <Form.Control
                                id="title"
                                type='text'
                                placeholder='title'
                                name='title'
                                onChange={handleInputChange}
                                value={userFormData.title}
                                required
                            />

                        </Form.Group>

                        <Form.Group className="relative max-w-sm">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div>
                            <Form.Label htmlFor='title'>Date</Form.Label>
                            <Form.Control
                                id="date"
                                type="date"
                                name="date"
                                onChange={handleInputChange}
                                value={userFormData.date}
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Select date"
                            />

                        </Form.Group>

                        <Form.Group className="relative max-w-sm">
                            <Form.Label htmlFor="start">Start Time</Form.Label>
                            <TimePicker
                                format="HH:mm"
                                value={userFormData.start ? dayjs(userFormData.start, 'HH:mm') : null}
                                onChange={(time, timeString) => setUserFormData({ ...userFormData, start: timeString })}
                            />
                        </Form.Group>

                        <Form.Group className="relative max-w-sm">
                            <Form.Label htmlFor="end">End Time</Form.Label>
                            <TimePicker
                                format="HH:mm"
                                value={userFormData.end ? dayjs(userFormData.end, 'HH:mm') : null}
                                onChange={(time, timeString) => setUserFormData({ ...userFormData, end: timeString })}
                            />
                        </Form.Group>
                        <Button
                            type='submit'
                        >
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/tw-elements.umd.min.js"></script>
        </div >
    );
}

