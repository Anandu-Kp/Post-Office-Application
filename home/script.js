const ip = sessionStorage.getItem("ip");
const ipAdress = document.getElementById("ip");
const lat = document.getElementById("lat");
const long = document.getElementById("long");
const city = document.getElementById("city");
const region = document.getElementById("region");
const org = document.getElementById("org");
const hostname = document.getElementById("hostname");
const map = document.getElementById("map");
const timezone = document.getElementById("timezone");
const dateAndTime = document.getElementById("dateAndTime");
const pin = document.getElementById("pin");
const message = document.getElementById("message");
const search = document.getElementById("search");


var post;




// for adding map
function addMain(data) {
    map.src = `https://maps.google.com/maps?q=${data.loc.split(",")[0]}, ${data.loc.split(",")[1]}&output=embed`
    timezone.innerText = data.timezone;
    dateAndTime.innerText = new Date().toLocaleString("en-US", { timeZone: data.timeZone });
    pin.innerText = data.postal;
}

// for adding header 
function addHeader(data) {
    ipAdress.innerText = ip;
    lat.innerText = data.loc.split(",")[0];
    long.innerText = data.loc.split(",")[1];
    city.innerText = data.city;
    region.innerText = data.region;
    org.innerText = data.org;
    hostname.innerText = data.hostname;
}

// for search function
function searchFn() {
    const key = search.value;
    let result = post.filter(element => {
        return element.Name.toLowerCase().startsWith(key.toLowerCase());
    });
    addToContainer(result);


}

function addToContainer(post) {
    const container = document.getElementById("container");
    container.innerHTML = ``;
    search.addEventListener("keyup", searchFn);

    for (element of post) {
        let item = document.createElement("div");
        item.className = "item";
        item.innerHTML = `<span>${element.Name}</span>
                        <span>${element.BranchType}</span>
                        <span>${element.DeliveryStatus}</span>
                        <span>${element.District}</span>
                        <span>${element.Division}</span>`;
        container.appendChild(item);
    }

}

// to add post offices 

async function addPost(pin) {
    try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
        const data = await response.json();
        post = data[0].PostOffice;
        message.innerText = data[0].Message;
        addToContainer(post);
    }
    catch (e) {
        console.log(e);
    }
    // console.log(post);
}


async function getData() {
    try {
        let response = await fetch("https://ipinfo.io/json?token=9692db051c452b");
        let data = await response.json();
        addHeader(data);
        addMain(data);
        addPost(data.postal)
        console.log(data);
    }
    catch (e) {
        console.log(e);
    }
}
getData();