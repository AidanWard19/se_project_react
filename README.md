https://www.whatweather.csproject.org

# Backend Repo Link

https://github.com/AidanWard19/se_project_express

# WTWR (What to Wear?)

![Capture 3](https://github.com/AidanWard19/se_project_react/assets/135480405/1e6f82e0-e62f-4d35-b1e0-359323240405)

## About the project

The idea of the application is pretty simple - it makes a call to an API, which then responds with the daily weather forecast. The weather data is collected, processed, and then based on the forecast, outfits suitable for the weather in the user's location are displayed.
The user can make a secure account, with login data that gets encrypted upon registration. There is also security preventing other user's from accessing other users account, or manipulating the data associated with their accouing. Users can view their own profile data, edit their profile, like other people's posts (clothes), and delete their own clothes. The app also remembers if the user has not logged out, and will then automatically log them in upon revisiting the app.

The website is hosted using Google Cloud Platform (GCP), and is built using HTML, CSS, Javascript, React, React Router, Node.js, MongoDB, Express, GCP, and JWT Auth.

### Plans to Improve

- Change radio options for selecting clothing item appropriate weather to be multiple instead of selecting one i.e. article of clothing might be wearable in hot AND warm weather
- Adjust onRemoteClick if condition for modals so that they don't close when highlighting text and cursor leaves modal window while mouse is pressed -- either event.currentTarget or the listener it is applied to needs to be changed
