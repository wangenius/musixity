import {useNavigate} from "react-router";
import Box from "@mui/material/Box";
import {Avatar, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import store from "../../../reducer/store";
import {changeAlbum} from "../../../reducer/albumReducer";
import {QueueMusicOutlined} from "@mui/icons-material";
import {changeSong} from "../../../reducer/musicReducer";
import {numberToWan} from "../../../util/mathUtil";
import {changePlaylist} from "../../../reducer/playlistReducer";



export function PlaylistItem(props){
    const navigate = useNavigate()
    return(

        <Box sx={{display:"flex"}}>
            <Box sx={{textAlign:"center", marginX:"5px",width:"20px",display:"inline-block",lineHeight:"80px"}}>
                {props.num + 1}
            </Box>


            <ListItemButton className={"listButton"} onClick={function () {
                store.dispatch(changeAlbum(props.item.id))
                navigate('/music/playlist')
            }}>
                <ListItemAvatar>
                    <Avatar>
                        <img style={{width: "inherit", height: "inherit"}} src={props.item.coverImgUrl}
                             alt={<QueueMusicOutlined />}/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.item.name} secondary={(props.item.playCount > 100000)?numberToWan(props.item.playCount) + "次听过":props.item.playCount + "次听过"}/>
            </ListItemButton>

        </Box>
    )
}


export function PlayListSongItem(props){


    const handleClickOnSong = (song) => {
        store.dispatch(changePlaylist(props.playlist))
        store.dispatch(changeSong(song))

    }

    return(

        <Box sx={{display:"flex"}}>
            <Box sx={{textAlign:"center", marginX:"5px",width:"20px",display:"inline-block",lineHeight:"80px"}}>
                {props.num + 1}
            </Box>


            <ListItemButton className={"listButton"} onClick={function () {
                console.log(props.item)
                handleClickOnSong(props.item)
            }}>
                <ListItemText primary={props.item.name} secondary={props.item.ar[0].name}/>
            </ListItemButton>

        </Box>
    )
}
