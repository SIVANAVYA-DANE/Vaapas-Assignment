import {Component} from 'react'
import './index.css'

import Loader from 'react-loader-spinner'
import Header from '../Header'

class MovieCard extends Component {
  state = {
    isLoading: true,
    isErr: false,
    movieData: {},
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    const apiUrl = `https://dog.ceo/api/breeds/image/random`
    const response = await fetch(apiUrl)

    if (response.ok) {
      const fetchedData = await response.json()
      this.setState({
        movieData: fetchedData.message,
        isLoading: false,
        isErr: false,
      })
    } else {
      this.setState({
        isLoading: false,
        isErr: true,
      })
    }
  }

  onclickRetry = () => {
    this.setState(
      {
        isLoading: true,
        isErr: false,
        movieData: {},
      },
      this.getMovieDetails,
    )
  }

  renderItem = () => {
    const {isErr, isLoading, movieData} = this.state

    if (isLoading) {
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    }
    if (isErr) {
      return (
        <div className="not-found-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
            className="not-found-img"
          />
          <h1 className="home-heading">Oops! Something Went Wrong</h1>
          <p className="home-description">
            We cannot seem to find the page you are looking for
          </p>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={this.onclickRetry}
          >
            Retry
          </button>
        </div>
      )
    }
    return (
      <div className="movie-card">
        <img src={movieData} alt="movie" className="image" />
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="movies-container">{this.renderItem()}</div>
      </>
    )
  }
}
export default MovieCard
