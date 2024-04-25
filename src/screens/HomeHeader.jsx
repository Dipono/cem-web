import '../assets/style/style.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg'

function Header() {
    const navigate = useNavigate();

    function home() { navigate('/') }
    function login() { navigate('/auth') }
    return (
        <header>
            <div id='header'>
                <div className='image-logo'>
                    <Link to="/" ><img src={logo} alt='tut logo' /></Link>
                </div>
                <ul className='top-header'>
                    <li><h4 onClick={home}>Home</h4></li>
                    <li><h4 onClick={login}>Login</h4></li>
                </ul>
            </div>
        </header>
    )
}

export default Header;