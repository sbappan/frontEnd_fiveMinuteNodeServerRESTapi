import React from 'react';

function AddMovie (props) {
        const { id, name, genre, addMode, handleSubmit, handleChange, handleClick } = props;
        const idInput = <label>ID: <input type="text" name="id" value={id} onChange={handleChange} /></label>;
        const nameInput = <label>Name: <input type="text" name="name" value={name} onChange={handleChange} /></label>;
        const genreInput = <label>Genre: <input type="text" name="genre" value={genre} onChange={handleChange} /></label>;
        
        return (
            <div className="addMovie">
                {addMode || <button onClick={handleClick}>Add movie</button>}
                {addMode && <div className='addForm'>{idInput}{nameInput}{genreInput}</div>}
                {addMode && <button className='submitBtn' id={id} onClick={() => handleSubmit({method: 'POST'})}>Submit</button>}
            </div>
        )
}

export default AddMovie;