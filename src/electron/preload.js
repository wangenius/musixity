// preload.js
const path = require('path')
const { contextBridge, ipcRenderer, remote, shell,Tray,app} = require('electron');

contextBridge.exposeInMainWorld('electron', {
    ipcRenderer,
    remote,
    shell,
    Tray,
    app

});
contextBridge.exposeInMainWorld('path', {
    path
});
