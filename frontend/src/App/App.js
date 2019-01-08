import React, {Component} from 'react';
import './App.css';

import {BrowserRouter as Router, Route} from 'react-router-dom';

import PrivateRoute from '../Components/PrivateRoute';
import HomePage from '../Components/HomePage';
import LoginPage from '../Components/LoginPage';


class App extends Component {
    render() {

        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        <Router>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage}/>
                                <Route path="/login" component={LoginPage}/>
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
