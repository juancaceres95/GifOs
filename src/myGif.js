function myGifo() {
    let arrayBlob = [];
    for (let index = 0; index < localStorage.length; index++) {
        let keyName = localStorage.key(index);
        if (keyName[5] === "h") {
            arrayBlob.push(keyName);
        }
    }
    arrayBlob.forEach(function(elem, i) {
        document.getElementById("videoMyGif").src = localStorage.getItem(elem);
        let nodeOriginal = document.getElementById("containerMyGif");
        let nodeClone = nodeOriginal.cloneNode(true);
        document.getElementById("gridIdMyGif").appendChild(nodeClone);
    });
    let task = document.querySelector("#containerMyGif");
    task.parentNode.removeChild(task);
}
myGifo();