export const INITIAL_STATE = {
    data: null,
    settingsOpen: false,
    updatedUserData: {
        fullName: "",
        cityCountry: "",
        profession: ""
    }
}

export function profileCardReducer(state, action) {
    switch (action.type) {
        case "SET_DATA":
            return { ...state, data: action.payload }
        case "TOGGLE_SETTINGS":
            return { ...state, settingsOpen: !state.settingsOpen }
        case "SET_UPDATED_USER_DATA":
            return { ...state, updatedUserData: { ...state.updatedUserData, ...action.payload } };
        default:
            return state;
    }
}