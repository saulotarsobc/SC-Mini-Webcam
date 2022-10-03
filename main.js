// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        height: 200,
        minHeight: 200,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
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
    // mainWindow.setPosition(1300 - width, 700 - height);
    // mainWindow.webContents.openDevTools();
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
ipcMain.on('msg', (event, args) => {
    console.log(args);

    if (args == 'bigSize'){
        mainWindow.setPosition(100, 100);
    }

    if (args == 'SmallSize'){
        mainWindow.setPosition(300, 300);
    }
    
    if (args == 'close'){
        mainWindow.close();
    }
});