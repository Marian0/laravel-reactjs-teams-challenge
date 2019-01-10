import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const PlayerForm = (props) => {

    const {player} = props;

    /**
     * Render the edit/create form
     * @returns {*}
     */
    return (
        <form onSubmit={props.handleFormSubmit}>
            <p>Name</p>
            <TextField
                name="first_name"
                variant="outlined"
                type="text"
                value={player.first_name}
                fullWidth
                onChange={props.handleInputChange}/>

            <p>Last Name</p>
            <TextField
                name="last_name"
                variant="outlined"
                type="text"
                value={player.last_name}
                fullWidth
                onChange={props.handleInputChange}/>

            <Button type="submit" variant="contained" color="primary">Save</Button>
            <Button variant="contained" onClick={props.handleCloseForm} color="secondary">Close</Button>

        </form>
    );
};

export default PlayerForm;
