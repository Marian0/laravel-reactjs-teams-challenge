import React, {Component} from 'react';
import {userService} from '../Remote/backend';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import {Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox} from '@material-ui/core';
import {Face, Fingerprint} from '@material-ui/icons'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';


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
            loading: false,
            error: ''
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

        console.log("tumama", username, password);
        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }

        this.setState({loading: true});

        userService.login(username, password)
            .then(
                user => {
                    const {from} = this.props.location.state || {from: {pathname: "/"}};
                    this.props.history.push(from);
                },
                error => this.setState({error, loading: false})
            );
    }

    handleClickShowPassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };

    render() {
        const {classes} = this.props;
        const {username, password, submitted, loading, error} = this.state;

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
                                    disabled={loading}>Login</Button>
                        </Grid>
                    </div>
                    {loading &&
                    <LinearProgress/>
                    }

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={error.length > 0}
                        onClose={() => this.setState({error: ""})}
                        autoHideDuration={6000}
                    >
                        <SnackbarContent
                            message={error}
                        />
                    </Snackbar>
                </Paper>
            </form>
        );
    }
}


export default withStyles(styles)(LoginPage);
