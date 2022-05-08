import * as React from 'react';
import {Outlet} from "react-router-dom";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ToolsBar from "../layout/RouterBar";
import MusicPlayBlock from "../element/music/controlCenter/MusicControlCenter";
import {connect} from "react-redux";
import {toCheckLogStatus, toGetLikeList} from "../routers/musicApi";
import store from "../reducer/store";
import {changeUser} from "../reducer/userReducer";
import {handleLikeSongInStore} from "../reducer/likeListReducer";
import {Affix, BackTop} from "@arco-design/web-react";
import {breakpoint, useViewport} from "../util/viewportContext";
import {AppBar, IconButton} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import {Album, ArrowBack, Backup, Menu, More, Search} from "@mui/icons-material";
import {useNavigate} from "react-router";


function MainPage(props) {
    const { width } = useViewport();
    const nav =useNavigate()
    const [isHidePlayController,setIsHidePlayController] = useState(false)
    const [isHideToolsBar,setIsHideToolsBar] = useState(false)
    const [toolsBarVisible,setToolsBarVisible] = useState(false)
    const [musicBarVisible,setMusicBarVisible] = useState(false)

    useEffect(()=>{

        toCheckLogStatus((data)=>{
            console.log(data)
            if (data.data.profile === null){

            }else {
                //注入个人信息
                store.dispatch(changeUser(data.data.profile))

                //获取个人喜欢的歌曲 注入array
                toGetLikeList(props.userReducer.user.userId,res=>{
                    store.dispatch(handleLikeSongInStore(res.data.ids))
                })
            }
        })

    },[props.userCookieReducer.userCookie])//依赖cookie值初始化store个人信息



    useEffect(()=>{

        if (width > breakpoint.md){
            setIsHidePlayController(false)
            setIsHideToolsBar(false)
        }else {
            setIsHidePlayController(true)
            setIsHideToolsBar(true)
        }

    },[width])



    const handleToolBar = () => {
        if (width <= breakpoint.md){
            setMusicBarVisible(false)
            setToolsBarVisible(!toolsBarVisible)
        }
    }
    const handleMusicBar = () => {
        if (width <= breakpoint.md) {
            setToolsBarVisible(false)
            setMusicBarVisible(!musicBarVisible)
        }
    }

    return (


        <Box>

            <Box sx={{position:"relative"}}>
                <BackTop style={{bottom:80}}/>



                {/*头部标题栏*/}
                <Header  />
                {/*主要面板*/}

                {
                    isHidePlayController?<AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                        <Toolbar>
                            <IconButton color="inherit" aria-label="open drawer" onClick={handleToolBar}>
                                <Menu/>
                            </IconButton>

                            <Box sx={{ flexGrow: 1 }} />
                                <IconButton color="inherit" onClick={()=>{nav(-1)}}>
                                <ArrowBack />
                            </IconButton>
                            <IconButton color="inherit" onClick={handleMusicBar}>
                                <Album />
                            </IconButton>
                        </Toolbar>
                    </AppBar>:""
                }



                <Container maxWidth={"lg"} sx={{paddingBottom:"300px"}}>



                    <Grid container spacing={4} sx={ isHideToolsBar?{display:"block", justifyContent:"center"}:{ justifyContent:"center"}}>

                        <Grid item sm={0} md={0}>
                                <Affix offsetTop={86}>
                                    <ToolsBar handleToolBar={handleToolBar} toolsBarVisible={toolsBarVisible} isHideToolsBar={isHideToolsBar}/>
                                </Affix>
                        </Grid>

                        <Grid item sm={12} md={12} lg={7}>
                            <Outlet />
                        </Grid>


                        <Grid item sm={0} md={0} lg={3}>
                            <Affix offsetTop={86}>
                                <MusicPlayBlock musicBarVisible={musicBarVisible} isHidePlayController={isHidePlayController}/>
                            </Affix>
                        </Grid>



                    </Grid>

                </Container>

                {/*脚注*/}
                <Footer />
            </Box>
        </Box>
    );
}

const mapStateToProps = (state) => ({
    userReducer: state.userReducer,
    userCookieReducer: state.userCookieReducer,
    likeListReducer: state.likeListReducer
});

export default connect(mapStateToProps)(MainPage)