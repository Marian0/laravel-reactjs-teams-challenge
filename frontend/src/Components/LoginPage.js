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

    // return (
    //     <div className="col-md-6 col-md-offset-3">
    //         <h2>Login</h2>
    //         <form name="form" onSubmit={this.handleSubmit}>
    //             <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
    //                 <label htmlFor="username">Username</label>
    //                 <input type="text" className="form-control" name="username" value={username}
    //                        onChange={this.handleChange}/>
    //                 {submitted && !username &&
    //                 <div className="help-block">Username is required</div>
    //                 }
    //             </div>
    //             <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
    //                 <label htmlFor="password">Password</label>
    //                 <input type="password" className="form-control" name="password" value={password}
    //                        onChange={this.handleChange}/>
    //                 {submitted && !password &&
    //                 <div className="help-block">Password is required</div>
    //                 }
    //             </div>
    //             <div className="form-group">
    //                 <button className="btn btn-primary" disabled={loading}>Login</button>
    //                 {loading &&
    //                 <img
    //                     alt="Loading..."
    //                     src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
    //                 }
    //             </div>
    //             {error &&
    //             <div className={'alert alert-danger'}>{error}</div>
    //             }
    //         </form>
    //     </div>
    // );
    // }
}


export default withStyles(styles)(LoginPage);
