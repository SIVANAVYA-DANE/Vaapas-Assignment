import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <Header />
      <div className="home-container">
        <ul className="home-content">
          <li>
            <h1 className="home-heading">Enjoy on your TV</h1>
            <h1 className="home-heading2">Find The Movie As Per Your Mood</h1>
          </li>
          <li>
            <p className="home-description">
              Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players and more.
            </p>
          </li>
          <Link to="/movies">
            <li>
              <button type="button" className="find-job-button">
                Find Movies
              </button>
            </li>
          </Link>
        </ul>
      </div>
    </>
  )
}

export default Home
