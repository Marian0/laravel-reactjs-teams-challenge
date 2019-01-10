export const userService = {
    login,
    logout,
    getPlayers,
    getTeams,
    syncPlayer
};

const getHeaders = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${user.access_token}`,
    }
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            grant_type: 'password',
            scope: '*',
            client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
            client_secret: process.env.REACT_APP_OAUTH_CLIENT_SECRET,
        })
    };

    return fetch(`${process.env.REACT_APP_API_HOST}oauth/token`, requestOptions)
        .then(handleResponse)
        .then(user => {

            // login successful if there's a user in the response
            if (user) {
                user.username = username;

                // store user details and basic auth credentials in local storage
                // to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getPlayers() {
    const requestOptions = {
        method: 'GET',
        headers: getHeaders(),
    };

    return fetch(`${process.env.REACT_APP_API_HOST}players`, requestOptions).then(handleResponse);
}

function getTeams() {
    const requestOptions = {
        method: 'GET',
        headers: getHeaders()
    };

    return fetch(`${process.env.REACT_APP_API_HOST}teams`, requestOptions).then(handleResponse);
}

function syncPlayer(data) {

    if (data.id) {
        return editPlayer(data);
    }

    return createPlayer(data);
}

function createPlayer(data) {

    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };

    return fetch(`${process.env.REACT_APP_API_HOST}players`, requestOptions).then(handleResponse);
}

function editPlayer(data) {

    const requestOptions = {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };

    return fetch(`${process.env.REACT_APP_API_HOST}players/${data.id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                console.log(data.error);
                logout();
                // window.confirm().reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
