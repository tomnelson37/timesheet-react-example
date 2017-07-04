import React from 'react'
import getPlacementType from './getPlacementType'

const formStyle = {
    border: 'black solid 1px',
    width: '700px',
    height: '500px',
    padding: '10px',
    margin: '30px'
}

const inputStyle = {
    margin: '10px 0',
}

const submitStyle = {
    marginTop: '30px',
    backgroundColor: '#353333',
    color: 'white',
    cursor: 'pointer'
}

export default class TimesheetForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            candidateName: '',
            clientName: '',
            jobTitle: '',
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
            placementType: 'placeholder'
        }
        this.callApi = this.callApi.bind(this)

        // bind the form to react internal state
        this.candidateNameChange = (event) => this.setState({ candidateName : event.target.value })
        this.clientNameChange = (event) => this.setState({ clientName : event.target.value })
        this.jobTitleChange = (event) => this.setState({ jobTitle : event.target.value })
        this.startDateChange = (event) => this.setState({ startDate: event.target.value })
        this.endDateChange = (event) => this.setState({ endDate : event.target.value })
        this.placementTypeChange = (event) => this.setState({ placementType: event.target.value })
    }
    render() {
        return <form onSubmit={this.callApi} style={formStyle}>
                    <input style={inputStyle}  className="form-control" value={this.state.candidateName} onChange={this.candidateNameChange} placeholder="Candidate Name" type="text" maxLength="50" />
                    <input style={inputStyle} className="form-control" value={this.state.clientName} onChange={this.clientNameChange} placeholder="Client Name" type="text" maxLength="50" />
                    <input style={inputStyle} className="form-control" value={this.state.jobTitle} onChange={this.jobTitleChange} placeholder="Job Title" type="text" maxLength="50" />
                    <div className="form-group">
                     <label>Start Date</label>
                     <input style={inputStyle} className="form-control" value={this.state.startDate} onChange={this.startDateChange} type="date" />
                    </div>
                    <div className="form-group">
                     <label>End Date</label>
                     <input style={inputStyle} className="form-control" value={this.state.endDate} onChange={this.endDateChange} type="date" />
                    </div>
                    <select style={inputStyle} value={this.state.placementType} onChange={this.placementTypeChange} className="form-control">
                     <option disabled value="placeholder">Placement Type</option>
                     <option value="Weekly"> Weekly </option>
                     <option value="Monthly"> Monthly </option>
                    </select>
                    <button style={submitStyle} className="form-control" type="submit">Generate Timesheets</button>
               </form>
    }

    callApi(event) {
        event.preventDefault()
        const timesheetInformation = { 
            candidateName: this.state.candidateName,
            clientName: this.state.clientName,
            jobTitle: this.state.jobTitle,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            placementType: getPlacementType(this.state.placementType)
        }
        const promise = fetch('/api/Timesheet', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(timesheetInformation)
        })
        promise.then((response) => {
            if(response.ok) {
                response.json().then((data) => {
                    this.props.renderTimesheets(data)
                })
            } 
        })
    }
}
