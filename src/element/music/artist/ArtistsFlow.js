import Box from "@mui/material/Box";
import {Fragment, useEffect, useState} from "react";
import {toGetTopArtist} from "../../../routers/musicApi";
import Button from "@mui/material/Button";
import WaitLoad from "../../util/WaitLoad";
import {Space} from "@arco-design/web-react";
import {Select} from "@arco-design/web-react/lib";
import {ArtistListItem} from "./ArtistListItem";
import InfiniteScroll from "react-infinite-scroll-component";
import {PlayListSongItem} from "../playlist/PlaylistItem";


export function ArtistsFlow(){
    const [result,setResult] = useState([]);
    const [area,setArea] = useState(-1);
    const [type,setType] = useState(-1);
    const [offset,setOffset] = useState(1);
    const [hasMore,setHasMore] = useState(true);
    const Option = Select.Option;

    useEffect(()=>{
        setResult([])
        setOffset(0)

        toGetTopArtist(type,area,10,-1,0,res=>{
            setResult(res.data.artists)
            setOffset(1)
        })
        
    },[area, type])


    const getMore = () => {
        toGetTopArtist(type,area,10,-1,offset*10,res=>{
            setResult(result.concat(res.data.artists))
            setOffset(offset + 1)
        })
    }


    const handleChange = (value,e) => {
        if (value !== undefined){
            setArea(value)

        }
    }
    const handleTypeChange = (value,e) => {
        if (value !== undefined){
            setType(value)
        }
    }


    return(
        <Fragment>
            <Space >
                <Select
                    placeholder='选择地区'
                    style={{ width: 154,marginBottom:"20px"}}
                    onChange={handleChange}
                >
                    <Option value="-1">全部</Option>
                    <Option value="7">华语</Option>
                    <Option value="96">欧美</Option>
                    <Option value="16">韩国</Option>
                    <Option value="8">日本</Option>
                </Select>

                <Select
                    placeholder='选择性别'
                    style={{ width: 154,marginBottom:"20px"}}
                    onChange={handleTypeChange}
                >
                    <Option  value='-1'>全部</Option>
                    <Option value='1'>男歌手</Option>
                    <Option value='2'>女歌手</Option>
                    <Option value='3'>乐队</Option>
                </Select>
            </Space>



                {
                    <InfiniteScroll
                        id={"infiniteScroll"}
                        dataLength={
                            result.length
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
                        scrollableTarget="scrollableDiv"
                    >

                        {
                            result.map((item,key) => {
                                    return (
                                        <ArtistListItem key={key} num={key} item={item}/>
                                    )
                                }
                            )
                        }

                    </InfiniteScroll>
                }


        </Fragment>
    )
}