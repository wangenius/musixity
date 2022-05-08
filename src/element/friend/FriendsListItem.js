import {useNavigate} from "react-router";
import Box from "@mui/material/Box";
import {Avatar, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import {QueueMusicOutlined} from "@mui/icons-material";
import store from "../../reducer/store";
import {changeFriendsState} from "../../reducer/friendsReducer";

export function FriendsListItem(props){

    const nav = useNavigate()




    return(
        <Box sx={{display:"flex"}}>
            <Box sx={{textAlign:"center", marginX:"5px",width:"20px",display:"inline-block",lineHeight:"80px"}}>
                {props.num + 1}
            </Box>
            <ListItemButton className={"listButton"}  onClick={()=>{

                store.dispatch(changeFriendsState(props.item))
                nav("/user")
            }}>
                <ListItemAvatar>
                    <Avatar>
                        <img style={{width: "inherit", height: "inherit"}} src={props.item.avatarUrl}
                             alt={<QueueMusicOutlined/>}/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.item.nickname} secondary={props.item.remarkName}/>
            </ListItemButton>
        </Box>
    )
}