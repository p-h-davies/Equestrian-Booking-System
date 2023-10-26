let eventArrays = [
    { title: 'Private Lesson', date: '2023-10-27', start: "2023-10-27T09:00:00", end: "2023-10-27T12:30:00" },
]

export const updateEventArray = (newEvent) => {
    console.log('Updating eventArrays with:', newEvent);
    eventArrays.push(newEvent);
    console.log('eventArrays after update:', eventArrays);
    return eventArrays
};


export default eventArrays