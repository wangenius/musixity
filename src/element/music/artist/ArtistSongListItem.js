import { ListItemButton, ListItemText} from "@mui/material";

import Box from "@mui/material/Box";
import store from "../../../reducer/store";
import {changeSong} from "../../../reducer/musicReducer";
import {changePlaylist} from "../../../reducer/playlistReducer";









export function SongListItem(props){




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
                handleClickOnSong(props.song)
            }}>
                <ListItemText sx={{flexGrow:1}} primary={props.song.name} secondary={props.song.alia}/>
                <ListItemText sx={{flexGrow:0}} secondary={props.song.al.name}/>
            </ListItemButton>
        </Box>
    )

}