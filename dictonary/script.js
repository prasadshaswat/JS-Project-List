document.getElementById("searchBtn").addEventListener("click", function() {
    const word = document.getElementById("searchInput").value.trim();
    if (word !== "") {
        fetchWordDefinition(word);
    } else {
        alert("Please enter a word to search.");
    }
});

async function fetchWordDefinition(word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
            displayCard(data[0]);
        } else {
            alert("Word not found.");
        }
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

function displayCard(wordData) {
    const cardsContainer = document.getElementById("cardsContainer");
    
    // Clear previous results
    cardsContainer.innerHTML = '';

    const card = document.createElement("div");
    card.classList.add("card");

    const wordElement = document.createElement("h2");
    wordElement.textContent = wordData.word;
    card.appendChild(wordElement);

    if (wordData.meanings && wordData.meanings.length > 0) {
        const meaningsList = document.createElement("ul");
        wordData.meanings.forEach(meaning => {
            const partOfSpeech = document.createElement("strong");
            partOfSpeech.textContent = meaning.partOfSpeech;
            meaningsList.appendChild(partOfSpeech);

            meaning.definitions.forEach(definition => {
                const li = document.createElement("li");
                li.textContent = definition.definition;
                meaningsList.appendChild(li);
            });
        });
        card.appendChild(meaningsList);
    }

    cardsContainer.appendChild(card);
}
