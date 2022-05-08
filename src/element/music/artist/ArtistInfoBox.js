import {Card, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export function ArtistInfoBox(props){
    return(
        <Card className={"card"}>
            <CardMedia
                component="img"
                image={props.artist.picUrl}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.artist.name || ""}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.details.briefDesc || "" }
                </Typography>
                {
                    (props.details.hasOwnProperty("introduction"))?
                        props.details.introduction.map((item,key) =>
                        {
                            return(
                                <Box key={key}>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {item.ti || ""}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.txt || "" }
                                    </Typography>
                                </Box>

                            )
                        }) : ""
                }
            </CardContent>
        </Card>
    )
}