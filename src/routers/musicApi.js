//后端主页
import axios from "./musicAxios";

let cookie = localStorage.getItem("USERINFO")

export const toGetTopPlaylist = (limit,order,offset,callback) => {
    const url = "/top/playlist?limit=" + limit + "&order=" + order + "&offset=" + offset
    axios.get(url).then(res => callback(res.data),err => toGetAllSongsInPlaylist(limit,order,offset,callback))
}
export const toGetHighQualityPlaylist = (before,limit,cat,callback) => {
    const url = "/top/playlist/highquality?before=" + before + "&limit=" + limit + "&cat=" + cat + "&cookie=" + cookie
    axios.get(url).then(res => callback(res.data),err => toGetHighQualityPlaylist(before,limit,cat,callback))
}
export const toGetEveryDayPlaylist = (callback) => {
    const url = "/recommend/resource?&cookie=" + cookie
    axios.get(url).then(res => callback(res.data),err => callback(err))
}
export const toGetPersonalizedPlaylist = (limit,callback) => {
    const url = "/personalized?limit=" + limit + "&cookie=" + cookie
    axios.get(url).then(res => callback(res.data),err => callback(err))
}


export const toGetPlaylistDetails = (id,callback) => {
    const url = "/playlist/detail?id=" + id

    axios.get(url).then(res => callback(res.data))
}

export const toGetAllSongsInPlaylist = (id,limit,offset,callback) => {
    const url = "/playlist/track/all?id=" + id + "&limit=" + limit + "&offset=" + offset + "&cookie=" + cookie
    axios.get(url).then(res => callback(res.data))
}

export const toGetSong = (id,callback) => {
  const url = "/song/url?id=" + id + "&cookie=" + cookie
    axios.get(url).then(res => callback(res.data))
}

export const toGetSongHotComments = (id,limit,callback) => {
  const url = "/comment/hot?id=" + id + "&type=0&limit" + limit + "&cookie=" + cookie
    axios.get(url).then(res => callback(res.data))
}



export const toGetSongDetails = (id,callback) => {
    const url = "/song/detail?ids=" + id
    axios.get(url).then(res => callback(res.data))
}

export const toSearch = (msg,type,callback) => {
    const url = "/cloudsearch?keywords=" + msg + "&type=" + type + "&limit=15"
    axios.get(url).then(res => callback(res.data),err => toSearch(msg,type,callback))
}


export const toGetCaptcha = (phone,callback,callback2) => {
    const url = "/captcha/sent?phone=" + phone
    axios.get(url).then(res => callback(res.data),err => callback2(err))
}

export const toLogWithCaptcha = (phone,captcha,callback,callback2) => {
    const url = "/captcha/verify?phone=" + phone + "&captcha=" + captcha
    axios.get(url).then(res => callback(res.data),err => callback2(err))
}

export const toLogWithPassword = (phone,password,callback,callback2) => {
    const url = "/login/cellphone?phone=" + phone + "&password=" + password
    axios.get(url).then(res => callback(res.data),err => callback2(err))
}

export const toCheckLogStatus = (callback,callback2) => {
    const url = "/login/status?cookie=" + cookie
    axios.get(url).then(res=> {callback(res.data)},err=>{callback2(err)})
}
export const toGetUserInfo = (callback) => {
    const url = "/user/subcount?cookie=" + cookie
    axios.get(url).then(res=> {callback(res.data)})
}
export const toGetOtherUserInfo = (id,callback) => {
    const url = "/user/subcount?uid="+ id + "&cookie=" + cookie
    axios.get(url).then(res=> {callback(res.data)})
}
export const toGetUserPlaylist = (id,callback) => {
    const url = "/user/playlist?uid=" + id +  "&cookie=" + cookie
    axios.get(url).then(res=> {callback(res.data)})
}

export const toGetArtistDesc = (id,callback) => {
    const url = "/artist/desc?id=" + id
    axios.get(url).then(res=> {callback(res.data)})
}
export const toGetArtistDetail = (id,callback) => {
    const url = "/artist/detail?id=" + id
    axios.get(url).then(res=> {callback(res.data)})
}
export const toGetArtistTopSongs = (id,callback) => {
    const url = "/artist/top/song?id=" + id +  "&cookie=" + cookie
    axios.get(url).then(res=> {callback(res.data)})
}
export const toGetArtistSongs = (id,order,limit,offset,callback) => {
    const url = "/artist/songs?id=" + id + "&order=" + order + "&limit=" + limit + "&offset=" + offset + "&cookie=" + cookie
    axios.get(url).then(res=> {callback(res.data)})
}

export const toLikeSong = (id,callback) => {
    const url = "/like?id=" + id + "&cookie=" + cookie
    axios.get(url).then(res=> {callback(res)})
}
export const toDislikeSong = (id,callback) => {
    const url = "/like?id=" + id + "&like=false&cookie=" + cookie
    axios.get(url).then(res=> {callback(res)})
}
export const toGetTopArtist = (type,area,limit,initial,offset,callback) => {
    const url = "/artist/list?type=" + type + "&area=" + area + "&limit=" + limit + "&initial=" + initial + "&offset=" + offset
    axios.get(url).then(res=> {callback(res)})
}
export const toGetLikeList = (id,callback) => {
    const url = "/likelist?uid=" + id + "&cookie=" + cookie
    axios.get(url).then(res=> {callback(res)})
}

export const toGetLyrics = (id,callback) => {
    const url = "/lyric?id=" + id + "&cookie=" + cookie
    axios.get(url).then(res=> {callback(res)})
}
export const toLogOut = (callback) => {
    const url = "/logout?cookie=" + cookie
    axios.get(url).then(res=> {callback(res)})
}
export const toGetShares = (pagesize,lasttime,callback) => {
    const url = "/event?pagesize=" + pagesize + "&lasttime=" + lasttime +"&cookie=" + cookie
    axios.get(url).then(res=> {callback(res)})
}
export const toGetLevel = (callback) => {
    const url = "/user/level?&cookie=" + cookie
    axios.get(url).then(res=> {callback(res)})
}
export const toGetFollows = (id,callback) => {
    const url = "/user/follows?uid=" + id + "&cookie=" + cookie
    axios.get(url).then(res=> {callback(res)})
}
