import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {connect} from "react-redux";

function Header(props) {
    let navigate = useNavigate()
    const [isLog,setIsLog] = useState(false);
    const [user,setUser] = useState({});

    useEffect(()=>{
        if (props.userReducer.user !==null && props.userReducer.user.hasOwnProperty("nickname")){
            setUser(props.userReducer.user)
            setIsLog(true)
        }else {
            setIsLog(false)
        }

    },[props.userReducer.user])


    return (
        <Toolbar  className={"HeaderBar"} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Box sx={{ flex: 1 }} className={"canDrag"}>
                <Typography className={"MainTitle"}
                            component="h2"
                            variant="h5"
                            color="inherit"
                            noWrap
                            onClick={() => navigate("/")}
                >
                    Genius Hub
                </Typography>
            </Box>

            {
                isLog?
                    <Button onClick={() => {navigate("/me")}} sx={{fontSize:"15px"}} startIcon={<img style={{width:"30px",height:"30px",borderRadius:"4px"}} src={user.avatarUrl} alt={""}/>}>{user.nickname}</Button>
                    :
                    <Button onClick={() => navigate("/login")}  sx={{fontSize:"15px"}}>{"LOGIN"}</Button>
            }


        </Toolbar>
    );
}

const mapStateToProps = (state) => ({ userReducer: state.userReducer, musicReducer: state.musicReducer});

export default connect(mapStateToProps)(Header);