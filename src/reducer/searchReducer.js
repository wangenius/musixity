const initialState = {
    searchMsg: "",
}


export const changeSearchMsg = (msg) => ({
    type: 'changeSearchMsg',
    searchMsg:msg,
})


export function searchReducer(state = initialState,action) {
    switch (action.type){
        case 'changeSearchMsg':
            return {
                searchMsg: action.searchMsg,
            }

        default:
            return state
    }
}