import {Fragment, useEffect} from "react";


export default function Btn(props){
    useEffect(()=>{

    })

    return(
            <Fragment>
                {
                        <button className={props.className} disabled={props.disabled || false} onClick={props.onClick}>
                            {
                                props.hasOwnProperty('iconItem')?
                                props.iconItem:
                                    props.hasOwnProperty("iconUrl")?
                                <img src={props.iconUrl} alt={""}/>:""
                            }
                            <p>
                                {props.name}
                            </p>
                        </button>
                }
            </Fragment>
    )
}