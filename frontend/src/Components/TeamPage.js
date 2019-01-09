import React, {Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItem from '@material-ui/core/ListItem';

import {userService} from '../Remote/backend';

class TeamPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teams: []
        };
    }

    componentDidMount() {
        this.setState({
            teams: {loading: true}
        });
        userService.getTeams().then(response => this.setState({teams: response.data}));
    }

    render() {
        const {teams} = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Teams</h1>
                {teams.loading && <CircularProgress/>}
                {teams.length &&

                <List>

                    {teams.map((team) =>

                        <ListItem key={team.id}>
                            <ListItemAvatar>
                                <Avatar>
                                    {team.name.charAt(0)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={team.name}
                            />
                            <ListItemSecondaryAction>
                                {team.player_count ? team.player_count : 0}
                            </ListItemSecondaryAction>
                        </ListItem>
                    )}
                </List>
                }
            </div>
        );
    }
}

export default TeamPage;
