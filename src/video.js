function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                height: { max: 480 }
            }
        })
        .then(function(stream) {
            let video = document.querySelector("#videoBox");
            video.srcObject = stream;
            video.play();
            let recorder = RecordRTC(stream, {
                type: 'mp4',
                frameRate: 25,
                width: 360,
            });

            function startRec() {
                recorder.startRecording();
            }

            function stopRec() {
                recorder.stopRecording(function(record) {
                    console.log("fin de grabacion");
                    document.querySelector("#resultado").src = record;
                });
            }
            let botonRec = document.querySelector("#buttonCapture");
            botonRec.addEventListener("click", startRec);
            let botonStop = document.querySelector("#buttonGo");
            botonStop.addEventListener("click", stopRec);
        });
}

function eventRec() {
    const buttonInicio = document.querySelector("#buttonBefore");
    buttonInicio.addEventListener("click", getStreamAndRecord);
}
eventRec();