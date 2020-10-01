let startIn = 0;
let timeout = 0;
let result = null;

function onOff() {
    if (timeout == 0) {
        startIn = turn = new Date().getTime();
        run();
    } else {
        clearTimeout(timeout);
        timeout = 0;
    }
}

function run() {
    let now = new Date().getTime();
    let diff = new Date(now - startIn);
    result = LeadingZero(diff.getUTCHours()) + ":" + LeadingZero(diff.getUTCMinutes()) + ":" + LeadingZero(diff.getUTCSeconds()) + ":" + LeadingZeroM(diff.getUTCMilliseconds());
    document.getElementById("crono").innerHTML = result;
    timeout = setTimeout("run()", 20);
}

function LeadingZero(Time) {
    return (Time < 10) ? "0" + Time : +Time;
}

function LeadingZeroM(Time) {
    return (Time < 100) ? "0" + Time : +Time;
}

function cronoFix() {
    document.getElementById("cronoEnd").innerHTML = result;
}
let botonRec2 = document.querySelector("#buttonCapture");
botonRec2.addEventListener("click", onOff);
let buttonGo2 = document.getElementById("buttonGo");
buttonGo2.addEventListener("click", onOff);
buttonGo2.addEventListener("click", cronoFix);