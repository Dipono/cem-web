import '../../assets/style/style.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'

function Header() {
    const navigate = useNavigate();

    function home() { navigate('/service_provider_dashboard') }
    function consult() { navigate('/consult') }
    function report() { navigate('/report') }
    function logout() { navigate('/') }
    return (
        <header>
            <div id='header'>
                <div className='image-logo'>
                    <Link to="/service_provider_dashboard" ><img src={logo} alt='tut logo' /></Link>
                </div>
                <ul className='top-header'>
                    <li><h4 onClick={home}>Home</h4></li>
                    <li><h4 onClick={consult}>Consult</h4></li>
                    <li><h4 onClick={logout}>Logout</h4></li>
                </ul>
            </div>

        </header>

    )
}

export default Header;