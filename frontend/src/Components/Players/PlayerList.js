import React, {Component} from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItem from '@material-ui/core/ListItem';
import {userService} from '../../Remote/backend';
import PlayerForm from "./PlayerForm";
import Button from '@material-ui/core/Button';

const initPlayer = {
    first_name: "",
    last_name: "",
    team_id: ""
};

class PlayerList extends Component {



    constructor(props) {
        super(props);

        this.state = {
            players: [],
            teams: [],
            showForm: false,
            showLoading: false,
            showFormLoading: false,
            player: initPlayer
        };
    }

    componentDidMount() {
        this.loadPlayers();
    }

    /**
     * Performs the API call to get players from server. Also, set loading true to show the spinner component
     */
    loadPlayers = () => {
        this.setState({
            showLoading: true
        });

        userService.getPlayers().then(response => this.setState({
            players: response.data,
            showLoading: false
        }));

        userService.getTeams().then(response => this.setState({
            teams: response.data,
        }));
    };
    /**
     * Click on player on the lists will open the edit form
     * @param player
     */
    handlePlayerClick = (player) => {
        player['team_id'] = player.team.id || "";

        this.setState({
            player,
            showForm: true
        })
    };

    /**
     * Renders list of players
     * @returns {*}
     */
    renderList = () => {
        const {players, showLoading} = this.state;
        return (
            <div>
                {showLoading && <LinearProgress/>}
                <h1>Players List</h1>
                <Button variant="contained" color="primary" onClick={() => this.setState({showForm: true, player: initPlayer})}>New player</Button>

                {players.length > 0 &&

                <List>
                    {players.map((player) =>

                        <ListItem key={player.id} onClick={() => this.handlePlayerClick(player)}>
                            <ListItemAvatar>
                                <Avatar>
                                    {player.first_name.charAt(0)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={player.first_name + ' ' + player.last_name}
                            />
                            <ListItemSecondaryAction>
                                {player.team && player.team.name}
                            </ListItemSecondaryAction>
                        </ListItem>
                    )}
                </List>
                }
            </div>
        );

    };

    /**
     * On form input change
     * @param event
     */
    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState((prevState) => ({
            player: {...prevState.player, [name]: value}
        }));
    };


    /**
     * On submit form
     * @param event
     */
    handleFormSubmit = (event) => {
        event.preventDefault();

        this.setState({
            showFormLoading: true
        });

        userService.syncPlayer(this.state.player).then((response) => {

            this.setState({
                showForm: false,
                showFormLoading: false
            });

            //Editing players => replace on state
            if (this.state.player.id) {
                this.setState((prev) => ({
                    players: prev.players.map((el) => {

                        if (el.id === this.state.player.id) {
                            return this.state.player;
                        }

                        return el;

                    })
                }));
                return;
            }

            //New created players => GET new data from API
            this.loadPlayers();


        }, (error) => {
            console.warn(error);
        });
    };

    handleCloseForm = () => {
        this.setState({showForm: false});
    };


    render() {
        if (this.state.showForm) {
            return <PlayerForm
                player={this.state.player}
                teams={this.state.teams}
                showFormLoading={this.state.showFormLoading}
                handleFormSubmit={this.handleFormSubmit}
                handleInputChange={this.handleInputChange}
                handleCloseForm={this.handleCloseForm}
            />
        }

        return this.renderList();
    }
}

export default PlayerList;
