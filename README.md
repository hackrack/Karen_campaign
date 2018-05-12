![screenshot](https://raw.githubusercontent.com/hackrack/Karen_campaign/master/images/screenshot.png)

# Karen Campaign App
This Fullstack Web application built with React.js, express.js on Node.js and Postgresql allows volunteers to sign up to help Karen in her election campaign. The app will match the information the volunteer provides with voter information Karen has. If the volunteer exists as a voter in our records we welcome them with an appreciation message and join their voter information with the volunteer information that he or she just provided. If we do not have existing voter records for the volunteer that is signing up, and he or she is a Michigan resident and older than 18 we thank them for their interest in helping Karen's campaign. In the case the volunteer who is registering is not older than 18, we save his/her information and show them a thank you message letting them know that they currently don't meet the age requirement and that we look forward for their help once they are old enough. If the volunteer is currently out of Michigan state we will show a message indicating them to contact their local democratic party to learn more about how they can help.

## Setup
1. Clone the repo
```git clone git@github.com:hackrack/Karen_campaign.git```

### Database
1. Please follow up [this](https://github.com/C4Q/AC_4_Web/blob/169bf89960fe57ce7e5e7790df7dff691e1be1f6/units/deepdive/lessons/SQL/postgres.md) instructions to set up a postgres server in your computer

2. Once the previous step is done, make sure that when you open a terminal and type `psql` your prompt changes to something like `{username}=#`. If you see any error, please make sure you are following the instructions step by step.

3. If everything went well, we will now seed our database using `psql` as follows.

⋅⋅a) Navigate to Karen_campaign/backend/db
``` cd Karen_campaign/backend/db```

⋅⋅b) In the terminal execute ```psql -f campaigndb.sql```

4. Inspect the terminal log for any errors. To verify type `psql`, once in the psql prompt type `\l` and make sure you see line like
```campaigndb   | c4q      | UTF8     | en_US.UTF-8 | en_US.UTF-8 | ```
if you don't see this in your terminal make sure you have followed the steps above correctly.

### How to run the app

**Note**: Before trying to run this app make sure you have NodeJS installed in your machine by typing 'node --version', you should see something like ```v8.11.1``` showing the version you have installed. To avoid possible errors make sure you have the version shown here or greater. To install Node follow [this](https://nodejs.org/en/download/) instructions.

1. Navigate into Karen_campaign/backend
```cd Karen_campaign/backend```

2. Install dependencies and start backend app
```npm install && npm start```

3. In another terminal navigate into Karen_campaign/frontend
```cd Karen_campaign/frontend```

4. Install dependencies and start frontend app
```npm install && npm start```

5. After a few seconds a browser window will open with the app running where you can interact with it as a regular user would

## Key dependencies
### Backend
*[NodeJS](https://nodejs.org/en/)
*[ExpressJS](https://expressjs.com/) for web server app on top of NodeJS
*[Postgres](https://www.postgresql.org/docs/current/static/index.html) as a SQL database server
*[PG-Promise](https://github.com/vitaly-t/pg-promise) as the communication layer between ExpressJS server and Postgres server
*[Geocod.io API](https://geocod.io/) to make our app location-aware

### Frontend
*[ReactJS](https://reactjs.org/) as the frontend library
*[Bootstrap](https://www.bootstrapcdn.com/) as a CSS framework
