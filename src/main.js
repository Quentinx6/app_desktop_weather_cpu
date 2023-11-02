console.log("Hello from Electron 👋");

const { app, BrowserWindow, ipcMain } = require("electron");
const { Notification } = require('electron');
const path = require("path");

const os = require("os-utils");
const os_node = require("node:os");
const si = require("systeminformation");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.setName('Temperatura');

app.whenReady().then(() => {
  console.log(os_node.cpus());
  ipcMain.handle("info", () => os_node.cpus());
  ipcMain.handle("cpu", async () => {
    os.cpuUsage(function (v) {
      console.log("CPU Usage (%): " + v);
      return v;
    });
  });
  ipcMain.handle("ping", () => "pong");
  ipcMain.handle("getCpuTemperature", async () => {
    try {
      return await si.cpuTemperature();
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
  ipcMain.handle('showNotification', (event, data) => {
    const notification = new Notification({
      title: data.title,
      body: data.body,
    });

    notification.show();
  });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
