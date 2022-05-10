import Box from "@mui/material/Box";
import {Fragment, useEffect, useState} from "react";
import {toGetSongHotComments} from "../../../routers/musicApi";
import {Avatar, Card, ListItem, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import Typography from "@mui/material/Typography";

export function CommentBox(props){

    const [comments,setComments] = useState([])


    useEffect(()=>{
        toGetSongHotComments(props.id,2,res=>{
            console.log(res)
            setComments(res.hotComments.slice(0,2))
        })
    },[props.id])

    return(
        <Box className={props.isFull?"commentFull card": "card"}>
            {
                (comments !== [])?
                comments.map((item,key)=>{
                    return(
                        <ListItemButton key={key} className={"listButton"}  sx={{padding:"0"}}>
                            <ListItem alignItems="flex-start" >
                                <ListItemAvatar>
                                    <Avatar alt="Travis Howard" src={item.user.avatarUrl} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.user.nickname}
                                    secondary={
                                        <Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >

                                            </Typography>
                                            {item.content}
                                        </Fragment>
                                    }
                                />
                            </ListItem>



                        </ListItemButton>
                    )
                }):""
            }
        </Box>
    )
}