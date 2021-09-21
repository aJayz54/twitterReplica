# twitter replica
Hi! This is a very basic application meant to replicate a few of the features of twitter. It's build with a ReactJS frontend and a Django Backend. In this webapp, you can register users, with all of the basic functionality that that gives you (login, register, logout). After logging in, you'll have access to the entire Tweets database, where you can see all of the tweets put out by users of the app. You can also put out tweets based off your currently logged in user. 

# Features
List of features include: 
- Animation (brief animation for log-in screen) 
- User registration/login/logout functionality
- API calls
- Classes and Objects
- Full-stack program

# Time Spent 
I spent around 6 hours developing this (spent a bit of time thinking about organization of the overall code). 

# Running the App
First, cd into the project directory in your terminal. 
Initiate a virtual environment with: pipenv shell
Then, download the requirements with: pipenv install -r requirements.txt
After this, you'll want to open up another terminal window so you can host both the backend and the frontend. 
In one terminal window, run:   

cd backend   

python manage.py runserver   

(This is the Django server)  


In the other terminal window, run:  

cd frontend  

npm start   

(This is the React frontend)   

Then, in Chrome, go to http://localhost:3000 to interact with the webapp. If you want to access the api, you can go to http://localhost:8000/api/users or http://localhost:8000/api/tweets respectively. 

