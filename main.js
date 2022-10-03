// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let ControlWindow;
let CamWindow;
const minSize = 150;
const maxSize = 300;
let size = 150;
let position_1_a = 200;
let position_1_b = 200;
let position_2_a = 400;
let position_2_b = 400;

function createControlWindow() {
    ControlWindow = new BrowserWindow({
        height: 280,
        width: 30,
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
    ControlWindow.loadFile('index.html');
    ControlWindow.setPosition(0, 100);

    // ControlWindow('will-move',()=>{
    //     console.log('move')
    // });
}

function createCamWindow() {
    CamWindow = new BrowserWindow({
        height: size,
        width: size,
        minHeight: minSize,
        maxSize: maxSize,
        webPreferences: {
            preload: path.join(__dirname, 'cam.js'),
            nodeIntegration: true,
        },
        frame: false,
        titleBarStyle: "customButtonsOnHover",
        transparent: true,
        alwaysOnTop: true,
        resizable: true,
        movable: true,
    });


    CamWindow.setAspectRatio(1 / 1);
    CamWindow.loadFile('cam.html');
    CamWindow.setPosition(300, 300);
    // CamWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createControlWindow();
    createCamWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createControlWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

/////////////////////////////////////////////////////////////////////////////
ipcMain.on('msg', (event, args) => {
    console.log(args);

    if (args == 'position_1') {
        CamWindow.setPosition(100, 100);
    }

    if (args == 'position_2') {
        CamWindow.setPosition(300, 300);
    }

    if (args == 'more') {
        if (size < maxSize) {
            size = size + 10
        }
        CamWindow.setSize(size, size);
    }

    if (args == 'less') {
        if (size > minSize) {
            size = size - 10
        }
        CamWindow.setSize(size, size);
    }

    if (args == 'close') {
        ControlWindow.close();
        CamWindow.close();
    }
});