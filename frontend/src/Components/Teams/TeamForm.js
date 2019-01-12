import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const TeamForm = (props) => {

    const {team} = props;

    return (
        <form onSubmit={props.handleFormSubmit}>
            <h1>
                {team.id && "Edit Team"}
                {!team.id && "New Team"}
            </h1>

            <p>Name</p>
            <TextField
                name="name"
                variant="outlined"
                type="text"
                value={team.name}
                fullWidth
                onChange={props.handleInputChange}/>


            <Button type="submit" variant="contained" color="primary">Save</Button>
            <Button variant="contained" onClick={props.handleCloseForm} color="secondary">Close</Button>

        </form>
    );
};

export default TeamForm;
