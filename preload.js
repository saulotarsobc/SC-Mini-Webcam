window.addEventListener('DOMContentLoaded', () => {
    const { ipcRenderer } = require('electron')

    const video = document.querySelector('#video');
    const wrap = document.querySelector('#wrap');

    console.log(wrap);

    wrap.addEventListener('click', () => {
        console.log('click');
        ipcRenderer.send('click', 'click');
    });

    // navigator.mediaDevices.getUserMedia({ video: true })
    //     .then((strem) => {
    //         video.srcObject = strem;
    //     });

});
