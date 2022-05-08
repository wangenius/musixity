import {Fragment, useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router"
import Box from "@mui/material/Box";
import {Input} from "@arco-design/web-react";
import store from "../../reducer/store";
import {changeSearchMsg} from "../../reducer/searchReducer";
import {IconButton} from "@mui/material";
import {SearchRounded} from "@mui/icons-material";



function ShareEntrance(props){

    const [value,setValue] = useState("")

    useEffect(()=>{


    })

    const toSearch = () => {

    }

    return(
        <Fragment>

            {/*搜索*/}
            <Box className={"musicSearchBar"} sx={{marginBottom:"26px"}}>

                <Input style={{borderRadius:"20px",paddingLeft:"20px"}} className={"searchInput listButton"} value={value || ""} id="standard-basic" placeholder="Search…"
                       onChange={ (value, e) => {
                           setValue(value)
                } }/>
                <IconButton sx={{width:"45px",height:"45px",margin:"10px"}} onClick={toSearch}>
                    <SearchRounded/>
                </IconButton>
            </Box>

            <Outlet />
        </Fragment>
    )
}

export default ShareEntrance