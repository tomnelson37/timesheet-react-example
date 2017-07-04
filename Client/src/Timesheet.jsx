import React from 'react';
import moment from 'moment';
import getPlacementType from './getPlacementType';

const dateFormat = 'dddd, MMMM Do YYYY';
const smallDateFormat = 'dd, DD/MM';

const td = {
    width: '150px',
    height: '150px',
    border: '1px solid black'
};

const container = {
    margin: '0 20%'
};

const link = {
    color: 'blue',
    textDecoration: 'underline',
    cursor: 'pointer'
};

const informationBox = {
    border: '1px black solid',
    padding: '20px',
    margin: '10px'
};

export default class Timesheet extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var date = new Date();
        var startDate = moment(this.props.timesheets.startDate).format(dateFormat);
        var endDate = moment(this.props.timesheets.endDate).format(dateFormat);
        var isWeekly = this.props.timesheets.placementType === 0;
        var timesheet = this.props.timesheets;
        return <div style={container}>
                <div style={informationBox}>
                    <h2><a style={link} onClick={this.props.goBack}>Click here to go back</a></h2>
                    <h2>Candidate: {timesheet.candidateName}</h2>
                    <h2> Client: {timesheet.clientName} </h2>
                    <h2> Job Title: {timesheet.jobTitle} </h2>
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
                             <h4> {isWeekly ? `Week ${i + 1}` : startDate.format('MMMM YYYY')}  </h4>
                             {isWeekly ? this.getWeeklyTimesheet(startDate) : this.getMonthlyTimesheet(startDate)}
                            </div>
            display.push(timesheet);
        }

        return display;
    }
    getWeeklyTimesheet(currentDate) {

        return <div>
                <table>
                 <tbody>
                 <tr>
                    <th></th>
                    <th>{ currentDate.format(smallDateFormat)}</th>
                    <th>{ currentDate.add(1, 'days').format(smallDateFormat)}</th>
                    <th>{ currentDate.add(1, 'days').format(smallDateFormat)}</th>
                    <th>{ currentDate.add(1, 'days').format(smallDateFormat)}</th>
                    <th>{ currentDate.add(1, 'days').format(smallDateFormat)}</th>
                    <th>{ currentDate.add(1, 'days').format(smallDateFormat)}</th>
                    <th>{ currentDate.add(1, 'days').format(smallDateFormat)}</th>  
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

    getMonthlyTimesheet(currentDate) {
        var weeksInMonth = Math.ceil(currentDate.daysInMonth() / 7);
        var sheets = [];
        for(let i = 0; i < weeksInMonth; i++) {
            // stop if placement has ended
            if(currentDate.toDate() > new Date(this.props.timesheets.endDate)) {
                break;
            }
            // skip if the week isn't to be included
            if(currentDate.clone().add(7, 'days').toDate() < new Date(this.props.timesheets.startDate)) {
                currentDate.add(7, 'days');
                continue;
            }
            sheets.push(this.getWeeklyTimesheet(i === 0 ? currentDate : currentDate.add(1, 'days')));
        }

        return sheets;
    }
}