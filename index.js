const homes = document.getElementById("homes");

function createColElement(setText){
    let createdDiv = document.createElement("div");
    createdDiv.className = "col";

    let createdP = document.createElement("p")
    createdP.textContent = setText

    homes.appendChild(createdDiv)
    createdDiv.appendChild(createdP)
}

async function createHomes() {
    const response = await fetch("homes.json");
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
    }

    const json = await response.json();

    for(let i = 0; i < 15; i++) {
        createColElement(json[i].adresse)
    }
}

createHomes();