import React, { Component } from 'react';
import Movie from './Movie';
import AddMovie from './AddMovie';

class Content extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            movies: [],
            id: '',
            name: '',
            genre: '',
            addMode: false,
            editing: false,
        }
        this.handleAddChange = this.handleAddChange.bind(this);
        this.handleAddSubmit = this.handleAddSubmit.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
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

    handleAddSubmit(id) {
        console.log('called', id);
        const data = {id: this.state.id, name: this.state.name, genre: this.state.genre};
        console.log('data: ', data);
        fetch(`https://fiveminuteserverrestapi.herokuapp.com/items`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            this.setState(prevState => ({
                addMode: !prevState.addMode,
                movies: data
            }))
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    handleAddChange(e) {
        console.log(e.target);
        const { name, value } = e.target;
        this.setState(prevState => {
            if (prevState[name] !== value) {
                return ({[name]: value})
            }
        })
    }

    handleAddClick() {
        this.setState(prevState => ({
            addMode: !prevState.addMode
        }))
    }

   render() {
       const { movies, id, name, genre, addMode } = this.state;
    return (
        <div className="content">
            {movies.map(movie => <Movie key={movie.id} id={movie.id} name={movie.name} genre={movie.genre} />)}

            <AddMovie movies={movies} id={id} name={name} genre={genre} addMode={addMode} handleClick={this.handleAddClick} handleChange={this.handleAddChange} handleSubmit={this.handleAddSubmit} />
        </div>
    )
   }
}

export default Content;