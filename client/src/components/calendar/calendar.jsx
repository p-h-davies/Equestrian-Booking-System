import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Calendar } from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid'
import Example from './addLesson'
import eventArrays from './eventArray'

export default class BigCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };
    }

    openModal = () => {
        this.setState({ isModalOpen: true });
    };

    closeModal = () => {
        this.setState({ isModalOpen: false });
    };

    render() {
        return (
            <div>
                <button onClick={this.openModal}>CLIIIIIIIIIIIICK ME</button>
                <FullCalendar
                    plugins={[timeGridPlugin, dayGridPlugin]}
                    initialView="timeGridWeek"
                    headerToolbar={{
                        left: 'prev,next',
                        center: 'title',
                        right: 'timeGridWeek,timeGridDay',
                    }}
                    eventSources={[eventArrays]}
                />
                {this.state.isModalOpen && <Example closeModal={this.closeModal} />}
            </div>
        );
    }
}



