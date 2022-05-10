import * as React from 'react';
import {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import Box from "@mui/material/Box";
import {connect} from "react-redux";
import {ArrowBack, Close, Fullscreen, FullscreenExit, Home, HorizontalRule, Settings,} from "@mui/icons-material";
import store from "../reducer/store";
import {changeSearchMsg} from "../reducer/searchReducer";
import {Input} from "@arco-design/web-react";
import Button from "../element/util/Button";


function Header(props) {
    let navigate = useNavigate()
    const [isLog,setIsLog] = useState(false);
    const [user,setUser] = useState({});
    const [value,setValue] = useState("")
    const [isMaxFull,setIsMaxFull] = useState(false)

    //
    // const toSearch = () => {
    //     store.dispatch(changeSearchMsg(value))
    //     navigate("/music/search")
    // }

    let minimize = () => {}
    let minToTray = () => {}
    let maxToFull = () => {}
    let fullScreen = () => {}
    try{
        const {ipcRenderer}  = window.electron;
        minimize = () => {
            ipcRenderer.send('window-minimize')
        }
        minToTray = () => {
            ipcRenderer.send('window-minToTray')
        }
        maxToFull = () => {
            ipcRenderer.send('window-maxToFull')
            setIsMaxFull(!isMaxFull)
        }
        fullScreen = () => {
            ipcRenderer.send('window-fullScreen')
        }

    }catch (err){
        console.log(err)
    }

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
                    placeholder='搜索'
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
            <Button icon={<Settings/>} onClick={()=>{}}/>
            <Button icon={<HorizontalRule/>} onClick={minimize}/>
            {/*<Button icon={<CheckBoxOutlineBlank />} onClick={maxToFull}/>*/}
            <Button icon={isMaxFull?<FullscreenExit />:<Fullscreen />} onClick={maxToFull}/>
            <Button icon={<Close/>} onClick={minToTray}/>
        </Box>
    );
}

const mapStateToProps = (state) => ({ userReducer: state.userReducer, musicReducer: state.musicReducer,searchReducer: state.searchReducer});

export default connect(mapStateToProps)(Header);