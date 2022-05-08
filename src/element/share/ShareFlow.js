import Box from "@mui/material/Box";
import InfiniteScroll from "react-infinite-scroll-component";
import WaitLoad from "../util/WaitLoad";
import Grid from "@mui/material/Grid";
import MusicPlaylistButton from "../music/playlist/MusicPlaylistButton";
import {useEffect, useState} from "react";
import {toGetShares, toGetSong} from "../../routers/musicApi";
import ShareBox from "./ShareBox";
import {connect} from "react-redux";
import {useNavigate} from "react-router";

function ShareFlow(props)    {

    const [shares,setShares] = useState([])
    const [pageSize,setPageSize] = useState('')
    const [lastTime,setLastTime] = useState("")
    const [hasMore,setHasMore] = useState(true)
    const nav =useNavigate()

    useEffect(()=>{
        if (props.userReducer.user.hasOwnProperty("nickname")){
            getMore()
        }else {
            nav("/login")
        }
    },[props.userReducer.user])


    // useEffect(()=>{
    //     if (!props.userReducer.user.hasOwnProperty("nickname")){
    //
    //     }
    // })


    const getMore = () => {
      toGetShares(pageSize,lastTime,res=>{
          console.log(res.data.event)
          setShares(shares.concat(res.data.event))

          setLastTime(res.data.lasttime)
      })
    }



    return(
        <Box>
            <InfiniteScroll
                className={"overVisible"}
                dataLength={
                    shares.length
                }
                loader={
                    <WaitLoad />
                }
                hasMore={hasMore}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        Yay! You have seen it all
                    </p>
                }
                next={getMore}

            >

                    {
                        shares.map((item,key) => {
                                return (

                                        <ShareBox key={key} item={item}/>

                                )
                            }
                        )
                    }


            </InfiniteScroll>
        </Box>
    )
}

const mapStateToProps = (state) => ({ userReducer: state.userReducer, searchReducer: state.searchReducer});


export default connect(mapStateToProps)(ShareFlow)