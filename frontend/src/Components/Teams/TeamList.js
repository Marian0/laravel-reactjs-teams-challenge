import React, {Component} from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import {userService} from '../../Remote/backend';
import TeamForm from "./TeamForm";
import {connect} from 'react-redux';
import {hideLoadingBar, showLoadingBar} from "../../Redux/actions/loading";
import {showSnackbar} from "../../Redux/actions/snackbar";

const initTeam = {
    name: "",
};

class TeamList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teams: [],
            team: initTeam,
            showForm: false,
        };
    }

    /**
     * Handles the API request to fill list with teams
     */
    loadTeams = () => {
        this.props.showLoadingBar();

        userService.getTeams().then(response => {
            this.setState({
                teams: response.data
            });
            this.props.hideLoadingBar();
        });
    };

    /**
     * On component mounting
     */
    componentDidMount() {
        this.loadTeams();
    }

    renderTeams = () => {
        const {teams} = this.state;

        return (
            <List>
                {
                    teams.map((team) =>
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
                                {team.player_count ? team.player_count : 0} players
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                }
            </List>

        );

    };

    /**
     * List rendering
     * @returns {*}
     */
    renderList() {
        return (
            <div>
                <h1>Teams</h1>
                <Button variant="contained" color="primary" onClick={this.handleNewBtnClicked}>New Team</Button>
                {this.renderTeams()}
            </div>
        );
    }

    render() {
        if (this.state.showForm) {
            return <TeamForm
                team={this.state.team}
                handleFormSubmit={this.handleFormSubmit}
                handleInputChange={this.handleInputChange}
                handleCloseForm={this.handleCloseForm}
            />
        }

        return this.renderList();
    }

    /**
     * On click on New Team btn
     */
    handleNewBtnClicked = () => {

        this.setState({
            showForm: true,
            team: initTeam
        })

    };
    /**
     * On form input change
     * @param event
     */
    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState((prevState) => ({
            team: {...prevState.team, [name]: value}
        }));
    };


    /**
     * On submit form
     * @param event
     */
    handleFormSubmit = (event) => {
        event.preventDefault();

        this.props.showLoadingBar();

        userService.syncTeam(this.state.team).then((response) => {

            this.setState({
                showForm: false,
            });

            this.props.hideLoadingBar();

            //Editing players => replace on state
            if (this.state.team.id) {
                this.setState((prev) => ({
                    teams: prev.teams.map((el) => {

                        if (el.id === this.state.team.id) {
                            return this.state.team;
                        }

                        return el;

                    })
                }));
                return;
            }

            //New created players => GET new data from API
            this.loadTeams();


        }, (error) => {
            this.props.hideLoadingBar();

            let message = error.message || "Problem detected";

            if (error.errors) {
                Object.keys(error.errors).forEach(function (key) {
                    message += error.errors[key] + '. ';
                });
            }

            this.props.showSnackbar(message, "error");
        });
    };

    handleCloseForm = () => {
        this.setState({showForm: false});
    };
}

const mapDispatchToProps = dispatch => ({
    showLoadingBar: () => dispatch(showLoadingBar()),
    hideLoadingBar: () => dispatch(hideLoadingBar()),
    showSnackbar: (message) => dispatch(showSnackbar(message))
});

export default connect(null, mapDispatchToProps)(TeamList);
