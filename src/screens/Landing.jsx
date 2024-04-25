import HomeHeader from './HomeHeader';
import '../assets/style/style.css';
import { api } from '../data/API';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { CChart } from '@coreui/react-chartjs'
import { useEffect, useState } from 'react';
ChartJS.register(ArcElement, Tooltip, Legend);
function ProviderSash() {
    const [Analytics, setAnalytics] = useState([]);
    const [YearAnalytics, setYearAnalytics] = useState([]);

    const [YearLabel, setYearLabel] = useState([]);
    const colors = ["red", "blue", "black", "orange", "grey", "purple"]

    // year data reported type
    const data_per_year = {
        labels: Analytics.map(value => { return value.NameType }),
        datasets: [{
            data: Analytics.map(value => { return value.ResultCount }),
            backgroundColor: colors.map(value => { return value })
        }]
    }

    // data reported in years/months
    const issueLabel = ["Signal", "Call", "Recharge", "Other"]
    const issue_data_value = [10, 25, 25, 40];
    const issues_data_per_year = {
        labels: YearAnalytics.map(value => { return value.NameType }),
        datasets: [{
            data: YearAnalytics.map(value => { return value.ResultCount }),
            backgroundColor: colors.map(value => { return value })
        }]
    }

    useEffect(() => {
        //Reported Issues(%) VS Issue Types
        axios.get(api + "GetAnalytics").then((respond) => {
            if (respond.data.Success) {
                console.log(respond.data.Results)

                setAnalytics(respond.data.Results)
            }
            else{
                
            }
        }, err => {
            console.log(err)
        })

        // Reported(%) VS Years
        axios.get(api + "GetAnalyticsInYears").then((respond) => {
            if (respond.data.Success) {
                console.log(respond.data.Results)

                setYearAnalytics(respond.data.Results)
            }
        }, err => {
            console.log(err)
        })

        var start = 2020;
        var date = new Date();
        var currentYear = date.getFullYear();
        var yearArray = [];
        for (var k = start; k <= currentYear; k++) {
            yearArray.push(k.toString())
        }
        setYearLabel(yearArray)


    }, [])

    function issue_year_selected(year) {
        console.log(year)
        axios.get(api + "GetAnalyticsByYear/"+Number(year)).then((respond) => {
            if (respond.data.Success) {
                console.log(respond.data.Results)
                setAnalytics(respond.data.Results)
            }
            else{
                setAnalytics([])
            }
        }, err => {
            console.log(err)
        })
    }

    
    return (
        <div>
            <HomeHeader />
            <div className='section'>
                <div className='summary-dash'>
                    <div className='label-header'>
                        <h3>Reported Issues(%) VS Issue Types</h3>
                        <select onChange={(event) => issue_year_selected(event.target.value)}>
                            <option disabled selected value="">Select year you wish to view</option>
                            {YearLabel.map((year, xid) => (
                                <option value={year} key={xid}>{year}</option>
                            ))}
                        </select>
                    </div>
                    {Analytics.length > 0 ?<div className='visualization'>

                        <div className='pie-display'>
                        <Pie data={data_per_year} />

                        </div>
                        <div className='bar-graph'>
                            <CChart
                                type="bar"
                                data={{
                                    labels: issueLabel.map(value => { return value }),
                                    datasets: [
                                        {
                                            label: "Reported Issues(%) VS Issue Types",
                                            backgroundColor: colors.map(value => { return value }),
                                            data: Analytics.map(value => { return value.ResultCount }),
                                        },
                                    ],
                                }}
                                labels="Reported Issues(%) VS Issue Types"
                            />
                        </div>

                    </div>: <div><h1>No data found</h1></div>}
                    

                </div>

                <div className='summary-dash'>
                    <div className='label-header'>
                        <h3>Reported(%) VS Years</h3>
                        
                    </div>
                    {YearAnalytics.length > 0 ? <div className='visualization'>

                        <div className='pie-display'>
                            <Pie data={issues_data_per_year} />

                        </div>
                        <div className='bar-graph'>
                            <CChart
                                type="bar"
                                data={{
                                    labels: YearAnalytics.map(value => { return value.NameType }),
                                    datasets: [
                                        {
                                            label: "Reported(%) VS Years/Months",
                                            backgroundColor: colors.map(value => { return value }),
                                            data: YearAnalytics.map(value => { return value.ResultCount }),
                                        },
                                    ],
                                }}
                                labels="Reported(%) VS Years/Months"
                            />
                        </div>

                    </div>: <h2>Data not found</h2>}
                    
                </div>


            </div>

        </div>
    )
}

export default ProviderSash;