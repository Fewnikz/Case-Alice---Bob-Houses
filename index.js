const homes = document.getElementById("homes");

// Function that creates the cards for the homes
function createColElement(setImgSrc) {
    // Column element
    let createdDiv = document.createElement("div");
    createdDiv.className = "bolig-kort";

    // A element
    let createdA = document.createElement("a");
    createdA.href = "bolig-detaljer.html";

    // Img element
    let createdImg = document.createElement("img");
    createdImg.src = setImgSrc;

    // Appends all the children
    homes.appendChild(createdDiv)
    createdDiv.appendChild(createdA)
    createdA.appendChild(createdImg)
}

async function createHomes() {
    const response = await fetch("homes.json");
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
    }

    const json = await response.json();

    for (let i = 0; i < 15; i++) {
        createColElement(json[i].billede)
    }
}

//<div className="flex-container m-4 p-3" id="homes">
//    <div className="bolig-kort">
//        <a href="bolig1.html">
//            <img src="https://picsum.photos/id/1040/400/300" alt="Hus på Blomstervej 12"/>
//            <div className="bolig-kort-tekst">
//                <h2>Blomstervej 12, København</h2>
//                <p>85 m²</p>
//                <p className="pris">2.495.000 kr.</p>
//            </div>
//        </a>
//    </div>
//</div>

createHomes();