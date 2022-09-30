// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let width = 250;
let height = 250;

function createWindow() {
    const mainWindow = new BrowserWindow({
        width,
        height,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        },
        frame: false,
        // titleBarStyle: "customButtonsOnHover",
        transparent: true,
        alwaysOnTop: true,
        resizable: false,
        movable: true,
    });
    mainWindow.loadFile('index.html');
    // mainWindow.setPosition(1366 - width, 768 - height);
    // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

/////////////////////////////////////////////////////////////////////////////
ipcMain.on('render/call', async (event, msg) => {
    console.log(msg);

    event.reply('main/reply', {
        channel: 'main/reply',
        msg: 'mensagem do main',
    });

});