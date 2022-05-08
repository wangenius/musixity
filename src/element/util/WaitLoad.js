import {CircularProgress, styled} from "@mui/material";


const WaitLoadBox = styled("div")({
    width: "100%",
    height: "100%",
    textAlign: "center",
    WebkitAlignItems: "center",
    paddingTop: 200
})

export default function WaitLoad(){
    return (
        <WaitLoadBox>
            <CircularProgress/>
        </WaitLoadBox>
    )
}