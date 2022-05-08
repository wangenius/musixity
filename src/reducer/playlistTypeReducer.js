const inState = {
    playlistType:1,
}


export const changePlaylistType = (type) => ({
    type: 'changePlaylistType',
    playlistType:type,
})

export function playlistTypeReducer (state = inState, action) {
    switch (action.type) {
        case 'changePlaylistType':
            return {
                playlistType: action.playlistType,
            }
        default:
            return state
    }
}