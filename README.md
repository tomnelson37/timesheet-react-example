# timesheet-react-example

SPA with react, webpack and a .NET core web API backend. 

Client:

cd client 

npm i

npm start

to run a dev server hosting the client files. Webpack will then watch the files and recompile the application when it notices a file has changed.

In Client/webpack.config.js, ensure 

proxy: {
    '/api/': 'http://localhost:50078/'
}

matches the server the api will run on.

Server: 

Run the WebApi project.
        
I've hooked up a single table to a code first EF model, running against a local SQLExpress instance - on generating the timesheets,
they will be saved in the db.
Otherwise, all the server does is generate the start date and the end date for each week/month in the timesheet.
