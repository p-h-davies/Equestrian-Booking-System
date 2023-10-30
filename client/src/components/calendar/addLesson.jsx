import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from "@apollo/client";
import { ADD_LESSON } from "../../utils/mutations";
import { TimePicker } from 'antd';
import dayjs from 'dayjs';



export default function AddLesson({ closeModal }) {
    const [userFormData, setUserFormData] = useState({ title: '', date: '', start: '', end: '', limit: '', description: '' });

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

        setUserFormData({
            title: '', date: '', start: '', end: '', limit: '', description: ''
        });

    };

    useEffect(() => {

        $('#modal').modal('show');
        //Fade and exit controls for Bootstrap Modal
        return () => {
            $('#modal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        };
    }, []);

    return (
        <div className="modal show" id="modal" tabIndex="-1" role="dialog" aria-hidden="true" onClick={closeModal}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content add-les-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-head">
                        <button type="button" className="close-add" onClick={closeModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Add a Lesson</h5>
                        <Form className="custom-form" onSubmit={handleFormSubmit}>

                            <Form.Group className='mb-3'>
                                <Form.Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor='title'>Title</Form.Label>
                                <Form.Control
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
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
                                <Form.Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor='title'>Date</Form.Label>
                                <Form.Control

                                    id="date"
                                    type="date"
                                    name="date"
                                    onChange={handleInputChange}
                                    value={userFormData.date}
                                    required
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    placeholder="Select date"
                                />

                            </Form.Group>

                            <div className="form-times">
                                <Form.Group className="'mb-3'">
                                    <Form.Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="start">Start Time</Form.Label>
                                    <TimePicker
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        format="HH:mm"
                                        value={userFormData.start ? dayjs(userFormData.start, 'HH:mm') : null}
                                        onChange={(time, timeString) => setUserFormData({ ...userFormData, start: timeString })}
                                    />
                                </Form.Group>

                                <Form.Group className="relative max-w-sm">
                                    <Form.Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="end">End Time</Form.Label>
                                    <TimePicker
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        format="HH:mm"
                                        value={userFormData.end ? dayjs(userFormData.end, 'HH:mm') : null}
                                        onChange={(time, timeString) => setUserFormData({ ...userFormData, end: timeString })}
                                    />
                                </Form.Group>
                            </div>

                            <Form.Group className='mb-3'>
                                <Form.Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor='limit'>Max Riders</Form.Label>
                                <Form.Control
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    id="limit"
                                    type='text'
                                    placeholder='Max Riders'
                                    name='limit'
                                    onChange={handleInputChange}
                                    value={userFormData.limit}
                                    required
                                />
                            </Form.Group>

                            <Button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                                type='submit'
                            >
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/tw-elements.umd.min.js"></script>
            </div >
        </div>
    );
}

