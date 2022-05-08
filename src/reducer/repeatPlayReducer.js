const inState = {
    repeatPlay:false,
}


export const changeRepeatPlay = (boolean) => ({
    type: 'changeRepeatPlay',
    repeatPlay:boolean,
})

export function repeatPlayReducer (state = inState, action) {
    switch (action.type) {
        case 'changeRepeatPlay':
            return {
                repeatPlay: action.repeatPlay,
            }
        default:
            return state
    }
}