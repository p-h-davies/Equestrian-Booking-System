import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <footer className="footer">

            <Link className="text-light" to="/">
                <img className="footer-logo" src="../../../images/white-logo.png"></img>
            </Link>

        </footer>
    );
};

export default Footer;
