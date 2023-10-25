import { useQuery } from '@apollo/client';
import BigCalendar from '../components/calendar/calendar.jsx';

const Home = () => {

    return (
        <main>

            <div className="flex-row justify-center">
                <BigCalendar />
            </div>
        </main>
    );
};

export default Home;
