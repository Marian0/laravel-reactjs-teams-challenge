import React, {Component} from 'react';
import {userService} from '../Remote/backend';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import {Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox} from '@material-ui/core';
import {Face, Fingerprint} from '@material-ui/icons'
import {showSnackbar} from "../Redux/actions/snackbar";
import {hideLoadingBar, showLoadingBar} from "../Redux/actions/loading";
import {connect} from 'react-redux';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
    }
});

class LoginPage extends Component {

    constructor(props) {
        super(props);

        userService.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({submitted: true});
        const {username, password} = this.state;

        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }

        this.props.showLoadingBar();

        userService.login(username, password)
            .then(
                user => {
                    this.props.hideLoadingBar();
                    const {from} = this.props.location.state || {from: {pathname: "/"}};
                    this.props.history.push(from);
                },
                error => {
                    this.props.hideLoadingBar();
                    this.props.showSnackbar(error.message);
                }
            );
    }

    handleClickShowPassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };

    render() {
        const {classes} = this.props;
        const {username, password, submitted}  = this.state;

        return (
            <form name="form" onSubmit={this.handleSubmit}>
                <Paper className={classes.padding}>
                    <div className={classes.margin}>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <Face/>
                            </Grid>
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField id="username"
                                           label="Username"
                                           name="username"
                                           type="email"
                                           onChange={this.handleChange}
                                           fullWidth
                                           error={submitted && !username}
                                           autoFocus
                                           required/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <Fingerprint/>
                            </Grid>
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField id="password"
                                           label="Password"
                                           name="password"
                                           type={this.state.showPassword ? 'text' : 'password'}
                                           fullWidth
                                           error={submitted && !password}
                                           required
                                           onChange={this.handleChange}
                                           InputProps={{
                                               endAdornment: (
                                                   <InputAdornment position="end">
                                                       <IconButton
                                                           aria-label="Toggle password visibility"
                                                           onClick={this.handleClickShowPassword}
                                                       >
                                                           {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                                       </IconButton>
                                                   </InputAdornment>
                                               ),
                                           }}/>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" justify="space-between">
                            <Grid item>
                                <FormControlLabel control={
                                    <Checkbox
                                        color="primary"
                                    />
                                } label="Remember me"/>
                            </Grid>
                            <Grid item>
                                <Button disableFocusRipple disableRipple style={{textTransform: "none"}} variant="text"
                                        color="primary">Forgot password ?</Button>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" style={{marginTop: '10px'}}>
                            <Button variant="outlined"
                                    color="primary"
                                    type="submit"
                                    style={{textTransform: "none"}}
                                    disabled={this.props.loading}>Login</Button>
                        </Grid>
                    </div>

                </Paper>
            </form>
        );
    }
}

const LoginStyle = withStyles(styles)(LoginPage);

const mapStateToProps = (state) => ({
    loading: state.loading
});

const mapDispatchToProps = dispatch => ({
    showLoadingBar: () => dispatch(showLoadingBar()),
    hideLoadingBar: () => dispatch(hideLoadingBar()),
    showSnackbar: (message) => dispatch(showSnackbar(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginStyle);
