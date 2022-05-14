import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Avatar, Card} from "@mui/material";
import Button from "@mui/material/Button";
import {ChatBubbleOutline, Favorite, FavoriteBorder} from "@mui/icons-material";
import {useEffect, useState} from "react";
import Btn from "../../util/Button";
import {numberToWan} from "../../../util/mathUtil";
import timeTrans from "../../../util/timeTrans";
import {Collapse} from "@arco-design/web-react";

export function PlaylistCover(props){

    const [isLike,setIsLike] = useState(false)
    const [list,setList] = useState(false)
    const [creator,setCreator] = useState({})
    const CollapseItem = Collapse.Item;


    const handleChangeLike = () => {
      setIsLike(!isLike)
    }

    useEffect(()=>{
        console.log(props.list)
        if (props.list.hasOwnProperty("creator")){
            setCreator(props.list.creator)
        }
    },[props.list])



    return(
        <Box className={"playlistCover"}>
            {
                <img  className={"hoverImg"} src={props.list.coverImgUrl} alt={""}/>
            }

            <Box sx={{margin:"26px",flex:1}}>
                <h2>
                    {props.list.name}
                </h2>
                <Box style={{display:"flex"}}>
                    <Btn className={"textIconBtn"} name={creator.nickname} onClick={()=>{
                        console.log(creator.userId)}} iconUrl={creator.avatarUrl}/>
                    <p>
                        {"创建时间" + timeTrans(props.list.createTime)}
                    </p>
                </Box>

                {/*<p>*/}
                {/*    {creator.userId}*/}
                {/*</p>*/}
                <Box style={{display:"flex"}}>
                    <p>
                        {"播放数量" + numberToWan(props.list.playCount)}
                    </p>
                    <p>
                        {"订阅数量" + props.list.subscribedCount}
                    </p>
                </Box>


                {
                    props.list.tags!==undefined?
                    props.list.tags.map((value,key) => {
                        return(
                            <Button key={key}>{value}</Button>
                        )
                    }):""
                }

                <Collapse accordion expandIconPosition={"right"} style={{width:"100%"}}>
                    <CollapseItem header='简介' style={{width:"100%"}}  name={"1"}>
                        {props.list.description}
                    </CollapseItem>
                </Collapse>
            </Box>



            <Box sx={{position:"absolute",bottom:"20px",right:"20px"}}>
                {/*<Button startIcon={<ChatBubbleOutline />}>*/}
                {/*    评论*/}
                {/*</Button>*/}
                {/*<Button startIcon={isLike ? <Favorite />:<FavoriteBorder />} onClick={handleChangeLike}>*/}
                {/*    喜欢*/}
                {/*</Button>*/}
            </Box>
        </Box>
    )
}