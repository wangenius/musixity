const artistState = {
    artist: {},
}

export const changeArtistState = (artist) => ({
    type: 'changeArtistState',
    artist:artist,
})

export function artistReducer(state = artistState,action) {
    switch (action.type){
        case 'changeArtistState':
            return {
                artist: action.artist,
            }

        default:
            return state
    }
}

