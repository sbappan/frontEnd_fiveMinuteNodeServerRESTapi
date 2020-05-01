import React from 'react';

function AddMovie (props) {
        const { id, name, genre, addMode, handleSubmit, handleChange, handleClick } = props;
        const addInputs =  <div className='addForm'><label>ID: <input type="text" name="id" value={id} onChange={handleChange} /></label><label>Name: <input type="text" name="name" value={name} onChange={handleChange} /></label><label>Genre: <input type="text" name="genre" value={genre} onChange={handleChange} /></label></div>;

        return (
            <div className="addMovie">
                {addMode || <button onClick={handleClick}>Add movie</button>}
                {addMode && addInputs}
                {addMode && <button className='submitBtn' id={id} onClick={handleSubmit}>Submit</button>}
            </div>
        )
}

export default AddMovie;