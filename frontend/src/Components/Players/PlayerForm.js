import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const PlayerForm = (props) => {

    const {player} = props;

    const renderOptions = (teams) => {

        return teams.map((team) => {
            return <MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>;
        });
    };

    return (
        <form onSubmit={props.handleFormSubmit}>
            <h1>
                {player.id && "Edit Player"}
                {!player.id && "New Player"}
            </h1>

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

            <p>Team</p>
            <FormControl fullWidth variant="outlined">
                <Select
                    value={player.team_id}
                    onChange={props.handleInputChange}

                    input={
                        <OutlinedInput
                            labelWidth={0}
                            name="team_id"
                        />
                    }
                >
                    {renderOptions(props.teams)}
                </Select>
            </FormControl>


            <Button type="submit" variant="contained" color="primary">Save</Button>
            <Button variant="contained" onClick={props.handleCloseForm} color="secondary">Close</Button>

        </form>
    );
};

export default PlayerForm;
