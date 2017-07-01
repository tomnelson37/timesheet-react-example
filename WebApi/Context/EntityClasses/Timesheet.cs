using System;
using System.ComponentModel.DataAnnotations;
using Timesheets.Models;

namespace Timesheets.Context.EntityClasses {
    public class Timesheet {
        [Key]
        public int TimesheetId {get; set;}
        public string CandidateName {get; set;}
        public string ClientName {get; set;}
        public string JobTitle {get; set;}
        public DateTime StartDate {get; set;}
        public DateTime EndDate {get; set;}
        public PlacementType PlacementType {get; set;}
    }
}