import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {toDislikeSong, toGetSong, toGetSongDetails, toLikeSong} from "../../routers/musicApi";
import {connect} from 'react-redux';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
    ArrowRight,
    CloseFullscreen,
    Comment,
    Favorite,
    FavoriteBorder,
    Menu,
    OpenInFull,
    Pause,
    PlayArrow,
    Repeat,
    RepeatOne,
    SkipNext,
    SkipPrevious
} from "@mui/icons-material";
import {Hidden, IconButton, Slider, styled} from "@mui/material";
import store from "../../reducer/store";
import {handleLikeSongInStore} from "../../reducer/likeListReducer";
import {deleteArray, formatDuration} from "../../util/mathUtil";
import Lyric from "./LyricBox";
import {changeArtistState} from "../../reducer/artistReducer";
import {useNavigate} from "react-router";
import {changeSong} from "../../reducer/musicReducer";
import {changeRepeatPlay} from "../../reducer/repeatPlayReducer";
import {TinyText} from "../../element/util/item";
import Btn from "../../element/util/Button";

function MusicControlCenter(props){
    const navigate =useNavigate()
    const [url,setUrl] = useState("")
    const [song,setSong] = useState({})
    const [isFull,setIsFull] = useState(false)
    const [playlist,setPlaylist] = useState(props.playlistReducer.playlist.map(item=>item.id))
    const control = document.getElementsByClassName("rightBar")[0];

    //是否加载
    const [isAudioLoad,setIsAudioLoad] =useState(false)

    //音乐操作
    const [isLike,setIsLike] = useState(false)

    const [isPlaying, setIsPlaying] = useState(false);

    const [isRepeatOne, setIsRepeatOne] = useState(props.repeatPlayReducer.repeatPlay);

    const [position, setPosition] = useState(0);

    const [duration, setDuration] = useState(200);

    const audio = document.getElementById("musicAudio")

    //播放列表初始化
    useEffect(()=>{
        setPlaylist(props.playlistReducer.playlist.map(item=>item.id))
    },[props.playlistReducer.playlist])


    //拿到 store => 歌曲信息
    useEffect(()=>{
        // console.log(props.musicReducer.song)
        if (props.musicReducer.song.hasOwnProperty("id")){

            toGetSongDetails(props.musicReducer.song.id,data =>{
                setSong(data.songs[0])
            })

            toGetSong(props.musicReducer.song.id,data =>{
                setUrl(data.data[0].url)
                setIsAudioLoad(true)
            })
        }

    },[props.musicReducer.song])




    //设置audio 初始化
    useEffect(()=>{
        if (isAudioLoad){
            document.getElementsByClassName("rightBar")[0].classList.remove("w0");
            audio.src = url
            audio.addEventListener("canplay", function(){
                setDuration(audio.duration)
                setIsPlaying(true)
            });
            audio.addEventListener("timeupdate",function(){//监听音频播放的实时时间事件
                    setPosition(audio.currentTime)
            },false);
            audio.addEventListener("ended",function(){//监听音频播放的实时时间事件

                if (!isRepeatOne){
                    changeNextSong()
                }

            },false);
        }
    },[isAudioLoad, url])


    useEffect(()=>{
        if (isAudioLoad){
            if (isRepeatOne){
                audio.loop = true
            }else if (!isRepeatOne){
                audio.loop = false
            }
        }
    },[isRepeatOne,isAudioLoad])

    //设置喜欢
    useEffect(()=>{
        if (props.likeListReducer.likeList.includes(song.id)){
            setIsLike(true)
        }else {
            setIsLike(false)
        }
    },[props.likeListReducer.likeList, song.id])



    const changeNextSong = () =>{
        setSong({})
        setIsPlaying(false)
        toGetSongDetails(playlist[playlist.indexOf(props.musicReducer.song.id) + 1] || playlist[0],data =>{
            store.dispatch(changeSong(data.songs[0]))
        })
    }

    const changeLastSong = () =>{
        setSong({})
        setIsPlaying(false)
        toGetSongDetails(playlist[playlist.indexOf(props.musicReducer.song.id) - 1] || playlist[0],data =>{
            store.dispatch(changeSong(data.songs[0]))
        })
    }



    const handleLikeSong = (e) => {

      toLikeSong(song.id,res => {
          const  likeSongs= props.likeListReducer.likeList.concat(song.id)
          console.log(likeSongs.length)
          store.dispatch(handleLikeSongInStore(likeSongs))
          setIsLike(true)
      })

    }

    const handleDislikeSong = (e) => {

        toDislikeSong(song.id,res => {
            const  likeSongs = deleteArray(props.likeListReducer.likeList,song.id)
            console.log(likeSongs.length)
            store.dispatch(handleLikeSongInStore(likeSongs))
            setIsLike(false)
    })
    }



    const handleLyric = (time) => {
        audio.currentTime =time
    }

    const SwitchControlVisible = () => {
        document.getElementsByClassName("musicControl")[0].classList.remove("fullScreen");
        setIsFull(false)
        control.classList.contains("miniBar")? control.classList.remove("miniBar"):control.classList.add("miniBar");

    }
    const setFullScreen = () => {
        isFull?
            document.getElementsByClassName("musicControl")[0].classList.remove("fullScreen"):
            document.getElementsByClassName("musicControl")[0].classList.add("fullScreen");
        setIsFull(!isFull)
    }


        return (
            <Box className={"musicControl"}>
                <audio id={"musicAudio"}
                       autoPlay
                       src={url}/>

                <Box  className={"collapseBox"}  onClick={SwitchControlVisible} >
                    <Box className={"collapseBtn"}/>
                </Box>

                <Box className={'SubMusicControl'}>
                <Box id={"musicInfo"}>
                    <Box className={"musicCover"}>
                        <img className={"coverImg"}
                             src={(song.hasOwnProperty("al"))? song.al.picUrl:""}
                             alt={""}
                             onClick={setFullScreen}
                        />

                        <Box className={"h5"}>
                            {song.hasOwnProperty("name") ?
                                song.name
                                :
                                "No Song"
                            }
                        </Box>

                        {song.hasOwnProperty("ar") ?
                            song.ar.map((item,key) => {
                                return(
                                    <Button className={"artistBtn"} key={key} variant={"text"} onClick={()=>{
                                        store.dispatch(changeArtistState(item));
                                        navigate("/music/artist")
                                    }}>
                                        {item.name}
                                    </Button>
                                )

                            }):
                            <Box>No Artist</Box>
                        }
                    </Box>

                <Box id={"lyric"}>
                    <Lyric isFull={isFull} id={props.musicReducer.song.id} position={position} handleLyric={handleLyric}/>
                </Box>





                {/*<CommentBox isFull={isFull} id={props.musicReducer.song.id}/>*/}
                </Box>

                {/*控制*/}
                <Box className={"controlSlider"}>
                    <Slider
                        aria-label="time-indicator"
                        size="small"
                        value={position}
                        min={0}
                        step={1}
                        max={duration}
                        onChange={(e, value) => {
                            audio.currentTime = e.target.value;
                        }}
                        sx={{
                            color: "var(--color-6)",
                            height: 4,
                            '& .MuiSlider-thumb': {
                                width: 8,
                                height: 8,
                                transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                                '&:before': {
                                    boxShadow: '0 2px 12px 0 var(--shadow-color)',
                                },
                                '&:hover, &.Mui-focusVisible': {
                                    boxShadow: `0px 0px 0px 8px var(--shadow-color)`,
                                },
                                '&.Mui-active': {
                                    width: 20,
                                    height: 20,
                                },
                            },
                            '& .MuiSlider-rail': {
                                opacity: 0.28,
                                color:`var(--svg)`
                            },
                        }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mt: -2,
                        }}
                    >
                        <TinyText>{formatDuration(position)}</TinyText>
                        <TinyText>{formatDuration(duration)}</TinyText>
                    </Box>
                </Box>

                <Box className={'controlBtns'}>
                    <IconButton size={"small"} onClick={()=>{
                        setIsRepeatOne(!isRepeatOne)
                        store.dispatch(changeRepeatPlay(!isRepeatOne))
                    }}>
                        {(isRepeatOne)?<RepeatOne sx={{height:15,width:15}}/>:<Repeat sx={{height:15,width:15}}/>}
                    </IconButton>
                    <IconButton aria-label="previous"  onClick={changeLastSong}>
                        <SkipPrevious />
                    </IconButton>
                    <IconButton aria-label="play/pause" onClick={()=>{ setIsPlaying(!isPlaying) ;if (isPlaying){audio.pause()}else { audio.play() }}}>
                        {isPlaying?<Pause  sx={{ height: 30, width: 30 }}/>:<PlayArrow sx={{ height: 30, width: 30 }} />}
                    </IconButton>
                    <IconButton id={"nextButton"} aria-label="next" onClick={changeNextSong}>
                        <SkipNext />
                    </IconButton>
                    <IconButton size={"small"} onClick={setFullScreen}>
                        {isFull?<CloseFullscreen sx={{height:15,width:15}}/>:<OpenInFull sx={{height:15,width:15}} />}
                    </IconButton>
                </Box>


                {/*喜欢*/}
                <Box className={"interactBtns"}>
                    {(props.userReducer.user !== null)?
                    <Button startIcon={isLike ? <Favorite />:<FavoriteBorder />} onClick={isLike?handleDislikeSong: handleLikeSong}>
                        {isLike ? "已喜欢":"喜欢"}
                    </Button>:""}

                    <Button startIcon={<Comment/>} onClick={()=>{}}>
                        {"评论"}
                    </Button>
                    <Button startIcon={<Menu/>} onClick={()=>{}}>
                        {"列表"}
                    </Button>
                </Box>

                </Box>
            </Box>

        )
}

//从reducer中获取初始值，props.xxx就可以直接拿
const mapStateToProps = (state) => ({userReducer: state.userReducer,
    likeListReducer: state.likeListReducer,
    musicReducer: state.musicReducer,
    playlistReducer: state.playlistReducer,
    repeatPlayReducer: state.repeatPlayReducer,
    userCookieReducer: state.userCookieReducer});


export default connect(mapStateToProps,null)(MusicControlCenter);