import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Card} from "@mui/material";
import Button from "@mui/material/Button";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {toGetArtistDetail} from "../../../routers/musicApi";

export function ArtistCover(props){

    const [isLike,setIsLike] = useState(false)
    const [avatar,setAvatar] = useState(props.artist.picUrl)


    const handleChangeLike = () => {
        setIsLike(!isLike)
    }

    useEffect(()=>{

        if (props.artist.picUrl === undefined){
            toGetArtistDetail(props.artist.id,res =>{
                setAvatar(res.data.artist.cover)
            })
        }
    },[props.artist])


    return(
        <Box
            className={"card"}
            style={{ marginTop: 16,display:"flex",cursor:"default",position:"relative"}}
        >
            {

                <img className={"hover"} style={{height: "auto",maxHeight:"initial",minHeight:"100px",minWidth:"220px",maxWidth:"220px",background:"transparent",border:"none",margin:"20px",borderRadius:"15px",overflow:"hidden"}}
                     src={avatar} alt={""}/>
            }

            <Box sx={{marginTop:"20px",marginLeft:"20px",textAlign:"left",paddingRight:"26px"}}>
                <Typography variant="h5" component="h2">
                    {props.artist.name}
                </Typography>
                <Typography>
                    {props.artist.alias}
                </Typography>
                <Typography variant={"subtitle2"}>
                    { (props.details.hasOwnProperty("briefDesc")) ?  props.details.briefDesc.slice(0,props.details.briefDesc.indexOf('。', 0) + 1): ""}
                </Typography>
            </Box>



            <Box sx={{position:"absolute",bottom:"20px",right:"20px"}}>
                <Button startIcon={isLike ? <Favorite />:<FavoriteBorder />} onClick={handleChangeLike}>
                    喜欢
                </Button>
            </Box>
        </Box>
    )
}