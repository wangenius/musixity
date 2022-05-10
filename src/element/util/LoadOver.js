import {styled} from "@mui/material";


const LoadBox = styled("div")({
    width: "100%",
    height: "20%",
    textAlign: "center",
    WebkitAlignItems: "center",
    paddingTop: 100
})
export default function LoadOver(){
    return(
        <LoadBox >
            <p style={{ textAlign: "center" }}>
                到底了,去看看别的吧
            </p>
        </LoadBox>
    )
}