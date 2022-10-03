window.addEventListener('DOMContentLoaded', () => {

    const { ipcRenderer } = require('electron');
    const $ = require('jquery');

    const video = document.querySelector('#video');

    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        });

    $('#bigSize').click(() => {
        msgToMain('bigSize');
    });

    $('#SmallSize').click(() => {
        msgToMain('SmallSize');
    });

    $('#record').click(() => {
        msgToMain('record');
    });

    $('#close').click(() => {
        msgToMain('close');
    });

    function msgToMain(msg) {
        ipcRenderer.send('msg', msg);
    };

});
