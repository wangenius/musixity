import * as React from 'react';
import {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import Box from "@mui/material/Box";
import {connect} from "react-redux";
import {
    ArrowBack,
    Brightness5,
    Close,
    Fullscreen,
    FullscreenExit,
    Home,
    HorizontalRule,
    Search,
} from "@mui/icons-material";
import store from "../reducer/store";
import {changeSearchMsg} from "../reducer/searchReducer";
import {Input} from "@arco-design/web-react";
import Btn from "../element/util/Button";
import {IconUser} from "@arco-design/web-react/icon";


function Header(props) {
    let navigate = useNavigate()
    const [isLog,setIsLog] = useState(false);
    const [user,setUser] = useState({});
    const [value,setValue] = useState("")
    const [isMaxFull,setIsMaxFull] = useState(false)
    const [theme,setTheme] = useState(true)

    //
    // const toSearch = () => {
    //     store.dispatch(changeSearchMsg(value))
    //     navigate("/music/search")
    // }

    let minimize = () => {}
    let minToTray = () => {}
    let maxToFull = () => {}
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


    useEffect(()=>{
        document.documentElement.dataset.theme = theme?"blue":"dark"
    })



    return (
        <Box sx={{}} className={"HeaderBar"}>
            <Btn iconItem={<Home/>} className={"iconBtn"} onClick={()=>{navigate("/")}}/>
            <Btn iconItem={<ArrowBack/>} className={"iconBtn"} onClick={()=>{navigate(-1)}}/>
                <Input
                    prefix={<Search />}
                    className={"searchInput"}
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

            {
                isLog?
                    <Btn onClick={() => {navigate("/me")}} iconUrl={user.avatarUrl} className={"textIconBtn"} name={user.nickname}/>
                    :
                    <Btn iconItem={<IconUser/>} className={"textIconBtn"} onClick={() => navigate("/login")} name={"LOGIN"}/>
            }
            {/*<Btn icon={<Settings/>} onClick={()=>{}}/>*/}
            <Box sx={{width: '10px'}}/>
            <Btn iconItem={<Brightness5 />} className={"iconBtn"} onClick={()=>{
                document.documentElement.dataset.theme = theme?"blue":"dark"
                setTheme(!theme)
            }}/>
            <Btn iconItem={<HorizontalRule/>} className={"iconBtn"} onClick={minimize}/>
            {/*<Button icon={<CheckBoxOutlineBlank />} onClick={maxToFull}/>*/}
            <Btn iconItem={isMaxFull?<FullscreenExit />:<Fullscreen />} className={"iconBtn"} onClick={maxToFull}/>
            <Btn iconItem={<Close/>} className={"iconBtn"} onClick={minToTray}/>
        </Box>
    );
}

const mapStateToProps = (state) => ({ userReducer: state.userReducer, musicReducer: state.musicReducer,searchReducer: state.searchReducer});

export default connect(mapStateToProps)(Header);