import {Fragment, useEffect, useState} from "react";
import {
    toGetEveryDayPlaylist,
    toGetHighQualityPlaylist,
    toGetPersonalizedPlaylist,
    toGetTopPlaylist
} from "../../../routers/musicApi";
import MusicPlaylistButton from "./MusicPlaylistButton";
import Grid from "@mui/material/Grid";
import InfiniteScroll from "react-infinite-scroll-component";
import WaitLoad from "../../util/WaitLoad";
import {connect} from "react-redux";
import {breakpoint, useViewport} from "../../../util/viewportContext";
import LoadOver from "../../util/LoadOver";


function MusicPlayListFlow(props){
    const { width } = useViewport();
    const [musicList,setMusicList] =useState([])
    const [hasMore,setHasMore] =useState(true)
    const [isFirst,setIsFirst] =useState(true)
    //热门歌单 page
    const [page,setPage] =useState(0)
    //热门歌单 before
    const [before,setBefore] =useState(0)

    const type = props.playlistTypeReducer.playlistType



    useEffect(()=>{
        setMusicList([])
        setPage(0)
        setBefore(0)
        setIsFirst(true)
    },[type])


    useEffect(()=>{
        if (isFirst){
            setIsFirst(false)
            getMore()
        }
        if (musicList === []){
            getMore()
        }
    }, [isFirst, musicList])

   

    const getMore = () => {

        if (musicList.length >= 500){
            setHasMore(false)
        } else {

            if(type === 1) {
                toGetTopPlaylist(20,"hot",page*20,function (data){

                    setMusicList(musicList.concat(data.playlists))
                    setPage(page + 1)

                })
            }
            else if (type === 2) {
                toGetHighQualityPlaylist(before,20,"",data=>{

                    setMusicList(musicList.concat(data.playlists))
                    setBefore(data.lasttime)
                })

            }
            else if (type === 3){
                toGetPersonalizedPlaylist("",data=>{
                    setMusicList(musicList.concat(data.result))
                })
            }
            else if (type === 4){
                toGetEveryDayPlaylist(data=>{

                    setMusicList(musicList.concat(data.recommend))

                })
            }
        }

    };


        return(
                    <Fragment>
                        {
                            (type === 2 || type === 1)?
                                <InfiniteScroll
                                    style={{padding:"20px"}}
                                    id={"infiniteScroll"}
                                    dataLength={
                                        musicList.length
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
                                    scrollableTarget="scrollableDiv"
                                >
                                    <Grid container spacing={2}>
                                        {
                                            musicList.map((item,key) => {
                                                    return (
                                                        <Grid key={key} item xs={width>breakpoint.lg - 1?12/8:width>breakpoint.mdd?2:2.4}>
                                                            <MusicPlaylistButton type={type} data={item}/>
                                                        </Grid>
                                                    )
                                                }
                                            )
                                        }
                                    </Grid>
                                </InfiniteScroll>:


                                (type === 3)?
                                    <Grid container  style={{padding:"20px"}} spacing={2}>
                                        {
                                            musicList.map((item,key) => {
                                                    return (
                                                        <Grid key={key} item xs={width>breakpoint.lg - 1?12/8:width>breakpoint.mdd?2:2.4}>
                                                            <MusicPlaylistButton type={type} data={item}/>
                                                        </Grid>
                                                    )
                                                }
                                            )
                                        }

                                    </Grid>:
                                    (type === 4)?
                                        <Grid container  style={{padding:"20px"}} spacing={2}>
                                            {
                                                musicList.map((item,key) => {
                                                        return (
                                                            <Grid key={key} item xs={width>breakpoint.lg - 1?12/8:width>breakpoint.mdd?2:2.4}>
                                                                <MusicPlaylistButton type={type} data={item}/>
                                                            </Grid>
                                                        )
                                                    }
                                                )
                                            }
                                        </Grid>
                                        :""
                        }
                        <LoadOver/>
                    </Fragment>


        )

}

//从reducer中获取初始值，props.xxx就可以直接拿
const mapStateToProps = (state) => (
{ userReducer: state.userReducer, albumReducer: state.albumReducer, playlistTypeReducer: state.playlistTypeReducer}
);


export default connect(mapStateToProps)(MusicPlayListFlow)