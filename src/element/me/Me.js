import {connect} from "react-redux";
import {Fragment, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {ArrowCircleUp, Face, Logout} from "@mui/icons-material";
import {Chip, styled} from "@mui/material";
import MeLikeSongsFlow from "./MeLikeSongsFlow";
import {toGetLevel, toLogOut} from "../../routers/musicApi";
import store from "../../reducer/store";
import {changeUser, changeUserCookie} from "../../reducer/userReducer";
import {useNavigate} from "react-router";



const UserInfoCard = styled("div")({
    display:"flex",
    cursor:"default",
    position:'relative'
})



function Me(props){
    const nav =useNavigate()
    const [level,setLevel] = useState({})


    useEffect(()=>{
        if (props.userReducer.user.hasOwnProperty("nickname")){
            toGetLevel(res=>{
                console.log(res)
                setLevel(res.data)
            })
        }else {
            nav("/login")
        }
    },[props.userReducer.user])


    // useEffect(()=>{
    //     if (!props.userReducer.user.hasOwnProperty("nickname")){
    //
    //     }
    // })

    const handleLogOut = () => {
      toLogOut(res=>{
          localStorage.removeItem('USERINFO')


          store.dispatch(changeUser({}))
          store.dispatch(changeUserCookie({}))
          // window.location.replace("/")
      })
    }

    return (
        <Fragment>
        <UserInfoCard className={"card"}>
            {
                <img className={"hoverImg"} style={{height: "220px",maxHeight:"220px",minHeight:"220px",minWidth:"220px",maxWidth:"220px",background:"transparent",border:"none",margin:"20px",borderRadius:"15px",overflow:"hidden"}}
                     src={props.userReducer.user.avatarUrl} alt={""}/>

            }

                <Box sx={{marginTop:"20px",marginLeft:"20px",textAlign:"left"}}>
                    <Typography variant="h5" component="h2">
                        { props.userReducer.user.nickname}
                        {
                            (level.hasOwnProperty("data"))?
                                <Chip sx={{marginLeft:"5px"}} size={"small"} color="primary" icon={<ArrowCircleUp />} label={level.data.level + "级"} variant="outlined" />
                                :""
                        }
                    </Typography>
                    <Typography>
                        { props.userReducer.user.signature}
                    </Typography>

                </Box>

                <Box sx={{position:"absolute",bottom:"20px",right:"20px"}}>
                    <Button startIcon={<Logout />} onClick={handleLogOut}>
                        登出
                    </Button>
                </Box>
        </UserInfoCard>


            <MeLikeSongsFlow />

        </Fragment>
    )
}

const mapStateToProps = (state) => ({ userReducer: state.userReducer, musicReducer: state.musicReducer});

export default connect(mapStateToProps)(Me)