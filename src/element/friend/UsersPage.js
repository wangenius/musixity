import {connect} from "react-redux";
import {Fragment, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {ArrowCircleUp, Logout, Message} from "@mui/icons-material";
import {Chip, styled} from "@mui/material";
import {toGetLevel, toGetOtherUserInfo, toGetUserInfo, toGetUserPlaylist, toLogOut} from "../../routers/musicApi";
import {PlaylistItem} from "../music/playlist/PlaylistItem";




const UserInfoCard = styled("div")({
    display:"flex",
    cursor:"default",
    position:'relative'
})



function UsersPage(props){

    const [playlist,setPlaylist] = useState([])

    useEffect(()=>{

        toGetUserPlaylist(props.friendsReducer.friends.userId,res=>{
            console.log(res)
            setPlaylist(res.playlist)
        })

    },[props.friendsReducer.friends])

    return (
        <Fragment>
            <UserInfoCard className={"card"}>
                {
                    <img className={"hoverImg"} style={{height: "220px",maxHeight:"220px",minHeight:"220px",minWidth:"220px",maxWidth:"220px",background:"transparent",border:"none",margin:"20px",borderRadius:"15px",overflow:"hidden"}}
                         src={props.friendsReducer.friends.avatarUrl} alt={""}/>

                }

                <Box sx={{marginTop:"20px",marginLeft:"20px",textAlign:"left"}}>
                    <Typography variant="h5" component="h2">
                        { props.friendsReducer.friends.nickname}
                    </Typography>
                    <Typography>
                        { props.friendsReducer.friends.signature}
                    </Typography>

                </Box>

                <Box sx={{position:"absolute",bottom:"20px",right:"20px"}}>
                    <Button startIcon={<Message />}>
                        {"私信"}
                    </Button>
                </Box>
            </UserInfoCard>


            {
                playlist.slice(1,playlist.length).map((item,key)=>{
                    return(
                        <PlaylistItem key={key} num={key} item={item} />
                    )
                })
            }

        </Fragment>
    )
}

const mapStateToProps = (state) => ({ userReducer: state.userReducer, friendsReducer: state.friendsReducer});

export default connect(mapStateToProps)(UsersPage)