import React, { Component } from 'react';

class Movie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            name: '',
            genre: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            editing: !prevState.editing
        }))
    }

    handleSubmit() {
        const data = {name: this.state.name, genre: this.state.genre};
        fetch(`https://fiveminuteserverrestapi.herokuapp.com/items/${this.props.id}`, {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        this.setState(prevState => ({
            editing: !prevState.editing
        }))
    }

    handleChange(e) {
        console.log(e.target);
        const { name, value } = e.target;
        this.setState(prevState => {
            if (prevState[name] !== value) {
                return ({[name]: value})
            }
        })
    }

    componentDidMount() {
        const { name, genre } = this.props;
        this.setState({name, genre})
    }

    render() {
        const { name, genre, editing } = this.state;
        
        const nameInput =  <input type="text" name="name" value={name} onChange={this.handleChange} />;
        const genreInput =  <input type="text" name="genre" value={genre} onChange={this.handleChange}/>;
        const displayData = <p>Name: {name}, Genre: {genre}</p>;

        return (
            <div className="movie">
                {editing ? <>{nameInput} {genreInput}</> : displayData}
                <div>
                    {editing && <button className='submitBtn' onClick={this.handleSubmit}>Submit</button>}
                    <button onClick={this.handleClick}>{editing ? 'Cancel' : 'Edit'}</button>
                </div>
            </div>
        )
    }   
}

export default Movie;