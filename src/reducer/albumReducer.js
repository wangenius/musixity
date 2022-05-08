const albumState = {
    albumID:0,
}


export const changeAlbum = (id) => ({
    type: 'changeAlbum',
    albumID:id,
})

export function albumReducer (state = albumState, action) {
    switch (action.type) {
        case 'changeAlbum':
            return {
                albumID: action.albumID,
            }
        default:
            return state
    }
}