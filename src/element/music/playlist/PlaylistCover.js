import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Card} from "@mui/material";
import Button from "@mui/material/Button";
import {ChatBubbleOutline, Favorite, FavoriteBorder} from "@mui/icons-material";
import {useState} from "react";

export function PlaylistCover(props){

    const [isLike,setIsLike] = useState(false)


    const handleChangeLike = () => {
      setIsLike(!isLike)
    }


    return(
        <Card
            className={"card"}
            style={{ marginTop: 16,display:"flex",cursor:"default",position:"relative"}}
        >
            {

                <img  className={" hoverImg"} style={{width: "220px", height: "220px",minWidth:"220px",background:"transparent",border:"none",margin:"20px",borderRadius:"15px",overflow:"hidden"}}
                  src={props.imgUrl} alt={""}/>
            }

            <Box>
                <Typography variant="h5" component="h2" sx={{margin:"26px"}}>
                    {props.name}
                </Typography>
                <Typography sx={{margin:"20px"}}>
                    {props.description}
                </Typography>
            </Box>



            <Box sx={{position:"absolute",bottom:"20px",right:"20px"}}>
                <Button startIcon={<ChatBubbleOutline />}>
                    评论
                </Button>
                <Button startIcon={isLike ? <Favorite />:<FavoriteBorder />} onClick={handleChangeLike}>
                    喜欢
                </Button>
            </Box>
        </Card>
    )
}