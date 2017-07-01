using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Timesheets.Context;
using Timesheets.Models;

namespace Timesheets.Migrations
{
    [DbContext(typeof(TimesheetContext))]
    [Migration("20170701153527_InitialMigration")]
    partial class InitialMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Timesheets.Context.EntityClasses.Timesheet", b =>
                {
                    b.Property<int>("TimesheetId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CandidateName");

                    b.Property<string>("ClientName");

                    b.Property<DateTime>("EndDate");

                    b.Property<string>("JobTitle");

                    b.Property<int>("PlacementType");

                    b.Property<DateTime>("StartDate");

                    b.HasKey("TimesheetId");

                    b.ToTable("Timesheets");
                });
        }
    }
}
