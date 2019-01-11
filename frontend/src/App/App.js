import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {People, GroupWork, HelpOutline, ExitToApp} from '@material-ui/icons';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import PrivateRoute from '../Components/PrivateRoute';
import TeamList from '../Components/Teams/TeamList';
import AboutPage from '../Components/AboutPage';
import PlayerList from '../Components/Players/PlayerList';
import LoginPage from '../Components/LoginPage';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

class App extends Component {
    state = {
        mobileOpen: false,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({mobileOpen: !state.mobileOpen}));
    };

    render() {
        const {classes, theme} = this.props;

        const drawer = (
            <div>
                <div className={classes.toolbar}/>
                <Divider/>
                <List>
                    <ListItem button component={Link} key="teams" to="/teams">
                        <ListItemIcon><GroupWork/></ListItemIcon>
                        <ListItemText primary="Teams"/>
                    </ListItem>
                    <ListItem button component={Link} key="players" to="/players">
                        <ListItemIcon><People/></ListItemIcon>
                        <ListItemText primary="Players"/>
                    </ListItem>
                    <ListItem button component={Link} key="about" to="/">
                        <ListItemIcon><HelpOutline/></ListItemIcon>
                        <ListItemText primary="About"/>
                    </ListItem>

                    <Divider/>
                    <ListItem button component={Link} key="login" to="/login">
                        <ListItemIcon><ExitToApp/></ListItemIcon>
                        <ListItemText primary="Logout"/>
                    </ListItem>
                </List>
            </div>
        );

        return (
            <Router>
                <div className={classes.root}>
                    <CssBaseline/>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" color="inherit" noWrap>
                                Players Teams App
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <nav className={classes.drawer}>
                        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                        <Hidden smUp implementation="css">
                            <Drawer
                                container={this.props.container}
                                variant="temporary"
                                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                                open={this.state.mobileOpen}
                                onClose={this.handleDrawerToggle}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden xsDown implementation="css">
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                variant="permanent"
                                open
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </nav>
                    <main className={classes.content}>
                        <div className={classes.toolbar}/>

                        <div>
                            <PrivateRoute exact path="/" component={AboutPage}/>
                            <PrivateRoute exact path="/teams" component={TeamList}/>
                            <PrivateRoute exact path="/players" component={PlayerList}/>
                            <Route path="/login" component={LoginPage}/>
                        </div>
                    </main>
                </div>
            </Router>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(App);
