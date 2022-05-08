import {Fragment} from "react";
import {Outlet} from "react-router-dom"


function FriendsEntrance(props){

    return(
        <Fragment>
            <Outlet/>
        </Fragment>
    )
}


export default FriendsEntrance