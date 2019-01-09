import React, {Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItem from '@material-ui/core/ListItem';

import {userService} from '../Remote/backend';

class PlayerPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: []
        };
    }

    componentDidMount() {
        this.setState({
            players: {loading: true}
        });
        userService.getPlayers().then(response => this.setState({players: response.data}));
    }

    render() {
        const {players} = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Players List</h1>
                {players.loading && <CircularProgress/>}
                {players.length &&


                <List>


                    {players.map((user) =>

                        <ListItem key={user.id}>
                            <ListItemAvatar>
                                <Avatar>
                                    {user.first_name.charAt(0)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.first_name + ' ' + user.last_name}
                            />
                            <ListItemSecondaryAction>
                                {user.team && user.team.name}
                            </ListItemSecondaryAction>
                        </ListItem>
                    )}
                </List>
                }
            </div>
        );
    }
}

export default PlayerPage;