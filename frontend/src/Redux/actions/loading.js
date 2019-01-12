/**
 * Show global loading bar
 * @returns {Function}
 */
export const showLoadingBar = () => ({
    type: 'SHOW_LOADING_BAR',
    payload: {}
});

/**
 * Hide global loading bar
 * @returns {Function}
 */
export const hideLoadingBar = () => ({
    type: 'HIDE_LOADING_BAR',
    payload: {}
});
