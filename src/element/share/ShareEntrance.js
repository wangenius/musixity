import {Fragment} from "react";
import {Outlet} from "react-router"


function ShareEntrance(){
    return(
        <Fragment>
            <Outlet />
        </Fragment>
    )
}

export default ShareEntrance