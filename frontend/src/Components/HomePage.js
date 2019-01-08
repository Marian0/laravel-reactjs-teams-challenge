import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import { userService } from '../Remote/backend';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            players: []
        };
    }

    componentDidMount() {
        this.setState({
            user: JSON.parse(localStorage.getItem('user')),
            players: { loading: true }
        });
        userService.getPlayers().then(response => this.setState({ players: response.data }));
    }

    render() {
        const { user, players } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.username}!</h1>
                <p>You're logged in with React & Laravel OAuth Passport!</p>

                {players.loading && <em>Loading players...</em>}
                {players.length &&

                <ul>
                    {players.map((user) =>
                        <li key={user.id}>
                            {user.first_name + ' ' + user.last_name}
                        </li>
                    )}
                </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

export default HomePage;
