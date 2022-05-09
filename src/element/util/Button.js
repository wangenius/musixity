import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Fragment} from "react";

export default function btn(props){

    return(
            <Fragment>
                {

                    props.hasOwnProperty("name")?

                        <button className={"btn"} onClick={props.onClick} style={{display:'flex',width:"fit-content",borderRadius:8,padding:"0 2px",}}>
                            {props.icon}
                            <Typography style={{padding:"0 5px"}}>
                                {props.name}
                            </Typography>
                        </button>:
                        <button  className={"btn"} onClick={props.onClick}>
                            {props.icon}
                        </button>

                }

            </Fragment >
    )
}