const initialState = {
    song:{},
}

export const changeSong = (song) => ({
    type: 'changeSong',
    song:song,
})



function musicReducer (state = initialState, action) {
    switch (action.type) {
        case 'changeSong':
            return {
                song: action.song,
            }
        default:
            return state
    }
}


export default musicReducer