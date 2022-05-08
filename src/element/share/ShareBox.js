import Box from "@mui/material/Box";
import {Fragment, useEffect, useState} from "react";
import {ListItemAvatar, ListItemButton, ListItemText, styled} from "@mui/material";
import {toGetArtistDetail} from "../../routers/musicApi";
import Grid from "@mui/material/Grid";
import {Carousel, Space} from "@arco-design/web-react";
import Avatar from "@mui/material/Avatar";
import {Camera, Comment, Egg, Favorite, QueueMusicOutlined} from "@mui/icons-material";
import store from "../../reducer/store";
import {Image} from "@arco-design/web-react/lib";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import timeTrans from "../../util/timeTrans";
import {changeSong} from "../../reducer/musicReducer";
import {breakpoint, useViewport} from "../../util/viewportContext";


const Share = styled("div")({
    padding:"10px"
})
const SharePhoto = styled("div")({
    padding:"10px",
    alignContent:"center"
})



export default function ShareBox(props){
    const {width} = useViewport()
    const content = JSON.parse(props.item.json)

    const msg = content.msg.split(/#.*?#/g)
    const topic = content.msg.match(/#.*?#/g)

    useEffect(()=>{

    },[props.item.json])

    return(
        <Share className={"card hover"}>

            <Box sx={{display:"flex",paddingTop:"5px"}}>
                <Button sx={{height:"60px",borderRadius:"20px",paddingX:"20px"}} variant={"text"}>
                    <Avatar sx={{margin:"auto",display:"block",marginRight:"10px"}}>
                        <img style={{width: "inherit", height: "inherit"}} src={props.item.user.avatarUrl}
                             alt={<QueueMusicOutlined/>}/>
                    </Avatar>
                    <ListItemText sx={{margin:"auto",display:"block",textAlign:"left"}} primary={
                            props.item.user.nickname
                    } secondary={timeTrans(props.item.eventTime)}/>
                </Button>
            </Box>

            <Box sx={{marginX:2,marginY:1}}>
                {

                    msg.map((item)=>{
                        return(
                                item.split("\n").map((it,index)=>{
                                    return(
                                        (it !== "")?
                                            <Typography key={index}>{it}</Typography>:""
                                    )
                                })
                        )
                    })
                }
            </Box>

            <Box sx={{marginX:2,marginY:1}}>
                {
                    (topic !== null)?
                        topic.map((item,key)=>{
                            return(
                                <Button key={key} variant={"text"}>{item}</Button>
                            )

                        }):""
                }
                {
                    (props.item.tailMark !== null)?
                        <Button variant={"text"} startIcon={<Camera/>}>{props.item.tailMark.markTitle}</Button>:""
                }
            </Box>

            <Box sx={{marginX:1}}>
            {
                (props.item.pics.length !== 0)?

                    <SharePhoto>

                            <Image.PreviewGroup infinite>
                                <Grid container  style={(width > breakpoint.md)?{width:"100%"}:{width:"80vw"}} spacing={1}>


                                    {props.item.pics.map((item, index) =>

                                            <Grid key={index} item xs={(width > breakpoint.md)?3:4} style={{height:140,width:140,overflow:"hidden"}}>

                                                <Image
                                                    src={item.originUrl}
                                                    width={item.width>=item.height?"auto":140}
                                                    height={item.width>=item.height?140:"auto"}
                                                    alt={`lamp${index + 1}`}
                                                />

                                            </Grid>

                                        )}
                                </Grid>
                            </Image.PreviewGroup>

                    </SharePhoto>
                    :""
            }
            </Box>


            <Box sx={{width:"100%",display:"flex",padding:"5px 14px 10px"}}>
                <Button startIcon={<Favorite />}>
                    {props.item.info.likedCount}
                </Button>

                <Button startIcon={<Comment />}>
                    {props.item.info.commentCount}
                </Button>

                <Button startIcon={<Egg />}>
                    {props.item.info.shareCount}
                </Button>


            </Box>


            <Box>
            {
                (content.hasOwnProperty("song"))?
                    <ListItemButton className={"listButton fill2"} onClick={function () {
                        store.dispatch(changeSong(content.song))
                    }}>
                        <ListItemAvatar>
                            <Avatar>
                                <img style={{width: "inherit", height: "inherit"}} src={content.song.img80x80}
                                     alt={<QueueMusicOutlined/>}/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText sx={{flexGrow:1}} primary={content.song.name} secondary={content.song.artists[0].name}/>
                        <ListItemText sx={{flexGrow:0}} secondary={content.song.album.name}/>
                    </ListItemButton>:""
            }

            {
                (content.hasOwnProperty("program"))?
                    <ListItemButton className={"listButton"} onClick={function () {

                    }}>
                        <ListItemAvatar>
                            <Avatar>
                                <img style={{width: "inherit", height: "inherit"}} src={content.program.img80x80}
                                     alt={<QueueMusicOutlined/>}/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText sx={{flexGrow:1}} primary={content.program.name} secondary={content.program.description}/>
                    </ListItemButton>:""
            }
            {
                (content.hasOwnProperty("resource"))?
                    <ListItemButton className={"listButton"} onClick={function () {

                    }}>
                        <ListItemAvatar>
                            <Avatar>
                                <img style={{width: "inherit", height: "inherit"}} src={content.resource.coverImgUrl}
                                     alt={<QueueMusicOutlined/>}/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText sx={{flexGrow:1}} primary={content.resource.title} secondary={content.resource.subTitle}/>
                    </ListItemButton>:""
            }

            </Box>



        </Share>
    )
}