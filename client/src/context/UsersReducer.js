import { GET_USERS, LOGIN, POST_USER, SHOW_REGISTER, SHOW_REGISTER_SUCCESS, SHOW_ABOUT, SET_CURRENT_USER } from './Types'

export default (state, action) => {
    switch(action.type) {
        case GET_USERS: 
        return {
            ...state,
            users: [action.payload]
        }
        case LOGIN: 
        return {
            ...state,
            loggedIn: action.payload
            
        };
        case POST_USER: 
        return {
            ...state,
            users: state.users.push(action.payload),
            showRegister: false,
            showRegisterSuccessDialog: true
        };
        case SHOW_REGISTER:
        return {
            ...state,
            showRegister: action.payload
        };
        case SHOW_REGISTER_SUCCESS:
            return {
            ...state,
            showRegisterSuccessDialog: action.payload
            }
        case SHOW_ABOUT:
            return {
                ...state,
            showAboutModal: action.payload
            }
        case SET_CURRENT_USER: 
            return {
                ...state,
            currentUser: action.payload,
            loggedIn: true
            }
        default: return state
    }
}