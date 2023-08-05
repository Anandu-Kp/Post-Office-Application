
const ip = document.getElementById("ip");
const btn = document.getElementById("getStartedBtn");




try {
    $.getJSON("https://api.ipify.org?format=json", function (data) {

        // Setting text of element P with id gfg
        ip.innerText = data.ip;
        sessionStorage.setItem("ip", data.ip)
    })
}
catch (e) {
    console.log(e);
}

function btnFn() {
    window.location.href = "./home";
}

btn.addEventListener("click", btnFn)