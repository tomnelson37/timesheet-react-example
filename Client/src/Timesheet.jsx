import React from 'react'
import moment from 'moment'
import getPlacementType from './getPlacementType'

const dateFormat = 'dddd, MMMM Do YYYY';
const smallDateFormat = 'dd, DD/MM'

const td = {
    width: '150px',
    height: '150px',
    border: '1px solid black'
}

const container = {
    margin: '0 20%'
}

const link = {
    color: 'blue',
    textDecoration: 'underline',
    cursor: 'pointer'
}

const informationBox = {
    border: '1px black solid',
    padding: '20px',
    margin: '10px'
}
export default class Timesheet extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        var date = new Date();
        var startDate = moment(this.props.timesheets.startDate).format(dateFormat);
        var endDate = moment(this.props.timesheets.endDate).format(dateFormat);
        var isWeekly = this.props.timesheets.placementType === 0;

        return <div style={container}>
                <div style={informationBox}>
                    <h2><a style={link} onClick={this.props.goBack}>Click here to go back</a></h2>
                    <h2>Candidate: {this.props.candidateName}</h2>
                    <h2> Client: {this.props.clientName} </h2>
                    <h2> Job Title: {this.props.jobTitle} </h2>
                    <h3> Start Date : {startDate} </h3> 
                    <h3> End Date : {endDate} </h3>
                </div>
                {this.getTimesheets(isWeekly)}
              </div>
    }

    getTimesheets(isWeekly) {
        var display = [];
        var timesheets = this.props.timesheets.timesheets;
        for(let i = 0; i < timesheets.length; i++) {
            var startDate = moment(timesheets[i].startDate);
            var endDate = moment(timesheets[i].endDate);
            var timesheet = <div>
                             <h4> {isWeekly ? 'Week' : 'Month'} {i + 1} </h4>
                             <h5> Start Date : {startDate.format(dateFormat)} </h5>
                             <h5> End Date : {endDate.format(dateFormat)} </h5>
                             {isWeekly ? this.getWeeklyTimesheet(startDate) : this.getMonthlyTimesheet(startDate)}
                            </div>
            display.push(timesheet);
        }

        return display;
    }
    getWeeklyTimesheet(startDate) {

        return <div>
                <table>
                 <tbody>
                 <tr>
                    <th></th>
                    <th>{startDate.format(smallDateFormat)}</th>
                    <th>{startDate.add(1, 'days').format(smallDateFormat)}</th>
                    <th>{startDate.add(1, 'days').format(smallDateFormat)}</th>
                    <th>{startDate.add(1, 'days').format(smallDateFormat)}</th>
                    <th>{startDate.add(1, 'days').format(smallDateFormat)}</th>
                    <th>{startDate.add(1, 'days').format(smallDateFormat)}</th>
                    <th>{startDate.add(1, 'days').format(smallDateFormat)}</th>  
                 </tr>
                 <tr>
                   <td style={td}>Morning</td><td style={td}></td><td style={td}></td><td style={td}></td><td style={td}></td><td style={td}></td><td style={td}></td><td style={td}></td>
                 </tr> 
                 <tr>
                  <td style={td}>Afternoon</td><td style={td}></td><td style={td}></td><td style={td}></td><td style={td}></td><td style={td}></td><td style={td}></td><td style={td}></td>
                 </tr>
                 </tbody> 
                </table>
               </div>
    }

    getMonthlyTimesheet(startDate) {
        var weeksInMonth = Math.ceil(startDate.daysInMonth() / 7)
        var sheets = [];
        for(let i = 0; i < weeksInMonth; i++) {
            // stop if placement has ended
            if(startDate.toDate() > new Date(this.props.timesheets.endDate)) {
                break;
            }
            // mutating the moment object...
            sheets.push(this.getWeeklyTimesheet(i === 0 ? startDate : startDate.add(1, 'days')))
        }
        console.log(sheets)
        return sheets
    }
}