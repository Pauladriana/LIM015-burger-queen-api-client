
const initialState = {
    other_aspects: {},
    error: null //error message
}

const errorReducer = (state = initialState, action) => {
    switch(action.type){
        case 'DISPLAY_ERROR':
            return {
                error: action.payload
            }
        default:
           return state;
    }
};

export default errorReducer;
