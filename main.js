// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let width = 250;
let height = 250;

function createWindow() {
    const mainWindow = new BrowserWindow({
        width,
        height,
        minHeight: 200,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        },
        frame: false,
        titleBarStyle: "customButtonsOnHover",
        transparent: true,
        alwaysOnTop: true,
        resizable: true,
        movable: true,
    });


    mainWindow.setAspectRatio(1 / 1);
    mainWindow.loadFile('index.html');
    mainWindow.setPosition(1366 - width, 768 - height);
    mainWindow.webContents.openDevTools();

    // mainWindow.on("will-resize", () => {
    //     console.log('will-resize');
    // });

    // mainWindow.on("will-move", () => {
    //     console.log('will-move');
    // });
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

/////////////////////////////////////////////////////////////////////////////
ipcMain.on('click', () => {
    console.log(123);
})