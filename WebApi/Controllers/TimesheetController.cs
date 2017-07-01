using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Timesheets.Models;
using Timesheets.Context;
using Timesheets.Context.EntityClasses;

namespace Timesheets.Controllers
{
    [Route("api/[controller]")]
    public class TimesheetController : Controller
    {
        // GET api/Timesheet
        [HttpGet]
        public IEnumerable<TimesheetDTO> Get()
        {
            // You would inject this normally
            TimesheetContext context = new TimesheetContext();

            var timesheets = context.Timesheets.Select(x => new TimesheetDTO
            {
                CandidateName = x.CandidateName,
                ClientName = x.ClientName,
                EndDate = x.EndDate,
                PlacementType = x.PlacementType,
                JobTitle = x.JobTitle,
                StartDate = x.StartDate
            }).ToList();
            context.Dispose();
            return timesheets;
        }


        // POST api/Timesheet
        [HttpPost]
        public void Post([FromBody]TimesheetDTO timesheetDTO)
        {
            TimesheetContext context = new TimesheetContext();

            Timesheet timesheet = new Timesheet{
                CandidateName = timesheetDTO.CandidateName,
                ClientName = timesheetDTO.ClientName,
                StartDate = timesheetDTO.StartDate,
                EndDate = timesheetDTO.EndDate,
                PlacementType = timesheetDTO.PlacementType,
                JobTitle = timesheetDTO.JobTitle
            };
            context.Add(timesheet);
            context.SaveChanges();
            context.Dispose();
        }
    }
}

