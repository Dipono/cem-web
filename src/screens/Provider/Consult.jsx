import Header from './Header';
import PopUp from '../Popup';
import '../../assets/style/style.css';
import callIcon from '../../assets/call-history-svgrepo-com.svg';
import { useState } from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function Consult() {

    const CallLogs = [{name: "James", surname: "Scott", phoneNo: "0123456789", date: "12/04/2024", time: "12:23", reporter: "Myself", issue: "call", closed: false, description: "Repetitive tasks, strict performance and dealing with irate customers can lead to agent burnout and high turnover rates.", response: [{
            respondMessage: "I am going to help you", date: "12/04/2024", time: "12:40", id: "2"
        }, { respondMessage: "When are going to assist", date: "12/04/2024", time: "12:50", id: "1" },]
    },
    {name: "William", surname: "Molamo", phoneNo: "0123456789", date: "12/04/2024", time: "12:23", reporter: "Myself", issue: "call", closed: true, description: "Repetitive tasks, strict performance and dealing with irate customers can lead to agent burnout and high turnover rates.", response: [{
        respondMessage: "I am going to help you", date: "12/04/2024", time: "12:40", id: "5"
    }, { respondMessage: "When are going to assist", date: "12/04/2024", time: "12:50", id: "1" },]
},
]
    const [IsActiveLog, setIsActiveLog] = useState(true);
    const [IsCommunicationChannell, setIsCommunicationChannell] = useState(false);

    const [Response, setResponse] = useState([])
    const [CallLog, setCallLog] = useState({})
    const [CustomerId, setCustomerId] = useState("1")
    const [Myname, setMyname]= useState('Dimakatso');
    const [Mysurname, setsurMyname]= useState('Maake');

    const [Feedback, setFeedback] = useState('');

    function handleAddPopup() {
        document.body.style.overflow = 'unset';
    }

    function activeLogs() {
        setIsActiveLog(true)
    }
    function closedLogs() {
        setIsActiveLog(false)
    }

    function view_for_feedback(data) {
        setCallLog(data)
        setIsCommunicationChannell(true)
        setResponse(data.response)
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





        //set to false when submitted susccessfully
        setIsCommunicationChannell(false)
    }

    let response_popup = <>
        <h6 id='cancel-popup' onClick={() => setIsCommunicationChannell(false)}>X</h6>
        {CallLog.closed ? <><label id='status-color' style={{backgroundColor:'orange'}}></label> <label id='status'>&ensp;Closed</label></>: 
        <><label id='status-color' style={{backgroundColor:'green'}}></label> <label id='status'>&ensp;Active</label></>
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
                        <td>Reporter </td>&emsp;
                        <td><b>:&ensp;{CallLog.reporter}</b></td>
                    </tr>
                    <tr>
                        <td>Reporter </td>&emsp;
                        <td><b>:&ensp;{CallLog.issue}</b></td>
                    </tr>
                    <tr>
                        <td>Date Loged </td>&emsp;
                        <td><b>:&ensp;{CallLog.date} {CallLog.time}</b></td>
                    </tr>
                    <tr>
                        <td>Description</td>&emsp;
                        <td><b>&ensp;<textarea value={CallLog.description} disabled className='form-control' cols='50'></textarea></b></td>
                    </tr>
                </table>
            </div>
            <div id='right-respond'>
                {Response.map((respond, xid) => (
                    <div id='respond'>
                        {CustomerId === respond.id && <>
                            <labe id="initials-circle">{Myname.substring(0, 1)}{Mysurname.substring(0, 1)}</labe>
                            <br />
                            <span className='individual-respond'>{respond.respondMessage}</span><br />
                            {/* <label id='send-status'>send</label> */}
                        </>
                        }

                        {CustomerId !== respond.id && <>
                            <labe id="initials-circle">{CallLog.name.substring(0, 1)}{CallLog.surname.substring(0, 1)}</labe>
                            <br />
                            <span className='individual-respond'>{respond.respondMessage}</span><br />
                            {/* <label id='send-status'>send</label> */}
                        </>
                        }
                        {/* {CustomerId !== CallLog.id && <labe id="initials-circle">{CallLog.name.substring(0, 1)}{CallLog.surname.substring(0, 1)}</labe>} */}


                    </div>
                ))}

            </div>
        </div>
        <div className='send-respond'>
            <textarea className='form-control' onChange={(event) => setFeedback(event.target.value)}></textarea>
            <button className='btn btn-primary form-control' onClick={submit_feedback}>Send</button>
        </div>
    </>
    return (
        <div>
            <Header />
            <ToastContainer />
            <PopUp trigger={IsCommunicationChannell} setTrigger={handleAddPopup}>{response_popup}</PopUp>
            <div className='section'>
                <div id='btn-topics'>
                    <button className='btn btn-success' disabled={IsActiveLog} onClick={activeLogs}>Active Logs</button>
                    <button className='btn btn-primary' disabled={!IsActiveLog} onClick={closedLogs}>Vlosed Logs</button>
                </div>
                <div className=''>
                    <table id='customers'>
                        <thead>
                            <th>Contact No</th>
                            <th>Name and Surname</th>
                            <th>Reporter</th>
                            <th>Issue</th>
                            <th>Date and Time</th>
                            <th>Feedback</th>
                            <th>Close</th>
                        </thead>
                        <tbody>

                            {CallLogs.map((log, xid) => (
                                <tr>
                                    <td>{log.phoneNo}</td>
                                    <td>{log.name} {log.surname}</td>
                                    <td>{log.reporter}</td>
                                    <td>{log.issue}</td>
                                    <td>{log.date} {log.time}</td>
                                    <td><button className='btn btn-success form-control' onClick={() => view_for_feedback(log)}>View</button></td>
                                    <td></td>
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