export const userService = {
    login,
    logout,
    getPlayers,
    getTeams,
    syncPlayer,
    getPlayersFromTeam,
    syncTeam
};

/**
 * Set the proper headers to communicate with API and set the Bearer if user is authenticated
 * @returns {{"Content-Type": string, Accept: string, Authorization: string}}
 */
const getHeaders = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${user.access_token}`,
    }
};

/**
 * Handles received response from API
 * @param response
 * @returns {*}
 */
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

            return Promise.reject(data);
        }

        return data;
    });
}

/**
 * Login
 * @param username
 * @param password
 * @returns {Promise<Response>}
 */
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

/**
 * Logout
 */
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

/**
 * Get Players
 * @returns {Promise<Response>}
 */
function getPlayers() {
    const requestOptions = {
        method: 'GET',
        headers: getHeaders(),
    };

    return fetch(`${process.env.REACT_APP_API_HOST}players`, requestOptions).then(handleResponse);
}

/**
 * Get Players from a given team
 * @returns {Promise<Response>}
 */
function getPlayersFromTeam(team_id) {
    const requestOptions = {
        method: 'GET',
        headers: getHeaders(),
    };

    return fetch(`${process.env.REACT_APP_API_HOST}teams/${team_id}/players`, requestOptions).then(handleResponse);
}

/**
 * Get Teams
 * @returns {Promise<Response>}
 */
function getTeams() {
    const requestOptions = {
        method: 'GET',
        headers: getHeaders()
    };

    return fetch(`${process.env.REACT_APP_API_HOST}teams`, requestOptions).then(handleResponse);
}


/**
 * Guess if there is needed to do a creation or an update request
 * @param data
 * @returns {*}
 */
function syncPlayer(data) {

    if (data.id) {
        return editPlayer(data);
    }

    return createPlayer(data);
}

/**
 * Handles Player creation
 * @param data
 * @returns {Promise<Response>}
 */
function createPlayer(data) {

    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };

    return fetch(`${process.env.REACT_APP_API_HOST}players`, requestOptions).then(handleResponse);
}

/**
 * Handles player edition
 * @param data
 * @returns {Promise<Response>}
 */
function editPlayer(data) {

    const requestOptions = {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };

    return fetch(`${process.env.REACT_APP_API_HOST}players/${data.id}`, requestOptions).then(handleResponse);
}


/**
 * Guess if there is needed to do a creation or an update request
 * @param data
 * @returns {*}
 */
function syncTeam(data) {

    if (data.id) {
        return editTeam(data);
    }

    return createTeam(data);
}

/**
 * Handles Team creation
 * @param data
 * @returns {Promise<Response>}
 */
function createTeam(data) {

    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };

    return fetch(`${process.env.REACT_APP_API_HOST}teams`, requestOptions).then(handleResponse);
}

/**
 * Handles team edition
 * @param data
 * @returns {Promise<Response>}
 */
function editTeam(data) {

    const requestOptions = {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(data)
    };

    return fetch(`${process.env.REACT_APP_API_HOST}teams/${data.id}`, requestOptions).then(handleResponse);
}
