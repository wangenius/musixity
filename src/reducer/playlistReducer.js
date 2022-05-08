const inState = {
    playlist:[],
}


export const changePlaylist = (playlist) => ({
    type: 'changePlaylist',
    playlist:playlist,
})

export function playlistReducer (state = inState, action) {
    switch (action.type) {
        case 'changePlaylist':
            return {
                playlist: action.playlist,
            }
        default:
            return state
    }
}