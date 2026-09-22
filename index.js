const homes = document.getElementById("homes");
let imgTag = document.getElementById("image");
let adressTag = document.getElementById("address");
let kvmTag = document.getElementById("kvm");
let priceTag = document.getElementById("price");
let descriptionTag = document.getElementById("description");
let openStreetMapTag = document.getElementById("open-street-map");

// Function that creates the cards for the homes.
function createCard(setImgSrc, setAddressText, setKvmText, setPriceText, setId) {
    // Main div element
    let createdDiv = document.createElement("div");
    createdDiv.className = "bolig-kort";

    // Creates the url for the home card
    let url = new URL("bolig-detaljer.html", window.location.href);
    url.searchParams.set("id", setId); // Sets url param for the id

    // A element
    let createdA = document.createElement("a");
    url.searchParams.set("id", setId)
    createdA.href = url;

    // Img element
    let createdImg = document.createElement("img");
    createdImg.src = setImgSrc;

    // Div text element
    let createdDivText = document.createElement("div");
    createdDivText.className = "bolig-kort-tekst";

    // Elements under div text element
    let createdAddress = document.createElement("h2");
    createdAddress.textContent = setAddressText;
    let createdKvm = document.createElement("p");
    createdKvm.textContent = setKvmText;
    let createdPrice = document.createElement("p");
    createdPrice.textContent = setPriceText;

    // Appends all the children
    homes.appendChild(createdDiv);
    createdDiv.appendChild(createdA);
    createdA.appendChild(createdImg);
    createdDiv.appendChild(createdDivText);
    createdDivText.appendChild(createdAddress);
    createdDivText.appendChild(createdKvm);
    createdDivText.appendChild(createdPrice);
}

// Function that fetches the json and uses it's data for creating the cards. Using the createCard function
async function createHomes() {
    const response = await fetch("homes.json");
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    try {
        for (let i = 0; i < 15; i++) {
            createCard(
                json[i].billede,
                json[i].adresse,
                json[i].kvm + " m²",
                json[i].pris + " kr.",
                i
            );
        }
    } catch (error) {
        console.error(error);
    }
}

// Sets the values for the detail page of a home
async function setContent(){
    const response = await fetch("homes.json");
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    try {
        // Creates new url variable. Then we make a new variable that's equal to its id param.
        // Which we then use for the id of the JSON properties we want to use
        const url = new URL(window.location.href);
        const jsonId = Number(url.searchParams.get("id"));

        // Sets values for the content like description, address and etc...
        imgTag.src = json[jsonId].billede;
        adressTag.textContent = json[jsonId].adresse;
        kvmTag.textContent = json[jsonId].kvm + " m²";
        priceTag.textContent = json[jsonId].pris + " kr.";
        descriptionTag.textContent = json[jsonId].beskrivelse;

        // bbox chooses the area of the map, that should be shown
        // The format is: bbox=minLongitude,minLatitude,maxLongitude,maxLatitude
        // First and third values = longitude (left/right)
        // Second and fourth values = latitude (bottom/top)
        const latitude = json[jsonId].latitude;
        const longitude = json[jsonId].longitude;

        const distance = 0.005;

        // Defines our view on the map
        const bbox = [
            longitude - distance,
            latitude - distance,
            longitude + distance,
            latitude + distance,
        ].join(",");

        // Sets the OpenStreetMap url. Also uses the coordinates form the json file
        openStreetMapTag.src = `https://www.openstreetmap.org/export/embed.html?` +
        `bbox=${bbox}` +
        `&layer=mapnik` +
        `&marker=${json[jsonId].latitude},${json[jsonId].longitude}`;

    } catch (error) {
        console.error(error);
    }
}