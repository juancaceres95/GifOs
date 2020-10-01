function getSearchResults() {
    const search = document.querySelector("#findBox").value;
    fetch("https://api.giphy.com/v1/gifs/search?api_key=2zqZv0uHxq5o9Xd9931ypXqdi89hOHeQ&q=" + search + "&limit=24&offset=0&rating=R&lang=es")
        .then((response) => {
            return response.json()
        }).then(function(response) {
            document.querySelector("#gridIdTrend").innerHTML = "";
            let model = '<div id="container" class="videoContainer"><img id="video0" src="" class="video" alt="gif buscado"><div class="videoHast"><p id="hast0" class="pWhiteEfect"></p></div></div>';
            response.data.forEach(function(elem) {
                const divCreation = document.createElement("div");
                divCreation.innerHTML = model;
                divCreation.querySelector("#video0").src = elem.images.original.url;
                divCreation.querySelector("#hast0").innerHTML = elem.title;
                let gridIdTrend = document.querySelector("#gridIdTrend");
                gridIdTrend.appendChild(divCreation);
            });
        }).catch((error) => {
            return error;
        });
}
//------------------------------------DESPLEGADO BOTTONES BUSQUEDA SUGERIDOS-----------------
let contRelatedBtn = document.getElementsByClassName('contRelatedBtn')[0];
let outBox = document.getElementsByClassName('outBox')[0];
let valorInput = document.getElementById('findBox')
let searchBtn = document.querySelector('button.findButton');
let lupa = document.getElementById('loupe')

valorInput.addEventListener('click', () => {
    if (contRelatedBtn.style.display = "none") {
        contRelatedBtn.style.display = "flex";
    }
})

function actBtn() {
    if (valorInput.value.trim() !== "") {
        searchBtn.removeAttribute('disabled')
        if (localStorage.getItem("dark") == "true") {
            searchBtn.color = "#110038"
            searchBtn.style.backgroundColor = "#F7C9F3";
            lupa.src = "assets/lupa_light.svg";
        } else {
            searchBtn.color = "#FFFFFF"
            searchBtn.style.backgroundColor = "#EE3EFE";
            lupa.src = "assets/lupa_light.svg";
        }
    } else {
        searchBtn.setAttribute('disabled', "true");
        //  tema claro
        if (localStorage.getItem("dark") == "true") {
            searchBtn.color = "#B4B4B4"
            searchBtn.style.backgroundColor = "#E6E6E6";
            lupa.src = "assets/lupa_light.svg";
            // tema oscuro
        } else {
            searchBtn.color = "#8F8F8F"
            searchBtn.style.backgroundColor = "#B4B4B4";
            lupa.src = "assets/lupa_light.svg";
        }
    }
}
//----------Evento Enter--------//
// valorInput.addEventListener("keyup", e => {
// if (event.keyCode === 13) {
// e.preventDefault();
// showResults(valorInput.value);
// }
// })

// outBox.addEventListener("submit", e => {
// e.preventDefault();
// })


const relatedBtn = document.getElementById('relatedBtn')
const relatedBtn2 = document.getElementById('relatedBtn2')
const relatedBtn3 = document.getElementById('relatedBtn3')

relatedBtn.addEventListener('click', () => {
    let searchRlt = document.getElementById("findBox")
    searchRlt.value = 'perros'
    results(searchRlt)
    showResults()
})

relatedBtn2.addEventListener('click', () => {
    let searchRlt = document.getElementById("findBox")
    searchRlt.value = 'argentina'
    results(searchRlt)
    showResults()
})

relatedBtn3.addEventListener('click', () => {
        let searchRlt = document.getElementById("findBox")
        searchRlt.value = 'friends'
        results(searchRlt)
        showResults()
    })
    //-----------------------------------------FUNCION SEARCH------------------------------------//
async function results(search) {

    try {
        let gifosApi = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=2zqZv0uHxq5o9Xd9931ypXqdi89hOHeQ&limit=16`;
        let response = await fetch(gifosApi);
        arraySearch = await response.json();

    } catch (e) {
        return e;
    }
    return (arraySearch.data)
}

searchBtn.addEventListener('click', showResults);

let relatedTags = document.getElementById('relatedTags')

function showResults() {

    let search = document.getElementById("findBox").value.trim();

    if (contRelatedBtn.style.display = "flex") {
        contRelatedBtn.style.display = "none";
        relatedTags.style.zIndex = '-1';
    }
    results(search)
        .then(data => {
            console.log(data);
            relatedTags.innerHTML = '';

            for (let i = 0; i < 3; i++) {

                let searchRtag = document.createElement('button');
                searchRtag.className = 'searchRtag verMas'
                relatedTags.appendChild(searchRtag);
                let searchRtagText = document.createTextNode('#' + data[i].title);
                searchRtag.appendChild(searchRtagText);
            }
            for (let i = 0; i < data.length; i++) {

                let pFooter = document.createElement('p');
                let textFooter = document.createTextNode('#' + data[i].title);
                pFooter.className = 'textFooter';
                pFooter.appendChild(textFooter);

                let divFooter = document.createElement('div');
                divFooter.className = 'tenden_conteGif_Footer headerDark';
                divFooter.appendChild(pFooter);

                let gif_img = document.createElement('img');
                gif_img.className = 'gif_img';
                gif_img.src = data[i].images.original.url;

                let divConteGif = document.createElement('div');
                divConteGif.className = 'tenden_conte_Gif';
                divConteGif.appendChild(gif_img);
                divConteGif.appendChild(divFooter);

                divSearch.appendChild(divConteGif);
            }
            if (localStorage.getItem("dark") == "true") {
                for (let i = 0; i < headerDark.length; i++) {
                    headerDark[i].style.backgroundImage = 'linear-gradient(270deg, #F7C9F3 0%, #4180F6 100%)'
                }
            } else if (localStorage.getItem("dark") == "false") {
                for (let i = 0; i < headerDark.length; i++) {
                    headerDark[i].style.backgroundImage = 'linear-gradient(270deg, #ee3efe 0%, #2e32fb 100%)'
                }
                for (let i = 0; i < btnVerMas.length; i++) {
                    btnVerMas[i].style.backgroundColor = '#2E32FB'
                }
            }
        })
        .catch(e => console.log(e))
}
//ahhhhh//
function chageToFind() {
    const randomGif = document.querySelector("#randomGif");
    randomGif.style.display = "none";
    document.getElementById("titleWhite").innerText = "Busqueda: " + (document.querySelector(".findBox").value);
    document.getElementById("containerGrid").style.top = "40px";
}

function eventToFind() {
    const findButton = document.querySelector("#findButton");
    findButton.addEventListener("click", getSearchResults);
    findButton.addEventListener("click", chageToFind);
    let findBox = document.querySelector("#findBox");
    findBox.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            findButton.click();
        }
    });
}
eventToFind();