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
            players: [],
            showForm: false,
            showLoading: false,
            player: {}
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
    };
    /**
     * Click on player on the lists will open the edit form
     * @param player
     */
    handlePlayerClick = (player) => {
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
                <h1>Players List</h1>

                <button onClick={() => this.setState({showForm: true, player: {}})}>Create player</button>
                {showLoading && <CircularProgress/>}
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
        userService.syncPlayer(this.state.player).then((response) => {

            this.setState({
                showForm: false,
            });

            //Editing players => replace on state
            if (this.state.player.id) {
                this.setState((prev) => ({
                    players: prev.players.map((el) => {

                        if (el.id === this.state.player.id) {
                            console.log(el.id, this.state.player.id);
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

    /**
     * Render the edit/create form
     * @returns {*}
     */
    renderForm = () => {

        return (
            <form onSubmit={this.handleFormSubmit}>
                <p>Name</p>
                <input name="first_name"
                       type="text"
                       value={this.state.player.first_name}
                       onChange={this.handleInputChange}/>

                <p>Last Name</p>
                <input name="last_name" type="text" value={this.state.player.last_name} onChange={this.handleInputChange}/>

                <p>Team Picker</p>
                ...

                <button type="submit">Save</button>
                <button onClick={() => this.setState({showForm: false})}>Close</button>

            </form>

        );
    };


    render() {
        if (this.state.showForm) {
            return this.renderForm();
        }

        return this.renderList();
    }
}

export default PlayerPage;
