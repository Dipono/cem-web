import '../assets/style/style.css';
import PopUp from './Popup';
import { api } from '../data/API'
import { EmailAPI } from '../data/APIEmailOTP'
import HomeHeader from './HomeHeader';

import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';


function Home() {
    const navigate = useNavigate();
    const [IsLogin, setIsLogin] = useState(true);
    const [SendOTP, setSendOTP] = useState(false);
    const [ForgotPassword, setForgotPassword] = useState(false);

    const [OTPCode, setOTPCode] = useState('');
    const [EnterOTPCode, setEnterOTPCode] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [Surname, setSurname] = useState('');
    const [Email, setEmail] = useState('');
    const [Name, setName] = useState('')
    const [PhoneNo, setPhoneNo] = useState('')

    function handleAddPopup() {
        document.body.style.overflow = 'unset';
    }

    const submitLogin = () => {

        if (Email === "" && Password === "") {
            toast.warn("Please enter both phone number and password", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (Email === "") {
            toast.warn("Please enter phone number", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (Password === "") {
            toast.warn("Please enter password", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        var data = {
            email: Email,
            password: Password
        }

        axios.post(api + "Login", data).then((respond) => {
            if (respond.data.success) {
                console.log(respond.data.results)
                localStorage.setItem('user_id', JSON.stringify(respond.data.results.id))
                localStorage.setItem('user_name', JSON.stringify(respond.data.results.surname))
                localStorage.setItem('user_email', JSON.stringify(respond.data.results.email))
                localStorage.setItem('user_role', JSON.stringify(respond.data.results.role))
                localStorage.setItem('user_phoneNo', JSON.stringify(respond.data.results.phoneNo))
                if (respond.data.results.role === "customer") {
                    navigate('/report')
                }
                else {
                    navigate('/consult')
                }
            }
            else {
                toast.error(respond.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }, err => {
            console.log(err)
        })
    }

    const submitRegister = () => {

        if (Name === "") {
            toast.warn("Please enter name", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (Surname === "") {
            toast.warn("Please enter surname", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (Email === "") {
            toast.warn("Please enter email", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (PhoneNo === "") {
            toast.warn("Please enter mobile number", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (Password === "") {
            toast.warn("Please enter password", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (ConfirmPassword === "") {
            toast.warn("Please enter password confirmation", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (Password !== ConfirmPassword) {
            toast.warn("Passwords do not match!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        var regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if (!Password.match(regPass)) {
            toast.warn("Enter a strong password!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            return;
        }

        var validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!Email.match(validEmail)) {
            toast.warn("Enter a valid email address!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        var random = Math.floor(100000 + Math.random() * 900000);
        var data = {
            email: Email,
            otp: random
        }
        console.log(data)

        axios.post(EmailAPI, data).then(respond => {
            if (!respond.data.success) {
                toast.warn(respond.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;
            }
        }, err => {
            console.log(err)
        })

        setSendOTP(true)
        setOTPCode(random);
        console.log(random)
    }

    function forgetPassword() {
        if (Email === "") {
            toast.warn("Please enter email", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (Password === "") {
            toast.warn("Please enter password", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (ConfirmPassword === "") {
            toast.warn("Please enter password confirmation", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (Password !== ConfirmPassword) {
            toast.warn("Passwords do not match!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        var regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if (!Password.match(regPass)) {
            toast.warn("Enter a strong password!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        axios.get(api + "CheckExistingEmail/" + Email).then(found => {
            if (found.data) {
                axios.post(EmailAPI, data).then(respond => {
                    if (!respond.data.success) {
                        toast.warn(respond.data.message, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }

                }, err => {
                    console.log(err)
                })
                setOTPCode(random);
                setSendOTP(true)
            }
            else {
                toast.warn("Cannot find the email...", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;
            }
        })

        var random = Math.floor(100000 + Math.random() * 900000);
        var data = {
            email: Email,
            otp: random
        }


    }

    function confirmOTP() {



        if (Number(OTPCode) !== Number(EnterOTPCode)) {
            toast.error("Incorrect OTP number entered", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        var registerAlumni = {
            Name: Name,
            Surname: Surname,
            Email: Email,
            Password: Password,
            PhoneNo: PhoneNo
        }

        if (ForgotPassword) {
            axios.post(api + "ChangePassword", registerAlumni).then(respond => {
                if (respond.data) {
                    toast.success("Successfully changed password", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 5000)

                }
            })
            return
        }

        axios.post(api + "Register", registerAlumni).then(respond => {
            if (respond.data.success) {
                toast.success(respond.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                setTimeout(() => {
                    window.location.reload();
                }, 5000)
            }
            else {
                toast.error(respond.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;
            }
        })
        setSendOTP(false)
        setIsLogin(true)
    }

    let otp_popup = <>
        <h6 id='cancel-popup' onClick={() => setSendOTP(false)}>X</h6>
        <div id='otp-popup'>
            <p>We've send you an SMS code.</p>
            <p>To complete the verification plrocess please enter the 6 digit code below</p>
            <input type='tel' onChange={(event) => setEnterOTPCode(event.target.value)} /><br /><br />
            <button className='btn btn-primary form-control' onClick={confirmOTP}>Cornfirm OTP</button>
        </div>
    </>

    let loginPop =
        <div class="loginregistration">
            {IsLogin && <div class="">
                <h2>Login</h2>
                <div class="form-group">
                    <label>Email address</label>
                    <input type="text" className="form-control" onChange={(event) => setEmail(event.target.value)} placeholder="email address" required />
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" onChange={(event) => setPassword(event.target.value)} placeholder="password" required />
                </div>
                <div class="remember-forgot">
                    <label>Forgot Password? <span onClick={() => setForgotPassword(true)} class="auth_label">here</span></label>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" onClick={submitLogin}>Login</button>
                </div>

                <div class="login-register">
                    <label>Don't have an account? <span onClick={() => setIsLogin(false)} class="auth_label">Register</span></label>
                </div>
            </div>}
            {!IsLogin && <div class="">
                <h2>Registration</h2>
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" onChange={(event) => setName(event.target.value)} placeholder="Fullname" />
                </div>
                <div class="form-group">
                    <label>Surname</label>
                    <input type="text" className="form-control" onChange={(event) => setSurname(event.target.value)} placeholder="Surname" />
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" onChange={(event) => setEmail(event.target.value)} placeholder="Email" />
                </div>
                <div class="form-group">
                    <label>Mobile Number</label>
                    <input type="email" className="form-control" onChange={(event) => setPhoneNo(event.target.value)} placeholder="Phone Number" />
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
                </div>
                <div class="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Password" />
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" type="submit" onClick={submitRegister}>Register</button>
                </div>
                <div class="login-register">
                    <label>Already have an account? <span onClick={() => setIsLogin(true)} class="auth_label">Login</span></label>
                </div>
            </div>}
        </div>

    let forgot_password = <div class="loginregistration">
        <div class="">
            <h2>Forgot password</h2>
            <div class="form-group">
                <label>Email address</label>
                <input type="text" className="form-control" onChange={(event) => setEmail(event.target.value)} placeholder="email address" required />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" className="form-control" onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
            </div>
            <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" className="form-control" onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Password" />
            </div>
            <div class="remember-forgot">
                <label>Login <span onClick={() => setForgotPassword(false)} class="auth_label">here</span></label>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" type="submit" onClick={forgetPassword}>Reset</button>
            </div>
        </div>

    </div>
    return (
        <div>
            <HomeHeader />
            <ToastContainer />
            <PopUp trigger={SendOTP} setTrigger={handleAddPopup}>{otp_popup}</PopUp>

            <div className='header'>
                {/* <Header /> */}
            </div>
            {!ForgotPassword ? <>{loginPop}</> : <>{forgot_password}</>}

        </div>
    )
}

export default Home;