import {Fragment, useState} from "react";
import {List,
    ListItemButton,
    ListItemIcon,
    ListItemText, styled
} from "@mui/material";
import {
    Album,
    ArrowBack, Contacts,
    Drafts, Forum, History, Home,
    People, Person
} from "@mui/icons-material";
import {useNavigate} from "react-router";
import Button from "@mui/material/Button";
import {connect} from "react-redux";
import {changePlaylistType} from "../reducer/playlistTypeReducer";
import store from "../reducer/store";
import {IconRight} from "@arco-design/web-react/icon";
import Box from "@mui/material/Box";


function RouterBar(props) {

    const [openSub,setOpenSub] = useState(1)
    const [types,setTypes] = useState(1)

    let navigate = useNavigate()

    const handleClickMusic = () => {setOpenSub(1);navigate("/music")};

    const handleClickMe = () => {setOpenSub(3);(props.userReducer.user !== null)?navigate("/me"):navigate("/login");props.handleToolBar()};

    const handleClickArtist = () => {setOpenSub(2);navigate("/music/artists");props.handleToolBar()};

    const handleClickShare = () => {setOpenSub(4);navigate("/shares");props.handleToolBar()};


    const handleClickFriends = () => {setOpenSub(5);navigate("/friends");props.handleToolBar()};

    const handleClickHistory = () => {setOpenSub(6);navigate("/history");props.handleToolBar()};

    const handleClickAlbum = (type) => {setTypes(type);store.dispatch(changePlaylistType(type));navigate("/music");props.handleToolBar()};


    const buttons = [
        {
            name:"歌单",
            icon:<Album/>,
            handle:handleClickMusic,
            sub:1
        },        {
            name:"歌手",
            icon:<People/>,
            handle:handleClickArtist,
            sub:2
        },        {
            name:"社区",
            icon:<Forum/>,
            handle:handleClickShare,
            sub:4
        },        {
            name:"朋友",
            icon:<Contacts/>,
            handle:handleClickFriends,
            sub:5
        },        {
            name:"我的",
            icon:<Person/>,
            handle:handleClickMe,
            sub:3
        },        {
            name:"历史",
            icon:<History/>,
            handle:handleClickHistory,
            sub:6
        }
    ]


    const albumButtons = [
        {
            name:"热门歌单",
            icon:<IconRight />,
            type:1
        },        {
            name:"精品歌单",
            icon:<IconRight />,
            type:2
        },        {
            name:"推荐歌单",
            icon:<IconRight />,
            type:3
        },        {
            name:"每日精选",
            icon:<IconRight />,
            type:4
        }
    ]



    const ToolBox = styled("div")({
        width: '100%', maxWidth: 360, bgcolor: 'background.paper',paddingX:"5px"
    })

        return (
            <Box id={"toolsBar"} className={props.toolsBarVisible?"toolsBarVisible":props.isHideToolsBar?"disPlayNone":""}>

                <ToolBox className={"card"}>
                        <List sx={{padding:"10px"}}>
                            {
                                buttons.map((item,key)=>{
                                    return(
                                        <ListItemButton key={key} className={(openSub === item.sub)?"listButton activeBgc":"listButton"} onClick={item.handle}>
                                            <ListItemIcon>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={item.name} />
                                        </ListItemButton>
                                    )
                                })
                            }
                        </List>
                </ToolBox>

                <ToolBox className={"card"} style={(openSub === 1)?{display:"block"}:{display:"none"}}>
                        <List sx={{padding:"10px"}}>
                            {
                                albumButtons.map((item,key)=>{
                                    return(
                                        <ListItemButton sx={{textAlign:"center"}} key={key} className={(types === item.type)?"listButton activeBgc":"listButton"} onClick={()=>{
                                            handleClickAlbum(item.type)
                                        }}>
                                            <ListItemText primary={item.name} />

                                            {
                                                (types === item.type)?
                                                    <ListItemIcon sx={{minWidth:0}}>
                                                    {item.icon}
                                                </ListItemIcon>:""
                                            }

                                        </ListItemButton>
                                    )
                                })
                            }
                        </List>
                </ToolBox>

            </Box>
        )
}

const mapStateToProps = (state) => ({
    userReducer:state.userReducer
});

export default connect(mapStateToProps)(RouterBar)