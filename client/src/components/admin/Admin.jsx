import React, { useState } from 'react';
import AddLesson from '../calendar/addLesson'
import { useMutation } from "@apollo/client"

const Admin = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleAddClick = () => {
        console.log("Add Lesson button clicked")
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    return (
        <main>
            {modalVisible && <AddLesson closeModal={handleModalClose} />}
            <div className="flex-row justify-center">
                <button
                    onClick={handleAddClick}
                    className="add-lesson-btn hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                >
                    Add Lesson
                </button>
            </div>
        </main>
    );
};


export default Admin;