export default (state = false, action) => {
    switch (action.type) {
        case 'SHOW_LOADING_BAR':
            return true;
        case 'HIDE_LOADING_BAR':
            return false;
        default:
            return state
    }
}
