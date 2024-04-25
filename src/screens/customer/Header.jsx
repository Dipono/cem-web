import '../../assets/style/style.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpg'

function Header() {
    const navigate = useNavigate();

    function report() { navigate('/report') }
    function logout() { 
        localStorage.removeItem('user_phoneNo');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_id');
        
        navigate('/') }
    return (
        <header>
            <div id='header'>
                <div className='image-logo'>
                    <Link to="/report" ><img src={logo} alt='tut logo' /></Link>
                </div>
                <ul className='top-header'>
                    <li><h4 onClick={report}>Home</h4></li>
                    <li><h4 onClick={logout}>Logout</h4></li>
                </ul>
            </div>

        </header>

    )
}

export default Header;