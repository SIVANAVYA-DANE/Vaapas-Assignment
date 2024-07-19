import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import {FaStar} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Movies extends Component {
  state = {
    searchInput: '',
    moviesList: [],
    isMoviesLoading: true,
    isMoviesErr: false,
  }

  componentDidMount() {
    this.getMovies()
  }

  onclickRetry = () => {
    this.setState(
      {moviesList: [], isMoviesLoading: true, isMoviesErr: false},
      this.getMovies,
    )
  }

  getMovies = async () => {
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      `https://apis.ccbp.in/jobs?search=${searchInput}`,
      options,
    )
    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = {jobs: data.jobs, total: data.total}
      const updatedData = fetchedData.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      console.log(data)
      this.setState({
        moviesList: updatedData,
        isMoviesLoading: false,
        isMoviesErr: false,
      })
    } else {
      this.setState({isMoviesLoading: false, isMoviesErr: true})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = () => {
    this.getMovies()
  }

  renderMovies = () => {
    const {moviesList, isMoviesErr, isMoviesLoading} = this.state
    if (isMoviesLoading) {
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    }
    if (isMoviesErr) {
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
    if (moviesList.length === 0) {
      return (
        <div className="not-found-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no movies"
            className="not-found-img"
          />
          <h1 className="home-heading">No Movies Found</h1>
          <p className="home-description">We could not find any movies.</p>
        </div>
      )
    }

    return (
      <ul className="movies-list-container">
        {moviesList.map(each => (
          <Link to={`/movies/${each.id}`} key={each.id} className="nav-link">
            <li key={each.id} className="movie-details">
              <div className="top-details">
                <img
                  src={each.companyLogoUrl}
                  alt="company logo"
                  className="company-img"
                />
                <div className="top-right-details">
                  <h1 className="movie-role">{each.title}</h1>
                  <div className="rating-container">
                    <button
                      type="button"
                      aria-label="Favorite"
                      className="rating-button"
                    >
                      <FaStar className="star-icon" />
                    </button>
                    <p className="rating-text">{each.rating}</p>
                  </div>
                </div>
              </div>
              <div className="middle-details">
                <div className="middle-left-container">
                  <div className="ele-holder">
                    <p className="location-text">{each.location}</p>
                  </div>
                  <div className="ele-holder">
                    <p className="location-text">{each.employmentType}</p>
                  </div>
                </div>
                <p className="package-text">{each.packagePerAnnum}</p>
              </div>
              <h1 className="movie-description">Description</h1>
              <p className="movie-description-text">{each.jobDescription}</p>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
        />
        <button
          data-testid="searchButton"
          type="button"
          className="rating-button"
          onClick={this.onEnterSearchInput}
          aria-label="searching"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="movies-container">
          <div className="movies-details-container">
            <div>{this.renderSearchInput()}</div>
            <div className="align-container">{this.renderMovies()}</div>
          </div>
        </div>
      </>
    )
  }
}
export default Movies
