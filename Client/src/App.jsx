import React from 'react'
import TimesheetForm from './TimesheetForm'
import Timesheet from './Timesheet'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showResults : false,
            timesheetInfo : {}
        }
        this.updateResults = (timesheetInfo) => {
            this.setState({
                showResults: true,
                timesheetInfo: timesheetInfo
            })
        }

        this.goBack = () => {
            this.setState({
                showResults: false
            })
        }
    }
    render() {
        return !this.state.showResults ? 
        (<TimesheetForm renderTimesheets={this.updateResults} />) : 
        (<Timesheet goBack={this.goBack} timesheets={this.state.timesheetInfo} />)
    }
}
