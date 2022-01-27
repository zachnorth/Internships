const SET_ALERT = 'SET_ALERT';
const DISMISS_ALERT = 'DISMISS_ALERT';

const initialState = {
    isLoading: false,
    alertType: 'danger',
    isOpen: false,
    alertHeading: "",
    alertText: ""
};


export const actionCreators = {
    setAlert: alertObject => async (dispatch, getState) => {
        dispatch({ type: SET_ALERT, alertObject });
    },

    dismissAlert: data => async (dispatch, getState) => {
        dispatch({ type: DISMISS_ALERT });
    },
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === SET_ALERT) {
        return {
            ...state,
            isOpen: true,
            alertType: action.alertObject.alertType,
            alertHeading: action.alertObject.alertHeading,
            alertText: action.alertObject.alertText
        };
    }

    if (action.type === DISMISS_ALERT) {
        return {
            ...state,
            isOpen: false,
            alertHeading: "",
            alertText: ""
        };
    }

    return state;
}
