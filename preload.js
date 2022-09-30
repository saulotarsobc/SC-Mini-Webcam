window.addEventListener('DOMContentLoaded', () => {

    const video = document.querySelector('#video');

    console.log(video);

    navigator.mediaDevices.getUserMedia({ video: true })
        .then((strem) => {
            video.srcObject = strem;
        });

});
