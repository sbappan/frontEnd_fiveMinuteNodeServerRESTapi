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
        }
        this.handleAddChange = this.handleAddChange.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        try {
            const res = await fetch('https://fiveminuteserverrestapi.herokuapp.com/items');
            const movies = await res.json();
            this.setState({ movies })
        } catch (error) {
        }
    }

    handleAddChange(e) {
        const { name, value } = e.target;
        this.setState(prevState => {
            if (prevState[name] !== value) {
                return ({ [name]: value })
            }
        })
    }

    handleAddClick() {
        this.setState(prevState => ({
            addMode: !prevState.addMode
        }))
    }

    handleSubmit({ name, genre, id, method }) {
        const data = method === 'PUT' ? { name, genre, id } : { id: this.state.id, name: this.state.name, genre: this.state.genre };

        //https://gist.github.com/6174/6062387
        data.id = method !== 'POST' ? id : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        // Id is necessary for proper functioning of the app

        const url = `https://fiveminuteserverrestapi.herokuapp.com/items/` + (method !== 'POST' ? id : '');
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ movies: data });
                method === 'POST' && this.handleAddClick();
            })
            .catch((error) => {
            });
    }

    render() {
        const { movies, id, name, genre, addMode } = this.state;
        return (
            <div className="content">
                {movies.map(movie => <Movie key={movie.id} id={movie.id} name={movie.name} genre={movie.genre} handleSubmit={this.handleSubmit} />)}

                <AddMovie movies={movies} id={id} name={name} genre={genre} addMode={addMode} handleClick={this.handleAddClick} handleChange={this.handleAddChange} handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default Content;