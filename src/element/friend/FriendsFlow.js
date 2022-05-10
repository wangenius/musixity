import {Fragment, useEffect, useState} from "react";
import {toGetFollows} from "../../routers/musicApi";
import {connect} from "react-redux";
import Box from "@mui/material/Box";
import {FriendsListItem} from "./FriendsListItem";
import {useNavigate} from "react-router";

function FriendsFlow(props){

    const [friends,setFriends]= useState([])
    const nav =useNavigate()

    useEffect(()=>{
        if (!props.userReducer.user.hasOwnProperty("nickname")){
            nav("/login")
        }
    })

    useEffect(()=>{
        if (props.userReducer.user.hasOwnProperty("nickname")){
            toGetFollows(props.userReducer.user.userId,res=>{
                console.log(res.data)
                setFriends(res.data.follow)
            })
        }
    },[props.userReducer.user])


    return(
        <Box style={{padding:"20px 20px 200px"}}>

            {
                friends.map((item,key)=>{
                    return(
                        <FriendsListItem key={key} num={key} item={item} />
                    )
                })
            }

        </Box>
    )
}
const mapStateToProps = (state) => ({ userReducer: state.userReducer, musicReducer: state.musicReducer});

export default connect(mapStateToProps)(FriendsFlow)