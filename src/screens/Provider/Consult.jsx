import Header from './Header';
import PopUp from '../Popup';
import '../../assets/style/style.css';
import { useEffect, useState } from 'react';
import { api } from '../../data/API';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Consult() {

    const [IsActiveLog, setIsActiveLog] = useState(true);
    const [IsCommunicationChannell, setIsCommunicationChannell] = useState(false);

    const [Response, setResponse] = useState([])
    const [CallLogs, setCallLogs] = useState([])
    const [CallLog, setCallLog] = useState({})
    const [CustomerId, setCustomerId] = useState("1")

    const [AllComplains, setAllComplains] = useState([])
    const [Feedback, setFeedback] = useState('');
    const [UserId, setUserId] = useState(0);

    useEffect(() => {
        axios.get(api + "GetAllComplainList").then((respond) => {
//
            var result = respond.data.sort((a, b) => b.dateCreated.localeCompare(a.dateCreated))
            console.log(respond.data)
            setAllComplains(respond.data.sort((a, b) => b.dateCreated.localeCompare(b.dateCreated)))
            setCallLogs(result.filter(value => {
                return value.closed === false
            }))
        }, err => {
            console.log(err)
        })

    }, [])

    //

    function handleAddPopup() {
        document.body.style.overflow = 'unset';
    }

    function activeLogs() {
        setCallLogs(AllComplains.filter(value => {
            return value.closed === false
        }))
        setIsActiveLog(true)
    }
    function closedLogs() {
        setCallLogs(AllComplains.filter(value => {
            return value.closed === true
        }))
        setIsActiveLog(false)
    }

    function view_for_feedback(data) {
        console.log(data)
        console.log(Number(localStorage.getItem('user_id')))
        setCallLog(data)
        var data = {
            ComplainId: data.id
        }
        axios.post(api + "UserComplainResponseListByUserId", data).then((respond) => {
            console.log(respond.data)
            setResponse(respond.data);
        }, err => {
            console.log(err)
        })
        console.log(data)
        setIsCommunicationChannell(true)
        //setResponse(data.response)
    }

    function close_log(event) {
        axios.post(api + "UpdateClosedLog", event).then((respond) => {
            console.log(respond.data)
            toast.success("Query has been resolved", {
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

    function submit_feedback() {
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

        var data = {
            UserId: UserId,
            Respond: Feedback,
            ComplainId: CallLog.complainId
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



        //set to false when submitted susccessfully
        setIsCommunicationChannell(false)
    }

    let response_popup = <>
        <h6 id='cancel-popup' onClick={() => setIsCommunicationChannell(false)}>X</h6>
        {CallLog.closed ? <><label id='status-color' style={{ backgroundColor: 'orange' }}></label> <label id='status'>&ensp;Closed</label></> :
            <><label id='status-color' style={{ backgroundColor: 'green' }}></label> <label id='status'>&ensp;Active</label></>
        }


        <div id='response-popup'>
            <div id='left-respond'>
                <table>
                    <tr>
                        <td>Full Name </td>&emsp;
                        <td><b>:&ensp;{CallLog.name} {CallLog.surname}</b></td>
                    </tr>
                    <tr>
                        <td>Phone Number </td>&emsp;
                        <td><b>:&ensp;{CallLog.phoneNo}</b></td>
                    </tr>
                    <tr>
                        <td>Subject </td>&emsp;
                        <td><b>:&ensp;{CallLog.subject}</b></td>
                    </tr>
                    <tr>
                        <td>Description</td>&emsp;
                        <td><b>&ensp;<textarea value={CallLog.subjectDescription} disabled rows="10" className='form-control' cols='50'></textarea></b></td>
                    </tr>
                </table>
            </div>
            <div id='right-respond'>
                {Response.length > 0 && <>
                    {Response.map((respond, xid) => (
                        <div id='respond'>
                            {UserId === respond.userId && <>
                                <labe id="initials-circle">You</labe>
                                <br />
                                <span className='individual-respond'>{respond.respond}</span><br />
                                {/* <label id='send-status'>send</label> */}
                            </>
                            }

                            {UserId !== respond.userId && <>
                                <labe id="initials-circle">{CallLog.name}</labe>
                                <br />
                                <span className='individual-respond'>{respond.respond}</span><br />
                                {/* <label id='send-status'>send</label> */}
                            </>

                            }
                            {/* {CustomerId !== CallLog.id && <labe id="initials-circle">{CallLog.name.substring(0, 1)}{CallLog.surname.substring(0, 1)}</labe>} */}


                        </div>
                    ))}

                </>}

            </div>
        </div>
        {!CallLog.closed ? 
        <div className='send-respond'>
            <textarea className='form-control' onChange={(event) => setFeedback(event.target.value)}></textarea>
            <button className='btn btn-primary form-control' onClick={submit_feedback}>Send</button>
        </div>:""}
    </>
    return (
        <div>
            <Header />
            <ToastContainer />
            <PopUp trigger={IsCommunicationChannell} setTrigger={handleAddPopup}>{response_popup}</PopUp>
            <div className='section'>
                <div id='btn-topics'>
                    <button className='btn btn-success' disabled={IsActiveLog} onClick={activeLogs}>Active Logs</button>
                    <button className='btn btn-primary' disabled={!IsActiveLog} onClick={closedLogs}>Closed Logs</button>
                </div>
                <div className=''>
                    <table id='customers'>
                        <thead>
                            <th>Contact No</th>
                            <th>Name and Surname</th>
                            <th>Date and Time</th>
                            <th>Issue</th>
                            <th>Description</th>
                            <th>Feedback</th>
                            <th hidden={!IsActiveLog}>Active</th>
                        </thead>
                        <tbody>

                            {CallLogs.map((log, xid) => (
                                <tr key={xid}>
                                    <td>{log.phoneNo}</td>
                                    <td style={{ width: "15%" }}>{log.name} {log.surname}</td>
                                    <td style={{ width: "15%" }}>{log.dateCreated.substring(0, 10)} {log.dateCreated.substring(11, 16)}</td>
                                    <td>{log.subject}</td>
                                    <td style={{ width: "30%" }}>{log.subjectDescription}</td>
                                    <td><button className='btn btn-success form-control' onClick={() => view_for_feedback(log)}>View</button></td>
                                    {log.satisfied ? <td hidden={log.closed}><button className='btn btn-success form-control' onClick={() => close_log(log)} >Close</button></td> : ''}
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
                {/* <div className='right'>
                        <img src={callIcon} alt="call Icon" />
                    </div> */}

            </div>

        </div>
    )
}

export default Consult;