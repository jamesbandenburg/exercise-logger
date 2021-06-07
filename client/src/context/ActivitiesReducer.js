import { GET_ACTIVITIES, GET_ONE_ACTIVITY, POST_ACTIVITY, PUT_ACTIVITY, DELETE_ACTIVITY, EDIT_ACTIVITY, SHOW_ADD_SUCCESS, SHOW_EDIT_SUCCESS, SET_LOADING, SHOW_DELETE_SUCCESS, APPLY_FILTER, CLEAR_FILTER, SHOW_DIALOG } from './Types'


export default (state, action) => {
    switch(action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            }
        case GET_ONE_ACTIVITY: 
        return {
            ...state,
            activityToEdit: state.activities.find(activity => activity._id === action.payload),
            loading: false
        }
        case POST_ACTIVITY: 
        return {
            ...state,
            activities: [action.payload, ...state.activities]
        }
        case SHOW_ADD_SUCCESS:
            return {
                ...state,
                showAddSuccessDialog: action.payload
            }
        case EDIT_ACTIVITY:

        return {
            ...state,
            showEditModal: action.payload
        }

        case PUT_ACTIVITY:

        return {
            ...state,
            activities: state.activities.map(activity => activity._id === action.payload._id ? action.payload : activity)
    
        }

        case SHOW_EDIT_SUCCESS:

        return {
            ...state,
            showEditSuccessDialog: action.payload
        }

        case SHOW_DELETE_SUCCESS: 

        return {
            ...state,
            showDeleteSuccessDialog: action.payload
        }

        case SHOW_DIALOG:

        return {
            ...state,
            showDialogText: action.payload
        }

        case DELETE_ACTIVITY: 
        return {
            ...state,
            activities: state.activities.filter(activity => activity._id !== action.payload)
        }

        case APPLY_FILTER:
            return {
                ...state,
                filteredType: action.payload,
                isFiltered: true
            }

        case CLEAR_FILTER:
            return {
                ...state,
                filteredType: '',
                isFiltered: false
            }

        default: return state
    }
}