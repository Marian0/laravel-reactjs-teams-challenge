/**
 * Show global loading bar
 * @returns {Function}
 */
export const showSnackbar = (message = "", variant = "info") => ({
    type: 'SHOW_SNACKBAR',
    payload: {
        message,
        variant
    }
});

/**
 * Hide global loading bar
 * @returns {Function}
 */
export const hideSnackbar = () => ({
    type: 'HIDE_SNACKBAR',
});
