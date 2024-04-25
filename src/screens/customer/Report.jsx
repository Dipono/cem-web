import Header from './Header';
import PopUp from '../Popup';
import '../../assets/style/style.css';
import reportingIcon from '../../assets/customer-service-svgrepo-com.svg';
import { useEffect, useState } from 'react';
import locations from '../../data/southafrica_data.json';
import { api } from '../../data/API';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Report() {
    const [ComplainDescription, setComplainDescription] = useState("")
    const [Issue, setIssue] = useState("")
    const [Location, setLocation] = useState("")
    const [Locations, setLocations] = useState([])
    let [Complains, setComplains] = useState([])
    let [IndividualComplain, setIndividualComplain] = useState([])
    let [ComplainRespond, setComplainRespond] = useState([])
    const [Feedback, setFeedback] = useState('');
    const [IsCommunicationChannell, setIsCommunicationChannell] = useState(false);
    const [UpdateForSatisfied, setUpdateForSatisfied] = useState(false);

    const [Name, setName] = useState('')
    const [IsLocked, setIsLocked] = useState(false)


    const [UserId, setUserId] = useState(0);

    useEffect(() => {
        setLocations(locations.sort((a, b) => a.name.localeCompare(b.name)))
        
        setName(JSON.parse(localStorage.getItem('user_name')))
        setUserId(Number(localStorage.getItem('user_id')))
        var data = {
            UserId: Number(localStorage.getItem('user_id'))
        }

        axios.post(api + "ComplainListByUserId", data).then((respond) => {
            if (respond.data.length > 0) {
                console.log(respond.data)
                setComplains(respond.data.sort((a, b) => b.date.localeCompare(a.date)));
            }
            else {
                setComplains([]);
            }
        }, err => {
            console.log(err)
        })

    }, [])

    function handleAddPopup() {
        document.body.style.overflow = 'unset';
    }

    function submit_issue() {

        var data = {
            UserId: Number(localStorage.getItem('user_id')),
            Location: Location,
            Subject: Issue,
            ComplainDescription: ComplainDescription
        }

        axios.post(api + "AddComplain", data).then((respond) => {
            if (respond.data.success) {
                toast.success(respond.data.message, {
                    position: "top-center",
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

    function view_chat(data) {
        setIndividualComplain(data)
        setUpdateForSatisfied(data.satisfied)
        setIsLocked(data.satisfied)

        console.log(data)
        var data = {
            ComplainId: data.id
        }

        axios.post(api + "UserComplainResponseListByUserId", data).then((respond) => {
            console.log(respond.data)
            setComplainRespond(respond.data);
            setIsCommunicationChannell(true)
        }, err => {
            console.log(err)
        })
        //()
        //
    }

    function submit_feedback() {
        var data = {
            UserId: UserId,
            Respond: Feedback,
            Id: IndividualComplain.id,
            ComplainId: IndividualComplain.id
        }
        console.log(IndividualComplain)

        if (UpdateForSatisfied === true) {
            //update customer sertisfaction
            axios.post(api + "UpdateCustomerSatisfaction", data).then((respond) => {
                console.log(respond.data)
                toast.success("Sent successfully", {
                    position: "top-center",
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
            }, err => {
                console.log(err)
            })


        }
        else {
            
            if (Feedback === '') {
                toast.warn("You cannot submit empty fields", {
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

            axios.post(api + "AddRespond", data).then((respond) => {
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
        }, err => {
            console.log(err)
        })

        }


        //set to false when submitted susccessfully
        setIsCommunicationChannell(false)
    }

    let response_popup = <>
        <h6 id='cancel-popup' onClick={() => setIsCommunicationChannell(false)}>X</h6>
        {IndividualComplain.closed ? <><label id='status-color' style={{ backgroundColor: 'orange' }}></label> <label id='status'>&ensp;Closed</label></> :
            <><label id='status-color' style={{ backgroundColor: 'green' }}></label> <label id='status'>&ensp;Active</label></>
        }
        <div id='response-popup'>
            <div id='left-respond'>
                <table>
                    <tr>
                        <td>Issue </td>&emsp;
                        <td><b>:&ensp;{IndividualComplain.subject}</b></td>
                    </tr>
                    {/* <tr>
                        <td>Date Loged </td>&emsp;
                        <td><b>:&ensp;{IndividualComplain.date.substring(0, 10)}</b></td>
                    </tr> */}
                    <tr>
                        <td>Description</td>&emsp;
                        <td><b>&ensp;<textarea value={IndividualComplain.complainDescription} disabled className='form-control' rows="10" cols='50'></textarea></b></td>
                    </tr>
                </table>
                <div className="mb-3 form-group-confimation">
                    <label>Are you satisfied?
                        <input type="checkbox" style={{ margin: '15px', height: '15px', width: '15px' }} disabled={IsLocked}
                            onChange={(event) => setUpdateForSatisfied(event.target.checked)} /></label>
                </div>
            </div>
            <div id='right-respond'>
                <div className='communication'>
                    {ComplainRespond.length > 0 && <>
                        {ComplainRespond.map((respond, xid) => (
                            <div id='respond' key={xid}>
                                {UserId === respond.id && <>
                                    <labe id="initials-circle">You</labe>
                                    <br />
                                    <span className='individual-respond'>{respond.respond}</span><br />
                                    {/* <label id='send-status'>send</label> */}
                                </>
                                }

                                {UserId !== respond.id && <>
                                    <labe id="initials-circle">Admin</labe>
                                    <br />
                                    <span className='individual-respond'>{respond.respond}</span><br />
                                    {/* <label id='send-status'>send</label> */}
                                </>
                                }
                                {/* {CustomerId !== IndividualComplain.id && <labe id="initials-circle">{IndividualComplain.name.substring(0, 1)}{IndividualComplain.surname.substring(0, 1)}</labe>} */}


                            </div>
                        ))}
                    </>}


                </div>

            </div>
        </div>
        <div className='send-respond'>
            <textarea className='form-control' disabled={UpdateForSatisfied} onChange={(event) => setFeedback(event.target.value)}></textarea>
            <button className='btn btn-primary form-control' onClick={submit_feedback} disabled={IsLocked}>Send</button>
        </div>
    </>

    return (
        <div>
            <Header />
            <ToastContainer />
            <PopUp trigger={IsCommunicationChannell} setTrigger={handleAddPopup}>{response_popup}</PopUp>
            <div className='section'>
                <div className='content'>
                    <div className='left reporting'>
                        {/* <div className='group-form'>
                            <label>Who's detail</label>
                            <select className='form-control' onChange={(event) => setReporter(event.target.value)}>
                                <option value="" disabled selected>--- Select ---</option>
                                <option value="Reporting for myself">Reporting for myself</option>
                                <option value="Reporting for someone">Reporting for someone</option>
                            </select>
                        </div> */}
                        {/* {Reporter.toLocaleLowerCase() === "Reporting for someone".toLocaleLowerCase() &&
                            <div className='group-form'>
                                <label>Their phone number</label>
                                <input type='text' className='form-control' />
                            </div>
                        } */}

                        <div className='group-form'>
                            <label>What might be an issue</label>
                            <select className='form-control' onChange={(event) => setIssue(event.target.value)}>
                                <option value="" disabled selected>--- Select ---</option>
                                <option value="Signal" >Signal</option>
                                <option value="Call" >Call</option>
                                <option value="Recharge" >Recharge</option>
                                <option value="Sim card blocked" >Sim card blocked</option>
                                <option value="Other" >Others</option>
                            </select>
                        </div>
                        {/* {Issue.toLocaleLowerCase() === "Other".toLocaleLowerCase() &&
                            <div className='group-form'>
                                <label>Issue</label>
                                <input type='text' className='form-control'  onChange={(event) => setIssue(event.target.value)}/>
                            </div>
                        } */}

                        <div className='group-form'>
                            <label>Description</label>
                            <textarea className='form-control' rows="10" onChange={(event) => setComplainDescription(event.target.value)}></textarea>
                        </div>

                        <div className='group-form'>
                            <label>Location</label>
                            {/* <input type='text' className='form-control' value={Location} name='Location' onChange={(event) => handleSearchLocation(event.target.value)} /> */}
                            <select className='form-control' onChange={(event) => setLocation(event.target.value)}>
                                <option value="" disabled selected>Please select location</option>
                                {locations.map((data, xid) => (
                                    <option key={xid} value={data.name}>{data.name}</option>

                                ))}
                            </select>

                        </div>

                        {/* <div className='group-form attandance-option'>
                            <label className='label-attend'>Are you going to attande</label>
                            <span>
                                <label><input type='radio' name='attand' value='true' onChange={() => setIsAttand(true)} /> Yes</label>
                                <label><input type='radio' name='attand' value='false' onChange={() => setIsAttand(false)} /> No</label>
                            </span>
                        </div> */}
                        <div className='group-form'>
                            <button onClick={submit_issue} className='btn btn-primary'>Submit</button>
                        </div>
                        <table id='customers'>
                            <thead>
                                <th>Date</th>
                                <th>Location</th>
                                <th>Issue</th>
                                <th style={{ width: '50%' }}>Description</th>
                                <th>Satisfied</th>
                                <th>Active</th>
                                <th>View</th>
                            </thead>
                            <tbody>

                                {Complains.map((complain, xid) => (
                                    <tr key={xid} >
                                        <td>{complain.date.substring(0, 10)}</td>
                                        <td>{complain.location}</td>
                                        <td>{complain.subject}</td>
                                        <td>{complain.complainDescription}</td>
                                        <td>{complain.satisfied ? <label>Yes</label> : <label>No</label>}</td>
                                        <td>{!complain.closed ? <label>Yes</label> : <label>No</label>}</td>
                                        {/* <td><button className='btn btn-primary' onClick={() => view_chat(complain)} disabled={complain.closed}>View</button></td> */}
                                        <td><button className='btn btn-primary' onClick={() => view_chat(complain)}>View</button></td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className='right'>
                        <img src={reportingIcon} alt="" />
                        <h5>Hi {Name}, how can we help you?</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Report;