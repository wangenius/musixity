import Box from "@mui/material/Box";
import {toGetAllSongsInPlaylist, toGetPlaylistDetails} from "../../../routers/musicApi";
import {useEffect, useState} from "react";
import WaitLoad from "../../util/WaitLoad";
import {connect} from 'react-redux';
import InfiniteScroll from "react-infinite-scroll-component";
import {PlaylistCover} from "./PlaylistCover";
import {PlayListSongItem} from "./PlaylistItem";


function MusicPlaylistPage(props){
    const [list,setList] = useState({})
    const [song,setSong] = useState([])
    const [hasMore,setHasMore] = useState(true)
    const [flow,setFlow] = useState(0)


    useEffect(()=>{
        toGetPlaylistDetails(props.albumReducer.albumID, function (data) {
            setList(data.playlist)
        })
        console.log(props.albumReducer.albumID)
    },[props.albumReducer.albumID])

    useEffect(()=>{
        // console.log(list)
        getMore()
    },[list])


    //得到更多的歌曲
    const getMore = () => {
        console.log(list.id)
        if (song.length >= list.trackCount && list.trackCount !== 0){
            setHasMore(false)
        }else if (list.id !== undefined){
            if (list.trackCount - song.length >= 10){
                toGetAllSongsInPlaylist(list.id,10,flow,data => {
                    setSong(song.concat(data.songs))
                    setFlow(flow + 1)
                })
            }else{
                toGetAllSongsInPlaylist(list.id,list.trackCount - song.length,list.trackCount,data => {
                    setSong(song.concat(data.songs))
                })
            }
        }
    };






        return(
            <Box className={"playlistPage"}>

                <PlaylistCover list={list}/>


                <InfiniteScroll
                    style={{padding:"20px"}}
                    className={"overVisible"}
                    dataLength={
                        song.length
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
                            song.map((item, key) => {
                                return (

                                        <PlayListSongItem key={key} playlist={song} num={key} item={item}/>

                                )
                            })
                        }
                </InfiniteScroll>

            </Box>
        )

}


//从reducer中获取初始值，props.tabList就可以直接拿
//从reducer中获取初始值，props.tabList就可以直接拿
const mapStateToProps = (state) => ({ userReducer: state.userReducer, albumReducer: state.albumReducer});


export default connect(mapStateToProps)(MusicPlaylistPage);