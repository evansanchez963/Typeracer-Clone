# Live Demo: https://typeracer-clone.vercel.app/

# About This Project

This project is a clone of the website [play.typeracer.com](https://play.typeracer.com/) created with MongoDB, Express, React, and Node. I built this as a way to teach myself a stack and because I love typing games. The front end is hosted on Vercel and the back end is hosted on Render.

## Front End

- Styled with vanilla CSS (flexbox and grid) to create a responsive UI for desktop and mobile devices
- Built with React components and React router for handling user navigation
- Axios is used to handle the API calls
- Uses local storage and JSON web tokens to handle user authentication
- socket.IO client is used to handle real time multiplayer on the client side

## Back End

- A MongoDB Atlas cluster stores user data such as credentials and typing sessions
- Express is used to create different routers and routes for API endpoints
- Node is used as a runtime environment to run the server
- Mongoose is used to communicate between the MongoDB Atlas and the server
- socket.IO handles real time multiplayer events and keeps track of connected users and rooms

## Features to Add

This project is still a work in progress. Here are a list of features I would like to add in the future when I have the time.

1. Improved accessibility
2. The ability for users to change their username
3. The ability for users to change their passwords via email
4. A toggleable day/night theme for the UI
5. More user feedback to be shown after a typing session such as words typed incorrectly, correctly typed characters over all characters typed, etc.
6. More data shown in user profile such as data visualizations to show a user's typing progress over time

## Known Issues

- It can take up to 20 to 30 seconds for the API to respond since I am hosting this on the free tier of render.com.
- The typing input does not work on mobile devices.
