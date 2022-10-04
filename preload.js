window.addEventListener('DOMContentLoaded', () => {

    const { ipcRenderer } = require('electron');
    const $ = require('jquery');

    const video = document.querySelector('#video');

    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        });

    $('#move_to_position_1').click(() => {
        msgToMain('move_to_position_1');
    });

    $('#move_to_position_2').click(() => {
        msgToMain('move_to_position_2');
    });

    $('#update_position_1').click(() => {
        ipcRenderer.send('update_size_position', 1);
    });

    $('#update_position_2').click(() => {
        ipcRenderer.send('update_size_position', 2);
    });

    $('#more').click(() => {
        msgToMain('more');
    });

    $('#less').click(() => {
        msgToMain('less');
    });

    $('#close').click(() => {
        msgToMain('close');
    });

    function msgToMain(msg) {
        ipcRenderer.send('msg', msg);
    };

});
