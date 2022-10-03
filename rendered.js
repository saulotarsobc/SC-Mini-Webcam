$('#wrap_videos').click(() => {
    togleMenu();
});

function togleMenu() {
    $('#wrap_controls').toggleClass('hidden');
};

navigator.mediaDevices.getUserMedia({ video: true })
    .then((strem) => {
        video.srcObject = strem;
    });