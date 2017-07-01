using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Timesheets.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Timesheets",
                columns: table => new
                {
                    TimesheetId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CandidateName = table.Column<string>(nullable: true),
                    ClientName = table.Column<string>(nullable: true),
                    EndDate = table.Column<DateTime>(nullable: false),
                    JobTitle = table.Column<string>(nullable: true),
                    PlacementType = table.Column<int>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Timesheets", x => x.TimesheetId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Timesheets");
        }
    }
}
