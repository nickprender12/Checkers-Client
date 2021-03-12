# Checkers

Try it [here](https://protected-cove-12875.herokuapp.com/) back-end repo [here](https://github.com/nickprender12/Checkers-api)

![Showcase GIF](/screenshots/recording-2.gif)
> This is a multi-player checkers and chat app I built to test out socket-io.

## About

This is a checkers and chat app I build to further my understanding of React and web-development. It is a work in progress and was my first attempt at implementing websockets for client server communication.

## Tech

- Frontend: <a href="https://github.com/facebook/react">`React`</a> with Hooks and Context Api
- Styling: <a href="https://styled-components.com/">`styled components`</a>
- Websocket management: <a href="https://github.com/socketio/socket.io">`Socket.io`</a>
- Backend: <a href="https://github.com/expressjs/express">`Express`</a>
- Testing: in-progress

---

## Things Working

- __Game Logic__ A bit more challenging than I thought it would be. Ran into a few issues with stale state that I resolved with Refs. I am hoping once I intergrate Redux into the project this will resolve the stale state problems and I can remove the Refs.

- __Styling__ I was inspired by [this](https://codepen.io/TurkAysenur/pen/ZEpxeYm) project, which took all its styles from the Mac OS UI. This was my first attempt at creating my own custom styles without the help of Bootstrap or MaterialUI. This was also my first pass at using Styled Components. I would like to go back and create a Theme for the styling and then also adjust the styling for more of a light mode.

- __Socket connection__ Managed to get just the basics working enough to allow users to chat and play the game. There is much room for improvement. I need to look into setting up separate rooms for each game instance and only allow two clients to join a game.

## Todo

All the things I would Like to add to this project.

- [ ] Add Redux to manage state.
- [ ] Add a Game status bar to show current game stats.
- [ ] Improve backend to use socket-io rooms for each instance of a game.
- [ ] Create a Game lobby that shows stats for users online and allows messaging.
- [ ] Create a unique PIN ID for each game so users can better match up with known friends
- [ ] Add Notifications for exiting game and errors.
- [ ] Add a exit game and return to lobby feature.
- [ ] Allow draw logic to game.
- [ ] Write in logic for double jumps.
- [ ] Create a basic AI that users can play against.

## Architecture Diagram

in-progress

## Support

 Reach out to me if you have any questions

- Email at <a href="mailto:nickprender@gmail.com">`nickprender@gmail.com`</a>

 Thanks for taking a Look!
