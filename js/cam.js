window.addEventListener('DOMContentLoaded', () => {

    const { ipcRenderer } = require('electron');

    const video = document.querySelector('#video');

    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        });

});
