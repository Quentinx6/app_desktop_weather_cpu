// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

console.log("Hello from preload");

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping"),
  info: () => ipcRenderer.invoke("info"),
  getCpuTemperature: () => ipcRenderer.invoke("getCpuTemperature"),
  showNotification: (title, body) => ipcRenderer.invoke("showNotification", { title, body })
  //Nous pouvons exposer des variables en plus des fonctions
});
