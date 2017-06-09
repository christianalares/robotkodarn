import { handleActions } from 'redux-actions'

export default handleActions({
    SET_WORKSHOPS: (state, action) => {

        return ({
            ...state,
            userWorkshops: action.payload
        })
    },
    SET_PARTS: (state, action) => {

        return ({
            ...state,
            workshopParts: action.payload
        })
    }
}, {
    userWorkshops: []
})
