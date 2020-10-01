if (localStorage.getItem("theme")) {
    changeTheme(localStorage.getItem("theme"));
}

function changeTheme(theme) {
    localStorage.setItem("theme", theme);
    if (theme === "night") {
        document.body.classList.add("dark");
        document.querySelector(".camera").src = "assets/camera_light.svg";
    } else if (theme === "day") {
        document.body.classList.remove("dark");
        document.querySelector(".camera").src = "assets/camera.svg";
    }
}
let preview = null;
let objectURL = null;

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
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function() {
                    console.log('started')
                },
            });

            function startRec() {
                recorder.startRecording();
            }

            function stopRec() {
                recorder.stopRecording(function(record) {
                    console.log("fin de grabacion");
                    preview = record;
                });
            }

            function prepareToUpload() {
                let form = new FormData();
                form.append("api_key", "2zqZv0uHxq5o9Xd9931ypXqdi89hOHeQ");
                form.append("file", recorder.getBlob(), "myGif.gif");
                let blob = form.get("file");
                objectURL = URL.createObjectURL(blob);
                localStorage.setItem("url", objectURL);

                function convertToData() {
                    const toDataURL = url => fetch(url)
                        .then(response => response.blob())
                        .then(blob => new Promise((resolve, reject) => {
                            const reader = new FileReader()
                            reader.onloadend = () => resolve(reader.result)
                            reader.onerror = reject
                            reader.readAsDataURL(blob)
                        }))
                    toDataURL(objectURL)
                        .then(dataUrl => {
                            localStorage.setItem(objectURL, dataUrl);
                        })
                }
                convertToData();
                setTimeout(function upload() {
                    fetch("https://juancaceres95.github.io/GifOs/subirGif.html", {
                        method: "POST",
                        body: form,
                        mode: "no-cors",
                    });
                }, 5000);
            }

            function outButton() {
                const buttonCapture = document.getElementById("buttonCapture");
                buttonCapture.style.display = "none";
                const buttonGo = document.getElementById("buttonGo");
                buttonGo.style.display = "flex";
                let cronoBox = document.getElementById("cronoBox");
                cronoBox.style.display = "flex";
                const titleChange = document.querySelector("#titleChange");
                titleChange.innerHTML = "Capturando Tu Guifo";
            }
            let botonRec = document.querySelector("#buttonCapture");
            botonRec.addEventListener("click", startRec);
            botonRec.addEventListener("click", outButton);

            function chageToCapture() {
                const captureVideo = document.querySelector("#captureVideo");
                captureVideo.style.display = "none";
                const previewVideo = document.getElementById("previewVideo");
                previewVideo.style.display = "flex";
                let cronoBox = document.querySelector("#cronoBoxEnd");
                cronoBox.style.display = "flex";
            }
            let botonStop = document.querySelector("#buttonGo");
            botonStop.addEventListener("click", stopRec);
            botonStop.addEventListener("click", chageToCapture);

            function chageToUpload() {
                const previewVideo = document.querySelector("#previewVideo");
                previewVideo.style.display = "none";
                const uploadVideo = document.getElementById("uploadVideo");
                uploadVideo.style.display = "flex";
                setTimeout(function chageToEnd() {
                    document.querySelector("#resultados").src = preview;
                    const uploadVideo = document.querySelector("#uploadVideo");
                    uploadVideo.style.display = "none";
                    const optionVideo = document.getElementById("optionVideo");
                    optionVideo.style.display = "flex";
                }, 5000);
            }
            let botonUp = document.querySelector("#buttonUpload");
            botonUp.addEventListener("click", prepareToUpload);
            botonUp.addEventListener("click", chageToUpload);
        });
}

function chageToVideo() {
    const gifRec = document.querySelector("#gifRec");
    gifRec.style.display = "none";
    const seccVideo = document.getElementById("captureVideo");
    seccVideo.style.display = "flex";
    const gridMyGif = document.querySelector("#containerGridMyGif");
    gridMyGif.style.display = "none";
}

function eventRec() {
    const buttonInicio = document.querySelector("#buttonBefore");
    buttonInicio.addEventListener("click", getStreamAndRecord);
    buttonInicio.addEventListener("click", chageToVideo);
}
eventRec();

function goUpload() {
    location = "subirGif.html";
}

function repeat() {
    const buttonRepeat = document.querySelector("#buttonRepeat");
    buttonRepeat.addEventListener("click", goUpload);
}
repeat();

function getOut() {
    const buttonListo = document.querySelector("#buttonListo");
    buttonListo.addEventListener("click", goUpload);
    const closeCapture = document.querySelector("#closeCapture");
    closeCapture.addEventListener("click", goUpload);
    const closePreview = document.querySelector("#closePreview");
    closePreview.addEventListener("click", goUpload);
    const closeUpload = document.querySelector("#closeUpload");
    closeUpload.addEventListener("click", goUpload);
    const closeOption = document.querySelector("#closeOption");
    closeOption.addEventListener("click", goUpload);
}
getOut();

function save() {
    const link = window.document.createElement("a");
    const url = document.querySelector("#resultados").src;
    const filename = "miGifo.gif";
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.setAttribute("id", "lin")
    link.style.visibility = 'hidden';
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
}

function saveGif() {
    const saveGif = document.querySelector("#saveGif");
    saveGif.addEventListener("click", save);
}
saveGif();

function clipBoard() {
    let aux = document.createElement("input");
    let valueURL = localStorage.getItem(objectURL);
    aux.setAttribute("value", valueURL);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    alert("Enlace copiado al portapapeles");
}

function saveUrlButton() {
    const saveUrl = document.querySelector("#saveUrl");
    saveUrl.addEventListener("click", clipBoard);
}
saveUrlButton();

function playButton() {
    let video = null;

    function loop() {
        video = document.querySelector("#resultado");
        video.play();
    }
    loop();
    video.addEventListener("ended", loop);
    let play = document.querySelectorAll("#barVideo span");
    play.forEach(function(elem, indice) {
        play[indice].style.visibility = "visible";
    })
}

function buttonPlay() {
    const play = document.querySelector("#play");
    play.addEventListener("click", playButton);
}
buttonPlay();