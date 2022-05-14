import {combineReducers, createStore} from "redux";
import {artistReducer} from "./artistReducer";
import {likeListReducer} from "./likeListReducer";
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import {albumReducer} from "./albumReducer";
import {searchReducer} from "./searchReducer";
import {friendsReducer} from "./friendsReducer";
import musicReducer from "./musicReducer";
import {userCookieReducer, userReducer} from "./userReducer";
import {playlistTypeReducer} from "./playlistTypeReducer";
import {playlistReducer} from "./playlistReducer";
import {repeatPlayReducer} from "./repeatPlayReducer";

const storageConfig = {
    key: 'root', // 必须有的
    storage: storageSession, // 缓存机制
    blacklist: [], // reducer 里不持久化的数据,除此外均为持久化数据
};

const reducer =  combineReducers(
            {
            musicReducer,
            userReducer,
            userCookieReducer,
            artistReducer,
            albumReducer,
            likeListReducer,
            searchReducer,
            friendsReducer,
            playlistTypeReducer,
            playlistReducer,
            repeatPlayReducer,
        }
)

const myPersistReducer = persistReducer(storageConfig, reducer);

const store = createStore(myPersistReducer)

export const persistor = persistStore(store);

export default store