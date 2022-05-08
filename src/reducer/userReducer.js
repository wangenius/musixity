

const userState = {
    user: {},
}

const userCookieState = {
    userCookie: {},
}





export function userCookieReducer(state = userCookieState,action) {
    switch (action.type){
        case 'changeUserCookie':
            return {
                userCookie: action.userCookie,
            }

        default:
            return state
    }
}

export function userReducer (state = userState,action){
    switch (action.type){
        case 'changeUser':
            return {
                user: action.user,
            }

        default:
            return state
    }
}


export const changeUser = (user) => ({
    type: 'changeUser',
    user:user,
})

export const changeUserCookie = (cookie) => ({
    type: 'changeUserCookie',
    userCookie:cookie,
})
