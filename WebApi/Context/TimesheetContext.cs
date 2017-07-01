using Microsoft.EntityFrameworkCore;
using Timesheets.Context.EntityClasses;

namespace Timesheets.Context {
    public class TimesheetContext : DbContext {
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=master;Trusted_Connection=True;");
    }  
        public DbSet<Timesheet> Timesheets {get; set;}
    }
}