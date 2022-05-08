import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router";
import {toGetCaptcha, toLogWithCaptcha, toLogWithPassword} from "../../../routers/musicApi";
import {useEffect, useState} from "react";
import {Grow, useTheme} from "@mui/material";
import {useSnackbar} from "notistack";



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

    useEffect(()=>{
    })



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


    //监听手机号码
    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
    }
    //监听验证码
    const handleCaptchaChange = (e) => {
        setCaptcha(e.target.value)
    }
    //监听验证码
    const handlePasswordChange = (e) => {

        setPassword(e.target.value)
    }

    //判断格式是否正确
    const isPhoneAndCaptcha = () => {
      return phone.length === 11 && captcha.length === 4
    }


    const handleLogin = () => {
        if (usePassword){
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
        }else {
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
        }
    }




    return (

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <Grid container>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="phone"
                            name="phone"
                            autoComplete="phone"
                            autoFocus
                            value={phone}
                            onChange={handlePhoneChange}
                        />

                            <Box hidden={!usePassword}>
                                <Grid item xs>
                                    <TextField
                                        margin="normal"
                                        required
                                        name="captcha"
                                        label="captcha"
                                        id="captcha"
                                        value={captcha}
                                        onChange={handleCaptchaChange}
                                    />
                                </Grid>

                                <Grid item>
                                    <Button
                                        disabled={buttonDisabled || false}
                                        variant="text"
                                        onClick={handleGetCaptcha}
                                        sx={{display:"inline-flex",height:"100%"}}
                                    >

                                        {captchaLabel}
                                    </Button>
                                </Grid>
                            </Box>
                            <Box hidden={usePassword}>
                                <Grid item xs>
                                    <TextField
                                        margin="normal"
                                        required
                                        name="password"
                                        label="password"
                                        id="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                </Grid>
                            </Box>
                        </Grid>




                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleLogin}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>


                        <Grid container>

                            <Grid item xs>
                                <Button size={"small"}
                                        onClick={() => {
                                            setUsePassword(!usePassword)
                                        }}
                                >
                                    切换登录方式
                                </Button>
                            </Grid>

                            <Grid item>
                                <Button size={"small"}
                                    onClick={() => {navigate("/login/signup")}}
                                >
                                    Don't have an account? Sign Up
                                </Button>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>

    );
}