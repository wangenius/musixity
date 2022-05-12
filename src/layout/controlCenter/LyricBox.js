import {Fragment, useEffect, useRef, useState} from "react";
import {toGetLyrics} from "../../routers/musicApi";
import Box from "@mui/material/Box";

export default function Lyric(props){

    const [position,setPosition] = useState(0)
    const lyr = useRef([])

    useEffect(()=>{

        toGetLyrics(props.id,res=>{
            lyr.current =  createLrcObj(res.data.lrc.lyric).ms
        })

        // console.log(getTimeTags(lyrics))
    },[props.id])


    useEffect(()=>{
        for (let i = 0; i < lyr.current.length; i++) {
            if(props.position - lyr.current[i].t < 0){
                setPosition(i);
                break;
            }
        }




    },[props.position])


    useEffect(()=>{
        try {

            const parent = document.getElementById("lyric")
            const child = document.getElementById("activeLyric")
            if (props.isFull){
                parent.scrollTo(
                    {
                        top: child.offsetTop - 200,
                        behavior: 'smooth',
                    }
                )
            }else {
                setTimeout(()=>{
                    parent.scrollTo(
                        {
                            top: child.offsetTop - 2,
                            behavior: 'smooth',
                        }
                    )
                },200)
            }


        }catch {

        }
    },[position])


    return(

            <Fragment>
                {
                    lyr.current.map((item,key)=>{

                        return(
                            (item.c !== "")?
                                <Box
                                    id={(position - 1 === key)?"activeLyric": null}
                                    className={(position - 1 === key)?"lyric activeLyric":"lyric"}
                                    onClick={()=>{props.handleLyric(item.t)}}
                                    key={key}>
                                    {item.c}
                                </Box>:""
                        )
                    })
                }
            </Fragment>

    )
}




function createLrcObj(lrc) {


    const oLRC = {
        ti: "", //歌曲名
        ar: "", //演唱者
        al: "", //专辑名
        by: "", //歌词制作人
        offset: 0, //时间补偿值，单位毫秒，用于调整歌词整体位置
        ms: [] //歌词数组{t:时间,c:歌词}
    };


    let i;
    if(lrc.length===0) return;
    var lrcs = lrc.split('\n');//用回车拆分成数组
    for(i in lrcs) {//遍历歌词数组
        lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
        let t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]"));//取[]间的内容
        let s = t.split(":");//分离:前后文字
        if(isNaN(parseInt(s[0]))) { //不是数值
            for (i in oLRC) {
                if (i !== "ms" && i === s[0].toLowerCase()) {
                    oLRC[i] = s[1];
                }
            }
        }else { let k;
//是数值
            var arr = lrcs[i].match(/\[(\d+:.+?)\]/g);//提取时间字段，可能有多个
            var start = 0;
            for(k in arr){
                start += arr[k].length; //计算歌词位置
            }
            var content = lrcs[i].substring(start);//获取歌词内容
            for (k in arr){
                t = arr[k].substring(1, arr[k].length - 1);//取[]间的内容
                s = t.split(":");//分离:前后文字
                oLRC.ms.push({//对象{t:时间,c:歌词}加入ms数组
                    t: (parseFloat(s[0])*60+parseFloat(s[1])).toFixed(3),
                    c: content
                });
            }
        }
    }
    oLRC.ms.sort(function (a, b) {//按时间顺序排序
        return a.t-b.t;
    });

    return oLRC;


    // for(i in oLRC){ //查看解析结果
    //     console.log(i,":",oLRC[i]);
    // }
}