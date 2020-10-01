function random() {
    fetch("https://api.giphy.com/v1/gifs/search?api_key=2zqZv0uHxq5o9Xd9931ypXqdi89hOHeQ&q=gif&limit=4&lang=en")
        .then((response) => {
            return response.json()
        }).then(function(response) {
            response.data.forEach(function(elem) {
                document.getElementById("video").src = elem.images.original.url;
                document.getElementById("hast").innerHTML = elem.title;
                let nodeOriginal = document.getElementById("containerRandom");
                let nodeClone = nodeOriginal.cloneNode(true);
                document.getElementById("gridId").appendChild(nodeClone);
            });
            let task = document.querySelector("#containerRandom");
            task.parentNode.removeChild(task);
        }).catch((error) => {
            return error;
        });
}
random();