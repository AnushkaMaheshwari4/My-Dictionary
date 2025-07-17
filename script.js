const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const wordInput = document.getElementById("word-input");
const resultContainer = document.getElementById("result");

// Light/Dark toggle
document.getElementById("theme-toggle").addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

// Font change
document.getElementById("font-select").addEventListener("change", (e) => {
  document.body.style.fontFamily = e.target.value;
});

async function searchWord() {
  const word = wordInput.value.trim();
  if (!word) return;

  try {
    const res = await fetch(apiUrl + word);
    const data = await res.json();
    displayResult(data[0]);
  } catch (err) {
    resultContainer.innerHTML = "<p>Word not found 😢</p>";
  }
}

function displayResult(data) {
  const phonetic = data.phonetic || data.phonetics[0]?.text || '';
  const audio = data.phonetics[0]?.audio || '';

  const meaningsHTML = data.meanings.map(m => `
    <div class="meaning">
      <h3>${m.partOfSpeech}</h3>
      <ul>
        ${m.definitions.map(d => `<li>${d.definition}</li>`).join("")}
      </ul>
    </div>
  `).join("");

  resultContainer.innerHTML = `
    <div class="word">
      <div>
        <h2>${data.word}</h2>
        <div class="phonetic">${phonetic}</div>
      </div>
      ${audio ? `<button onclick="new Audio('${audio}').play()">🔊</button>` : ''}
    </div>
    ${meaningsHTML}
    <div class="word-of-day">Word of the day</div>
    <div class="meaning"><h3>discourteous</h3></div>
  `;
}
