import { handleActions } from 'redux-actions'

export default handleActions({
    SET_WORKSHOPS: (state, action) => {

        return ({
            ...state,
            userWorkshops: action.payload
        })
    }
}, {
    userWorkshops: []
})