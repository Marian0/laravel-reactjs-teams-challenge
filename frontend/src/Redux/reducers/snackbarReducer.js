export default (state = {open: false, message: "", variant: "error"}, action) => {
    switch (action.type) {
        case 'SHOW_SNACKBAR':
            return {
                open: true,
                message: action.payload.message,
                variant: action.payload.variant
            };
        case 'HIDE_SNACKBAR':
            return {
                open: false,
                message: state.message,
                variant: state.variant
            };
        default:
            return state
    }
}
