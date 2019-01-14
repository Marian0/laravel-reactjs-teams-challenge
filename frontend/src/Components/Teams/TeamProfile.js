import React, {Component} from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {userService} from '../../Remote/backend';
import {connect} from 'react-redux';
import {hideLoadingBar, showLoadingBar} from "../../Redux/actions/loading";
import {showSnackbar} from "../../Redux/actions/snackbar";


class TeamProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            team: {
                players: []
            },
        };
    }


    /**
     * On component mounting
     */
    componentDidMount() {
        this.props.showLoadingBar();

        userService.getPlayersFromTeam(this.props.match.params.team_id).then(response => {

            this.setState({
                team: response.data,
            });

            this.props.hideLoadingBar();
        });
    }


    render() {
        const { team } = this.state;

        if (this.props.loading) {
            return <p>Loading...</p>;
        }

        return (
            <div>
                <h1>Players on {team.name || ""} ({team.player_count || "0"})</h1>
                {team.players.length === 0 && <p>No players on this team</p>}
                <List>
                    {
                        team.players.map((player) =>
                            <ListItem key={player.id}>
                                <ListItemAvatar>
                                    <Avatar>
                                        {player.first_name.charAt(0)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${player.first_name} ${player.last_name}`}
                                />
                            </ListItem>
                        )
                    }
                </List>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.loading
});

const mapDispatchToProps = dispatch => ({
    showLoadingBar: () => dispatch(showLoadingBar()),
    hideLoadingBar: () => dispatch(hideLoadingBar()),
    showSnackbar: (message) => dispatch(showSnackbar(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamProfile);
