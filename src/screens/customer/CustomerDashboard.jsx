import Header from './Header';
import '../../assets/style/style.css';

import { Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { CChart } from '@coreui/react-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend);
function CustomerDashboard() {

    const label = ["2017", "2018", "2019", "2020", "2021", "2022", "2023"];
    const data_value = [10, 20, 10, 20, 5, 25, 10];
    const colors = ["red", "blue", "black", "orange", "grey", "purple"]
    const data_per_year = {
        labels: label.map(value => { return value }),
        datasets: [{
            data: data_value.map(value => { return value }),
            backgroundColor: colors.map(value => { return value })
        }]
    }

    const issueLabel = ["Signal", "Call", "Recharge", "Other"]
    const issue_data_value = [10, 25, 25, 40];
    const issues_data_per_year = {
        labels: issueLabel.map(value => { return value }),
        datasets: [{
            data: issue_data_value.map(value => { return value }),
            backgroundColor: colors.map(value => { return value })
        }]
    }

    function issue_year_selected(year) {

    }

    function year_selected(year) {

    }

    return (
        <div>
            <Header />
            <div className='section'>
                <div className='summary-dash'>
                    <div className='label-header'>
                        <h3>Reported Issues(%) VS Issue Types</h3>
                        <select onChange={(event) => issue_year_selected(event.target.value)}>
                            <option disabled selected value="">Select year you wish to view</option>
                            {label.map((year, xid) => (
                                <option value={year} key={xid}>{year}</option>
                            ))}
                        </select>
                    </div>
                    <div className='visualization'>

                        <div className='pie-display'>
                            <Pie data={issues_data_per_year} />
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
                                            data: issue_data_value.map(value => { return value }),
                                        },
                                    ],
                                }}
                                labels="Reported Issues(%) VS Issue Types"
                            />
                        </div>

                    </div>

                </div>

                <div className='summary-dash'>
                    <div className='label-header'>
                        <h3>Reported(%) VS Years/Months</h3>
                        <select onChange={(event) => year_selected(event.target.value)}>
                            <option disabled selected value="">Select year you wish to view</option>
                            {label.map((year, xid) => (
                                <option value={year} key={xid}>{year}</option>
                            ))}
                        </select>
                    </div>

                    <div className='visualization'>

                        <div className='pie-display'>
                            <Pie data={data_per_year} />
                        </div>
                        <div className='bar-graph'>
                            <CChart
                                type="bar"
                                data={{
                                    labels: label.map(value => { return value }),
                                    datasets: [
                                        {
                                            label: "Reported(%) VS Years/Months",
                                            backgroundColor: colors.map(value => { return value }),
                                            data: data_value.map(value => { return value }),
                                        },
                                    ],
                                }}
                                labels="Reported(%) VS Years/Months"
                            />
                        </div>

                    </div>
                </div>


            </div>

        </div>
    )
}

export default CustomerDashboard;