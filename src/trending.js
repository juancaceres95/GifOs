function trending() {
    fetch("https://api.giphy.com/v1/gifs/trending?api_key=2zqZv0uHxq5o9Xd9931ypXqdi89hOHeQ&limit=24&rating=R")
        .then((response) => {
            return response.json()
        }).then(function(response) {
            response.data.forEach(function(elem) {
                document.getElementById("video0").src = elem.images.original.url;
                document.getElementById("hast0").innerHTML = elem.title;
                let nodeOriginal = document.getElementById("container");
                let nodeClone = nodeOriginal.cloneNode(true);
                document.getElementById("gridIdTrend").appendChild(nodeClone);
            });
            let task = document.querySelector("#container");
            task.parentNode.removeChild(task);
        }).catch((error) => {
            return error;
        });
}
trending();