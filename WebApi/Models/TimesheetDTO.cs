using System;
using System.Collections.Generic;

// This is currently identical to Timesheet.cs, but it's bad practice
// to return an entity type from a controller method, it may cause serialization issues

namespace Timesheets.Models {
    public class TimesheetDTO {
        public string CandidateName {get; set;}
        public string ClientName {get; set;}
        public string JobTitle {get; set;}
        public DateTime StartDate {get; set;}
        public DateTime EndDate {get; set;}
        public PlacementType PlacementType {get; set;}
        public List<TimesheetEntry> Timesheets {get; set;}
    }
}