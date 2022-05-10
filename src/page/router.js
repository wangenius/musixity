import * as React from 'react';
import {BrowserRouter, HashRouter, Navigate, Route, Routes} from "react-router-dom";
import MainPage from "./MainPage";
import {ThemeProvider} from "@mui/material";
import MusicPanel from "../element/music/playlist/MusicPlayListFlow"
import {theme} from "../asset/theme";
import NoContentPage from "./NoContentPage";
import Login from "../element/me/log/Login";
import SignIn from "../element/me/log/SignIn";
import SignUp from "../element/me/log/SignUp";
import MusicListPanel from "../element/music/playlist/MusicPlaylistPage";
import MusicModel from "../element/music/MusicEntrance";
import MusicSearchPanel from "../element/music/MusicSearchFlow";
import Me from "../element/me/Me";
import ArtistPage from "../element/music/artist/ArtistPage";
import {ArtistsFlow} from "../element/music/artist/ArtistsFlow";
import ShareEntrance from "../element/share/ShareEntrance";
import ShareFlow from "../element/share/ShareFlow";
import FriendsFlow from "../element/friend/FriendsFlow";
import FriendsEntrance from "../element/friend/FriendsEntrance";
import UsersPage from "../element/friend/UsersPage";
import HistoryEntrance from "../element/history/HistoryEntrance";
import {useEffect} from "react";





export default function router(props) {




    return (

            <HashRouter>
                <Routes >

                    {/*主要页面*/}
                    <Route path="/" exact={true} element={<MainPage />}>

                        <Route index element={<Navigate to={"/music"}/>}/>
                        <Route  path="/index" element={<Navigate to={"/music"}/>}/>

                        <Route path="music"  element={<MusicModel />}>

                            <Route index element={<MusicPanel />}/>

                            <Route path="album" element={<MusicPanel/>}/>

                            <Route path="playlist" element={<MusicListPanel/>}/>

                            <Route path="search" element={<MusicSearchPanel/>}/>

                            <Route path="artists" element={<ArtistsFlow/>}/>

                            <Route path="artist" element={<ArtistPage/>}/>
                        </Route>


                        <Route path="Me" element={<Me />}/>


                        <Route path="shares" element={<ShareEntrance />} >

                            <Route index element={<ShareFlow />}/>

                        </Route>

                        <Route path="friends" element={<FriendsEntrance />} >

                            <Route index element={<FriendsFlow />}/>

                        </Route>


                        <Route path="user" element={<UsersPage />} >


                        </Route>
                        <Route path="history" element={<HistoryEntrance />} >


                        </Route>

                        <Route path="login" element={<Login />} >

                            <Route index element={<SignIn/>}/>
                            <Route path="signup" element={<SignUp/>}/>

                        </Route>

                    </Route>

                    {/*无法查找页面*/}
                    <Route path="/*" element={<NoContentPage />} />
                </Routes>
            </HashRouter>

    );
}

