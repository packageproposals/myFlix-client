import React from 'react';
import axios from 'axios';
import {Container, Col, Row, Navbar, Nav} from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

import './main-view.scss';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
          movies: [],
          selectedMovie: null,
          user: null, 
          registered: null
        };
    }

    componentDidMount(){
        axios.get('https://best-marvel-movies.herokuapp.com/movies')
        .then(response => {
            this.setState({
                movies: response.data
            });
        })
        .catch(error => {
            console.log(error);
        });
        
    }
        setSelectedMovie(newSelectedMovie) {
            this.setState({
              selectedMovie: newSelectedMovie
            });
      }

      onLoggedIn(user) {
        this.setState({
          user,
        });
      }


      render() {
        const { movies, selectedMovie, user } = this.state;

        if (!user) {return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;}
    
        if (selectedMovie) return <MovieView movie={selectedMovie} />;
    
        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
        
        return (
          <div className="main-view">
            <Navbar bg="light" expand="lg">
              <Container fluid>
                <Navbar.Brand href="#home">AppforMovies</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href="#profile">Profile</Nav.Link>
                    <Nav.Link href="#update">Update Profile</Nav.Link>
                    <Nav.Link href="#logout">Logout</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <Container fluid className="mainViewContainer">
              {selectedMovie ? (
                <Row className="justify-content-md-center">
                  <Col md={8}>
                    <MovieView
                      movie={selectedMovie}
                      onBackClick={(newSelectedMovie) => {
                        this.setSelectedMovie(newSelectedMovie);
                      }}
                    />
                  </Col>
                </Row>
              ) : (
                <Row className="justify-content-md-center">
                  {movies.map((movie) => (
                    <Col lg={3} md={4} sm={6}>
                      <MovieCard
                        key={movie._id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                          this.setSelectedMovie(newSelectedMovie);
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </Container>
          </div>
        );
      }
    }
      

export default MainView;