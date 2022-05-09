import * as React from 'react';
import {useNavigate} from "react-router";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {
    ArrowBack,
    Close,
    Home,
    HorizontalRule,
    UnfoldMore
} from "@mui/icons-material";
import store from "../reducer/store";
import {changeSearchMsg} from "../reducer/searchReducer";
import {Input} from "@arco-design/web-react";
import Button from "../element/util/Button";
const {ipcRenderer}  = window.electron;


function Header(props) {
    let navigate = useNavigate()
    const [isLog,setIsLog] = useState(false);
    const [user,setUser] = useState({});
    const [value,setValue] = useState("")

    //
    // const toSearch = () => {
    //     store.dispatch(changeSearchMsg(value))
    //     navigate("/music/search")
    // }

    useEffect(()=>{
        if (props.userReducer.user !==null && props.userReducer.user.hasOwnProperty("nickname")){
            setUser(props.userReducer.user)
            setIsLog(true)
        }else {
            setIsLog(false)
        }
    },[props.userReducer.user])





    return (
        <Box sx={{}} className={"HeaderBar canDrag"}>
            <Button icon={<Home/>} onClick={()=>{navigate("/")}}/>
            <Button icon={<ArrowBack/>} onClick={()=>{navigate(-1)}}/>
            <Box className={"musicSearchBar"}>
                <Input
                    className={"searchInput"}
                    style={{flexGrow:1}}
                    allowClear
                    placeholder='Search what your want'
                    value={value}
                    onChange={ (value, e) => {
                             setValue(value)
                              setTimeout(()=>{
                          store.dispatch(changeSearchMsg(value))
                          navigate("/music/search")
                              },1000)
                            } }
                />
            </Box>
            <Box style={{flex: 1}}/>

            {
                isLog?
                    <Button onClick={() => {navigate("/me")}} sx={{fontSize:"15px"}} icon={<img style={{width:"30px",height:"30px",borderRadius:"4px"}} src={user.avatarUrl} alt={""}/>} name={user.nickname}/>
                    :
                    <Button onClick={() => navigate("/login")}  sx={{fontSize:"15px"}} name={"LOGIN"}/>
            }
            <Button icon={<HorizontalRule/>} onClick={()=>{ipcRenderer.send('window-minimize')}}/>
            <Button icon={<UnfoldMore />} onClick={()=>{ipcRenderer.send('window-minToTray')}}/>
            <Button icon={<Close/>} onClick={()=>{ipcRenderer.send('window-minToTray')}}/>
        </Box>
    );
}

const mapStateToProps = (state) => ({ userReducer: state.userReducer, musicReducer: state.musicReducer,searchReducer: state.searchReducer});

export default connect(mapStateToProps)(Header);