const userState = {
    friends: {},
}

export const changeFriendsState = (friends) => ({
    type: 'changeFriendsState',
    friends:friends,
})

export function friendsReducer(state = userState, action) {
    switch (action.type){
        case 'changeFriendsState':
            return {
                friends: action.friends,
            }

        default:
            return state
    }
}

