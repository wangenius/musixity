import * as React from 'react';
import {Fragment} from "react";
import Box from "@mui/material/Box";
import {Chip} from "@mui/material";
import {PlayCircleFilledWhite} from "@mui/icons-material";
import {numberToWan} from "../../../util/mathUtil";
import {useNavigate} from "react-router";
import {changeAlbum} from "../../../reducer/albumReducer";
import store from "../../../reducer/store";
import {connect} from "react-redux";


function MusicPlaylistButton(props)  {

    let navigate = useNavigate()

    const handleClickPlaylist = (id) => {
        store.dispatch(changeAlbum(id))
        navigate("/music/playlist")
    }

    try{
        return (
            <Fragment>
                            <Box className={"imgBox"} onClick={()=>{
                                handleClickPlaylist(props.data.id)
                            }}>
                                <Chip className={"imgChip"} size={"small"} icon={<PlayCircleFilledWhite/>} label={numberToWan((props.type === 1 || props.type === 2 || props.type === 3)?props.data.playCount:props.data.playcount)} />
                                <img className={"imgBoxItem"}
                                     src={(props.type === 1 || props.type === 2)?props.data.coverImgUrl:(props.type === 3 || props.type === 4)?props.data.picUrl:""}
                                     alt={props.data.name}
                                     loading="lazy"
                                />
                            </Box>
                            <Box  sx={{fontSize:"13px",paddingX:"5px",height:"40px",overflow:"hidden"}}>
                                {props.data.name}
                            </Box>
            </Fragment>
        )

    }
    catch (err){
        console.log(err)
    }
}

//从reducer中获取初始值，props.tabList就可以直接拿
const mapStateToProps = (state) => ({ userReducer: state.userReducer, musicReducer: state.musicReducer});


export default connect(mapStateToProps)(MusicPlaylistButton)
