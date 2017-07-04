using System;
using System.Collections.Generic;
using Timesheets.Models;

namespace Timesheets.Services {

    public class TimesheetDateCalculator {

        private readonly PlacementType type;
        private readonly DateTime startDate;
        private readonly DateTime endDate;
        private readonly DayOfWeek calendarStartDay;

        public TimesheetDateCalculator(PlacementType type, DateTime startDate, DateTime endDate, DayOfWeek calendarStartDay) {
            this.type = type;
            this.startDate = startDate;
            this.endDate = endDate;
            this.calendarStartDay = calendarStartDay;
        }

        public List<TimesheetEntry> GetTimesheets() {
            List<TimesheetEntry> timesheets = new List<TimesheetEntry>();
            if(type == PlacementType.Monthly) {
                int currentMonth = startDate.Month;
                int currentYear = startDate.Year;
                int endMonth = endDate.Month;
                int endYear = endDate.Year;
                while(currentYear < endYear || (currentYear == endYear && currentMonth <= endMonth)) {
                    timesheets.Add(GenerateMonthlyTimesheet(currentMonth, currentYear));
                    if(currentMonth == 12) {
                        currentMonth = 1;
                        currentYear += 1;
                    } else {
                        currentMonth += 1;
                    }
                }
            }
            else if(type == PlacementType.Weekly) {
                DateTime currentDate = startDate;
                while(true) {
                    var timesheet = GenerateWeeklyTimesheet(currentDate);
                    timesheets.Add(timesheet);

                    currentDate = currentDate.AddDays(7);
                    if (endDate < timesheet.EndDate)
                    {
                        break;
                    }
                }
            }

            return timesheets;
        }

        private TimesheetEntry GenerateMonthlyTimesheet(int month, int year) {
            int daysInMonth = DateTime.DaysInMonth(year, month);
            return new TimesheetEntry {
                StartDate = new DateTime(year, month, 1),
                EndDate = new DateTime(year, month, daysInMonth)
            };
        }

        private TimesheetEntry GenerateWeeklyTimesheet(DateTime startDate) {
            DayOfWeek currentDay = startDate.DayOfWeek;
            int daysUntilWeekBegin = ((int) currentDay - (int) calendarStartDay + 7) % 7;
            TimesheetEntry entry = new TimesheetEntry
            {
                StartDate = startDate.AddDays(-daysUntilWeekBegin)
            };
            entry.EndDate = entry.StartDate.AddDays(6);
            return entry;
        }
    }
}