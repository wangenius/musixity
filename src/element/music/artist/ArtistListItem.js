import {useNavigate} from "react-router";
import store from "../../../reducer/store";
import {changeArtistState} from "../../../reducer/artistReducer";
import Box from "@mui/material/Box";
import {Avatar, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import {QueueMusicOutlined} from "@mui/icons-material";

export function ArtistListItem(props){

    const nav = useNavigate()

    const handleClickOnArtist = (artist) => {
        store.dispatch(changeArtistState(artist))
        nav("/music/artist")
    }
    return(
        <Box sx={{display:"flex",flex:0.5}}>
            <Box sx={{textAlign:"center", marginX:"5px",width:"20px",display:"inline-block",lineHeight:"80px"}}>
                {props.num + 1}
            </Box>
            <ListItemButton className={"listButton"}  onClick={()=>{
                handleClickOnArtist(props.item)
            }}>
                {/*<ListItemAvatar>*/}
                {/*    <Avatar>*/}
                {/*        <img style={{width: "inherit", height: "inherit"}} src={props.item.picUrl}*/}
                {/*             alt={<QueueMusicOutlined/>}/>*/}
                {/*    </Avatar>*/}
                {/*</ListItemAvatar>*/}
                <ListItemText primary={props.item.name} secondary={props.item.alias}/>
            </ListItemButton>
        </Box>
    )
}