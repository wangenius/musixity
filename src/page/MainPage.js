import * as React from 'react';
import {Fragment, useEffect, useState} from 'react';
import {Outlet} from "react-router-dom";
import Header from "../layout/Header";
import Box from "@mui/material/Box";
import RouterBar from "../layout/RouterBar";
import MusicPlayBlock from "../element/music/controlCenter/MusicControlCenter";
import {connect} from "react-redux";
import {toCheckLogStatus, toGetLikeList} from "../routers/musicApi";
import store from "../reducer/store";
import {changeUser} from "../reducer/userReducer";
import {handleLikeSongInStore} from "../reducer/likeListReducer";
import {BackTop} from "@arco-design/web-react";
import {breakpoint, useViewport} from "../util/viewportContext";
import {Divider} from "@mui/material";


function MainPage(props) {
    const { width } = useViewport();
    const [isHidePlayController,setIsHidePlayController] = useState(false)
    const [isHideToolsBar,setIsHideToolsBar] = useState(false)
    const [toolsBarVisible,setToolsBarVisible] = useState(false)
    const [musicBarVisible,setMusicBarVisible] = useState(false)

    useEffect(()=>{
        const root = document.documentElement
        root.className = 'arcoBlue'
    },[])

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
    return (




            <Fragment>
                {/*头部标题栏*/}
                <Header />

                <Divider variant={"fullWidth"}/>

                <Box style={{marginLeft:0,width:"100vw",justifyContent:"center",overflow:"visible",display:"flex"}}>
                    <RouterBar handleToolBar={handleToolBar} toolsBarVisible={toolsBarVisible} isHideToolsBar={isHideToolsBar}/>

                    <Box id="scrollableDiv" className={"infiniteFlow"} style={{flexGrow:1,position:"relative",textAlign:"center"}}>
                        <BackTop
                            easing={'linear'}
                            duration={600}
                            style={{ position: 'fixed', right: 400, bottom: 60 }}
                            visibleHeight={30}
                            target={() => document.getElementById('scrollableDiv')}
                        />
                        <Outlet />
                    </Box>

                    <MusicPlayBlock musicBarVisible={musicBarVisible} isHidePlayController={isHidePlayController}/>
                </Box>
            </Fragment>
    );
}

const mapStateToProps = (state) => ({
    userReducer: state.userReducer,
    userCookieReducer: state.userCookieReducer,
    likeListReducer: state.likeListReducer
});

export default connect(mapStateToProps)(MainPage)