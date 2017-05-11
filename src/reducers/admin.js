import { handleActions } from 'redux-actions'

export default handleActions({
    SET_LOGIN_OR_REGISTER: (state, action) => {
        console.log( state, action )

        return ({
            ...state,
            loginOrRegister: action.payload
        })
    }
}, {
    loginOrRegister: 'login'
})