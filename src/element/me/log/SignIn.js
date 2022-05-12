import * as React from 'react';
import {Fragment, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router";
import {toGetCaptcha, toLogWithCaptcha, toLogWithPassword} from "../../../routers/musicApi";
import {Grow} from "@mui/material";
import {useSnackbar} from "notistack";
import {Input} from "@arco-design/web-react";
import {Numbers, Password, Search} from "@mui/icons-material";
import Btn from "../../util/Button";

export default function SignIn() {

    const { enqueueSnackbar } = useSnackbar();
    const [phone,setPhone] = useState("");
    let navigate = useNavigate()
    const [usePassword,setUsePassword] = useState(true)

    //hook
    const [captchaLabel,setCaptchaLabel] = useState("发送验证码");
    const [buttonDisabled,setButtonDisabled] = useState(false);
    const [captcha,setCaptcha] = useState("");
    const [password,setPassword] = useState("");


    //返回提醒
    const alertSnack = (msg,variant) => {
        enqueueSnackbar(msg, {
            variant: variant,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },TransitionComponent: Grow,autoHideDuration: 2000,
        })
    }


    //发送验证码
    const handleGetCaptcha = () => {
        if (phone.length === 11){
            setButtonDisabled(true)
            setCaptchaLabel("验证码已发送");
            setTimeout(()=>{setButtonDisabled(false)},60000)
            toGetCaptcha(phone,res => {
                console.log(res)
                if (res.data === true){
                    alertSnack("发送成功,请等待接收","success")
                }
            }, err =>{
                alertSnack("您给的电话号码有误","error");
                setButtonDisabled(false)
            })
        }else {
            alertSnack("你的号码有点问题","error")
        }
    }

    //判断格式是否正确
    const isPhoneAndCaptcha = () => {
      return phone.length === 11 && captcha.length === 4
    }


    //登录
    const handleLogin = () => {
        if (usePassword){
            if(phone.length === 11){
                toLogWithPassword(phone,password,res =>{

                    localStorage.setItem('USERINFO',res.cookie)
                    window.location.replace("/")

                },err => {
                    console.log(err)
                })
            }else {
                alertSnack("你的号码有点问题","error")
            }
        }else {
            if (isPhoneAndCaptcha){
                toLogWithCaptcha(phone,captcha,res =>{
                    console.log(res)
                    localStorage.setItem('USERINFO',res.cookie)
                    window.location.replace("/")
                    console.log(res)
                },err => {
                    console.log(err)
                })
            }
        }
    }




    return (

                <Fragment>
                    <Typography component="h1" variant="h5">
                        登录
                    </Typography>
                    <Box className={"logInputPanel"}>
                        <Box className={"flex"}>
                            <Input
                                className={'input'}
                                prefix={<Search />}
                                placeholder='手机号'
                                id="phone"
                                autoFocus
                                value={phone}
                                onChange={(value,e)=>{
                                    setPhone(value)
                                }}
                            />
                        </Box>

                        <Box className={!usePassword?"flex":"none"}>
                                <Input
                                    className={'input'}
                                    id="captcha"
                                    prefix={<Numbers />}
                                    placeholder='验证码'
                                    value={captcha}
                                    onChange={(value,e)=>{
                                        setCaptcha(value)
                                    }}
                                />
                            <Btn className={"textBtnActive"} onClick={handleGetCaptcha} name={captchaLabel} disabled={buttonDisabled} />
                        </Box>
                        <Box className={usePassword?"flex":"none"}>
                                <Input.Password
                                    defaultValue='password'
                                    className={'input'}
                                    prefix={<Password />}
                                    placeholder='密码'
                                    id="password"
                                    value={password}
                                    onChange={(value,e)=>{
                                        setPassword(value)
                                    }}
                                />
                        </Box>
                        <Box className={'flex'}>
                            <Btn className={"textBtnActive logInBtn"} onClick={handleLogin} name={"登录"}  />
                        </Box>




                        <Box className={'flex'}>

                                <Btn className={"textBtn"} name={"切换登录方式"} onClick={() => {setUsePassword(!usePassword)}}/>

                                <Box sx={{flex:1}}/>

                                <Btn className={"textBtn"} name={"没有帐户? 去注册"} onClick={() => {navigate("/login/signup")}}/>

                        </Box>

                    </Box>
                </Fragment>

    );
}