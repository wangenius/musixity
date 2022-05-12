import Box from "@mui/material/Box";
import {connect} from "react-redux";
import {Fragment, useEffect, useState} from "react";
import {
    toGetAllSongsInPlaylist,
    toGetUserPlaylist
} from "../../routers/musicApi";
import {changeAlbum} from "../../reducer/albumReducer";
import store from "../../reducer/store";
import {PlayListSongItem} from "../music/playlist/PlaylistItem";
import WaitLoad from "../util/WaitLoad";
import InfiniteScroll from "react-infinite-scroll-component";


function MeLikeSongsFlow(props){

    const [songs,setSongs] = useState([])
    const [hasMore,setHasMore] =useState(true)
    const [flow,setFlow] = useState(0)
    const [list,setList] = useState({})
    const [isFirst,setIsFirst] = useState(true)

    useEffect(()=>{

        if (props.userReducer.user.hasOwnProperty("userId")){
            toGetUserPlaylist(props.userReducer.user.userId,res=>{
                setList(res.playlist[0])
                store.dispatch(changeAlbum(res.playlist[0].id))
            })
        }



    },[props.userReducer.user,props.likeListReducer,props.albumReducer.albumID])


    useEffect(()=>{
        if (isFirst && list.hasOwnProperty("id")){
            getMore()
            setIsFirst(false)
        }
    },[isFirst,list])


    //得到更多的歌曲
    const getMore = () => {

        if (songs.length >= list.trackCount && list.trackCount !== 0){
            setHasMore(false)
        }else if (list.id !== undefined){
            if (list.trackCount - songs.length >= 10){
                toGetAllSongsInPlaylist(list.id,10,flow,res=>{
                    setSongs(songs.concat(res.songs))
                    setFlow(flow + 1)
                })
            }else{
                toGetAllSongsInPlaylist(list.id,list.trackCount - songs.length,list.trackCount,data => {
                    setSongs(songs.concat(data.songs))
                })
            }
        }
    };


    return(
        <Fragment>
            {
                <InfiniteScroll
                    style={{padding:"20px"}}
                    id={"infiniteScroll"}
                    dataLength={
                        songs.length
                    }
                    loader={
                        <WaitLoad />
                    }
                    hasMore={hasMore}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            Yay! You have seen it all
                        </p>
                    }
                    next={getMore}
                    scrollableTarget="centerBar"
                >

                        {
                            songs.map((item,key) => {
                                    return (
                                        <PlayListSongItem key={key} playlist={songs} num={key} item={item}/>
                                    )
                                }
                            )
                        }

                </InfiniteScroll>
            }


        </Fragment>
    )
}



const mapStateToProps = (state) => ({
    userReducer: state.userReducer,
    albumReducer: state.albumReducer,
    likeListReducer: state.likeListReducer,
    musicReducer: state.musicReducer,
    userCookieReducer: state.userCookieReducer});

export default connect(mapStateToProps)(MeLikeSongsFlow)