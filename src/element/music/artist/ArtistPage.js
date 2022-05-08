import Box from "@mui/material/Box";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {toGetArtistDesc, toGetArtistDetail, toGetArtistSongs} from "../../../routers/musicApi";
import {ArtistInfoBox} from "./ArtistInfoBox";
import {SongListItem} from "./ArtistSongListItem";
import {FormControl, FormControlLabel, RadioGroup} from "@mui/material";
import Radio from "@mui/material/Radio";
import {ArtistCover} from "./ArtistCover";
import Button from "@mui/material/Button";
import {breakpoint, useViewport} from "../../../util/viewportContext";
import InfiniteScroll from "react-infinite-scroll-component";
import WaitLoad from "../../util/WaitLoad";
import {PlayListSongItem} from "../playlist/PlaylistItem";

function ArtistPage(props){
    const [details,setDetails] = useState({})
    const [songs,setSongs] = useState([])
    const [value,setValue] = useState("1")
    const [offset,setOffset] = useState(0)
    const [hasMore,setHasMore] = useState(true)
    let artist = props.artistReducer.artist
    const { width } = useViewport();
    useEffect(()=>{

        toGetArtistDesc(artist.id,res=>{
            console.log(res)
            setDetails(res)
        });

        handleMoreSong()

    },[artist.id])
    

    const handleValueChange = (e) => {

      setValue(e.target.value)
        console.log(value)
    }

    const handleMoreSong = () => {
        toGetArtistSongs(artist.id,"hot",10,offset*10,res=>{
            setOffset(offset + 1)
            setSongs(songs.concat(res.songs))
        })
    }

    return(
        <Box sx={{textAlign:"center"}}>

            <FormControl>
                <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleValueChange}
                >
                    <FormControlLabel value="1" control={<Radio />} label="单曲" />
                    <FormControlLabel value="2" control={<Radio />} label="歌手详情" />
                </RadioGroup>
            </FormControl>


            <Box>
                {
                    (value === "1" && songs !== undefined)?
                        <Box>
                            {
                                (width>breakpoint.md)?<ArtistCover artist={artist} details={details}/>:""
                            }

                            {
                                <InfiniteScroll
                                    id={"infiniteScroll"}
                                    className={"overVisible"}
                                    dataLength={
                                        songs.length
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
                                    next={handleMoreSong}

                                >

                                    {
                                        songs.map((item,key) => {
                                                return (
                                                    <SongListItem key={key} playlist={songs} num={key} song={item}/>
                                                )
                                            }
                                        )
                                    }

                                </InfiniteScroll>
                            }






                        </Box>
                        :
                    (value === "2")?
                        <ArtistInfoBox artist={artist} details={details}/>
                        :
                        ""

                }
            </Box>

        </Box>
    )
}

const mapStateToProps = (state) => ({ userReducer: state.userReducer, musicReducer: state.musicReducer, artistReducer: state.artistReducer});
export default connect(mapStateToProps)(ArtistPage)