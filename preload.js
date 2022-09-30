window.addEventListener('DOMContentLoaded', () => {
    const { ipcRenderer } = require('electron')

    const video = document.querySelector('#video');

    console.log(video);

    navigator.mediaDevices.getUserMedia({ video: true })
        .then((strem) => {
            video.srcObject = strem;
        });

    video.addEventListener('click', () => {
        ipcRenderer.send('render/call', {
            function: 'render/call',
            msg: 'msg de render',
        });
    });

});
