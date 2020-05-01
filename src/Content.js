import React, { Component } from 'react';
import Movie from './Movie';

class Content extends Component {

    state = {
        movies: []
    }

    async componentDidMount() {
        try {
           const res = await fetch('https://fiveminuteserverrestapi.herokuapp.com/items');
           const movies = await res.json();
           this.setState({movies})
        } catch (error) {
            console.log('error: ', error);
        }
    }


   render() {
       const { movies } = this.state;
    return (
        <div className="content">
            {movies.map(movie => <Movie key={movie.id} id={movie.id} name={movie.name} genre={movie.genre} />)}
        </div>
    )
   }
}

export default Content;