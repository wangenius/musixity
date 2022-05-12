import {Fragment, useState} from "react";
import {Divider, List} from "@mui/material";
import {
    Album,
    AlbumTwoTone,
    CircleRounded,
    Contacts,
    EventAvailableRounded,
    FireExtinguisher,
    Fireplace,
    Forum,
    History,
    HotTub,
    ListAltTwoTone,
    People,
    Person,
    ReceiptTwoTone,
    Recommend,
    RefreshTwoTone,
    RouterRounded,
    SelectAllTwoTone,
    Subscript,
    Subscriptions,
    SubscriptionsTwoTone
} from "@mui/icons-material";
import {useNavigate} from "react-router";
import {connect, Subscription} from "react-redux";
import {changePlaylistType} from "../reducer/playlistTypeReducer";
import store from "../reducer/store";
import {IconRight} from "@arco-design/web-react/icon";
import Btn from "../element/util/Button";


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
            icon:<ListAltTwoTone />,
            type:1
        },        {
            name:"精品歌单",
            icon:<AlbumTwoTone />,
            type:2
        },        {
            name:"推荐歌单",
            icon:<Recommend />,
            type:3
        },        {
            name:"每日精选",
            icon:<Subscriptions />,
            type:4
        }
    ]


        return (
            <Fragment>

                <List className={"btnList"}>
                    {
                        buttons.map((item,key)=>{
                            return(
                                <Btn key={key} iconItem={item.icon} className={(openSub === item.sub)?"listButton activeBtn":"listButton"} name={item.name} onClick={item.handle}/>
                            )
                        })
                    }
                </List>

                <Divider variant={"fullWidth"}/>

                <List class={(openSub === 1)?"btnList":"none"}>
                    {
                        albumButtons.map((item,key)=>{
                            return(
                                <Btn key={key} iconItem={item.icon}
                                     className={(types === item.type)?"listButton activeBtn":"listButton"} name={item.name} onClick={()=>{
                                    handleClickAlbum(item.type)
                                }}/>
                            )
                        })
                    }
                </List>
            </Fragment>
        )
}

const mapStateToProps = (state) => ({
    userReducer:state.userReducer
});

export default connect(mapStateToProps)(RouterBar)