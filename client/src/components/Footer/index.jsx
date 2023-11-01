import { Link } from 'react-router-dom';
import logo from "../../../images/white-logo.png"


const Footer = () => {
    return (
        <footer className="footer">

            <Link className="text-light" to="/">
                <img className="footer-logo" src={logo}></img>
            </Link>

        </footer>
    );
};

export default Footer;
