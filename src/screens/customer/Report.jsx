import Header from './Header';
import '../../assets/style/style.css';
import reportingIcon from '../../assets/customer-service-svgrepo-com.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import locations from '../../data/southafrica_data.json';

function Report() {
    const navigate = useNavigate();



    const [Reporter, setReporter] = useState("")
    const [Issue, setIssue] = useState("")
    const [Location, setLocation]=useState("")
    let [SearchLocationResults, setSearchLocationResults] = useState([])

    useEffect(()=>{
        console.log(locations)
    },[])
    function handleSearchLocation(event){
        var results = []
        results = locations.filter(value=>{
            return value.name.toLocaleLowerCase().includes(event.toLocaleLowerCase())
        })
        if(results.length <= 0){
            setLocation(event)
            setSearchLocationResults([])
            return
        }
        else{
            setSearchLocationResults(results)
        }
        
    }

    function submit_issue() {
        console.log(Issue)
        navigate('/forum')
    }

    
    return (
        <div>
            <Header />
            <div className='section'>
                <div className='content'>
                    <div className='left reporting'>
                        <div className='group-form'>
                            <label>Who's detail</label>
                            <select className='form-control' onChange={(event) => setReporter(event.target.value)}>
                                <option value="" disabled selected>--- Select ---</option>
                                <option value="Reporting for myself">Reporting for myself</option>
                                <option value="Reporting for someone">Reporting for someone</option>
                            </select>
                        </div>
                        {Reporter.toLocaleLowerCase() === "Reporting for someone".toLocaleLowerCase() &&
                            <div className='group-form'>
                                <label>Their phone number</label>
                                <input type='text' className='form-control' />
                            </div>
                        }

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
                        {Issue.toLocaleLowerCase() === "Other".toLocaleLowerCase() &&
                            <div className='group-form'>
                                <label>Issue</label>
                                <input type='text' className='form-control' />
                            </div>
                        }

                        <div className='group-form'>
                            <label>Location</label>
                            <input type='text' className='form-control' name='Location' onChange={(event)=>handleSearchLocation(event.target.value)} />
                            <div className='scroll-search'>
                                {SearchLocationResults.map((data, xid) => (
                                <div className="found-search" key={xid}>
                                    {data.name}
                                </div>
                            ))}
                            </div>
                            
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
                    </div>
                    <div className='right'>
                        <img src={reportingIcon} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Report;