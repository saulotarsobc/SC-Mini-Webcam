// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('path');

let ControlWindow;
let CamWindow;
const minSize = 150;
const maxSize = 300;

let position_0_a = 200;
let position_0_b = 200;
let size = 150;

let position_1_a = position_0_a;
let position_1_b = position_0_b;
let size_1 = size;

let position_2_a = 400;
let position_2_b = 400;
let size_2 = 250;

function createControlWindow() {
    ControlWindow = new BrowserWindow({
        height: 280,
        width: 30,
        minHeight: 200,
        minWidth: 50,
        webPreferences: {
            preload: path.join(__dirname, 'js', 'preload.js'),
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
}

function createCamWindow() {
    CamWindow = new BrowserWindow({
        height: size,
        width: size,
        minHeight: minSize,
        maxHeight: maxSize,
        webPreferences: {
            preload: path.join(__dirname, 'js', 'cam.js'),
            nodeIntegration: true,
        },
        frame: false,
        titleBarStyle: "customButtonsOnHover",
        transparent: true,
        alwaysOnTop: true,
        resizable: true,
        movable: true,
        parent: ControlWindow,
    });


    CamWindow.setAspectRatio(1 / 1);
    CamWindow.loadFile('cam.html');
    CamWindow.setPosition(position_0_a, position_0_b);
    CamWindow.on('will-move', () => {
        position_0_a = CamWindow.getPosition()[0];
        position_0_b = CamWindow.getPosition()[1];
    })
    // CamWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createControlWindow();
    createCamWindow();

    globalShortcut.register('CommandOrControl+1', () => {
        move_to_position_1();
    });

    globalShortcut.register('CommandOrControl+2', () => {
        move_to_position_2();
    });

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createControlWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll()
});

/////////////////////////////////////////////////////////////////////////////

function setState() {
    CamWindow.setPosition(position_0_a, position_0_b, true);
    CamWindow.setSize(size, size);
}

function move_to_position_1() {
    position_0_a = position_1_a;
    position_0_b = position_1_b;
    size = size_1;
    setState();
}

function move_to_position_2() {
    position_0_a = position_2_a;
    position_0_b = position_2_b;
    size = size_2;
    setState();
}

ipcMain.on('msg', (event, args) => {

    if (args == 'move_to_position_1') {
        move_to_position_1();
    }

    if (args == 'move_to_position_2') {
        move_to_position_2();
    }

    if (args == 'more') {
        if (size < maxSize) {
            size = size + 10
        }
        setState();
    }

    if (args == 'less') {
        if (size > minSize) {
            size = size - 10
        }
        setState();
    }

    if (args == 'close') {
        app.quit();
    }

});

ipcMain.on('update_size_position', (event, args) => {

    if (args == 1) {
        position_1_a = CamWindow.getPosition()[0];
        position_1_b = CamWindow.getPosition()[1];
        size_1 = CamWindow.getSize()[0];
    }

    if (args == 2) {
        position_2_a = CamWindow.getPosition()[0];
        position_2_b = CamWindow.getPosition()[1];
        size_2 = CamWindow.getSize()[0];
    }
});