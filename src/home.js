function start() {
    let selectChangeTheme = document.querySelector("#changeTheme");
    selectChangeTheme.addEventListener("change", event => {
        changeTheme(event.target.value);
    });
}
if (localStorage.getItem("theme")) {
    changeTheme(localStorage.getItem("theme"));
}

function changeTheme(theme) {
    localStorage.setItem("theme", theme);
    if (theme === "night") {
        document.body.classList.add("dark");
        document.querySelector(".logo").src = "assets/gifOF_logo_dark.png";
        eventFindDark();
    } else if (theme === "day") {
        document.body.classList.remove("dark");
        document.querySelector(".logo").src = "assets/gifOF_logo.png";
        eventFindDay();
    }
}

function eventFind() {
    let inputFind = document.querySelector("#findBox");
    inputFind.addEventListener("input", function(event) {
        let buttonFind = document.querySelector("#findButton");
        if (event.target.value === "") {
            buttonFind.setAttribute("disabled", true);
        } else {
            buttonFind.removeAttribute("disabled");
        }
    });
}
eventFind();

function eventFindDay() {
    let inputFind = document.querySelector("#findBox");
    inputFind.addEventListener("input", function(event) {
        let buttonFind = document.querySelector("#findButton");
        if (event.target.value === "") {
            buttonFind.setAttribute("disabled", true);
            document.querySelector(".loupe").src = "assets/Combined_Shape.svg";
            document.querySelector(".pBlueRegularbutton").style.color = "#8f8f8f";
            document.querySelector(".findButton").style.background = "#E6E6E6";
        } else {
            buttonFind.removeAttribute("disabled");
            document.querySelector(".loupe").src = "assets/lupa.svg";
            document.querySelector(".pBlueRegularbutton").style.color = "#110038";
            document.querySelector(".findButton").style.background = "#F7C9F3";
        }
    });
}

function eventFindDark() {
    let inputFind = document.querySelector("#findBox");
    inputFind.addEventListener("input", function(event) {
        let buttonFind = document.querySelector("#findButton");
        if (event.target.value === "") {
            buttonFind.setAttribute("disabled", true);
            document.querySelector(".loupe").src = "assets/Combined_Shape.svg";
            document.querySelector(".pBlueRegularbutton").style.color = "#8f8f8f";
            document.querySelector(".findButton").style.background = "#B4B4B4";
        } else {
            buttonFind.removeAttribute("disabled");
            document.querySelector(".loupe").src = "assets/lupa_light.svg";
            document.querySelector(".pBlueRegularbutton").style.color = "#ffffff";
            document.querySelector(".findButton").style.background = "#EE3EFE";
        }
    });
}