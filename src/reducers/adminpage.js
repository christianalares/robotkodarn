import { handleActions } from 'redux-actions'

export default handleActions({
    SET_WORKSHOPS: (state, action) => {

        return ({
            ...state,
            userWorkshops: action.payload
        })
    },
    SET_SELECTED_INDEX: (state, action) => {

        return ({
            ...state,
            selectedIndex: action.payload
        })
    },
    SET_PARTS: (state, action) => {

        return ({
            ...state,
            workshopParts: action.payload
        })
    },
    SET_MESSAGE: (state, action) => {

        return ({
            ...state,
            message: action.payload
        })
    }
}, {
    userWorkshops: [],
    selectedIndex: null,
    message: null
})
