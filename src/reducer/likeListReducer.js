const initState = {
    likeList:[]
}

export const handleLikeSongInStore = (likeList) => ({
    type: 'handleLikeSongInStore',
    likeList:likeList,
})

export function likeListReducer (state = initState,action){
    switch (action.type){
        case 'handleLikeSongInStore':
            return {
                likeList: action.likeList,
            }

        default:
            return state
    }
}


