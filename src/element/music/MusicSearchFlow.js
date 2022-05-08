import Box from "@mui/material/Box";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {toSearch} from "../../routers/musicApi";
import WaitLoad from "../util/WaitLoad";
import {Empty, Radio} from "@arco-design/web-react";
import {PlaylistItem, PlayListSongItem} from "./playlist/PlaylistItem";
import {ArtistListItem} from "./artist/ArtistListItem";




function MusicSearchFlow(props){
    const [result,setResult] = useState({});
    const [value,setValue] = useState(1);
    const RadiosGroup = Radio.Group;


    useEffect(()=>{

        if (props.searchReducer.searchMsg !== undefined){

            toSearch(props.searchReducer.searchMsg,value,data => {

                if (data.result !== undefined){
                    setResult(data.result)
                }else {
                    setResult({isEmpty:true})
                }
            })
        }else{
            setResult({isEmpty:true})
        }

    },[props.searchReducer.searchMsg,value])

    const handleChange = (value,e) => {
            setValue(value)
    }

    return(
        <Box sx={{textAlign:"center"}}>

            <RadiosGroup
                defaultValue='1'
                style={{ marginRight: 20, marginBottom: 20 }}
                onChange={handleChange}
            >
                <Radio  value='1'>单曲</Radio>
                <Radio value='100'>歌手</Radio>
                <Radio value='1000'>歌单</Radio>
            </RadiosGroup>


            {
                (result.hasOwnProperty("songCount") && result.songCount !== 0)?
                    result.songs.map((item,key) => {
                        return (
                            <PlayListSongItem key={key} playlist={result.songs} num={key} item={item}/>
                        )
                    })
                :
                    (result.hasOwnProperty("artistCount") && result.artistCount !== 0) ?
                        result.artists.map((item,key) => {
                            return (
                                <ArtistListItem key={key} num={key} item={item}/>

                            )
                        })
                        :
                        (result.hasOwnProperty("playlistCount") && result.playlistCount !== 0)?
                            result.playlists.map((item,key) => {
                                return (
                                    <PlaylistItem item={item} key={key} num={key} />
                                )
                            })
                            :
                            (result.playlistCount === 0 || result.songCount === 0 || result.artistCount === 0 )?
                                <Box>没有找到您要的内容</Box>
                            :
                                (result.isEmpty === true || props.searchReducer.searchMsg === "" || result === {} || false)?
                                    <Empty style={{marginTop:"50px"}} description={"请输入您需要查找的内容"}/>
                                    :
                            <WaitLoad/>



            }

        </Box>
    )
}

const mapStateToProps = (state) => ({ userReducer: state.userReducer, searchReducer: state.searchReducer});


export default connect(mapStateToProps)(MusicSearchFlow)