import { Link } from "react-router-dom"
import "./About.css"

const About = () => {
  return (
    <section id="about">

      <div id="about-text">
        <h1>About TypeRacer</h1>
        <p>
          The award-winning online typing competition, TypeRacer, allows people to race each-other by typing quotes from books, movies, and songs. 
          It is the first multiplayer typing game on the web. 
        </p>
        <p>
          Since launching in March, 2008, millions of people from all over the globe have completed hundreds of millions of races on <Link to="/">typeracer.com</Link>, improving their typing speed by as much as 50 words-per-minute.
        </p>
      </div>

      <iframe title="TypeRacer Video Walkthrough" src="https://www.youtube.com/embed/9znLhbkV1Gs" width="560" height="315"></iframe>

    </section>
  )
}

export default About