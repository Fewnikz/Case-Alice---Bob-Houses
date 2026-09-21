const homes = document.getElementById("homes");

// Function that creates the cards for the homes
function createColElement(setText) {
    // Column element
    let createdCol = document.createElement("div");
    createdCol.className = "col";

    // A element
    let createdA = document.createElement("a");
    createdA.href = "bolig-detaljer.html";
    createdA.className = "bolig-kort";

    homes.appendChild(createdCol)
    createdCol.appendChild(createdA)
}

async function createHomes() {
    const response = await fetch("homes.json");
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
    }

    const json = await response.json();

    for (let i = 0; i < 15; i++) {
        createColElement(json[i].adresse)
    }
}

//<a href="bolig1.html" className="bolig-kort">
//    <img src="https://picsum.photos/id/1040/400/300" alt="Hus på Blomstervej 12"/>
//    <div className="bolig-kort-tekst">
//        <h2>Blomstervej 12, København</h2>
//        <p>85 m²</p>
//        <p className="pris">2.495.000 kr.</p>
//    </div>
//</a>

createHomes();