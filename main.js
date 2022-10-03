// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let camWindow;
let posX = 100;
let posY = 100;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        height: 200,
        width: 50,
        minHeight: 200,
        minWidth: 50,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
        },
        frame: false,
        titleBarStyle: "customButtonsOnHover",
        transparent: true,
        alwaysOnTop: true,
        resizable: false,
        movable: true,
    });
    mainWindow.loadFile('index.html');
    mainWindow.setPosition(0, 100);
}

function createCamWindow() {
    camWindow = new BrowserWindow({
        height: 200,
        width: 200,
        minHeight: 200,
        webPreferences: {
            preload: path.join(__dirname, 'cam.js'),
            nodeIntegration: true,
        },
        frame: false,
        titleBarStyle: "customButtonsOnHover",
        transparent: true,
        alwaysOnTop: true,
        resizable: false,
        movable: true,
    });


    camWindow.setAspectRatio(1 / 1);
    camWindow.loadFile('cam.html');
    camWindow.setPosition(300, 300);
    // camWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createMainWindow();
    createCamWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

/////////////////////////////////////////////////////////////////////////////
ipcMain.on('msg', (event, args) => {
    console.log(args);

    if (args == 'bigSize') {
        camWindow.setPosition(100, 100);
    }

    if (args == 'SmallSize') {
        camWindow.setPosition(300, 300);
    }

    if (args == 'close') {
        mainWindow.close();
        camWindow.close();
    }
});