import {Outlet} from "react-router-dom"
import {Fragment, useState} from "react";
import {IconButton} from "@mui/material";
import {SearchRounded} from "@mui/icons-material";
import {connect} from "react-redux";
import {changeSearchMsg} from "../../reducer/searchReducer";
import store from "../../reducer/store";
import {useNavigate} from "react-router";
import {Input} from "@arco-design/web-react";
import Box from "@mui/material/Box";



function MusicEntrance(props){

    const navigate = useNavigate()
    const [value,setValue] = useState(props.searchReducer.searchMsg)

    
    const toSearch = () => {
        store.dispatch(changeSearchMsg(value))
        navigate("/music/search")
    }
    
    return (
            <Fragment >
                    {/*搜索*/}
                    {/*<Box className={"musicSearchBar"}>*/}
                    {/*    <Input style={{borderRadius:"20px",paddingLeft:"20px"}} className={"searchInput listButton"} value={value} id="standard-basic" placeholder="Search…" onChange={ (value, e) => {*/}
                    {/*        setValue(value)*/}
                    {/*        setTimeout(()=>{*/}
                    {/*            store.dispatch(changeSearchMsg(value))*/}
                    {/*            navigate("/music/search")*/}
                    {/*        },1000)*/}
                    {/*    } }/>*/}
                    {/*    <IconButton sx={{width:"45px",height:"45px",margin:"10px"}} onClick={toSearch}>*/}
                    {/*        <SearchRounded/>*/}
                    {/*    </IconButton>*/}
                    {/*</Box>*/}

                    {/*内容*/}
                    <Outlet />

            </Fragment>
    )
}

const mapStateToProps = (state) => ({ userReducer: state.userReducer, searchReducer: state.searchReducer});


export default connect(mapStateToProps)(MusicEntrance)