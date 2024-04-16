import '../../assets/style/style.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'

function Header() {
    const navigate = useNavigate();

    function home() { navigate('/customer_dashboard') }
    function forum() { navigate('/forum') }
    function report() { navigate('/report') }
    function logout() { navigate('/') }
    return (
        <header>
            <div id='header'>
                <div className='image-logo'>
                    <Link to="/customer_dashboard" ><img src={logo} alt='tut logo' /></Link>
                </div>
                <ul className='top-header'>
                    <li><h4 onClick={home}>Home</h4></li>
                    <li><h4 onClick={forum}>Forum</h4></li>
                    <li><h4 onClick={report}>Report</h4></li>
                    <li><h4 onClick={logout}>Logout</h4></li>
                </ul>
            </div>

        </header>

    )
}

export default Header;